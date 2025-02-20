#!/bin/bash

# Function to convert filename to lowercase with hyphens
convert_filename() {
    echo "$1" | tr ' ' '-' | tr '[:upper:]' '[:lower:]'
}

# Find all markdown files with uppercase letters or spaces
find /home/soushi888/Projets/alternef-digital-garden/content -type f -name "*.md" | while read -r file; do
    # Get the directory and filename
    dir=$(dirname "$file")
    filename=$(basename "$file")
    
    # Convert filename to lowercase with hyphens
    new_filename=$(convert_filename "$filename")
    
    # If filename changed, rename the file
    if [ "$filename" != "$new_filename" ]; then
        mv "$file" "$dir/$new_filename"
        echo "Renamed: $file -> $dir/$new_filename"
    fi
done

# Update internal links in all markdown files
find /home/soushi888/Projets/alternef-digital-garden/content -type f -name "*.md" -print0 | xargs -0 sed -i -E '
    # Convert [[Page Name]] to [[page-name|Page Name]]
    s/\[\[([A-Z][a-zA-Z ]+)\]\]/[['"'"'$(echo "\1" | tr '"'"' '"'"' '"'"'-'"'"' | tr '"'"'[:upper:]'"'"' '"'"'[:lower:]'"'"')'"'"'|'"'"'\1'"'"']]/g
    
    # Convert [[Page/Subpage Name]] to [[page-subpage-name|Page/Subpage Name]]
    s/\[\[([A-Z][a-zA-Z /]+)\]\]/[['"'"'$(echo "\1" | tr '"'"' '"'"' '"'"'-'"'"' | tr '"'"'[:upper:]'"'"' '"'"'[:lower:]'"'"' | tr '"'"'/'"'"' '"'"'-'"'"')'"'"'|'"'"'\1'"'"']]/g
'

echo "Filename standardization complete!"
