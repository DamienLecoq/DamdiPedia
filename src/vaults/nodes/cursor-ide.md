---
id: cursor-ide
label: Cursor
category: logiciel
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:21.794Z'
updatedAt: '2026-04-14T17:58:21.794Z'
relations:
  - targetId: vscode
    type: related
    description: Fork de VS Code avec intégration IA native
resources:
  - type: documentation
    title: Documentation officielle Cursor
    url: 'https://docs.cursor.com/'
  - type: vidéo
    title: Fireship – Cursor Editor Review
    url: 'https://www.youtube.com/watch?v=gqUQbjsYZLQ'
  - type: blog
    title: Cursor Blog
    url: 'https://cursor.com/blog'
  - type: vidéo
    title: The AI Advantage – Cursor Full Tutorial
    url: 'https://www.youtube.com/watch?v=yk9lXobJ95E'
---

## Résumé rapide

Cursor est un éditeur de code basé sur un fork de VS Code, conçu pour intégrer nativement l'intelligence artificielle dans le flux de développement. Il permet de générer, modifier et comprendre du code via des conversations avec des modèles de langage (GPT-4, Claude).

---

## Définition

Cursor est un IDE orienté IA construit sur la base de VS Code. Il intègre des modèles de langage directement dans l'éditeur pour permettre la génération de code, le refactoring assisté par IA, la complétion intelligente et la conversation contextuelle sur le code du projet.

---

## Histoire

* Fondé par Anysphere en 2023
* Basé sur un fork de VS Code (compatibilité totale avec les extensions VS Code)
* Intègre les modèles GPT-4, Claude et d'autres LLM
* Croissance rapide grâce à l'engouement pour le développement assisté par IA
* Modèle freemium avec un abonnement Pro pour plus de requêtes IA

---

## Objectif

* Intégrer l'IA directement dans le flux de développement
* Permettre de générer et modifier du code par conversation naturelle
* Offrir une compréhension contextuelle du projet entier
* Accélérer le développement sans quitter l'éditeur

---

## Domaines d'utilisation

* Développement web (frontend et backend)
* Prototypage rapide d'applications
* Apprentissage de nouveaux langages et frameworks
* Refactoring assisté par IA de bases de code existantes

---

## Fonctionnement

* **Fork de VS Code** : compatibilité avec toutes les extensions et paramètres VS Code
* **Tab completion** : complétion IA prédictive au-delà de l'autocomplétion classique
* **Cmd+K / Ctrl+K** : génération ou modification de code inline via un prompt
* **Chat contextuel** : conversation avec l'IA en utilisant le code du projet comme contexte
* **Codebase indexing** : indexation du projet pour que l'IA comprenne l'architecture globale

---

## Concepts clés

* **Tab Completion** — Complétion IA prédictive multi-lignes
* **Cmd+K (Inline Edit)** — Génération ou modification de code par prompt
* **Chat Panel** — Conversation contextuelle avec l'IA sur le code
* **@ References** — Référencement de fichiers, fonctions ou documentation dans les prompts
* **Codebase Context** — Indexation vectorielle du projet pour la recherche sémantique

---

## Exemple

```
// Utilisation de Ctrl+K pour modifier du code :
// 1. Sélectionner un bloc de code
// 2. Ctrl+K → "Convertir cette fonction en async/await"
// 3. L'IA modifie le code en place

// Utilisation du Chat :
// @fichier.ts "Explique-moi le fonctionnement de cette fonction"
// @codebase "Où est-ce que la validation des emails est implémentée ?"
```

---

## Avantages

* Intégration IA native et fluide dans le flux de travail
* Compatible avec toutes les extensions VS Code
* Compréhension du contexte du projet entier
* Accélère considérablement le prototypage et le refactoring
* Interface familière pour les utilisateurs de VS Code

---

## Inconvénients

* Abonnement payant nécessaire pour une utilisation intensive (Pro ~20$/mois)
* Dépendance aux API de modèles IA (latence réseau, disponibilité)
* Le code généré par IA nécessite toujours une vérification humaine
* Fork de VS Code : peut avoir du retard sur les mises à jour de VS Code

---

## Pièges courants

* Faire confiance aveuglément au code généré par l'IA sans le relire
* Ne pas indexer le projet → l'IA manque de contexte
* Oublier que les prompts sont envoyés à des serveurs distants (confidentialité du code)
* Utiliser l'IA pour du code critique sans écrire de tests

---

## À ne pas confondre

* Cursor vs VS Code + Copilot (fork IA natif vs extension IA)
* Cursor vs GitHub Copilot (éditeur complet vs assistant de complétion)
* Cursor vs ChatGPT (IDE intégré vs chatbot généraliste)

---

## Explication simplifiée

Cursor c'est VS Code avec un assistant IA intégré : tu peux lui parler en langage naturel pour qu'il écrive du code, modifie des fichiers ou t'explique comment fonctionne ton projet. C'est comme avoir un développeur senior qui regarde ton écran en permanence.

---

## Explication avancée

Cursor est un fork d'Electron/VS Code qui intègre un pipeline IA dans l'éditeur. L'indexation du codebase utilise des embeddings vectoriels pour la recherche sémantique, permettant à l'IA de retrouver les fichiers pertinents lors des conversations. Les modifications inline (Cmd+K) utilisent un système de diff structuré pour appliquer les changements générés par le LLM. La complétion Tab utilise un modèle spécialisé (plus rapide que GPT-4) entraîné sur des patterns de code pour des suggestions en temps réel.

---

## Points critiques à retenir

* [CRITIQUE] Cursor est un fork de VS Code : toutes les extensions VS Code fonctionnent
* [CRITIQUE] Le code généré par IA doit toujours être vérifié et testé
* [IMPORTANT] Indexer le projet pour que l'IA ait le contexte complet
* [IMPORTANT] Attention à la confidentialité : le code est envoyé à des serveurs IA
* [PIÈGE] Ne pas remplacer la compréhension du code par la confiance aveugle en l'IA
