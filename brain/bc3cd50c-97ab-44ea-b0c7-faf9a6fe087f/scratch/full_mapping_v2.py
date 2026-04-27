
import os
import json

base_dir = r'c:\ALTERNANCE\ArchiMade\public\IMAGES\Projets finis'
projects = []

# Order and mapping for main project info
project_info = {
    "Bâtiment d_activités": {"city": "Ville-aux-Dames", "year": "2024", "type": "Tertiaire", "specs": ["Structure Mixte", "Performance"]},
    "Construction d_une extension sur maison existant 37320 Esvres": {"title": "Extension Contemporaine", "city": "Esvres", "year": "2022", "type": "Extension", "specs": ["Bois", "Design"]},
    "Construction d_une maison individuelle neuve 37230 fondettes": {"title": "Maison Fondettes", "city": "Fondettes", "year": "2023", "type": "Neuf", "specs": ["Contemporain", "Béton"]},
    "Construction d_une maison individuelle neuve 37320 saint branchs": {"title": "Maison Saint-Branchs", "city": "Saint-Branchs", "year": "2023", "type": "Neuf", "specs": ["Modernité", "Volume"]},
    "Construction d_une maison individuelle neuve 37540 saint cyr sur loire": {"title": "Villa Saint-Cyr", "city": "Saint-Cyr-sur-Loire", "year": "2023", "type": "Neuf", "specs": ["Haut de gamme", "Lumière"]},
    "Construction d_une maison individuelle neuve 72210 la suze sur sarthe": {"title": "Projet La Suze", "city": "La Suze-sur-Sarthe", "year": "2023", "type": "Neuf", "specs": ["Minimalisme"]},
    "construction d_une maison indivuelle neuve 37240 ligueil": {"title": "Villa Ligne", "city": "Ligueil", "year": "2023", "type": "Neuf", "specs": ["Espace"]},
    "creation d_une surelevation au dessus d_un garage 37170 chambray les tours": {"title": "Surélévation Garage", "city": "Chambray-lès-Tours", "year": "2022", "type": "Rénovation", "specs": ["Bois", "Extension"]},
    "Extension sur maison existante 37540": {"title": "Extension Saint-Cyr", "city": "Saint-Cyr-sur-Loire", "year": "2022", "type": "Extension", "specs": ["Harmonie"]},
    "Loc office rehabiliation d_une zone de stockage en bureau 37390 chanceaux sur choisille": {"title": "Réhabilitation Bureaux", "city": "Chanceaux-sur-Choisille", "year": "2023", "type": "Tertiaire", "specs": ["Reconversion"]}
}

for folder in os.listdir(base_dir):
    folder_path = os.path.join(base_dir, folder)
    if os.path.isdir(folder_path):
        images = [f"/IMAGES/Projets finis/{folder}/{img}" for img in os.listdir(folder_path) if img.lower().endswith(('.png', '.jpg', '.jpeg'))]
        if not images: continue
        
        info = project_info.get(folder, {"title": folder, "city": "France", "year": "2023", "type": "Projet", "specs": ["Architecture"]})
        
        # Determine pathBefore (if "avant" is in filename)
        path_before = next((img for img in images if "avant" in img.lower()), None)
        # Hero image is usually the first non-avant image or the first image
        hero = next((img for img in images if "avant" not in img.lower()), images[0])
        
        projects.append({
            "title": info.get("title", folder),
            "city": info["city"],
            "year": info["year"],
            "type": info["type"],
            "path": hero,
            "gallery": images,
            "specs": info["specs"],
            "pathBefore": path_before
        })

projects_js = json.dumps(projects, indent=4, ensure_ascii=False)

# Update the file
filepath = r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'const PROJECTS = \[.*?\];', f'const PROJECTS = {projects_js};', content, flags=re.DOTALL)

# Also update ArchiProjectDetail z-index to 1000
content = content.replace('z-[200]', 'z-[1000]')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Mapped {len(projects)} projects with all available images and elevated z-index.")
