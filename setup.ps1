Get-ChildItem -Filter *.md -Recurse | Remove-Item

Get-ChildItem -Filter *.js -Recurse | Rename-Item -NewName { $_.Directory.Name+'.js'}
Get-ChildItem -Filter *.js -Recurse | Move-Item -Destination { $_.Directory.Parent.FullName }
