---
id: sqlmap
label: SQLMap
category: logiciel
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:07.330Z'
updatedAt: '2026-04-14T18:00:07.330Z'
relations:
  - target: sql
    type: uses
    weight: 0.9
  - target: pentesting
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: SQLMap – Documentation officielle
    url: 'https://sqlmap.org/'
  - type: documentation
    title: SQLMap Wiki – Usage
    url: 'https://github.com/sqlmapproject/sqlmap/wiki/Usage'
  - type: vidéo
    title: HackerSploit – SQLMap Tutorial
    url: 'https://www.youtube.com/watch?v=nVj8MUKkzQk'
  - type: blog
    title: OWASP – SQL Injection
    url: 'https://owasp.org/www-community/attacks/SQL_Injection'
  - type: cours
    title: TryHackMe – SQL Injection
    url: 'https://tryhackme.com/room/sqlinjectionlm'
---

## Résumé rapide

SQLMap est un outil open source en ligne de commande qui automatise la détection et l'exploitation des vulnérabilités d'injection SQL. Il supporte tous les SGBD majeurs (MySQL, PostgreSQL, Oracle, MSSQL, SQLite) et peut extraire des données, accéder au système de fichiers et exécuter des commandes sur le serveur.

---

## Définition

SQLMap est un outil de pentesting écrit en Python qui automatise le processus de détection et d'exploitation des injections SQL. Il teste automatiquement différentes techniques d'injection (boolean-based, time-based, error-based, UNION, stacked queries) et peut extraire la structure complète de la base de données, les données, les mots de passe et même obtenir un accès shell sur le serveur dans certaines conditions.

---

## Histoire

* Créé en 2006 par Daniele Bellucci
* Maintenu depuis 2007 par Bernardo Damele et Miroslav Stampar
* Écrit entièrement en Python
* Devenu l'outil de référence pour l'exploitation des injections SQL
* Inclus par défaut dans Kali Linux
* Toujours activement développé et mis à jour

---

## Objectif

* Automatiser la détection des injections SQL
* Exploiter les vulnérabilités SQLi pour extraire des données
* Tester la robustesse des applications face aux injections SQL
* Cartographier la structure des bases de données
* Démontrer l'impact réel d'une injection SQL lors d'un audit

---

## Domaines d'utilisation

* Tests d'intrusion d'applications web
* Audit de sécurité des bases de données
* Bug bounty
* Validation des correctifs d'injection SQL
* Formation en cybersécurité

---

## Fonctionnement

* SQLMap analyse une **URL ou une requête HTTP** contenant des paramètres
* Il teste chaque paramètre avec différentes **techniques d'injection**
* Quand une injection est trouvée, il détermine le **type de SGBD**
* Il peut ensuite **énumérer** les bases, tables, colonnes et extraire les données
* En fonction des privilèges, il peut lire des fichiers ou exécuter des commandes

```
  ┌─────────┐   Requête avec    ┌──────────────┐    SQL modifié    ┌──────┐
  │ SQLMap  │   payload SQLi    │ Application  │────────────────▶│  BDD │
  │         │──────────────────▶│    Web        │◀────────────────│      │
  └─────────┘                   └──────────────┘    Données       └──────┘
       │                              │
       │◀─────────────────────────────┘
       │      Réponse analysée
       ▼
  Extraction des données
```

---

## Concepts clés

* **Boolean-based blind** — Déduit les données via des réponses vrai/faux
* **Time-based blind** — Déduit les données via des délais de réponse
* **Error-based** — Extrait les données via les messages d'erreur SQL
* **UNION-based** — Ajoute une requête UNION pour extraire les données directement
* **Stacked queries** — Exécute plusieurs requêtes séparées par `;`
* **Tamper scripts** — Scripts pour contourner les WAF et les filtres
* **Enumeration** — Extraction systématique de la structure de la base

---

## Exemple

