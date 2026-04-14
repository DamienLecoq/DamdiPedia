---
id: mysql
label: MySQL
category: bdd
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:17.410Z'
updatedAt: '2026-04-14T17:59:17.410Z'
relations:
  - target: sql
    type: implements
    weight: 0.9
  - target: mariadb
    type: related
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle MySQL
    url: 'https://dev.mysql.com/doc/'
  - type: vidéo
    title: freeCodeCamp – MySQL Full Course
    url: 'https://www.youtube.com/watch?v=ER8oKX5myE0'
  - type: blog
    title: MySQL Tutorial
    url: 'https://www.mysqltutorial.org/'
  - type: cours
    title: Udemy – The Ultimate MySQL Bootcamp
    url: >-
      https://www.udemy.com/course/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/
  - type: autre
    title: MySQL Workbench – Outil d'administration
    url: 'https://www.mysql.com/products/workbench/'
---

## Résumé rapide

MySQL est le système de gestion de bases de données relationnelles open source le plus répandu au monde. Acquis par Oracle en 2010, il est au coeur de la pile LAMP et alimente des millions de sites web et d'applications.

---

## Définition

MySQL est un SGBD relationnel open source qui utilise le langage SQL pour gérer et interroger des données structurées en tables. Il se distingue par sa simplicité d'installation, ses performances en lecture et sa large adoption dans l'écosystème web.

---

## Histoire

* Créé en 1995 par Michael Widenius et David Axmark (MySQL AB, Suède)
* Acquis par Sun Microsystems en 2008, puis par Oracle en 2010
* Le fork MariaDB est né en réponse au rachat par Oracle
* Reste le SGBD open source le plus utilisé dans le web
* Les versions 8.x apportent des fonctionnalités modernes (CTE, Window Functions, JSON)

---

## Objectif

* Fournir un SGBD relationnel rapide et facile à déployer
* Supporter les applications web à fort trafic en lecture
* Offrir une compatibilité SQL standard avec des extensions propriétaires
* Permettre la réplication et le clustering pour la haute disponibilité

---

## Domaines d'utilisation

* Applications web (WordPress, Drupal, Joomla)
* Pile LAMP/LEMP (Linux, Apache/Nginx, MySQL, PHP)
* E-commerce (Magento, PrestaShop)
* SaaS et applications multi-tenant
* Systèmes embarqués et IoT (MySQL léger)

---

## Fonctionnement

* Modèle **client-serveur** : les clients se connectent via TCP/IP ou socket Unix
* Architecture basée sur des **moteurs de stockage** interchangeables (InnoDB, MyISAM)
* **InnoDB** (défaut) : support ACID, verrous au niveau des lignes, clés étrangères
* **Buffer Pool** : cache en mémoire pour les données et index InnoDB
* **Binary Log** : journal des modifications pour la réplication et la récupération

---

## Concepts clés

* **InnoDB** — Moteur de stockage par défaut, transactionnel et ACID
* **Réplication** — Master-slave ou Group Replication pour la haute disponibilité
* **Index** — B-tree (défaut), Full-text, Spatial
* **ACID** — Garanti avec InnoDB (pas avec MyISAM)
* **Prepared Statements** — Protection contre les injections SQL et optimisation
* **Partitionnement** — Division des grandes tables pour améliorer les performances

---

## Exemple

```sql
-- Création de table avec InnoDB
CREATE TABLE produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    prix DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Insertion de données
INSERT INTO produits (nom, prix, stock) VALUES
('Clavier mécanique', 89.99, 150),
('Souris ergonomique', 49.99, 300);

-- Requête avec jointure
SELECT c.nom AS client, p.nom AS produit, co.quantite
FROM commandes co
JOIN clients c ON co.client_id = c.id
JOIN produits p ON co.produit_id = p.id
WHERE co.date_commande >= '2025-01-01';
```

---

## Avantages

* Très facile à installer et à configurer
* Performances excellentes en lecture
* Écosystème massif (outils, hébergeurs, documentation)
* Réplication native (master-slave, group replication)
* Support JSON natif depuis MySQL 5.7
* Large communauté et support commercial (Oracle)

---

## Inconvénients

* Conformité SQL moins stricte que PostgreSQL
* Propriété d'Oracle suscite des inquiétudes sur le futur open source
* MyISAM (ancien défaut) ne supporte pas les transactions
* Fonctionnalités avancées moins riches que PostgreSQL (pas de types custom, extensions limitées)
* Full-text search moins puissant que des solutions dédiées

---

## Pièges courants

* Utiliser MyISAM au lieu d'InnoDB (perte des transactions et clés étrangères)
* Ne pas configurer le `innodb_buffer_pool_size` (doit être ~70-80% de la RAM)
* Oublier les index sur les colonnes de jointure et de filtrage
* Mode SQL trop permissif par défaut (activer `STRICT_TRANS_TABLES`)
* Ne pas utiliser de prepared statements (risque d'injection SQL)

---

## À ne pas confondre

* MySQL vs MariaDB (même origine, forks divergents depuis 2010)
* MySQL vs PostgreSQL (simplicité/rapidité vs conformité/fonctionnalités)
* InnoDB vs MyISAM (transactionnel vs non-transactionnel)
* MySQL vs SQL (MySQL est un produit, SQL est le langage)

---

## Explication simplifiée

MySQL est une base de données gratuite et très populaire. Tu crées des tables pour stocker tes données, et tu utilises SQL pour les interroger. C'est la base de données que la plupart des sites web utilisent, car elle est simple à mettre en place et rapide.

---

## Explication avancée

MySQL utilise une architecture à moteurs de stockage pluggables. InnoDB, le moteur par défaut, implémente un buffer pool (cache LRU) pour les pages de données et d'index, un redo log (WAL) pour la durabilité, et un undo log pour le MVCC. Le query optimizer de MySQL 8.x supporte les CTE, les window functions et les expressions JSON path. La réplication asynchrone utilise le binary log (binlog) en format row-based ou statement-based, tandis que Group Replication offre un consensus Paxos pour le multi-master synchrone.

---

## Points critiques à retenir

* [CRITIQUE] Toujours utiliser InnoDB comme moteur de stockage (ACID, FK, row-level locking)
* [CRITIQUE] Configurer `innodb_buffer_pool_size` à 70-80% de la RAM disponible
* [IMPORTANT] Activer le mode SQL strict pour éviter les insertions silencieusement tronquées
* [IMPORTANT] Utiliser des prepared statements pour la sécurité et les performances
* [PIÈGE] Ne pas confondre MySQL et MariaDB — ils divergent de plus en plus
* [PIÈGE] MyISAM n'a pas de support transactionnel ni de clés étrangères
