---
id: linux
label: Linux
category: os
priority: medium
status: to_review
createdAt: 2025-01-09T11:00:00Z
updatedAt: 2025-01-09T11:00:00Z
relations:
  - target: tcpip
    type: uses
    weight: 0.5
resources:
  - type: documentation
    title: Pages de manuel Linux
    url: https://man7.org/linux/man-pages/
---

## Qu'est-ce que Linux ?

Linux est un noyau de système d'exploitation libre et open-source, de type Unix, créé par Linus Torvalds en 1991. Il propulse serveurs, conteneurs, appareils mobiles et bien plus.

## Concepts clés

- **Noyau** : Cœur du système, gère les ressources matérielles
- **Shell** : Interface en ligne de commande (bash, zsh, sh)
- **Système de fichiers** : Tout est fichier — `/proc`, `/dev`, `/etc`
- **Permissions** : Modèle lecture-écriture-exécution pour utilisateur/groupe/autres

## Commandes essentielles

- `ls -la` — lister les fichiers avec permissions
- `chmod 755 script.sh` — modifier les permissions d'un fichier
- `grep -r "motif" .` — recherche récursive
- `systemctl status nginx` — vérifier l'état d'un service
- `ps aux | grep processus` — trouver les processus en cours

## Pourquoi apprendre Linux ?

Presque tous les serveurs de production tournent sous Linux. Requis pour Docker, Kubernetes et les plateformes cloud.
