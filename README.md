# 📦 Ralfs RetourHub

**Ralfs RetourHub** is een minimalistische tool om retourpakketten te beheren en te optimaliseren voor verzending via verschillende koeriersdiensten. Gebouwd met React + Supabase.

## ⚙️ Features

- ✅ Toevoegen, bewerken en verwijderen van pakketten
- ✅ Automatische suggestie van verzendopties per koerier
- ✅ Selecteer meerdere pakketten en krijg geoptimaliseerde retourlocaties
- ✅ "Selecteer alles" functie voor snelle selectie
- ✅ Visuele status-indicatoren (Te doen, In behandeling, Afgewerkt)

## 🚚 Ondersteunde Koeriers & Regels

| Koerier         | Locaties                                             |
|----------------|------------------------------------------------------|
| **Bpost**       | Greenhouse Locker, Postbode, Dagbladhandel Lammens, De Koerant |
| **DHL**         | Greenhouse Locker, Dagbladhandel Lammens            |
| **UPS**         | Afhaling via UPS website, De Koerant                |
| **DPD**         | De Koerant                                           |
| **Mondial Relay** | Aqua service                                       |

## 🧠 Optimalisatie Logica

Wanneer meerdere pakketten geselecteerd zijn, toont het systeem enkel de **gemeenschappelijke locaties** tussen de koeriers van de geselecteerde pakketten. Geen overlap = geen voorstel.

## 🛠️ Tech Stack

- **Frontend:** React + Tailwind CSS
- **Backend:** Supabase (PostgreSQL + API)
- **Routing:** React Router DOM

## ▶️ Run Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

## 📁 Structuur

```
src/
├── Home.jsx           # Hoofdinterface
├── AddPackage.jsx     # Formulier voor toevoegen
├── EditPackage.jsx    # Formulier voor bewerken
├── Couriers.jsx       # Overzicht retourregels per koerier
├── supabase.js        # Supabase connectie
```

## ✍️ Auteur

**Ralf Hofman**  
_MCT student, AI-gedreven productiviteitsterrorist, toekomstige miljonair_

---

_“Tijdverlies is de vijand. RetourHub is het wapen.”_
