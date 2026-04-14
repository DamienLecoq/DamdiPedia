---
id: postgresql
label: PostgreSQL
category: bdd
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:39.892Z'
updatedAt: '2026-04-14T17:59:39.892Z'
relations:
  - target: sql
    type: implements
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle PostgreSQL
    url: 'https://www.postgresql.org/docs/current/'
  - type: documentation
    title: PostgreSQL Wiki
    url: 'https://wiki.postgresql.org/'
  - type: vidéo
    title: freeCodeCamp – PostgreSQL Full Course
    url: 'https://www.youtube.com/watch?v=qw--VYLpxG4'
  - type: vidéo
    title: Fireship – PostgreSQL in 100 Seconds
    url: 'https://www.youtube.com/watch?v=n2Fluyr3lbc'
  - type: blog
    title: PostgreSQL Tutorial
    url: 'https://www.postgresqltutorial.com/'
  - type: blog
    title: Crunchy Data Blog
    url: 'https://www.crunchydata.com/blog'
  - type: cours
    title: Udemy – The Complete SQL Bootcamp
    url: 'https://www.udemy.com/course/the-complete-sql-bootcamp/'
  - type: livre
    title: PostgreSQL Up & Running
    url: 'https://www.amazon.com/dp/1491963417'
  - type: autre
    title: pgAdmin – Outil d'administration
    url: 'https://www.pgadmin.org/'
  - type: autre
    title: Supabase – PostgreSQL dans le cloud
    url: 'https://supabase.com/'
---

## Résumé rapide

PostgreSQL est le système de gestion de bases de données relationnelles open source le plus avancé. Réputé pour sa conformité au standard SQL, sa fiabilité et ses fonctionnalités avancées (JSON, full-text search, extensions), il est utilisé par des entreprises de toutes tailles.

---

## Définition

PostgreSQL (souvent abrégé "Postgres") est un SGBD relationnel-objet open source qui supporte le SQL standard ainsi que des fonctionnalités avancées comme les types personnalisés, l'héritage de tables, le JSON natif et un système d'extensions puissant.

---

## Histoire

* Né en 1986 à l'Université de Californie, Berkeley (projet POSTGRES)
* Rebaptisé PostgreSQL en 1996 avec l'ajout du support SQL
* Développé par une communauté open source mondiale
* Adoption massive à partir des années 2010 (alternative à Oracle/MySQL)
* Aujourd'hui le SGBD open source le plus populaire (db-engines.com)

---

## Objectif

* Fournir un SGBD relationnel fiable et conforme au standard SQL
* Supporter des fonctionnalités avancées (JSON, géospatial, full-text)
* Garantir l'intégrité des données (ACID complet)
* Offrir une extensibilité maximale (types, fonctions, index custom)

---

## Domaines d'utilisation

* Applications web et backend (Rails, Django, Spring Boot)
* Data warehousing et analytics
* Applications géospatiales (PostGIS)
* Stockage de données JSON semi-structurées
* Systèmes financiers et critiques (conformité ACID)

---

## Fonctionnement

* Modèle **client-serveur** : les clients se connectent via TCP/IP
* Stockage basé sur des **pages** de 8 Ko
* MVCC (Multi-Version Concurrency Control) pour la concurrence
* **WAL** (Write-Ahead Log) pour la durabilité des données
* **Query planner** optimise automatiquement les requêtes

---

## Concepts clés

* **ACID** — Atomicité, Cohérence, Isolation, Durabilité (garanti)
* **MVCC** — Chaque transaction voit un snapshot cohérent des données
* **Index** — B-tree (défaut), Hash, GIN (full-text), GiST (géospatial)
* **Extensions** — Modules ajoutant des fonctionnalités (PostGIS, pg_trgm, uuid-ossp)
* **JSONB** — Stockage JSON binaire avec requêtes et index
* **Replication** — Streaming replication pour la haute disponibilité

---

## Exemple

```sql
-- Création de table avec contraintes
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Requête avec JSONB
SELECT name, metadata->>'role' AS role
FROM users
WHERE metadata @> '{"active": true}';

-- Full-text search
SELECT * FROM articles
WHERE to_tsvector('french', content) @@ to_tsquery('french', 'postgresql & performance');
```

---

## Structure / Architecture

* **Cluster** — Instance PostgreSQL (un ou plusieurs databases)
* **Database** — Contient des schemas
* **Schema** — Namespace logique (par défaut : `public`)
* **Table** — Collection de lignes et colonnes
* **Index** — Structure d'accélération des requêtes

---

## Outils et administration

* `psql` — Client CLI interactif
* pgAdmin — Interface graphique d'administration
* `pg_dump` / `pg_restore` — Sauvegarde et restauration
* `EXPLAIN ANALYZE` — Analyse du plan d'exécution des requêtes
* `pg_stat_statements` — Monitoring des requêtes lentes

---

## Avantages

* Open source et gratuit
* Conformité SQL la plus élevée de tous les SGBD
* JSONB natif (relationnel + document store)
* Extensible (PostGIS, full-text, types custom)
* Fiabilité éprouvée (ACID, WAL, replication)
* Communauté active et documentation excellente

---

## Inconvénients

* Plus complexe à administrer que MySQL/SQLite
* VACUUM nécessaire pour récupérer l'espace (MVCC)
* Performances en écriture intensive inférieures à certains NoSQL
* Pas de clustering natif (solutions tierces : Citus, Patroni)

---

## Pièges courants

* Oublier de créer des index sur les colonnes fréquemment filtrées
* Ignorer VACUUM / autovacuum → table bloat
* Ne pas utiliser `EXPLAIN ANALYZE` pour diagnostiquer les requêtes lentes
* Connexions non limitées → épuisement des ressources (utiliser pgBouncer)
* Stocker des gros fichiers dans la base au lieu du filesystem

---

## À ne pas confondre

* PostgreSQL vs MySQL (complet/standard vs simple/rapide)
* PostgreSQL vs MongoDB (relationnel+JSON vs document pur)
* JSON vs JSONB (texte vs binaire indexable)
* Schema vs Database (namespace vs container isolé)

---

## Explication simplifiée

PostgreSQL est une base de données puissante et gratuite. Tu stockes tes données dans des tables avec des colonnes, et tu les interroges avec SQL. Elle est très fiable et utilisée par des millions d'applications dans le monde.

---

## Explication avancée

PostgreSQL implémente MVCC (Multi-Version Concurrency Control) via des tuple versions : chaque UPDATE crée une nouvelle version de la ligne, les anciennes étant nettoyées par VACUUM. Le WAL (Write-Ahead Log) garantit la durabilité en écrivant les modifications sur disque avant de les appliquer. Le query planner utilise des statistiques (pg_statistic) et un optimiseur basé sur le coût pour choisir entre sequential scan, index scan, bitmap scan, hash join, merge join, etc.

---

## Points critiques à retenir

* [CRITIQUE] PostgreSQL est ACID et supporte MVCC pour la concurrence
* [CRITIQUE] JSONB permet d'avoir un document store dans un SGBD relationnel
* [IMPORTANT] `EXPLAIN ANALYZE` est essentiel pour optimiser les requêtes
* [IMPORTANT] Les extensions (PostGIS, pg_trgm) sont un atout majeur
* [PIÈGE] Autovacuum mal configuré → dégradation progressive des performances
* [PIÈGE] Pas d'index = requêtes lentes sur les grandes tables
