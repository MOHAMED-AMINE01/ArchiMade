
import os
import re

filepath = r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Define the new PROJECTS constant with gallery images
new_projects = """const PROJECTS = [
    {
        title: "Bâtiment d'activités",
        city: "La Ville-aux-Dames",
        year: "2024",
        type: "Tertiaire / Neuf",
        path: "/IMAGES/Projets finis/Bâtiment d_activités/Capture d_écran 2026-04-11 093951.png",
        gallery: [
            "/IMAGES/Projets finis/Bâtiment d_activités/4 cellules d_activités rue Jacqueline Auriol la ville aux dames 37700.png",
            "/IMAGES/Projets finis/Bâtiment d_activités/Capture d_écran 2026-04-11 093951.png"
        ],
        specs: ["Structure Acier", "Modularité", "RT2020"]
    },
    {
        title: "Extension Contemporaine",
        city: "Esvres",
        year: "2022",
        type: "Extension",
        pathBefore: "/IMAGES/Projets finis/Construction d_une extension sur maison existant 37320 Esvres/WhatsApp Image 2022-10-05 at 09.00.22 (1).jpeg",
        path: "/IMAGES/Projets finis/Construction d_une extension sur maison existant 37320 Esvres/Insertion 2.png",
        gallery: [
            "/IMAGES/Projets finis/Construction d_une extension sur maison existant 37320 Esvres/WhatsApp Image 2022-10-05 at 09.00.22 (1).jpeg",
            "/IMAGES/Projets finis/Construction d_une extension sur maison existant 37320 Esvres/Insertion 2.png"
        ],
        specs: ["Ossature Bois", "Légèreté", "Nouveaux bureaux"]
    },
    {
        title: "Villa Ligne",
        city: "Ligueil",
        year: "2023",
        type: "Minimalisme",
        path: "/IMAGES/Projets finis/construction d_une maison indivuelle neuve 37240 ligueil/Capture d_écran 2026-04-11 102902.png",
        gallery: [
            "/IMAGES/Projets finis/construction d_une maison indivuelle neuve 37240 ligueil/Capture d_écran 2026-04-11 102902.png"
        ],
        specs: ["Toit Mono-pente", "Finition Enduit", "BBC"]
    },
    {
        title: "Réhabilitation Bureaux",
        city: "Chanceaux sur Choisille",
        year: "2023",
        type: "Tertiaire / Réhabilitation",
        pathBefore: "/IMAGES/Projets finis/Loc office rehabiliation d_une zone de stockage en bureau 37390 chanceaux sur choisille/Capture d_écran 2026-04-10 174146.png",
        path: "/IMAGES/Projets finis/Loc office rehabiliation d_une zone de stockage en bureau 37390 chanceaux sur choisille/Capture d_écran 2026-04-10 174735.png",
        gallery: [
            "/IMAGES/Projets finis/Loc office rehabiliation d_une zone de stockage en bureau 37390 chanceaux sur choisille/Capture d_écran 2026-04-10 174146.png",
            "/IMAGES/Projets finis/Loc office rehabiliation d_une zone de stockage en bureau 37390 chanceaux sur choisille/Capture d_écran 2026-04-10 174722.png",
            "/IMAGES/Projets finis/Loc office rehabiliation d_une zone de stockage en bureau 37390 chanceaux sur choisille/Capture d_écran 2026-04-10 174735.png",
            "/IMAGES/Projets finis/Loc office rehabiliation d_une zone de stockage en bureau 37390 chanceaux sur choisille/Capture d_écran 2026-04-10 174750.png"
        ],
        specs: ["Reconversion", "Open-space", "Confort Thermique"]
    }
];"""

# Replace the PROJECTS definition
content = re.sub(r'const PROJECTS = \[.*?\];', new_projects, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(content)
print("Updated PROJECTS data with gallery images.")
