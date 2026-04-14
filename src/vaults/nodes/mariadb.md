---
id: mariadb
label: MariaDB
category: bdd
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:13.041Z'
updatedAt: '2026-04-14T17:59:13.041Z'
relations:
  - target: mysql
    type: related
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle MariaDB
    url: 'https://mariadb.com/kb/en/documentation/'
  - type: vidéo
    title: Learn MariaDB – Full Tutorial
    url: 'https://www.youtube.com/watch?v=_AMj02sANpI'
  - type: blog
    title: MariaDB Server Blog
    url: 'https://mariadb.org/blog/'
  - type: cours
    title: MariaDB Tutorial
    url: 'https://www.mariadbtutorial.com/'
  - type: autre
    title: MariaDB Foundation
    url: 'https://mariadb.org/'
---

## Résumé rapide

MariaDB est un fork communautaire de MySQL créé par le fondateur original de MySQL. Compatible avec MySQL, il offre des fonctionnalités supplémentaires, de meilleures performances et une gouvernance véritablement open source.

---

## Définition

MariaDB est un SGBD relationnel open source, fork de MySQL, développé par MariaDB Foundation et MariaDB Corporation. Il maintient une compatibilité binaire avec MySQL tout en ajoutant des moteurs de stockage supplémentaires (Aria, ColumnStore, Spider) et des fonctionnalités avancées.

---

## Histoire

* Créé en 2009 par Michael "Monty" Widenius, cofondateur de MySQL
* Fork de MySQL après le rachat de Sun Microsystems par Oracle
* Adopté par les grandes distributions Linux (Debian, Red Hat, Ubuntu) en remplacement de MySQL
* MariaDB 10.x a introduit des fonctionnalités absentes de MySQL (séquences, colonnes virtuelles, etc.)
* Wikipedia, Google et d'autres grandes entreprises l'utilisent en production

---

## Objectif

* Garantir un SGBD relationnel véritablement open source (pas de version Enterprise fermée)
* Maintenir la compatibilité avec MySQL tout en innovant
* Offrir des moteurs de stockage alternatifs (ColumnStore pour l'analytique)
* Fournir des performances supérieures grâce à l'optimiseur amélioré

---

## Domaines d'utilisation

* Remplacement direct de MySQL dans les applications existantes
* Applications web (pile LAMP avec MariaDB)
* Data warehousing avec MariaDB ColumnStore
* Systèmes distribués avec Spider (sharding)
* Hébergement web et CMS (WordPress, Joomla)

---

## Fonctionnement

* Architecture **client-serveur** compatible avec le protocole MySQL
* Moteur par défaut **InnoDB** (identique à MySQL) ou **Aria** (remplacement de MyISAM)
* **Thread pool** intégré pour gérer efficacement les connexions concurrentes
* **Optimiseur de requêtes** amélioré avec des optimisations de sous-requêtes
* **Galera Cluster** pour la réplication synchrone multi-master

---

## Concepts clés

* **Compatibilité MySQL** — Drop-in replacement : mêmes commandes, même protocole
* **Aria** — Moteur de stockage crash-safe remplaçant MyISAM
* **ColumnStore** — Moteur de stockage colonnaire pour l'analytique
* **Galera Cluster** — Réplication synchrone multi-master intégrée
* **Thread Pool** — Gestion optimisée des connexions concurrentes (inclus, payant chez MySQL)
* **Séquences** — Objets SQL standard (absents de MySQL)

---

## Exemple

```sql
-- Création de table avec séquence (fonctionnalité MariaDB)
CREATE SEQUENCE seq_commande START WITH 1000 INCREMENT BY 1;

CREATE TABLE commandes (
    id BIGINT DEFAULT NEXT VALUE FOR seq_commande PRIMARY KEY,
    client_id INT NOT NULL,
    montant DECIMAL(10,2),
    statut ENUM('en_attente', 'validee', 'expediee') DEFAULT 'en_attente',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Colonne virtuelle (calculée)
ALTER TABLE commandes
ADD COLUMN montant_ttc DECIMAL(10,2) AS (montant * 1.20) VIRTUAL;

-- Requête utilisant une CTE
WITH top_clients AS (
    SELECT client_id, SUM(montant) AS total
    FROM commandes
    GROUP BY client_id
    ORDER BY total DESC
    LIMIT 10
)
SELECT * FROM top_clients;
```

---

## Avantages

* 100% open source (pas de fonctionnalités réservées à une version Enterprise)
* Compatible avec MySQL (migration transparente)
* Thread pool inclus gratuitement
* Galera Cluster intégré pour le multi-master
* Optimiseur de requêtes plus avancé que MySQL
* Moteurs de stockage supplémentaires (Aria, ColumnStore, Spider)

---

## Inconvénients

* Divergence croissante avec MySQL (compatibilité non garantie à long terme)
* Écosystème et support commercial plus petits que MySQL/Oracle
* Documentation parfois moins complète que MySQL
* Certains outils tiers ne supportent que MySQL explicitement
* ColumnStore encore moins mature que des solutions dédiées (ClickHouse, etc.)

---

## Pièges courants

* Supposer une compatibilité totale avec les dernières versions de MySQL
* Ne pas tester les applications existantes lors de la migration MySQL → MariaDB
* Confondre les numéros de version (MariaDB 10.x ≠ MySQL 10.x)
* Ignorer Galera Cluster pour la haute disponibilité (souvent méconnu)
* Utiliser des fonctionnalités spécifiques à MariaDB sans prévoir la portabilité

---

## À ne pas confondre

* MariaDB vs MySQL (fork communautaire vs produit Oracle)
* MariaDB vs PostgreSQL (compatibilité MySQL vs conformité SQL avancée)
* Aria vs InnoDB (moteur crash-safe léger vs moteur transactionnel complet)
* MariaDB ColumnStore vs ClickHouse (analytique intégrée vs solution dédiée)

---

## Explication simplifiée

MariaDB est une copie améliorée de MySQL, créée par le même inventeur. Elle fonctionne exactement comme MySQL mais reste entièrement gratuite et ajoute des fonctionnalités en plus. Si tu connais MySQL, tu sais déjà utiliser MariaDB.

---

## Explication avancée

MariaDB maintient la compatibilité au niveau du protocole client-serveur et du format de stockage InnoDB avec MySQL, tout en divergeant sur l'optimiseur de requêtes (subquery materialization, semi-join optimizations avancées). Galera Cluster utilise un protocole de certification basé sur le write-set pour la réplication synchrone, garantissant la cohérence forte entre nœuds. Le moteur Aria utilise un log de redo crash-safe et supporte les tables transactionnelles et non-transactionnelles, offrant un remplacement moderne de MyISAM.

---

## Points critiques à retenir

* [CRITIQUE] MariaDB est un drop-in replacement de MySQL mais la compatibilité diverge avec le temps
* [CRITIQUE] Galera Cluster permet la réplication synchrone multi-master (inclus gratuitement)
* [IMPORTANT] Le thread pool est inclus gratuitement (payant dans MySQL Enterprise)
* [IMPORTANT] Tester soigneusement avant de migrer de MySQL vers MariaDB (ou inversement)
* [PIÈGE] Les numéros de version MariaDB ne correspondent pas à ceux de MySQL
* [PIÈGE] Certains outils MySQL ne fonctionnent pas avec MariaDB
