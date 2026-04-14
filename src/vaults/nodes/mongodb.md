---
id: mongodb
label: MongoDB
category: bdd
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:16.456Z'
updatedAt: '2026-04-14T17:59:16.456Z'
relations:
  - target: json
    type: related
    weight: 0.8
  - target: nodejs
    type: related
    weight: 0.7
resources:
  - type: documentation
    title: Documentation officielle MongoDB
    url: 'https://www.mongodb.com/docs/'
  - type: vidéo
    title: freeCodeCamp – MongoDB Full Course
    url: 'https://www.youtube.com/watch?v=ofme2o29ngU'
  - type: blog
    title: MongoDB Developer Blog
    url: 'https://www.mongodb.com/developer/'
  - type: cours
    title: MongoDB University
    url: 'https://learn.mongodb.com/'
  - type: autre
    title: MongoDB Compass – GUI
    url: 'https://www.mongodb.com/products/tools/compass'
---

## Résumé rapide

MongoDB est la base de données NoSQL orientée documents la plus populaire. Elle stocke les données sous forme de documents JSON/BSON flexibles, sans schéma rigide, ce qui la rend idéale pour les applications modernes nécessitant agilité et scalabilité horizontale.

---

## Définition

MongoDB est un SGBD NoSQL orienté documents qui stocke les données sous forme de documents BSON (Binary JSON). Elle offre un schéma flexible, une scalabilité horizontale via le sharding, et un modèle de requêtes riche avec agrégation, indexation et recherche full-text.

---

## Histoire

* Créée en 2007 par 10gen (renommé MongoDB Inc.)
* Première version publique en 2009
* Introduction du sharding natif en 2010
* Moteur WiredTiger (2015) pour les performances et la compression
* MongoDB Atlas (cloud managé) lancé en 2016
* Passage à la licence SSPL en 2018 (débats dans la communauté open source)

---

## Objectif

* Offrir une base de données flexible sans schéma rigide
* Permettre la scalabilité horizontale via le sharding automatique
* Fournir un modèle de données naturel pour les développeurs (JSON)
* Supporter les applications modernes (microservices, temps réel, mobile)

---

## Domaines d'utilisation

* Applications web et mobiles (pile MEAN/MERN)
* Gestion de contenu (CMS) et catalogues produits
* Applications IoT (ingestion de données à haut débit)
* Jeux vidéo (profils joueurs, inventaires)
* Applications temps réel (Change Streams)

---

## Fonctionnement

* Données stockées en **documents BSON** (Binary JSON) dans des **collections**
* Pas de schéma fixe : chaque document peut avoir une structure différente
* **Sharding** : distribution horizontale des données sur plusieurs serveurs
* **Replica Set** : réplication automatique avec failover (1 primary + N secondaries)
* **WiredTiger** : moteur de stockage avec compression et verrouillage au niveau du document

---

## Concepts clés

* **Document** — Unité de stockage (équivalent d'une ligne SQL), format BSON
* **Collection** — Groupe de documents (équivalent d'une table SQL)
* **Sharding** — Partitionnement horizontal des données sur plusieurs nœuds
* **Replica Set** — Groupe de nœuds avec réplication et failover automatique
* **Aggregation Pipeline** — Framework de transformation de données par étapes
* **Index** — B-tree, compound, text, geospatial, wildcard

---

## Exemple

```javascript
// Insertion d'un document
db.utilisateurs.insertOne({
  nom: "Marie Dupont",
  email: "marie@example.com",
  age: 28,
  adresse: {
    rue: "15 rue de la Paix",
    ville: "Paris",
    codePostal: "75002"
  },
  competences: ["Python", "MongoDB", "Docker"],
  createdAt: new Date()
});

// Requête avec filtre et projection
db.utilisateurs.find(
  { "adresse.ville": "Paris", age: { $gte: 25 } },
  { nom: 1, email: 1, _id: 0 }
);

// Aggregation pipeline
db.commandes.aggregate([
  { $match: { statut: "livree" } },
  { $group: { _id: "$client_id", total: { $sum: "$montant" } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
]);
```

---

## Avantages

* Schéma flexible — évolution rapide du modèle de données
* Scalabilité horizontale native via le sharding
* Modèle de données intuitif pour les développeurs (JSON)
* Aggregation pipeline puissant
* MongoDB Atlas simplifie le déploiement cloud
* Change Streams pour les applications temps réel

---

## Inconvénients

* Pas de jointures efficaces (dénormalisation nécessaire)
* Pas de transactions multi-documents avant la version 4.0
* Consommation de stockage plus élevée que les SGBD relationnels
* Licence SSPL controversée (pas considérée open source par certains)
* Risque de données incohérentes sans validation de schéma

---

## Pièges courants

* Modéliser les données comme en relationnel (normalisation excessive)
* Ne pas créer d'index sur les champs fréquemment interrogés
* Stocker des relations complexes sans dénormalisation
* Ignorer la validation de schéma (documents incohérents)
* Ne pas configurer correctement le sharding key (hotspots)

---

## À ne pas confondre

* MongoDB vs PostgreSQL (documents flexibles vs relationnel structuré)
* Collection vs Table (pas de schéma fixe vs schéma strict)
* BSON vs JSON (format binaire vs format texte)
* MongoDB vs Couchbase (document store vs document + cache)

---

## Explication simplifiée

MongoDB est une base de données qui stocke les informations sous forme de documents JSON au lieu de tables avec des colonnes. C'est comme stocker des fiches libres au lieu de remplir un tableur. Chaque fiche peut avoir des champs différents, ce qui rend les données très flexibles.

---

## Explication avancée

MongoDB utilise le moteur WiredTiger qui implémente un B-tree avec compression snappy/zlib et un verrouillage au niveau du document (ticket-based concurrency). Le sharding distribue les données selon une shard key, en utilisant soit le range-based sharding soit le hashed sharding. Les replica sets utilisent le protocole Raft pour l'élection du primary. L'aggregation pipeline est un DAG de stages ($match, $group, $lookup, $unwind, etc.) exécuté côté serveur avec optimisations automatiques (pipeline coalescence, early filtering).

---

## Points critiques à retenir

* [CRITIQUE] MongoDB est schema-less — la validation de schéma est optionnelle mais recommandée
* [CRITIQUE] Le sharding key est irréversible et détermine la distribution des données
* [IMPORTANT] Dénormaliser les données plutôt que multiplier les jointures ($lookup)
* [IMPORTANT] Les transactions multi-documents sont supportées depuis la version 4.0
* [PIÈGE] Pas d'index = scan complet de la collection (très lent)
* [PIÈGE] La licence SSPL n'est pas considérée open source par l'OSI
