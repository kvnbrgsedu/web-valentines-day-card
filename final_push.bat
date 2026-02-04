@echo off
cd c:\Users\LENOVO\OneDrive\Desktop\web

echo Staging all changes...
git add -A

echo Committing changes...
git commit -m "Fix TypeScript config and rebuild with correct base path"

echo Pulling latest from GitHub...
git pull origin main --no-edit

echo Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo SUCCESS! All changes pushed to GitHub
echo ========================================
echo.
echo Your site will be live in 1-2 minutes at:
echo https://kvnbrgsedu.github.io/web-valentines-day-card/
echo.
pause
