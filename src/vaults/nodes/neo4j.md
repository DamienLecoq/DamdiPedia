---
id: neo4j
label: Neo4j
category: logiciel
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:18.518Z'
updatedAt: '2026-04-14T17:59:18.518Z'
relations: []
resources:
  - type: documentation
    title: Neo4j Documentation
    url: 'https://neo4j.com/docs/'
  - type: cours
    title: GraphAcademy (gratuit)
    url: 'https://graphacademy.neo4j.com/'
  - type: livre
    title: Graph Databases – O'Reilly
    url: 'https://neo4j.com/graph-databases-book/'
---

## Résumé rapide

Neo4j est la base de données orientée graphe la plus populaire, stockant nativement des nœuds et relations et offrant Cypher, un langage de requête déclaratif optimisé pour parcourir les connexions.

---

## Définition

Neo4j est un SGBD graphe transactionnel (ACID) où les données sont modélisées comme des nœuds étiquetés reliés par des relations typées et directionnelles, chacun pouvant porter des propriétés. Cette structure excelle pour les requêtes multi-sauts.

---

## Histoire

* Créé en 2007 par Neo Technology
* Devient le leader des bases graphe
* Langage Cypher standardisé en openCypher
* Neo4j AuraDB pour l'offre managée
* Largement adopté pour recommandation et fraude

---

## Objectif

* Modéliser des données hautement connectées
* Traverser efficacement des relations
* Offrir un langage naturel pour les graphes
* Garantir l'ACID sur un graphe
* Supporter les analyses de réseau

---

## Domaines d'utilisation

* Moteurs de recommandation
* Détection de fraude et anti-money laundering
* Réseaux sociaux (amis des amis)
* Knowledge graphs et RAG
* Gestion d'identités et d'autorisations

---

## Fonctionnement

* **Node** — Entité avec labels et propriétés
* **Relationship** — Lien typé et orienté
* **Property** — Clé/valeur sur nœud ou relation
* **Cypher** — Langage de requête déclaratif
* Stockage natif graphe (pas de jointures)

---

## Concepts clés

* **Node** — `(p:Person {name: 'Alice'})`
* **Relationship** — `(a)-[:KNOWS]->(b)`
* **Cypher** — Syntaxe ASCII-art des patterns
* **Index** — Sur label+propriété
* **Traversal** — Parcours de graphe
* **ACID** — Transactions complètes

---

## Exemple

```cypher
// Créer des nœuds et relations
CREATE (a:Person {name: 'Alice', age: 30})
CREATE (b:Person {name: 'Bob', age: 28})
CREATE (a)-[:KNOWS {since: 2018}]->(b);

// Trouver les amis d'amis d'Alice
MATCH (me:Person {name: 'Alice'})-[:KNOWS*2]->(foaf)
WHERE me <> foaf
RETURN DISTINCT foaf.name;

// Path shortest
MATCH p = shortestPath(
  (a:Person {name: 'Alice'})-[:KNOWS*]-(c:Person {name: 'Carol'})
)
RETURN length(p), nodes(p);
```

---

## Avantages

* Parcours de graphe ultra-rapide (même profond)
* Cypher très expressif
* Modèle naturel pour données connectées
* ACID garanti
* Visualisation intégrée (Neo4j Browser)
* Écosystème mature (GDS, Bloom)

---

## Inconvénients

* Scalabilité horizontale limitée
* Non adapté aux workloads OLTP classiques
* Coût de la version entreprise
* Courbe d'apprentissage Cypher
* Écosystème plus petit que SQL

---

## Pièges courants

* Utiliser Neo4j pour du CRUD classique
* Requêtes non indexées sur propriétés
* Paths sans limite de profondeur (explosion)
* Ignorer le modèle (trop de labels/relations)

---

## À ne pas confondre

* Neo4j vs SQL (graphe vs relationnel)
* Neo4j vs RDF triplestores (LPG vs triples)
* Cypher vs SPARQL (LPG vs RDF)

---

## Explication simplifiée

Neo4j stocke les données comme un réseau : des points (personnes, produits…) et des liens entre eux (acheté, ami, aime…). Poser la question "quels amis de mes amis aiment cet article ?" est instantané, là où SQL ferait plusieurs jointures coûteuses.

---

## Explication avancée

Neo4j implémente un "index-free adjacency" : chaque nœud pointe directement vers ses relations voisines via des pointeurs physiques, rendant le traversal en O(1) par saut indépendamment de la taille totale de la base. Cypher décrit des patterns en ASCII-art (`(a)-[:REL]->(b)`) que le planner traduit en plan d'exécution. Neo4j GDS (Graph Data Science) offre des algorithmes (PageRank, community detection, node embeddings) exécutés en parallèle. Pour scaler à l'échelle, Neo4j Fabric permet le sharding, mais la scalabilité horizontale reste moins mature que les bases distribuées.

---

## Points critiques à retenir

* [CRITIQUE] Pas pour du CRUD classique, pour des données connectées
* [CRITIQUE] Limiter la profondeur des paths variables
* [IMPORTANT] Indexer les propriétés de départ des requêtes
* [IMPORTANT] Modèle compte plus que les lignes (contrairement à SQL)
* [PIÈGE] Cartesian product en Cypher = explosion
