---
id: vscode
label: VS Code
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:21.804Z'
updatedAt: '2026-04-14T18:00:21.804Z'
relations:
  - targetId: javascript
    type: supports
    description: Éditeur avec support natif de JavaScript/TypeScript
  - targetId: copilot
    type: integrates
    description: Extension phare d'assistance IA pour VS Code
resources:
  - type: documentation
    title: Documentation officielle VS Code
    url: 'https://code.visualstudio.com/docs'
  - type: vidéo
    title: Fireship – VS Code in 100 Seconds
    url: 'https://www.youtube.com/watch?v=KMxo3T_MTvY'
  - type: blog
    title: VS Code Tips & Tricks
    url: 'https://code.visualstudio.com/docs/getstarted/tips-and-tricks'
  - type: cours
    title: freeCodeCamp – Visual Studio Code Tutorial
    url: 'https://www.youtube.com/watch?v=WPqXP_kLzpo'
  - type: autre
    title: VS Code Marketplace
    url: 'https://marketplace.visualstudio.com/vscode'
---

## Résumé rapide

VS Code (Visual Studio Code) est un éditeur de code gratuit et open source développé par Microsoft. Léger, rapide et extensible grâce à ses milliers d'extensions, il est devenu l'éditeur le plus populaire au monde auprès des développeurs.

---

## Définition

Visual Studio Code est un éditeur de code source multiplateforme (Windows, macOS, Linux) basé sur le framework Electron. Il offre la coloration syntaxique, l'IntelliSense, le débogage intégré, le contrôle de version Git et un écosystème d'extensions couvrant tous les langages et outils modernes.

---

## Histoire

* Annoncé par Microsoft lors de la Build Conference en avril 2015
* Basé sur le projet Monaco Editor (éditeur web de Microsoft)
* Construit sur Electron (Chromium + Node.js)
* Open source depuis novembre 2015 (licence MIT pour le code source)
* Devenu l'éditeur n°1 mondial selon le Stack Overflow Developer Survey depuis 2018

---

## Objectif

* Fournir un éditeur léger mais puissant, entre le simple éditeur de texte et l'IDE complet
* Supporter tous les langages via des extensions
* Intégrer nativement Git et le terminal
* Offrir une expérience de développement moderne et personnalisable

---

## Domaines d'utilisation

* Développement web (JavaScript, TypeScript, HTML, CSS)
* Développement backend (Python, Java, Go, Rust, C#)
* DevOps et Infrastructure as Code (Docker, Kubernetes, Terraform)
* Data science (Jupyter Notebooks intégrés)

---

## Fonctionnement

* Basé sur **Electron** : moteur Chromium pour le rendu, Node.js pour le backend
* **Extensions** chargées dans des processus séparés (Extension Host) pour ne pas bloquer l'UI
* **Language Server Protocol (LSP)** : protocole standardisé pour l'autocomplétion, le diagnostic et la navigation dans le code
* **Debug Adapter Protocol (DAP)** : protocole standardisé pour le débogage
* Paramètres stockés en JSON, synchronisables via un compte Microsoft/GitHub

---

## Concepts clés

* **Workspace** — Espace de travail regroupant un ou plusieurs dossiers
* **Extension** — Module ajoutant des fonctionnalités (langages, thèmes, outils)
* **IntelliSense** — Autocomplétion intelligente basée sur le LSP
* **Command Palette** — Barre de commandes accessible via Ctrl+Shift+P
* **Integrated Terminal** — Terminal intégré dans l'éditeur
* **Settings Sync** — Synchronisation des paramètres entre machines

---

## Exemple

```jsonc
// settings.json — Configuration typique
{
  "editor.fontSize": 14,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.minimap.enabled": false,
  "workbench.colorTheme": "One Dark Pro",
  "terminal.integrated.defaultProfile.windows": "Git Bash",
  "files.autoSave": "afterDelay"
}
```

```jsonc
// Raccourcis clavier essentiels
// Ctrl+P          → Recherche rapide de fichier
// Ctrl+Shift+P    → Command Palette
// Ctrl+`          → Ouvrir/fermer le terminal
// Ctrl+B          → Ouvrir/fermer la barre latérale
// Ctrl+D          → Sélection multiple du mot courant
// Alt+↑/↓         → Déplacer une ligne
```

---

## Avantages

* Gratuit et open source
* Extrêmement léger comparé aux IDE complets (IntelliJ, Visual Studio)
* Écosystème d'extensions gigantesque (+50 000 extensions)
* Mise à jour mensuelle avec de nouvelles fonctionnalités
* Support natif de Git, terminal intégré et débogage

---

## Inconvénients

* Basé sur Electron (consommation mémoire plus élevée qu'un éditeur natif)
* Pas un IDE complet : refactoring avancé limité sans extensions
* La qualité des extensions est variable
* Peut devenir lent avec trop d'extensions installées

---

## Pièges courants

* Installer trop d'extensions qui se chevauchent (plusieurs formatters, plusieurs linters)
* Ne pas configurer le formatter par défaut par langage → formatage incohérent
* Confondre les paramètres utilisateur et les paramètres workspace
* Ignorer le fichier `.vscode/settings.json` dans le `.gitignore` alors qu'il contient des configurations utiles pour l'équipe

---

## À ne pas confondre

* VS Code vs Visual Studio (éditeur léger vs IDE complet de Microsoft)
* VS Code vs VS Code Insiders (version stable vs version preview)
* VS Code (open source) vs la distribution Microsoft (qui inclut de la télémétrie)
* VS Code vs Cursor (Cursor est un fork de VS Code orienté IA)

---

## Explication simplifiée

VS Code c'est comme un couteau suisse pour le développement : un éditeur de texte de base auquel tu ajoutes exactement les outils dont tu as besoin grâce aux extensions. Il comprend ton code, te propose des suggestions et te permet de tout faire sans quitter la fenêtre.

---

## Explication avancée

VS Code repose sur une architecture modulaire basée sur Electron. Le cœur de l'éditeur (Monaco Editor) gère le rendu et l'édition de texte. Les extensions s'exécutent dans un processus isolé (Extension Host) communiquant via un protocole RPC. Le Language Server Protocol (LSP) permet de déléguer l'analyse du code à des serveurs de langage externes, rendant VS Code agnostique du langage. Le Debug Adapter Protocol (DAP) offre le même découplage pour le débogage. Cette architecture permet à VS Code de rester réactif tout en supportant des fonctionnalités complexes.

---

## Points critiques à retenir

* [CRITIQUE] VS Code n'est pas un IDE complet : il est extensible, pas monolithique
* [CRITIQUE] Le Language Server Protocol (LSP) est la clé de son support multilangage
* [IMPORTANT] Configurer `settings.json` par workspace pour les projets d'équipe
* [IMPORTANT] Les extensions s'exécutent dans un processus séparé pour ne pas bloquer l'UI
* [PIÈGE] Trop d'extensions = lenteur et conflits
* [PIÈGE] Bien distinguer les paramètres User vs Workspace