```bash
# Test basique sur une URL avec paramètre
sqlmap -u "http://target.com/page?id=1"

# Test avec une requête POST
sqlmap -u "http://target.com/login" --data="user=admin&pass=test"

# Lister les bases de données
sqlmap -u "http://target.com/page?id=1" --dbs

# Lister les tables d'une base
sqlmap -u "http://target.com/page?id=1" -D database_name --tables

# Extraire les données d'une table
sqlmap -u "http://target.com/page?id=1" -D database_name -T users --dump

# Extraire les colonnes spécifiques
sqlmap -u "http://target.com/page?id=1" -D database_name -T users -C username,password --dump

# Utiliser une requête interceptée par Burp Suite
sqlmap -r requete_burp.txt

# Contourner un WAF avec des tamper scripts
sqlmap -u "http://target.com/page?id=1" --tamper=space2comment,randomcase

# Obtenir un shell OS (si les privilèges le permettent)
sqlmap -u "http://target.com/page?id=1" --os-shell

# Augmenter le niveau de tests
sqlmap -u "http://target.com/page?id=1" --level=5 --risk=3

# Spécifier le SGBD pour accélérer les tests
sqlmap -u "http://target.com/page?id=1" --dbms=mysql
```

---

## Avantages

* Automatise complètement l'exploitation des injections SQL
* Supporte tous les SGBD majeurs
* Tamper scripts pour contourner les protections (WAF)
* Peut extraire les données, lire des fichiers et obtenir un shell
* Gratuit, open source et régulièrement mis à jour

---

## Inconvénients

* Génère beaucoup de trafic (facilement détecté par les WAF/IDS)
* Peut être lent en mode blind (boolean/time-based)
* Peut endommager les données si utilisé incorrectement (--risk=3)
* Ne détecte pas les injections SQL de second ordre
* Nécessite une compréhension du SQL pour interpréter les résultats

---

## Pièges courants

* Utiliser SQLMap sans comprendre ce qu'est une injection SQL
* Lancer `--os-shell` sur un système de production (dangereux)
* Utiliser `--risk=3` sans comprendre que cela peut modifier/supprimer des données
* Ne pas sauvegarder la session pour reprendre un scan interrompu
* Oublier d'utiliser `--tamper` quand un WAF est en place

---

## À ne pas confondre

* SQLMap vs Havij (SQLMap est CLI et open source, Havij est GUI et abandonné)
* Injection SQL vs XSS (injection dans la BDD vs injection dans le navigateur)
* Boolean-based vs Time-based (réponse différente vs délai de réponse)
* SQLMap vs requête SQL manuelle (automatisation vs compréhension fine)

---

## Explication simplifiée

SQLMap, c'est comme un robot cambrioleur spécialisé dans les coffres-forts (bases de données). Tu lui montres une porte potentiellement mal fermée (un paramètre d'URL), et il essaie automatiquement toutes les techniques connues pour l'ouvrir. S'il y arrive, il peut te montrer tout ce qu'il y a dans le coffre.

---

## Explication avancée

SQLMap utilise un moteur d'inférence sophistiqué pour les injections blind : en boolean-based, il effectue une recherche dichotomique sur les caractères ASCII des données extraites ; en time-based, il utilise des fonctions de délai spécifiques au SGBD (SLEEP pour MySQL, WAITFOR DELAY pour MSSQL, pg_sleep pour PostgreSQL). Le système de tamper scripts permet de transformer les payloads pour contourner les filtres (encodage, commentaires, alternance de casse). SQLMap maintient un cache de session (fichiers .sqlite) pour reprendre les scans et éviter les requêtes redondantes. Pour l'accès OS, il utilise les fonctionnalités natives des SGBD (xp_cmdshell pour MSSQL, sys_exec pour MySQL avec UDF, COPY TO pour PostgreSQL).

---

## Points critiques à retenir

* [CRITIQUE] SQLMap ne doit être utilisé que sur des systèmes autorisés
* [CRITIQUE] `--risk=3` peut modifier ou supprimer des données — attention en production
* [IMPORTANT] Utiliser `-r` avec des requêtes Burp pour plus de précision
* [IMPORTANT] Les tamper scripts sont essentiels pour contourner les WAF
* [PIÈGE] SQLMap ne remplace pas la compréhension des injections SQL
* [PIÈGE] Un scan automatisé génère beaucoup de bruit — facilement détectable
