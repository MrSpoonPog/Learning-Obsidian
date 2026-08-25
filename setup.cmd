@echo off
setlocal
cd /d "%~dp0"

set "VIS=.claude\tools\visual"
set "RC=0"

echo.
echo  ===========================================
echo    John Learning  -  setup
echo  ===========================================
echo.

REM ---------------------------------------------------------------- 1. Node
echo  [1/5] Checking Node.js...
where node >nul 2>nul
if errorlevel 1 goto :no_node
for /f "delims=" %%v in ('node -v') do set "NODEV=%%v"
echo        ok  Node %NODEV%

REM ------------------------------------------------------- 2. System files
echo  [2/5] Checking system files...
if not exist ".claude\skills\teach\SKILL.md"   goto :missing
if not exist ".claude\skills\review\SKILL.md"  goto :missing
if not exist ".claude\agents\researcher.md"    goto :missing
if not exist "%VIS%\svg2png.mjs"               goto :missing
echo        ok  skills, agents and tools present

REM ----------------------------------------------------------- 3. Folders
echo  [3/5] Creating working folders...
if not exist "knowledge"      md "knowledge"
if not exist "lessons"        md "lessons"
if not exist "viz"            md "viz"
if not exist "%VIS%\scratch"  md "%VIS%\scratch"
echo        ok  knowledge\  lessons\  viz\

REM -------------------------------------------------------------- 4. Deps
echo  [4/5] Installing render toolchain...
echo        (first run downloads a private Chrome - this can take a few minutes)
pushd "%VIS%"
call npm install --no-fund --no-audit --loglevel=error
if errorlevel 1 set "RC=1"
if "%RC%"=="1" goto :npm_failed_pop
call npx --yes puppeteer browsers install chrome >nul 2>nul
popd
echo        ok  dependencies installed

REM ------------------------------------------------------ 5. Verify render
echo  [5/5] Verifying the render pipeline...
pushd "%VIS%"
if exist "scratch\_smoke_mmd.png" del /q "scratch\_smoke_mmd.png"
if exist "scratch\_smoke_svg.png" del /q "scratch\_smoke_svg.png"
call npx --yes mmdc -i "fixtures\smoke.mmd" -o "scratch\_smoke_mmd.png" -b white -s 2 >nul 2>nul
node "svg2png.mjs" "fixtures\smoke.svg" "scratch\_smoke_svg.png" 2 >nul 2>nul
popd
if not exist "%VIS%\scratch\_smoke_mmd.png" goto :render_failed
if not exist "%VIS%\scratch\_smoke_svg.png" goto :render_failed
del /q "%VIS%\scratch\_smoke_mmd.png" >nul 2>nul
del /q "%VIS%\scratch\_smoke_svg.png" >nul 2>nul
echo        ok  mermaid and svg both render

echo.
echo  ===========================================
echo    Setup complete.
echo  ===========================================
echo.
echo    Start learning:     claude   then   /learn ^<topic^>
echo    Re-test what's due: claude   then   /review
echo.
echo    Lessons you can re-read land in  lessons\
echo    Point Obsidian at this folder to read them with diagrams.
echo.
echo    NOTE: if Claude Code was already open, restart it so the
echo          skills and agents are picked up.
echo.
goto :end

REM --------------------------------------------------------------- errors
:no_node
echo.
echo    FAILED  Node.js is not installed, or is not on your PATH.
echo.
echo            Install the LTS build from  https://nodejs.org
echo            then close this window and run setup again.
set "RC=1"
goto :end

:missing
echo.
echo    FAILED  Core files are missing from .claude\
echo.
echo            This script must sit in the root of the John Learning
echo            folder, next to CLAUDE.md and the .claude directory.
set "RC=1"
goto :end

:npm_failed_pop
popd
:npm_failed
echo.
echo    FAILED  npm install did not complete.
echo.
echo            Check your internet connection and try again. If you are
echo            behind a proxy or VPN, that is the usual cause.
set "RC=1"
goto :end

:render_failed
echo.
echo    FAILED  The render toolchain installed but could not draw a
echo            test diagram.
echo.
echo            Teaching will still work - you will just not get
echo            diagrams in your lessons. To debug, run:
echo              cd %VIS%
echo              npx mmdc -i fixtures\smoke.mmd -o scratch\test.png -b white
set "RC=1"
goto :end

:end
echo.
pause
exit /b %RC%
