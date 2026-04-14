---
id: neovim
label: Neovim
category: logiciel
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:19.476Z'
updatedAt: '2026-04-14T17:59:19.476Z'
relations:
  - targetId: vscode
    type: related
    description: Alternative minimaliste et terminale à VS Code
resources:
  - type: documentation
    title: Documentation officielle Neovim
    url: 'https://neovim.io/doc/'
  - type: vidéo
    title: ThePrimeagen – Neovim RC From Scratch
    url: 'https://www.youtube.com/watch?v=w7i4amO_zaE'
  - type: blog
    title: Neovim GitHub Repository
    url: 'https://github.com/neovim/neovim'
  - type: cours
    title: Kickstart.nvim – Configuration de départ
    url: 'https://github.com/nvim-lua/kickstart.nvim'
  - type: autre
    title: Awesome Neovim – Liste de plugins
    url: 'https://github.com/rockerBOO/awesome-neovim'
---

## Résumé rapide

Neovim est un éditeur de texte modal en terminal, fork modernisé de Vim. Entièrement configurable en Lua, il offre une édition ultra-rapide grâce à ses raccourcis clavier et ses modes, un support LSP natif et un écosystème de plugins riche pour rivaliser avec les IDE modernes.

---

## Définition

Neovim est un éditeur de texte hyperextensible basé sur Vim, conçu pour moderniser l'expérience Vim avec une API asynchrone, un support Lua natif pour la configuration et les plugins, un client terminal intégré et un support natif du Language Server Protocol (LSP).

---

## Histoire

* Vim créé en 1991 par Bram Moolenaar, lui-même basé sur vi (1976)
* Neovim forké de Vim en 2014 par Thiago de Arruda pour moderniser le code
* Réécriture des internals : API asynchrone, support Lua, architecture client-serveur
* Support LSP natif ajouté dans la version 0.5 (2021)
* Communauté très active avec des plugins modernes (Telescope, Treesitter, lazy.nvim)

---

## Objectif

* Moderniser Vim tout en préservant sa philosophie d'édition modale
* Fournir une API propre et asynchrone pour les plugins
* Supporter les fonctionnalités IDE modernes (LSP, Treesitter) nativement
* Offrir l'éditeur le plus rapide et léger possible

---

## Domaines d'utilisation

* Développement logiciel (tous langages via LSP)
* Administration système et DevOps (édition sur serveurs distants via SSH)
* Édition de fichiers de configuration et scripts
* Développement pour les utilisateurs recherchant la performance maximale

---

## Fonctionnement

* **Édition modale** : Normal (navigation), Insert (écriture), Visual (sélection), Command
* **Configuration en Lua** via `init.lua` (remplace le Vimscript)
* **LSP natif** pour l'autocomplétion, le diagnostic et la navigation
* **Treesitter** pour la coloration syntaxique basée sur l'arbre syntaxique (plus précise)
* **Plugins** gérés par des gestionnaires comme lazy.nvim

---

## Concepts clés

* **Modes** — Normal, Insert, Visual, Command (édition modale)
* **Motions** — Déplacements composables (w, b, f, /, gg, G)
* **LSP (Language Server Protocol)** — Autocomplétion et diagnostic intégrés
* **Treesitter** — Analyse syntaxique pour coloration et manipulation de code
* **Telescope** — Plugin de recherche floue (fichiers, grep, symboles)
* **lazy.nvim** — Gestionnaire de plugins moderne avec chargement paresseux

---

## Exemple

```lua
-- init.lua — Configuration de base
vim.g.mapleader = " "
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.tabstop = 4
vim.opt.shiftwidth = 4
vim.opt.expandtab = true

-- Raccourci pour Telescope
vim.keymap.set('n', '<leader>ff', ':Telescope find_files<CR>')
vim.keymap.set('n', '<leader>fg', ':Telescope live_grep<CR>')

-- Configuration LSP basique
local lspconfig = require('lspconfig')
lspconfig.pyright.setup{}
lspconfig.ts_ls.setup{}
```

---

## Avantages

* Extrêmement rapide et léger (fonctionne en terminal, même sur SSH)
* Édition modale ultra-efficace une fois maîtrisée
* Entièrement configurable et personnalisable en Lua
* Support LSP natif rivalisant avec les IDE
* Fonctionne partout (terminal, SSH, conteneurs)

---

## Inconvénients

* Courbe d'apprentissage très raide (édition modale)
* Configuration initiale longue pour atteindre le niveau d'un IDE
* Écosystème de plugins qui évolue très vite (configurations qui cassent)
* Pas d'interface graphique native (pas de drag & drop, pas de WYSIWYG)

---

## Pièges courants

* Passer plus de temps à configurer Neovim qu'à coder (le piège classique)
* Copier une configuration complète sans la comprendre
* Ne pas apprendre les motions Vim de base avant d'ajouter des plugins
* Installer trop de plugins qui ralentissent le démarrage

---

## À ne pas confondre

* Neovim vs Vim (fork modernisé vs original)
* Neovim vs VS Code (éditeur terminal vs éditeur graphique Electron)
* Neovim vs Emacs (deux philosophies d'éditeur extensible)
* Mode Normal vs Mode Insert (navigation vs écriture)

---

## Explication simplifiée

Neovim c'est un éditeur de texte qui fonctionne entièrement au clavier, sans souris. Au lieu de cliquer et taper, tu utilises des commandes courtes (comme `dd` pour supprimer une ligne, `ciw` pour changer un mot). C'est difficile au début, mais une fois maîtrisé, tu édites du code beaucoup plus vite qu'avec un éditeur classique.

---

## Explication avancée

Neovim utilise une architecture client-serveur où le cœur (le serveur) expose une API MessagePack-RPC, permettant à n'importe quel client (terminal, GUI, IDE) de s'y connecter. Le moteur de rendu est découplé du cœur, ce qui permet des interfaces alternatives. Treesitter fournit un arbre syntaxique incrémental (mis à jour à chaque frappe) utilisé pour la coloration, l'indentation et la sélection structurelle. Le client LSP natif communique avec les serveurs de langage via le protocole JSON-RPC, offrant les mêmes fonctionnalités que VS Code sans Electron.

---

## Points critiques à retenir

* [CRITIQUE] L'édition modale est le fondement : maîtriser les modes avant tout
* [CRITIQUE] init.lua est le point d'entrée de toute la configuration
* [IMPORTANT] LSP natif + Treesitter = fonctionnalités IDE dans le terminal
* [IMPORTANT] Commencer avec kickstart.nvim plutôt qu'une config vide ou trop complexe
* [PIÈGE] Le piège de la configuration infinie : configurer doit rester un moyen, pas une fin
* [PIÈGE] Les plugins évoluent vite, les tutoriels deviennent obsolètes rapidement
