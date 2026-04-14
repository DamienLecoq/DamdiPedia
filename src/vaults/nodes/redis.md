---
id: redis
label: Redis
category: bdd
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:50.394Z'
updatedAt: '2026-04-14T17:59:50.394Z'
relations:
  - target: docker
    type: related
    weight: 0.7
resources:
  - type: documentation
    title: Documentation officielle Redis
    url: 'https://redis.io/docs/'
  - type: vidéo
    title: freeCodeCamp – Redis Full Course
    url: 'https://www.youtube.com/watch?v=XCsS_NVAa1g'
  - type: blog
    title: Redis Blog
    url: 'https://redis.io/blog/'
  - type: cours
    title: Redis University
    url: 'https://university.redis.io/'
  - type: autre
    title: RedisInsight – GUI officiel
    url: 'https://redis.io/insight/'
---

## Résumé rapide

Redis est une base de données clé-valeur en mémoire, extrêmement rapide, utilisée comme cache, message broker et stockage de sessions. Sa latence sub-milliseconde en fait le choix de référence pour les couches de cache des applications modernes.

---

## Définition

Redis (Remote Dictionary Server) est un magasin de structures de données en mémoire, open source, qui peut servir de base de données, de cache et de message broker. Il supporte des structures de données riches : strings, hashes, lists, sets, sorted sets, streams, etc.

---

## Histoire

* Créé en 2009 par Salvatore Sanfilippo (antirez)
* Sponsorisé par Redis Labs (devenu Redis Ltd.)
* Redis 5.0 (2018) : introduction des Streams
* Redis 7.0 (2022) : fonctions Lua côté serveur, ACL améliorées
* Passage à une licence dual (RSALv2/SSPL) en 2024 — fork Valkey par la Linux Foundation

---

## Objectif

* Fournir un stockage en mémoire ultra-rapide (latence < 1 ms)
* Servir de couche de cache pour réduire la charge sur la base principale
* Offrir des structures de données avancées (sorted sets, streams, HyperLogLog)
* Supporter le pub/sub et les files de messages

---

## Domaines d'utilisation

* Cache applicatif (réponses API, résultats de requêtes)
* Gestion de sessions utilisateur
* Files de messages (Streams, Pub/Sub)
* Compteurs en temps réel (rate limiting, leaderboards)
* Cache de page et de fragments (CDN applicatif)

---

## Fonctionnement

* Toutes les données sont stockées **en mémoire** (RAM)
* Architecture **single-threaded** pour les commandes (pas de locks)
* **Persistance optionnelle** : RDB (snapshots) et/ou AOF (append-only file)
* **Réplication** : master-replica avec failover automatique (Redis Sentinel)
* **Redis Cluster** : sharding automatique sur plusieurs nœuds

---

## Concepts clés

* **Clé-Valeur** — Chaque donnée est associée à une clé unique
* **Structures de données** — String, Hash, List, Set, Sorted Set, Stream, Bitmap
* **TTL (Time-To-Live)** — Expiration automatique des clés
* **Pub/Sub** — Communication par publication/souscription entre clients
* **Streams** — Log de messages persistant (similaire à Kafka léger)
* **Sentinel** — Monitoring et failover automatique des instances
* **Cluster** — Sharding automatique pour la scalabilité horizontale

---

## Exemple

```bash
# Opérations basiques
SET user:1:name "Marie Dupont"
GET user:1:name
# => "Marie Dupont"

# Hash (objet)
HSET user:1 name "Marie" age 28 ville "Paris"
HGETALL user:1

# Cache avec TTL (expire dans 300 secondes)
SET cache:api:/users "..." EX 300

# Sorted Set (leaderboard)
ZADD leaderboard 1500 "joueur_a" 2300 "joueur_b" 1800 "joueur_c"
ZREVRANGE leaderboard 0 2 WITHSCORES

# Pub/Sub
SUBSCRIBE notifications
PUBLISH notifications "Nouveau message!"

# Stream (log de messages)
XADD events * type "login" user "marie"
XREAD COUNT 10 STREAMS events 0
```

---

## Avantages

* Latence sub-milliseconde (tout en mémoire)
* Structures de données riches et versatiles
* Simple à déployer et à utiliser
* Réplication et clustering natifs
* Idéal comme cache (TTL, éviction automatique)
* Écosystème mature (clients dans tous les langages)

---

## Inconvénients

* Limité par la RAM disponible (coût mémoire élevé)
* Persistance non garantie par défaut (risque de perte de données)
* Single-threaded pour les commandes (CPU limité)
* Pas de requêtes complexes (pas de SQL, pas de jointures)
* Changement de licence en 2024 (fork Valkey)

---

## Pièges courants

* Utiliser Redis comme base de données principale sans persistance
* Ne pas configurer de politique d'éviction (mémoire saturée = crash)
* Stocker des objets trop volumineux (clés > 1 Mo)
* Oublier de configurer le TTL sur les clés de cache (mémoire qui grandit)
* Utiliser KEYS * en production (bloque le serveur — utiliser SCAN)

---

## À ne pas confondre

* Redis vs Memcached (structures riches vs simple clé-valeur)
* Redis vs Kafka (pub/sub léger vs streaming distribué robuste)
* RDB vs AOF (snapshots périodiques vs journal append-only)
* Redis vs Valkey (original vs fork open source Linux Foundation)

---

## Explication simplifiée

Redis est comme un dictionnaire ultra-rapide en mémoire. Tu donnes une clé, il te retourne la valeur instantanément. Il est surtout utilisé comme cache : au lieu de refaire une requête lente à la base de données, tu gardes le résultat dans Redis pour le retrouver en moins d'une milliseconde.

---

## Explication avancée

Redis utilise un event loop single-threaded basé sur epoll/kqueue pour traiter les commandes séquentiellement, éliminant le besoin de verrous. La persistance RDB fork le processus pour créer un snapshot copy-on-write, tandis que l'AOF journalise chaque commande d'écriture. Redis Cluster utilise un hash slot scheme (16384 slots) distribués sur les nœuds, avec un protocole gossip pour la détection de pannes. Les structures de données sont implémentées avec des encodages optimisés (ziplist pour les petites listes/hashes, skiplist pour les sorted sets).

---

## Points critiques à retenir

* [CRITIQUE] Redis est en mémoire — la taille est limitée par la RAM disponible
* [CRITIQUE] Configurer la persistance (RDB + AOF) si les données ne doivent pas être perdues
* [IMPORTANT] Toujours définir un TTL sur les clés de cache
* [IMPORTANT] Configurer la politique d'éviction (allkeys-lru recommandé pour le cache)
* [PIÈGE] Ne jamais utiliser KEYS * en production — utiliser SCAN
* [PIÈGE] Single-threaded = une commande lente bloque toutes les autres
