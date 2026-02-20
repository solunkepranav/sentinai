
@echo off
echo Starting SentinAI Platform...
echo ==========================================
echo 1. Checking Environment...
python --version
if %errorlevel% neq 0 (
    echo Python not found! Please install Python 3.10+
    pause
    exit
)
echo Python found.

echo.
echo 2. Installing Dependencies...
cd backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Failed to install dependencies!
    pause
    exit
)

echo.
echo 3. Launching SentinAI Backend & Frontend...
echo Access the Dashboard at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server.
python main.py
pause
