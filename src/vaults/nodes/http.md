---
id: http
label: HTTP
category: protocole
priority: high
status: mastered
createdAt: 2025-01-10T10:00:00Z
updatedAt: 2025-01-10T10:00:00Z
relations:
  - target: tcpip
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: Documentation HTTP - MDN
    url: https://developer.mozilla.org/fr/docs/Web/HTTP
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
