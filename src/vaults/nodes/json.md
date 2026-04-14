---
id: json
label: JSON
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:03.387Z'
updatedAt: '2026-04-14T17:59:03.387Z'
relations: []
resources:
  - type: documentation
    title: JSON.org – Spécification officielle
    url: 'https://www.json.org/json-fr.html'
  - type: documentation
    title: MDN – JSON
    url: >-
      https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON
  - type: vidéo
    title: Fireship – JSON in 100 Seconds
    url: 'https://www.youtube.com/watch?v=iiADhChRriM'
  - type: blog
    title: DigitalOcean – Introduction to JSON
    url: 'https://www.digitalocean.com/community/tutorials/an-introduction-to-json'
  - type: autre
    title: JSONLint – Validateur en ligne
    url: 'https://jsonlint.com/'
  - type: autre
    title: JSON Path Finder
    url: 'https://jsonpathfinder.com/'
---

## Résumé rapide

JSON (JavaScript Object Notation) est le format d'échange de données standard sur le web. Lisible par les humains et facile à parser par les machines, il est utilisé partout : APIs REST, fichiers de configuration, stockage de données.

---

## Définition

JSON est un format textuel léger d'échange de données, basé sur la syntaxe des objets JavaScript. Il représente des données structurées sous forme de paires clé-valeur et de tableaux imbriqués.

---

## Histoire

* Spécifié par Douglas Crockford au début des années 2000
* Standardisé comme ECMA-404 et RFC 8259
* A remplacé XML comme format d'échange principal pour les APIs web
* Aujourd'hui le format le plus utilisé pour la communication entre systèmes

---

## Objectif

* Échanger des données entre client et serveur (APIs)
* Fichiers de configuration (package.json, tsconfig.json…)
* Stocker des données semi-structurées
* Sérialiser des objets pour le transport réseau

---

## Domaines d'utilisation

* APIs REST (format de requête et réponse)
* Fichiers de configuration (Node.js, VS Code, ESLint…)
* Bases de données NoSQL (MongoDB, CouchDB)
* Stockage local (localStorage, IndexedDB)

---

## Fonctionnement

* Texte brut encodé en UTF-8
* Parsable par tous les langages (bibliothèques natives)
* 6 types de données : string, number, boolean, null, object, array
* Pas de commentaires (contrairement à YAML)
* Pas de fonctions ni de références circulaires

---

## Concepts clés

* **Objet** — Collection de paires clé-valeur entre `{}`
* **Tableau** — Liste ordonnée de valeurs entre `[]`
* **Clé** — Toujours une chaîne entre guillemets doubles
* **Valeur** — String, number, boolean, null, objet ou tableau
* **Sérialisation** — Convertir un objet en chaîne JSON
* **Désérialisation** — Convertir une chaîne JSON en objet

---

## Exemple

```json
{
  "id": 42,
  "name": "Alice",
  "active": true,
  "email": null,
  "roles": ["admin", "user"],
  "address": {
    "city": "Paris",
    "zip": "75001"
  }
}
```

```java
// Java (Jackson)
ObjectMapper mapper = new ObjectMapper();
User user = mapper.readValue(jsonString, User.class);  // Désérialisation
String json = mapper.writeValueAsString(user);         // Sérialisation
```

---

## Structure / Architecture

* Structure arborescente (objets et tableaux imbriqués)
* Pas de schéma imposé (schema-less)
* JSON Schema pour la validation optionnelle
* Variantes : JSON Lines (une entrée par ligne), NDJSON, GeoJSON

---

## Syntaxe et spécificités

* Guillemets doubles obligatoires pour les clés et les strings
* Pas de virgule après le dernier élément (trailing comma interdit)
* Pas de commentaires
* Nombres : entiers et flottants (pas de distinction)
* Pas de type date (convention : chaîne ISO 8601)

---

## Avantages

* Lisible par les humains
* Léger (moins verbose que XML)
* Supporté nativement par tous les langages
* Standard universel pour les APIs web
* Simple à apprendre

---

## Inconvénients

* Pas de commentaires (problème pour les fichiers de config)
* Pas de types avancés (dates, binaires, références)
* Verbose pour les grands volumes de données (vs protobuf, msgpack)
* Pas de schéma natif (validation à part)

---

## Pièges courants

* Trailing comma → erreur de parsing
* Guillemets simples au lieu de doubles → invalide
* Nombres flottants avec perte de précision (IEEE 754)
* Confusion entre `null`, `""` et champ absent
* Données circulaires → erreur de sérialisation

---

## À ne pas confondre

* JSON vs XML (léger/moderne vs verbose/ancien)
* JSON vs YAML (pas de commentaires vs commentaires, indentation stricte)
* JSON vs Protocol Buffers (texte vs binaire, lisible vs performant)
* `JSON.parse()` vs `JSON.stringify()` (désérialisation vs sérialisation)

---

## Explication simplifiée

JSON c'est un format texte pour représenter des données : des objets avec des clés et des valeurs, et des listes. C'est le format que ton navigateur et les serveurs utilisent pour s'échanger des données.

---

## Explication avancée

JSON est un sous-ensemble strict de la notation littérale des objets JavaScript (avec des restrictions : clés entre guillemets, pas de trailing comma, pas de fonctions). Sa grammaire est définie par une BNF simple (RFC 8259), ce qui rend les parsers triviaux à implémenter. Les bibliothèques de sérialisation (Jackson, Gson en Java, json en Python) utilisent la réflexion ou la génération de code pour mapper automatiquement les structures JSON vers des objets typés.

---

## Points critiques à retenir

* [CRITIQUE] JSON est LE format d'échange standard pour les APIs web
* [CRITIQUE] 6 types : string, number, boolean, null, object, array
* [IMPORTANT] Guillemets doubles obligatoires, pas de trailing comma
* [IMPORTANT] Pas de commentaires (utiliser JSONC ou YAML si nécessaire)
* [PIÈGE] Trailing comma = erreur de parsing silencieuse
* [PIÈGE] Pas de type date natif → utiliser ISO 8601 comme convention
