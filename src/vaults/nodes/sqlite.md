---
id: sqlite
label: SQLite
category: bdd
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:06.228Z'
updatedAt: '2026-04-14T18:00:06.228Z'
relations:
  - target: sql
    type: implements
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle SQLite
    url: 'https://www.sqlite.org/docs.html'
  - type: vidéo
    title: Fireship – SQLite in 100 Seconds
    url: 'https://www.youtube.com/watch?v=zuegQmMdy8M'
  - type: blog
    title: SQLite Tutorial
    url: 'https://www.sqlitetutorial.net/'
  - type: cours
    title: freeCodeCamp – SQLite Databases with Python
    url: 'https://www.youtube.com/watch?v=byHcYRpMgI4'
  - type: autre
    title: DB Browser for SQLite
    url: 'https://sqlitebrowser.org/'
---

## Résumé rapide

SQLite est une base de données relationnelle embarquée, sans serveur, stockée dans un seul fichier. C'est la base de données la plus déployée au monde, présente dans chaque smartphone, navigateur web et des milliards d'appareils.

---

## Définition

SQLite est une bibliothèque C qui implémente un moteur de base de données SQL complet, sans serveur, sans configuration et transactionnel (ACID). La base de données est contenue dans un seul fichier portable sur n'importe quelle plateforme.

---

## Histoire

* Créé en 2000 par D. Richard Hipp
* Initialement conçu pour la marine américaine (systèmes embarqués)
* Adopté par Android et iOS comme base de données embarquée par défaut
* Intégré dans tous les navigateurs web (Web SQL, IndexedDB backend)
* Plus de 1 trillion de bases SQLite actives dans le monde

---

## Objectif

* Fournir une base de données embarquée ne nécessitant aucun serveur
* Offrir un stockage structuré portable dans un seul fichier
* Remplacer les fichiers de configuration (XML, JSON) par du SQL
* Servir de base de données pour les applications mobiles et embarquées

---

## Domaines d'utilisation

* Applications mobiles (Android, iOS)
* Applications de bureau (Electron, Qt)
* Navigateurs web (stockage local)
* Systèmes embarqués et IoT
* Prototypage rapide et tests unitaires
* Fichiers de données portables

---

## Fonctionnement

* **Pas de serveur** : la bibliothèque est liée directement à l'application
* **Fichier unique** : toute la base de données dans un seul fichier `.db` ou `.sqlite`
* **Verrouillage au niveau du fichier** pour la concurrence (WAL mode disponible)
* **Typage dynamique** : les colonnes ne forcent pas un type strict
* **Transactions ACID** garanties même en cas de crash ou coupure de courant

---

## Concepts clés

* **Serverless** — Pas de processus serveur séparé, tout est dans la bibliothèque
* **Single-file** — Toute la base dans un fichier portable et cross-platform
* **WAL mode** — Write-Ahead Logging pour la concurrence lecture/écriture
* **Manifest typing** — Le type est associé à la valeur, pas à la colonne
* **Zero-configuration** — Aucune installation ni administration requise
* **ACID** — Transactions atomiques même en cas de crash

---

## Exemple

```sql
-- Création de base et table
-- (la base est créée automatiquement en ouvrant le fichier)

CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    contenu TEXT,
    categorie TEXT DEFAULT 'general',
    created_at TEXT DEFAULT (datetime('now'))
);

-- Insertion
INSERT INTO notes (titre, contenu, categorie)
VALUES ('Première note', 'Contenu de ma note', 'travail');

-- Requête avec FTS5 (full-text search)
CREATE VIRTUAL TABLE notes_fts USING fts5(titre, contenu);
SELECT * FROM notes_fts WHERE notes_fts MATCH 'première';
```

```python
# Utilisation en Python
import sqlite3

conn = sqlite3.connect('ma_base.db')
cursor = conn.cursor()
cursor.execute("SELECT * FROM notes WHERE categorie = ?", ('travail',))
resultats = cursor.fetchall()
conn.close()
```

---

## Avantages

* Zero-configuration : aucune installation ni administration
* Fichier unique portable (copier/coller = sauvegarde)
* Extrêmement rapide pour les lectures
* Intégré nativement dans Python, Android, iOS, les navigateurs
* Empreinte mémoire minimale (~600 Ko)
* Domaine public (pas de licence)

---

## Inconvénients

* Un seul écrivain à la fois (pas de concurrence en écriture)
* Pas adapté aux applications web multi-utilisateurs
* Pas de gestion des droits utilisateurs (pas de serveur)
* Typage dynamique peut surprendre (stocker un texte dans une colonne INT)
* Pas de réplication ni de clustering natif

---

## Pièges courants

* Utiliser SQLite pour une application web multi-utilisateurs à fort trafic
* Oublier d'activer le mode WAL pour les applications concurrentes
* Ne pas utiliser de paramètres préparés (injection SQL)
* Ignorer le typage dynamique (un INTEGER peut contenir du texte)
* Placer le fichier SQLite sur un partage réseau (corruption possible)

---

## À ne pas confondre

* SQLite vs MySQL/PostgreSQL (embarqué vs client-serveur)
* SQLite vs fichiers JSON (base relationnelle vs stockage simple)
* AUTOINCREMENT vs ROWID (AUTOINCREMENT empêche la réutilisation d'ID)
* WAL mode vs journal mode (concurrence vs compatibilité)

---

## Explication simplifiée

SQLite est une base de données qui tient dans un seul fichier. Pas besoin d'installer un serveur — tu ouvres le fichier et tu fais tes requêtes SQL directement. C'est la base de données de ton téléphone, de ton navigateur web et de millions d'applications.

---

## Explication avancée

SQLite utilise un B-tree pour le stockage des tables et des index, avec des pages de taille configurable (4 Ko par défaut). Le mode WAL (Write-Ahead Logging) sépare les écritures dans un fichier journal, permettant des lectures concurrentes pendant les écritures. Le manifest typing signifie que le type est une propriété de la valeur stockée, pas du schéma — une colonne déclarée INTEGER peut contenir du texte (type affinity). SQLite implémente un sous-ensemble du standard SQL avec des extensions comme les CTE récursives, les window functions et FTS5 pour la recherche full-text.

---

## Points critiques à retenir

* [CRITIQUE] SQLite est serverless — pas de processus serveur, tout est dans la bibliothèque
* [CRITIQUE] Un seul fichier = toute la base (portable, facile à sauvegarder)
* [IMPORTANT] Activer WAL mode pour les applications avec accès concurrent
* [IMPORTANT] Ne pas utiliser SQLite pour les applications web multi-utilisateurs à fort trafic
* [PIÈGE] Le typage dynamique peut stocker n'importe quel type dans n'importe quelle colonne
* [PIÈGE] Ne jamais placer un fichier SQLite sur un système de fichiers réseau (NFS, SMB)
