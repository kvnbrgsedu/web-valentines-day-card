import os
import subprocess
import sys

# Change to project directory
os.chdir(r'c:\Users\LENOVO\OneDrive\Desktop\web')

# Delete static.yml
static_yml = r'.github\workflows\static.yml'
if os.path.exists(static_yml):
    os.remove(static_yml)
    print(f"✅ Deleted {static_yml}")
else:
    print(f"⚠️ {static_yml} not found")

# Git commands
git_exe = r'C:\Program Files\Git\bin\git.exe'

print("\n📦 Staging changes...")
result = subprocess.run([git_exe, 'add', '-A'], capture_output=True, text=True)
print(result.stdout if result.stdout else "✅ Changes staged")

print("\n💾 Committing changes...")
result = subprocess.run([git_exe, 'commit', '-m', 'Remove incorrect static workflow, keep build workflow only'], capture_output=True, text=True)
print(result.stdout if result.stdout else "✅ Changes committed")

print("\n🚀 Pushing to GitHub...")
result = subprocess.run([git_exe, 'push', 'origin', 'main'], capture_output=True, text=True)
print(result.stdout if result.stdout else result.stderr if result.stderr else "✅ Pushed to GitHub")

print("\n✨ Done! Your site will be live at:")
print("https://kvnbrgsedu.github.io/web-valentines-day-card/")
print("\nCheck deployment status at:")
print("https://github.com/kvnbrgsedu/web-valentines-day-card/actions")
