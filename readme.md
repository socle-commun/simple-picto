# 🎨 Simple Picto

Simple Picto est une application de classeur de communication visuelle 📖 qui permet de définir un classeur de pictogrammes et d'images associés à des mots et de les lire 📢 (par text-to-speech) lors de l'utilisation du classeur.

## ✨ Fonctionnalités

- 🌍 **Application multilingue**
- 🖼️ **Listes de pictogrammes ou images** associés à un mot, lisible par text-to-speech 📢 lors de la sélection et filtrables en fonction de leurs "catégories" respectives 📂
- 📝 **Définition des classeurs** via un formulaire dédié
- 🔤 **Définition des mots, pictogrammes ou images** via des formulaires dédiés
- ⚙️ **Gestion des paramètres** dans des formulaires dédiés
- 💻📱 **Utilisable en local** avec ou sans installation
- 🎨 **Design responsive** pour un affichage agréable sur smartphones, tablettes et ordinateurs
- 🆓 **Gratuit et Open Source** (license à définir)

## 🚀 Installation

- **Clone du repo:**

```sh
git clone https://github.com/socle-commun/simple-picto.git
cd simple-picto
```

- **Installation des dépendances:**

```sh
npm install
```

- **Lancement de l'application en mode développement:**

```sh
npm run dev
```

- **Build de l'application:**

```sh
npm run build
```

- **Preview de l'application buildé:**

```sh
npm run preview
```

## Technologies utilisées

- [Vite](https://vite.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Dexie](https://dexie.org/)
- [I18next](https://www.i18next.com/)
- [React Router](https://reactrouter.com/)

## 🛠️ TODO

### ⚙️ Settings

- ✅ 🎭 **Gestion du theming** (mode clair ☀️, sombre 🌙 ou système 🔄)
- ✅ 🌐 **Gestion de la langue** (changer la langue de l'application)
- 💾 **Réinitialisation de la base de données**
- 📂 **Gestion du classeur actif**
- 📚 **Liste des classeurs disponibles**
- ✏️ **Formulaire de création et édition** d'un classeur et de ses mots, pictogrammes ou images

### 🌍 Global

- 📏 **Améliorer le design responsive**
  - ✅ 📱 Définir l'UI mobile pour le filtrage par catégories
  - 📜 Créer un menu responsive pour la navigation principale
    - ✅ 🏠 **Navigation principale** : accueil & paramètres
- 🖼️ **Améliorer le classeur par défaut** ⇨ à voir éventuellement avec un professionnel
- ✅ 🌎 **Traduire le classeur par défaut** pour respecter la langue choisie
- **Mode daltoniens** pour les gens qui ont des problèmes de vision des couleurs
