
const PROJECTS = [
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
        title: "Maison Individuelle",
        city: "Fondettes",
        year: "2023",
        type: "Neuf",
        path: "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37230 fondettes/Capture d_écran 2026-04-11 101030.png",
        gallery: [
            "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37230 fondettes/Capture d_écran 2026-04-11 101030.png"
        ],
        specs: ["Contemporain", "Grande Baies", "Lumière"]
    },
    {
        title: "Maison Saint-Branchs",
        city: "Saint-Branchs",
        year: "2023",
        type: "Neuf",
        path: "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37320 saint branchs/Capture d_écran 2026-04-11 102547.png",
        gallery: [
            "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37320 saint branchs/Capture d_écran 2026-04-11 102547.png"
        ],
        specs: ["Modernité", "Toiture Tuiles", "Intégration"]
    },
    {
        title: "Villa Saint-Cyr",
        city: "Saint-Cyr-sur-Loire",
        year: "2023",
        type: "Neuf",
        path: "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37540 saint cyr sur loire/Capture d_écran 2026-04-11 102226.png",
        gallery: [
            "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 37540 saint cyr sur loire/Capture d_écran 2026-04-11 102226.png"
        ],
        specs: ["Haut de gamme", "Design épuré", "Terrasse"]
    },
    {
        title: "Projet La Suze",
        city: "La Suze-sur-Sarthe",
        year: "2023",
        type: "Neuf",
        path: "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 72210 la suze sur sarthe/Capture d_écran 2026-04-11 101430.png",
        gallery: [
            "/IMAGES/Projets finis/Construction d_une maison individuelle neuve 72210 la suze sur sarthe/Capture d_écran 2026-04-11 101430.png"
        ],
        specs: ["Volume", "Clarté", "Espace"]
    },
    {
        title: "Surélévation Garage",
        city: "Chambray-lès-Tours",
        year: "2022",
        type: "Surélévation",
        path: "/IMAGES/Projets finis/creation d_une surelevation au dessus d_un garage 37170 chambray les tours/1abff9e6-a427-41ba-84e4-6202cf7be7ee.jpg",
        gallery: [
            "/IMAGES/Projets finis/creation d_une surelevation au dessus d_un garage 37170 chambray les tours/1abff9e6-a427-41ba-84e4-6202cf7be7ee.jpg",
            "/IMAGES/Projets finis/creation d_une surelevation au dessus d_un garage 37170 chambray les tours/46f52069-d1b9-41b3-b202-29c8108447e7.jpg"
        ],
        specs: ["Gain d'espace", "Optimisation", "Bois"]
    },
    {
        title: "Extension Saint-Cyr",
        city: "Saint-Cyr-sur-Loire",
        year: "2022",
        type: "Extension",
        pathBefore: "/IMAGES/Projets finis/Extension sur maison existante 37540/avant projet.jpeg",
        path: "/IMAGES/Projets finis/Extension sur maison existante 37540/Creation d_une extenstion 37540 saint cyr sur loire - 01.jpeg",
        gallery: [
            "/IMAGES/Projets finis/Extension sur maison existante 37540/avant projet.jpeg",
            "/IMAGES/Projets finis/Extension sur maison existante 37540/Creation d_une extenstion 37540 saint cyr sur loire - 01.jpeg",
            "/IMAGES/Projets finis/Extension sur maison existante 37540/Creation d_une extenstion 37540 saint cyr sur loire - 02.jpeg"
        ],
        specs: ["Harmonie", "Transition", "Espace de vie"]
    },
    {
        title: "Réhabilitation Bureaux",
        city: "Chanceaux-sur-Choisille",
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
];
