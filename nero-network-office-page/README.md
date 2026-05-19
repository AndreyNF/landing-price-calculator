# nero-network-office-page

Local Cursor plugin for maintaining the Nero Network office page in WordPress (Kovcheg MCP).

## Install (Windows PowerShell)

From the repository root:

```powershell
Copy-Item -Recurse -Force ".\nero-network-office-page" "$env:USERPROFILE\.cursor\plugins\local\nero-network-office-page"
```

## Install (macOS / Linux)

```bash
mkdir -p "$HOME/.cursor/plugins/local"
cp -a "./nero-network-office-page" "$HOME/.cursor/plugins/local/nero-network-office-page"
```

Restart Cursor or reload the window so the plugin is picked up.
