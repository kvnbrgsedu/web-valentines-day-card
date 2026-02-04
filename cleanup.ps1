# Navigate to project directory
Set-Location "c:\Users\LENOVO\OneDrive\Desktop\web"

# Remove the incorrect workflow
if (Test-Path ".github\workflows\static.yml") {
    Remove-Item ".github\workflows\static.yml" -Force
    Write-Host "Deleted static.yml" -ForegroundColor Green
} else {
    Write-Host "static.yml not found" -ForegroundColor Yellow
}

# Add the changes
& "C:\Program Files\Git\bin\git.exe" add -A
Write-Host "Changes staged" -ForegroundColor Green

# Commit
& "C:\Program Files\Git\bin\git.exe" commit -m "Remove incorrect static workflow, keep build workflow only"
Write-Host "Changes committed" -ForegroundColor Green

# Push to GitHub
& "C:\Program Files\Git\bin\git.exe" push origin main
Write-Host "Changes pushed to GitHub" -ForegroundColor Green

Write-Host "`n✅ Done! Check GitHub Actions at:" -ForegroundColor Cyan
Write-Host "https://github.com/kvnbrgsedu/web-valentines-day-card/actions" -ForegroundColor Cyan
