# 📋 Spécification

## 1. 🌟 Aperçu

Simple Picto est une application de communication visuelle qui permet aux utilisateurs de créer et de gérer des classeurs de pictogrammes et d'images. Chaque pictogramme est associé à un mot et peut être lu à haute voix grâce à la fonctionnalité de synthèse vocale.

## 2. 🚀 Fonctionnalités Principales

### 2.1 🎨 Communication Visuelle

- Créer et gérer des classeurs de pictogrammes et d'images
- Associer des mots aux pictogrammes/images
- Fonctionnalité de synthèse vocale pour les éléments sélectionnés
- Système de filtrage par catégories

### 2.2 🖥️ Interface Utilisateur

- Design responsive prenant en charge :
  - Appareils mobiles
  - Tablettes
  - Ordinateurs de bureau
- Support des thèmes :
  - Mode clair
  - Mode sombre
  - Détection des préférences système
- Persistance de la sélection du thème entre les sessions

### 2.3 🌍 Internationalisation

- Support multilingue
- Détection de la locale système
- Sélection manuelle de la locale
- Persistance de la sélection de la locale entre les sessions

## 3. 🛠️ Architecture Technique

### 3.1 🧩 Technologies Frontend

- **Outil de Build** : Vite
- **Framework Principal** : React
- **Langage** : TypeScript
- **Base de données** : Dexie (IndexedDB)
- **Internationalisation** : i18next
- **Routing** : React Router

### 3.2 📊 Gestion des Données

- Stockage local utilisant IndexedDB
- Stockage persistant des paramètres
- Système de gestion des classeurs

## 4. 🎯 Spécifications de l'Interface Utilisateur

### 4.1 🌓 Gestion des Thèmes

- Mode clair par défaut pour les nouveaux utilisateurs
- Détection du thème système
- Sélection manuelle du thème
- Persistance du thème entre les sessions
- Cohérence du thème sur toutes les pages

### 4.2 🧭 Navigation

- Menu principal responsive
- Navigation vers l'accueil et les paramètres
- Filtrage des catégories optimisé pour mobile
- Navigation par fil d'Ariane

### 4.3 ⚙️ Interface des Paramètres

- Sélection du thème
- Sélection de la langue
- Fonctionnalité de réinitialisation de la base de données
- Gestion du classeur actif
- Gestion de la liste des classeurs
- Formulaires de création et d'édition des classeurs

## 5. 🔮 Améliorations Prévues

### 5.1 🎨 Améliorations UI/UX

- Design responsive amélioré
- Support du mode daltonien
- Design par défaut des classeurs amélioré
- Traduction dynamique des classeurs

### 5.2 📚 Gestion des Classeurs

- Personnalisation de la couleur de fond
- Paramètres de couleur de fond des pictogrammes
- Options de taille des pictogrammes et d'affichage du texte
- Fonctionnalité de fil d'Ariane et de lecture

## 6. 🚀 Configuration du Développement

### 6.1 📋 Prérequis

- Node.js
- npm

### 6.2 📥 Installation

```sh
git clone https://github.com/socle-commun/simple-picto.git
cd simple-picto
npm install
```

### 6.3 🛠️ Commandes de Développement

- Mode développement : `npm run dev`
- Build : `npm run build`
- Prévisualisation du build : `npm run preview`

## 7. ♿ Considérations d'Accessibilité

- Support du mode daltonien (prévu)
- Intégration de la synthèse vocale
- Design responsive pour divers appareils
- Structure de navigation claire

## 8. 🔒 Considérations de Sécurité

- Stockage local des données
- Pas de collecte de données sensibles
- Approche hors ligne en priorité

## 9. 📝 Détails d'Implémentation

### 9.1 📁 Structure du Projet

- **src/** : Contient le code principal de l'application.
  - **components/** : Composants UI réutilisables.
  - **hooks/** : Hooks React personnalisés pour la logique partagée.
  - **pages/** : Composants de page pour différentes routes.
  - **utils/** : Fonctions et helpers utilitaires.
  - **i18n/** : Configuration et traductions d'internationalisation.
  - **styles/** : Styles globaux et définitions de thèmes.
  - **types/** : Définitions de types TypeScript.
  - **assets/** : Ressources statiques comme les images et les icônes.
  - **App.tsx** : Composant principal de l'application.
  - **main.tsx** : Point d'entrée de l'application.

### 9.2 🧩 Architecture des Composants

- **App.tsx** : Gère le routing et l'état global.
- **components/** : Contient des composants réutilisables comme les boutons, les entrées et les modales.
- **pages/** : Chaque page est un composant séparé, gérant des fonctionnalités spécifiques comme l'accueil, les paramètres et la gestion des classeurs.

### 9.3 📊 Gestion d'État

- Utilise l'API Context de React pour la gestion d'état global.
- L'état local est géré en utilisant les hooks useState et useEffect de React.

### 9.4 🧭 Routing

- Implémenté en utilisant React Router, avec les routes définies dans App.tsx.
- Prend en charge le routing dynamique pour la gestion des classeurs.

### 9.5 🌍 Internationalisation

- Configuré en utilisant i18next, avec les traductions stockées dans le dossier i18n.
- Prend en charge le changement de langue dynamique et la persistance.

### 9.6 🎨 Styling

- Utilise les modules CSS pour les styles spécifiques aux composants.
- Les styles globaux sont définis dans le dossier styles, prenant en charge les thèmes clair et sombre.

### 9.7 📊 Persistance des Données

- Utilise Dexie (IndexedDB) pour le stockage local des données.
- Les paramètres persistants et les données des classeurs sont stockés dans l'IndexedDB du navigateur.

### 9.8 ♿ Accessibilité

- Implémente les attributs et rôles ARIA pour une meilleure accessibilité.
- Prend en charge la navigation au clavier et les lecteurs d'écran.

### 9.9 🧪 Tests

- Les tests unitaires sont écrits en utilisant Jest et React Testing Library.
- Les tests d'intégration sont prévus pour le développement futur.

### 9.10 🚀 Déploiement

- L'application est construite en utilisant Vite et peut être déployée sur n'importe quel service d'hébergement statique.
- Les variables d'environnement sont utilisées pour la configuration.

Cette spécification est basée sur l'état actuel du projet et peut être mise à jour au fur et à mesure du développement. L'application est open-source et accueille les contributions de la communauté.
