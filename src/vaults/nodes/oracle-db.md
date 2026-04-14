---
id: oracle-db
label: Oracle Database
category: bdd
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:31.017Z'
updatedAt: '2026-04-14T17:59:31.017Z'
relations:
  - target: sql
    type: implements
    weight: 0.9
  - target: java
    type: related
    weight: 0.7
resources:
  - type: documentation
    title: Documentation officielle Oracle Database
    url: 'https://docs.oracle.com/en/database/'
  - type: vidéo
    title: Oracle Database Tutorial for Beginners
    url: 'https://www.youtube.com/watch?v=ObbNGhcxXJA'
  - type: blog
    title: Oracle Database Blog
    url: 'https://blogs.oracle.com/database/'
  - type: cours
    title: Oracle Learning Library
    url: 'https://www.oracle.com/database/technologies/appdev/xe.html'
  - type: autre
    title: Oracle SQL Developer
    url: 'https://www.oracle.com/database/sqldeveloper/'
---

## Résumé rapide

Oracle Database est le SGBD relationnel commercial le plus utilisé dans les grandes entreprises. Réputé pour sa robustesse, ses performances et ses fonctionnalités avancées, il domine les systèmes critiques dans la finance, les télécoms et le secteur public.

---

## Définition

Oracle Database est un SGBD relationnel-objet commercial développé par Oracle Corporation. Il utilise le dialecte PL/SQL et offre des fonctionnalités avancées de partitionnement, clustering (RAC), haute disponibilité (Data Guard) et multitenant.

---

## Histoire

* Créé en 1979 par Larry Ellison, Bob Miner et Ed Oates
* Première base de données commerciale à implémenter SQL (1979)
* Oracle RAC introduit en 2001 pour le clustering
* Oracle 12c (2013) : architecture multitenant (CDB/PDB)
* Oracle 23c : convergence (JSON, Graph, Spatial dans un seul moteur)

---

## Objectif

* Fournir un SGBD de niveau entreprise pour les systèmes critiques
* Garantir la haute disponibilité et la reprise après sinistre
* Supporter des volumes massifs de données et des charges concurrentes élevées
* Offrir une plateforme convergée (relationnel, JSON, graph, spatial)

---

## Domaines d'utilisation

* Systèmes bancaires et financiers
* ERP (SAP, Oracle E-Business Suite)
* Télécommunications et grandes administrations
* Data warehousing à grande échelle
* Applications Java d'entreprise (Java EE, Spring)

---

## Fonctionnement

* Architecture **instance + base de données** : la SGA (System Global Area) gère la mémoire
* **MVCC** natif via les undo segments (rollback segments)
* **Redo Log** pour la durabilité des transactions
* **RAC** (Real Application Clusters) : plusieurs instances sur une même base
* **Optimizer** basé sur le coût avec statistiques détaillées

---

## Concepts clés

* **PL/SQL** — Langage procédural intégré (procédures, fonctions, triggers, packages)
* **RAC** — Real Application Clusters pour la scalabilité horizontale
* **Data Guard** — Réplication pour la reprise après sinistre
* **Tablespace** — Unité logique de stockage contenant les datafiles
* **Multitenant** — Architecture CDB/PDB (Container/Pluggable Database)
* **Partitionnement** — Division des grandes tables (range, hash, list, composite)

---

## Exemple

```sql
-- Création de table avec partitionnement
CREATE TABLE ventes (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    produit_id NUMBER NOT NULL,
    montant NUMBER(10,2),
    date_vente DATE
)
PARTITION BY RANGE (date_vente) (
    PARTITION p_2024 VALUES LESS THAN (DATE '2025-01-01'),
    PARTITION p_2025 VALUES LESS THAN (DATE '2026-01-01')
);

-- Bloc PL/SQL
DECLARE
    v_total NUMBER;
BEGIN
    SELECT SUM(montant) INTO v_total
    FROM ventes
    WHERE date_vente >= SYSDATE - 30;

    DBMS_OUTPUT.PUT_LINE('Total 30 jours: ' || v_total);
END;
/
```

---

## Avantages

* Fiabilité et robustesse éprouvées sur 40+ ans
* RAC pour la scalabilité horizontale sans partitionnement applicatif
* Data Guard pour la reprise après sinistre automatique
* Partitionnement avancé (range, hash, list, composite, interval)
* PL/SQL très puissant pour la logique métier côté base
* Support et expertise mondiale (consultants, DBA certifiés)

---

## Inconvénients

* Coût de licence extrêmement élevé (par processeur ou Named User Plus)
* Complexité d'administration (DBA spécialisé nécessaire)
* Vendor lock-in fort (PL/SQL non portable)
* Installation et configuration lourdes
* Certaines fonctionnalités réservées à l'édition Enterprise

---

## Pièges courants

* Sous-estimer le coût total de possession (licence + support + DBA)
* Utiliser des fonctionnalités Enterprise sans la licence appropriée (audit Oracle)
* Ne pas configurer correctement les undo segments et les redo logs
* Ignorer les statistiques de l'optimiseur (plans d'exécution dégradés)
* Ne pas utiliser les bind variables (SQL injection + shared pool pollution)

---

## À ne pas confondre

* Oracle Database vs MySQL (commercial enterprise vs open source)
* PL/SQL vs T-SQL (dialecte Oracle vs dialecte Microsoft)
* RAC vs Data Guard (scalabilité vs disaster recovery)
* CDB vs PDB (conteneur vs base pluggable)

---

## Explication simplifiée

Oracle Database est la base de données des grandes entreprises. Elle est très puissante et fiable, mais coûte très cher. Les banques et les grandes administrations l'utilisent pour stocker leurs données les plus critiques. Elle utilise SQL avec un langage supplémentaire appelé PL/SQL.

---

## Explication avancée

Oracle utilise un mécanisme de MVCC basé sur les undo segments : chaque lecture reconstruit une vue cohérente des données à un instant donné (SCN - System Change Number). L'architecture RAC permet à plusieurs instances de partager les mêmes datafiles via un stockage partagé (ASM), avec un mécanisme de cache fusion pour synchroniser les buffer caches. L'optimizer CBO (Cost-Based Optimizer) utilise des histogrammes, des statistiques étendues et des SQL profiles pour déterminer le plan d'exécution optimal. L'architecture multitenant (CDB/PDB) permet de consolider plusieurs bases dans un seul conteneur, partageant la mémoire et les processus.

---

## Points critiques à retenir

* [CRITIQUE] Oracle est le SGBD le plus utilisé dans les systèmes critiques d'entreprise
* [CRITIQUE] Le coût de licence est le principal frein (des centaines de milliers d'euros)
* [IMPORTANT] RAC = scalabilité horizontale, Data Guard = disaster recovery
* [IMPORTANT] PL/SQL est extrêmement puissant mais crée un vendor lock-in
* [PIÈGE] Utiliser des fonctionnalités Enterprise sans la licence = risque légal
* [PIÈGE] Ne pas utiliser de bind variables dégrade les performances du shared pool
