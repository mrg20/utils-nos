import os
import json
from pathlib import Path

def generate_item_info():
    # Base directory where item images are stored
    base_dir = "image/items"
    item_info = {}
    
    # Walk through the directory
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith(('.png', '.jpg', '.jpeg')):
                # Get the item ID from the filename (assuming filename is ID.png)
                item_id = os.path.splitext(file)[0]
                
                # Get relative path from base_dir
                rel_path = os.path.relpath(os.path.join(root, file))
                # Convert Windows path separators to forward slashes
                rel_path = rel_path.replace('\\', '/')
                # Add to item_info dictionary
                item_info[item_id] = {
                    "path": rel_path,
                    "type": rel_path.split('/')[2]
                }
    
    # Write to JSON file
    with open('item_info.json', 'w', encoding='utf-8') as f:
        json.dump(item_info, f, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    # Create base directories if they don't exist
    Path("image/items").mkdir(parents=True, exist_ok=True)
    
    generate_item_info()
    print("item_info.json has been generated successfully!")