# Install nero-network-office-page into Cursor local plugins
$ErrorActionPreference = "Stop"
$src = Join-Path $PSScriptRoot "nero-network-office-page"
$dest = Join-Path $env:USERPROFILE ".cursor\plugins\local\nero-network-office-page"
if (-not (Test-Path $src)) {
    throw "Plugin source not found: $src"
}
New-Item -ItemType Directory -Force -Path (Split-Path $dest) | Out-Null
Copy-Item -Recurse -Force $src $dest
Write-Host "Installed to $dest"
