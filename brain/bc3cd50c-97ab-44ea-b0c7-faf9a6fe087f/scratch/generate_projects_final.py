
import os
import json

base_path = r'public/IMAGES/Projets finis'
projects = []

# Project mapping for metadata
meta = {
    "Bâtiment d_activités": {"title": "Bâtiment d'activités", "city": "La Ville-aux-Dames", "year": "2024", "type": "Tertiaire / Neuf", "specs": ["Structure Acier", "Modularité"]},
    "Construction d_une extension sur maison existant 37320 Esvres": {"title": "Extension Contemporaine", "city": "Esvres", "year": "2022", "type": "Extension", "specs": ["Ossature Bois", "Légèreté"]},
    "Construction d_une maison individuelle neuve 37230 fondettes": {"title": "Maison Fondettes", "city": "Fondettes", "year": "2023", "type": "Neuf", "specs": ["Contemporain", "Grande Baies"]},
    "Construction d_une maison individuelle neuve 37320 saint branchs": {"title": "Maison Saint-Branchs", "city": "Saint-Branchs", "year": "2023", "type": "Neuf", "specs": ["Modernité", "Toiture Tuiles"]},
    "Construction d_une maison individuelle neuve 37540 saint cyr sur loire": {"title": "Villa Saint-Cyr", "city": "Saint-Cyr-sur-Loire", "year": "2023", "type": "Neuf", "specs": ["Haut de gamme", "Design épuré"]},
    "Construction d_une maison individuelle neuve 72210 la suze sur sarthe": {"title": "Projet La Suze", "city": "La Suze-sur-Sarthe", "year": "2023", "type": "Neuf", "specs": ["Volume", "Clarté"]},
    "construction d_une maison indivuelle neuve 37240 ligueil": {"title": "Villa Ligne", "city": "Ligueil", "year": "2023", "type": "Minimalisme", "specs": ["Toit Mono-pente", "Finition Enduit"]},
    "creation d_une surelevation au dessus d_un garage 37170 chambray les tours": {"title": "Surélévation Garage", "city": "Chambray-lès-Tours", "year": "2022", "type": "Surélévation", "specs": ["Gain d'espace", "Optimisation"]},
    "Extension sur maison existante 37540": {"title": "Extension Saint-Cyr", "city": "Saint-Cyr-sur-Loire", "year": "2022", "type": "Extension", "specs": ["Harmonie", "Transition"]},
    "Loc office rehabiliation d_une zone de stockage en bureau 37390 chanceaux sur choisille": {"title": "Réhabilitation Bureaux", "city": "Chanceaux-sur-Choisille", "year": "2023", "type": "Tertiaire", "specs": ["Reconversion", "Open-space"]}
}

for folder in os.listdir(base_path):
    folder_path = os.path.join(base_path, folder)
    if os.path.isdir(folder_path):
        images = [os.path.join(folder, f).replace('\\', '/') for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
        if images:
            p_meta = meta.get(folder, {"title": folder, "city": "Inconnu", "year": "2024", "type": "Projet", "specs": ["Architecture"]})
            
            # Find pathBefore if any
            path_before = next((img for img in images if "avant" in img.lower()), None)
            
            p = {
                "title": p_meta["title"],
                "city": p_meta["city"],
                "year": p_meta["year"],
                "type": p_meta["type"],
                "path": f"/IMAGES/Projets finis/{images[0]}",
                "gallery": [f"/IMAGES/Projets finis/{img}" for img in images],
                "specs": p_meta["specs"]
            }
            if path_before:
                p["pathBefore"] = f"/IMAGES/Projets finis/{path_before}"
            
            projects.append(p)

print("const PROJECTS = " + json.dumps(projects, indent=4) + ";")
