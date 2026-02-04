@echo off
cd c:\Users\LENOVO\OneDrive\Desktop\web
echo Pulling latest changes from GitHub...
git pull origin main --no-edit
echo.
echo Pushing changes to GitHub...
git push origin main
echo.
echo Done! All changes synced with GitHub.
echo.
echo Your site will be live at:
echo https://kvnbrgsedu.github.io/web-valentines-day-card/
echo.
pause
