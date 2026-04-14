---
id: sql
label: SQL
category: langage
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:04.876Z'
updatedAt: '2026-04-14T18:00:04.876Z'
relations: []
resources:
  - type: documentation
    title: W3Schools – SQL Tutorial
    url: 'https://www.w3schools.com/sql/'
  - type: documentation
    title: PostgreSQL – SQL Syntax
    url: 'https://www.postgresql.org/docs/current/sql.html'
  - type: vidéo
    title: freeCodeCamp – SQL Full Course
    url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY'
  - type: vidéo
    title: Fireship – SQL in 100 Seconds
    url: 'https://www.youtube.com/watch?v=zsjvFFKOm3c'
  - type: blog
    title: SQL Tutorial – Mode Analytics
    url: 'https://mode.com/sql-tutorial/'
  - type: cours
    title: Khan Academy – SQL
    url: 'https://www.khanacademy.org/computing/computer-programming/sql'
  - type: livre
    title: Learning SQL – Alan Beaulieu
    url: 'https://www.amazon.com/dp/1492057614'
  - type: autre
    title: SQLZoo – Exercices interactifs
    url: 'https://sqlzoo.net/'
  - type: autre
    title: LeetCode – SQL Problems
    url: 'https://leetcode.com/problemset/database/'
---

## Résumé rapide

SQL (Structured Query Language) est le langage standard pour interroger et manipuler des bases de données relationnelles. Utilisé partout où il y a des données structurées, il est indispensable pour tout développeur backend.

---

## Définition

SQL est un langage déclaratif permettant de créer, lire, modifier et supprimer des données dans une base de données relationnelle. On décrit ce qu'on veut obtenir, pas comment l'obtenir.

---

## Histoire

* Conçu dans les années 1970 chez IBM (projet System R)
* Standardisé par l'ANSI en 1986, puis ISO
* Évolutions : SQL-92, SQL:1999 (récursion), SQL:2003 (XML), SQL:2016 (JSON)
* Chaque SGBD ajoute ses extensions propres (PL/pgSQL, T-SQL, PL/SQL)
* Toujours le standard incontournable malgré l'essor du NoSQL

---

## Objectif

* Interroger des données structurées (SELECT)
* Insérer, modifier, supprimer des données (INSERT, UPDATE, DELETE)
* Définir la structure de la base (CREATE TABLE, ALTER)
* Contrôler les accès (GRANT, REVOKE)

---

## Domaines d'utilisation

* Applications web (backend → BDD)
* Business Intelligence et reporting
* Data engineering et ETL
* Administration de bases de données
* Analyse de données

---

## Fonctionnement

* Le client envoie une **requête SQL** au serveur de base de données
* Le **query planner** optimise le plan d'exécution
* Le moteur exécute le plan et retourne les résultats
* Les résultats sont renvoyés sous forme de **lignes** (tuples)

---

## Concepts clés

* **Table** — Collection de lignes avec des colonnes typées
* **Clé primaire** — Identifiant unique de chaque ligne
* **Clé étrangère** — Référence vers une autre table (relation)
* **JOIN** — Combinaison de données de plusieurs tables
* **Index** — Structure d'accélération des recherches
* **Transaction** — Groupe d'opérations atomiques (ACID)

---

## Exemple

```sql
-- Sélection avec jointure
SELECT u.name, o.total
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.total > 100
ORDER BY o.total DESC
LIMIT 10;

-- Insertion
INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example.com');

-- Mise à jour
UPDATE users SET email = 'new@example.com' WHERE id = 42;

-- Suppression
DELETE FROM users WHERE id = 42;
```

---

## Structure / Architecture

* **DDL** (Data Definition Language) — CREATE, ALTER, DROP
* **DML** (Data Manipulation Language) — SELECT, INSERT, UPDATE, DELETE
* **DCL** (Data Control Language) — GRANT, REVOKE
* **TCL** (Transaction Control) — COMMIT, ROLLBACK, SAVEPOINT

---

## Syntaxe et spécificités

* Langage déclaratif (pas impératif)
* Insensible à la casse (convention : mots-clés en MAJUSCULES)
* NULL ≠ 0 ≠ '' (logique à trois valeurs)
* Agrégations : COUNT, SUM, AVG, MIN, MAX + GROUP BY
* Sous-requêtes et CTEs (WITH)

---

## Avantages

* Standard universel (tous les SGBD le supportent)
* Puissant pour les requêtes complexes (jointures, agrégations)
* Déclaratif = lisible et maintenable
* Optimisation automatique par le query planner
* Compétence très demandée

---

## Inconvénients

* Pas adapté aux données non-structurées
* Peu intuitif pour les opérations hiérarchiques / graphes
* Chaque SGBD a ses spécificités (portabilité limitée)
* Peut devenir complexe pour les requêtes avancées

---

## Pièges courants

* Oublier les index → requêtes extrêmement lentes
* SELECT * en production (récupérer plus de colonnes que nécessaire)
* Injection SQL (toujours utiliser des requêtes paramétrées)
* Confondre NULL avec une valeur vide
* Ne pas utiliser de transactions pour les opérations liées

---

## À ne pas confondre

* SQL vs NoSQL (relationnel vs document/clé-valeur/graphe)
* WHERE vs HAVING (filtrer les lignes vs filtrer les groupes)
* INNER JOIN vs LEFT JOIN (intersection vs tout à gauche + matchs)
* DELETE vs TRUNCATE (ligne par ligne vs vider la table entière)

---

## Explication simplifiée

SQL c'est comme poser des questions à ta base de données : "Donne-moi tous les clients qui ont acheté plus de 100€ ce mois-ci". La base de données se débrouille pour trouver la réponse.

---

## Explication avancée

SQL est un langage déclaratif basé sur l'algèbre relationnelle et le calcul relationnel. Le query planner du SGBD transforme la requête déclarative en plan d'exécution physique (scans, hash joins, nested loops) en estimant le coût de chaque stratégie via les statistiques des tables. L'optimisation se fait à la compilation de la requête, pas à l'exécution.

---

## Points critiques à retenir

* [CRITIQUE] SQL est LE langage pour les bases relationnelles
* [CRITIQUE] Les jointures (JOIN) sont fondamentales pour croiser les données
* [IMPORTANT] Toujours indexer les colonnes fréquemment recherchées
* [IMPORTANT] Utiliser des transactions pour les opérations liées
* [PIÈGE] Injection SQL → toujours des requêtes paramétrées
* [PIÈGE] NULL a un comportement spécial (NULL = NULL → NULL, pas TRUE)
