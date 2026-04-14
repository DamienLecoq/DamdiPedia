---
id: sql-server
label: SQL Server
category: bdd
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:08.409Z'
updatedAt: '2026-04-14T18:00:08.409Z'
relations:
  - target: sql
    type: implements
    weight: 0.9
  - target: csharp
    type: related
    weight: 0.7
resources:
  - type: documentation
    title: Documentation officielle SQL Server
    url: 'https://learn.microsoft.com/en-us/sql/sql-server/'
  - type: vidéo
    title: freeCodeCamp – SQL Server Tutorial
    url: 'https://www.youtube.com/watch?v=Yv3GBMnAHLM'
  - type: blog
    title: SQL Server Central
    url: 'https://www.sqlservercentral.com/'
  - type: cours
    title: Microsoft Learn – SQL Server
    url: >-
      https://learn.microsoft.com/en-us/training/paths/get-started-querying-with-transact-sql/
  - type: autre
    title: SQL Server Management Studio (SSMS)
    url: >-
      https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms
---

## Résumé rapide

SQL Server est le système de gestion de bases de données relationnelles de Microsoft. Leader dans l'écosystème Windows et .NET, il offre des fonctionnalités avancées d'analyse, de reporting et d'intégration avec Azure.

---

## Définition

Microsoft SQL Server est un SGBD relationnel commercial utilisant le dialecte T-SQL (Transact-SQL). Il propose des outils intégrés pour le reporting (SSRS), l'intégration de données (SSIS), l'analyse OLAP (SSAS) et la gestion d'instances via SQL Server Management Studio (SSMS).

---

## Histoire

* Première version en 1989, développée en partenariat avec Sybase
* SQL Server 2000 : adoption massive dans les entreprises
* SQL Server 2016 : support Linux et disponibilité sur Docker
* SQL Server 2019 : Big Data Clusters et PolyBase
* Azure SQL : version cloud entièrement managée

---

## Objectif

* Fournir un SGBD robuste pour l'écosystème Microsoft et .NET
* Offrir une plateforme intégrée (base, reporting, ETL, analyse)
* Supporter les charges transactionnelles et analytiques
* S'intégrer nativement avec Azure pour le cloud hybride

---

## Domaines d'utilisation

* Applications d'entreprise .NET / C#
* Business Intelligence et reporting (SSRS, Power BI)
* ERP et CRM (Microsoft Dynamics)
* Data warehousing (SSAS, columnstore indexes)
* Applications cloud hybrides avec Azure SQL

---

## Fonctionnement

* Architecture **client-serveur** avec le protocole TDS (Tabular Data Stream)
* **Moteur de stockage** avec pages de 8 Ko et extents de 64 Ko
* **Buffer Pool** pour le cache en mémoire des données
* **Transaction Log** pour la durabilité (WAL)
* **Query Optimizer** basé sur le coût avec statistiques automatiques

---

## Concepts clés

* **T-SQL** — Dialecte SQL propriétaire de Microsoft (procédures, fonctions, curseurs)
* **Columnstore Index** — Index colonnaire pour l'analytique (compression 10x)
* **Always On** — Haute disponibilité avec failover automatique
* **In-Memory OLTP** — Tables optimisées en mémoire (Hekaton)
* **SSIS/SSRS/SSAS** — Outils intégrés d'ETL, reporting et analyse
* **Linked Servers** — Connexion à d'autres sources de données

---

## Exemple

```sql
-- Création de table avec T-SQL
CREATE TABLE Employes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nom NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) UNIQUE,
    Salaire DECIMAL(10,2),
    Departement NVARCHAR(50),
    DateEmbauche DATE DEFAULT GETDATE()
);

-- Procédure stockée
CREATE PROCEDURE GetTopSalaires
    @Departement NVARCHAR(50),
    @Limite INT = 10
AS
BEGIN
    SELECT TOP(@Limite) Nom, Salaire
    FROM Employes
    WHERE Departement = @Departement
    ORDER BY Salaire DESC;
END;

-- Appel de la procédure
EXEC GetTopSalaires @Departement = 'Informatique', @Limite = 5;
```

---

## Avantages

* Intégration native avec l'écosystème Microsoft (.NET, Azure, Power BI)
* Outils d'administration puissants (SSMS)
* Columnstore indexes pour l'analytique haute performance
* Always On Availability Groups pour la haute disponibilité
* Edition Express gratuite pour les petits projets
* Support Linux et Docker depuis 2016

---

## Inconvénients

* Coût de licence élevé pour les éditions Enterprise
* Historiquement limité à Windows (support Linux plus récent)
* Vendor lock-in avec l'écosystème Microsoft
* T-SQL non standard (portabilité limitée)
* Consommation de ressources plus élevée que PostgreSQL/MySQL

---

## Pièges courants

* Utiliser des curseurs au lieu d'opérations ensemblistes (très lent)
* Ne pas monitorer le Transaction Log (peut remplir le disque)
* Ignorer les plans d'exécution pour l'optimisation
* Ne pas configurer correctement tempdb (fichiers multiples recommandés)
* Utiliser l'édition Express en production sans connaître ses limites (10 Go max)

---

## À ne pas confondre

* SQL Server vs SQL (produit vs langage)
* T-SQL vs PL/SQL (dialecte Microsoft vs dialecte Oracle)
* SQL Server vs Azure SQL (on-premise vs cloud managé)
* SSMS vs Azure Data Studio (outil classique vs outil moderne cross-platform)

---

## Explication simplifiée

SQL Server est la base de données de Microsoft. Elle fonctionne très bien avec les applications C# et .NET. Elle inclut des outils pour créer des rapports et analyser les données. Il existe une version gratuite (Express) pour apprendre et les petits projets.

---

## Explication avancée

SQL Server utilise un modèle de concurrence basé sur le verrouillage pessimiste par défaut (contrairement au MVCC de PostgreSQL), avec un mode Read Committed Snapshot Isolation (RCSI) optionnel. Le query optimizer utilise un modèle de coût basé sur la cardinalité estimée, avec le Cardinality Estimator rénové depuis SQL Server 2014. Les Columnstore Indexes stockent les données par colonnes avec compression Vertipaq, permettant des gains de performance de 10x sur les requêtes analytiques. In-Memory OLTP (Hekaton) utilise des structures lock-free et un compilateur natif pour les procédures stockées critiques.

---

## Points critiques à retenir

* [CRITIQUE] T-SQL est le dialecte SQL de Microsoft — non portable vers d'autres SGBD
* [CRITIQUE] Always On est essentiel pour la haute disponibilité en production
* [IMPORTANT] Les Columnstore Indexes accélèrent drastiquement les requêtes analytiques
* [IMPORTANT] L'édition Express est limitée à 10 Go et 1 Go de RAM
* [PIÈGE] Les curseurs T-SQL sont extrêmement lents — privilégier les opérations ensemblistes
* [PIÈGE] Le Transaction Log peut croître indéfiniment sans maintenance
