@echo off
cd c:\Users\LENOVO\OneDrive\Desktop\web

echo Deleting incorrect workflows...
del .github\workflows\static.yml
del .github\workflows\statics.yml

echo Rebuilding the app with correct config...
call npm run build

echo Adding changes...
git add -A

echo Committing...
git commit -m "Remove all static workflows, keep only deploy.yml and rebuild dist"

echo Pulling latest...
git pull origin main --no-edit

echo Pushing to GitHub...
git push origin main

echo.
echo ============================================
echo DONE! Your site will deploy in 1-2 minutes
echo ============================================
echo URL: https://kvnbrgsedu.github.io/web-valentines-day-card/
echo.
pause
