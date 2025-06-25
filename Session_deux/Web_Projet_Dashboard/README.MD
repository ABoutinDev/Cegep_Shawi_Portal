# 💻 Projet Web 2 – Dashboard personnel

### Cégep de Shawinigan – AEC en développement d'applications Web  
- **Cours :** 420-W1R-SW – Développement Web  
- **Session 2 :** Hiver 2024-2025  
- **Étudiant :** Alex Boutin

## Description et Objectif 🎯  
- Ce projet consistait à créer un **Dashboard personnalisé**.

L’objectif principal était de permettre à l’utilisateur de centraliser plusieurs modules utiles au quotidien sur une seule interface moderne, interactive et entièrement personnalisable, **sans backend**, à l’aide de `LocalStorage`, `SessionStorage` ou `IndexedDB`.

Les modules peuvent être déplacés, redimensionnés et configurés selon les préférences de l’utilisateur.

Un système de **gamification** ajoute un aspect ludique : expérience (XP), niveaux, gains/pénalités selon les tâches accomplies ou manquées.

## Répartition du travail 👨‍💻  
- Travail réalisé en équipe de deux.  

**Rôle de chacun**  
- **Moi:** 
  - Tous ce qui concerne le visuel
  - Le Widget container et template d'un widget
  - Fonctionnalités principale : Update d'un widget, Drag & Drop, Resizablable box
  - Sauvegarde en localStorage
  - Widgets : ToDoList seulement
  - Ouverture fermeture avec "keybind"

- Coequipier:
  - Systeme d'experience
  - Widgets : Stocktrader, StickyNote, Weather, IdleGame, DailyQuote, Pomodoro, Calculator

## État et Résultat ⭐ 100/100 - 100%
- **Moyennse de classe: 88/100**
Le projet a été livré dans un état **fonctionnel et conforme aux exigences**. 

Un minimum de 10 modules a été implémenté, avec gestion de l’apparence, des interactions, et de la sauvegarde locale.  
L'expérience utilisateur a été optimisée à l’aide de transitions fluides, d’un thème sombre/clair et d’une navigation intuitive.

## Modules (widgets) réalisés 🧩  
- ✅ To-do list  
- 🗒️ Sticky Notes  
- 🎯 Stock Tracker  
- 🌤️ Météo (API)  
- 💤 IdleGame  
- 📚 DailyQuote
- 🎮 Pomodoro
-  Caltulatrice  

## Remarques personnelles 📝  
**Ce projet a représenté un défi, notamment en raison des nombreuses fonctionnalités à implanter, comme le "Drag & Drop" dans un dashboard où les positions CSS (fixed, absolute, etc.) variaient beaucoup. J’ai réussi à faire fonctionner l’ensemble après plusieurs heures d’acharnement.**
