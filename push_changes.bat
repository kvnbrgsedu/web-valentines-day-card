@echo off
cd c:\Users\LENOVO\OneDrive\Desktop\web
echo Adding all files...
git add -A
echo Committing changes...
git commit -m "Add deployment scripts and workflow configuration"
echo Pushing to GitHub...
git push origin main
echo.
echo Done! Changes pushed to GitHub.
pause
