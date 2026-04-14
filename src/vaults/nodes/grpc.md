---
id: grpc
label: gRPC
category: protocole
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:50.593Z'
updatedAt: '2026-04-14T17:58:50.593Z'
relations:
  - target: microservices
    type: related
    weight: 0.8
  - target: api-rest
    type: related
    weight: 0.5
resources:
  - type: documentation
    title: gRPC Documentation officielle
    url: 'https://grpc.io/docs/'
  - type: cours
    title: gRPC Crash Course – TechWorld with Nana
    url: 'https://www.youtube.com/watch?v=Yw4rkaTc0f8'
  - type: blog
    title: Why gRPC?
    url: 'https://grpc.io/docs/what-is-grpc/introduction/'
---

## Résumé rapide

gRPC est un framework RPC open-source créé par Google, utilisant HTTP/2 et Protocol Buffers pour des communications inter-services performantes, typées et multi-langages.

---

## Définition

gRPC (gRPC Remote Procedure Call) est un framework de communication qui permet à un client d'appeler des méthodes sur un serveur distant comme s'il s'agissait d'un appel local, avec sérialisation binaire Protobuf et transport HTTP/2.

---

## Histoire

* Créé chez Google (successeur de Stubby interne)
* Open-source en 2015
* Projet CNCF depuis 2017
* Adopté par Netflix, Square, Cisco, Dropbox
* Standard pour la communication inter-microservices

---

## Objectif

* Communication inter-services performante
* Contrats typés via Protobuf
* Support multi-langages (12+)
* Streaming bidirectionnel
* Génération de code automatique

---

## Domaines d'utilisation

* Communication entre microservices
* APIs internes haute performance
* Streaming de données (logs, télémétrie)
* Systèmes polyglottes
* Mobile (Android, iOS)

---

## Fonctionnement

* Définition des services en `.proto` (Protobuf)
* Génération de stubs client et serveur
* Sérialisation binaire compacte
* Transport HTTP/2 (multiplexing, server push)
* 4 modes : unary, server stream, client stream, bidi

---

## Concepts clés

* **Protobuf** — Format de sérialisation binaire
* **.proto file** — Définition du service et messages
* **Stub** — Code généré client/serveur
* **Unary** — Requête/réponse classique
* **Server Streaming** — Flux serveur → client
* **Bidirectional Streaming** — Deux streams en parallèle

---

## Exemple

```protobuf
// user.proto
syntax = "proto3";

service UserService {
  rpc GetUser(GetUserRequest) returns (User);
  rpc StreamUsers(Empty) returns (stream User);
}

message GetUserRequest { string id = 1; }
message User {
  string id = 1;
  string name = 2;
  string email = 3;
}
```

```typescript
// Client Node.js
const client = new UserServiceClient('localhost:50051', credentials.createInsecure());
client.getUser({ id: '42' }, (err, user) => {
  console.log(user.name);
});
```

---

## Avantages

* Performance (binaire + HTTP/2)
* Contrats typés stricts
* Streaming natif
* Génération de code multi-langages
* Intercepteurs pour auth, logging, retry

---

## Inconvénients

* Pas nativement supporté par les navigateurs (gRPC-Web nécessaire)
* Debugging plus difficile (binaire)
* Courbe d'apprentissage Protobuf
* Outils moins universels que REST

---

## Pièges courants

* Oublier de régénérer les stubs après un changement .proto
* Breaking changes dans les messages (retirer des champs)
* Timeouts non configurés
* Streaming sans gestion de backpressure

---

## À ne pas confondre

* gRPC vs REST (binaire/HTTP2 vs JSON/HTTP1)
* gRPC vs GraphQL (RPC vs query language)
* gRPC vs WebSocket (RPC typé vs canal brut)

---

## Explication simplifiée

gRPC c'est comme appeler une fonction distante comme si elle était locale, mais avec un contrat strict défini à l'avance (.proto). Plus rapide que REST, typé, et supporte le streaming — parfait entre microservices.

---

## Explication avancée

gRPC utilise HTTP/2 pour multiplexer plusieurs appels sur une connexion TCP unique, évitant le head-of-line blocking. Protobuf sérialise en binaire compact avec des tags numériques, permettant l'évolution du schéma tant qu'on n'alloue pas les mêmes tags. Les 4 modes de streaming ouvrent des cas d'usage impossibles en REST (flux de métriques, chat). gRPC-Web proxifie vers HTTP/1.1 pour les navigateurs, au prix de perdre le client streaming.

---

## Points critiques à retenir

* [CRITIQUE] Ne jamais réutiliser un tag Protobuf retiré
* [CRITIQUE] HTTP/2 obligatoire (TLS en prod)
* [IMPORTANT] Régénérer les stubs à chaque changement .proto
* [IMPORTANT] gRPC-Web pour les navigateurs
* [PIÈGE] Streaming sans backpressure = OOM
