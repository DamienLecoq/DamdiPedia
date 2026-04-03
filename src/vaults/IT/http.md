---
id: http
label: HTTP
category: network
priority: high
status: mastered
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: 'Fri Jan 10 2025 11:00:00 GMT+0100 (heure normale d’Europe centrale)'
updatedAt: '2026-04-03T12:39:05.874Z'
relations:
  - target: tcpip
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: Documentation HTTP - MDN
    url: 'https://developer.mozilla.org/fr/docs/Web/HTTP'
---
## Qu'est-ce que HTTP ?

HTTP est le protocole de couche application pour le transfert de données web.

## Concepts clés

- **Méthodes** : GET POST PUT PATCH DELETE
- **Codes de statut** : 2xx 3xx 4xx 5xx
- **En-têtes** : Content-Type Authorization Cache-Control
- **HTTPS** : HTTP sur TLS (chiffré)

## Cycle requête / réponse

1. Le client envoie une requête HTTP avec méthode, en-têtes et corps optionnel
2. Le serveur traite et répond avec un code de statut + corps
3. Connexion fermée (HTTP/1.1) ou maintenue (Keep-Alive / HTTP/2)
