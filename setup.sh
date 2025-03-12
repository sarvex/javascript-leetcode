#!/bin/bash

# Remove all files except JS and TS files
find . -type f -not -name "*.js" -not -name "*.ts" -delete

# Process JS and TS files - move up two levels and rename
for ext in js ts; do
  find . -name "*.$ext" -type f | while read -r file; do
    dir=$(basename "$(dirname "$file")")
    up=$(dirname "$(dirname "$(dirname "$(dirname "$file")")")")
    mv -n "$file" "$up/$dir.js"
  done
done

echo "Setup completed successfully!"
