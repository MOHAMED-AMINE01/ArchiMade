
import os
import json

base_path = r'public/IMAGES/Projets finis'
project_map = {}

for root, dirs, files in os.walk(base_path):
    images = [os.path.join(root, f).replace('public', '').replace('\\\\', '/') for f in files if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
    if images:
        project_map[os.path.basename(root)] = images

print(json.dumps(project_map, indent=2))
