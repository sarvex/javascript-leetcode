#!/bin/bash

# Remove all markdown files
find . -name "*.md" -type f -delete

# Rename JS files to their parent directory name
find . -name "*.js" -type f | while read file; do
  dir_name=$(basename "$(dirname "$file")")
  new_name="$(dirname "$(dirname "$file")")/${dir_name}.js"
  mv -n "$file" "$new_name"
done

# Rename TS files to their parent directory name
find . -name "*.ts" -type f | while read file; do
  dir_name=$(basename "$(dirname "$file")")
  new_name="$(dirname "$(dirname "$file")")/${dir_name}.js"
  mv -n "$file" "$new_name"
done

echo "Setup completed successfully!"
