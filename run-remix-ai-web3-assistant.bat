@echo off
setlocal

cd /d "%~dp0"

echo ==========================================
echo Remix + AI Web3 Assistant
echo ==========================================
echo.

if not exist ".env.local" (
  echo [ERROR] Missing .env.local
  echo Please create and fill:
  echo   F:\ai-web3\ai-web3-school-cohort-0\.env.local
  echo.
  pause
  exit /b 1
)

if not exist "experiments\remix-ai-web3-assistant\server.js" (
  echo [ERROR] Missing server.js
  echo Expected:
  echo   experiments\remix-ai-web3-assistant\server.js
  echo.
  pause
  exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not installed or not in PATH.
  echo Please install Node.js and try again.
  echo.
  pause
  exit /b 1
)

echo Starting local server...
echo.
echo Open this URL in your browser:
echo   http://localhost:3000
echo.
echo Press Ctrl+C to stop the server.
echo.

start "" http://localhost:3000

node experiments\remix-ai-web3-assistant\server.js

echo.
echo Server stopped.
pause
