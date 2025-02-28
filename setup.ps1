# Remove all files except JS and TS files
Get-ChildItem -Path . -Recurse -File | Where-Object { $_.Extension -notin ".js",".ts" } | Remove-Item -Force

# Function to process JS/TS files
function Process-Files($extension) {
    Get-ChildItem -Path . -Recurse -Filter "*$extension" -File | ForEach-Object {
        $parentDirName = Split-Path (Split-Path $_.Directory -Parent) -Leaf
        $targetDir = Split-Path (Split-Path $_.Directory -Parent) -Parent
        $newPath = Join-Path $targetDir "$parentDirName.js"

        if (-not (Test-Path $newPath)) {
            Move-Item $_.FullName $newPath
        }
    }
}

# Process both file types
Process-Files ".js"
Process-Files ".ts"

Write-Output "Setup completed successfully!"
