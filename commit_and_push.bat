@echo off
cd c:\Users\LENOVO\OneDrive\Desktop\web

echo Adding all changes...
git add -A

echo Committing changes...
git commit -m "Update deployment configuration and scripts"

echo Pulling latest changes...
git pull origin main --no-edit

echo Pushing to GitHub...
git push origin main

echo.
echo ================================
echo Done! Changes pushed to GitHub
echo ================================
echo.
pause
