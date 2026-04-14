---
id: websockets
label: WebSockets
category: protocole
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:25.381Z'
updatedAt: '2026-04-14T18:00:25.381Z'
relations:
  - target: javascript
    type: related
    weight: 0.7
  - target: tcp-ip
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: MDN – WebSockets API
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API'
  - type: documentation
    title: RFC 6455 – The WebSocket Protocol
    url: 'https://www.rfc-editor.org/rfc/rfc6455'
  - type: vidéo
    title: Fireship – WebSockets in 100 Seconds
    url: 'https://www.youtube.com/watch?v=1BfCnjr_Vjg'
---

## Résumé rapide

WebSocket est un protocole de communication bidirectionnel full-duplex sur une seule connexion TCP, permettant au serveur de pousser des données au client en temps réel sans polling HTTP.

---

## Définition

WebSocket est un protocole standardisé (RFC 6455) qui upgrade une connexion HTTP en canal bidirectionnel persistant. Une fois établie via handshake, la connexion permet au client et au serveur d'échanger des messages à tout moment sans overhead HTTP.

---

## Histoire

* Proposé en 2008, standardisé RFC 6455 en 2011
* Support natif dans tous les navigateurs modernes
* Adopté par Slack, Discord, trading apps, jeux en ligne
* Socket.IO popularise l'usage au-dessus de WebSocket
* Concurrencé par Server-Sent Events et HTTP/3

---

## Objectif

* Communication temps réel bidirectionnelle
* Éviter le polling HTTP coûteux
* Minimiser la latence (pas d'en-tête HTTP par message)
* Permettre le push serveur → client

---

## Domaines d'utilisation

* Chat et messagerie en temps réel
* Notifications push
* Collaborative editing (Google Docs, Figma)
* Jeux multijoueurs
* Trading et dashboards financiers

---

## Fonctionnement

* Handshake HTTP avec `Upgrade: websocket`
* Connexion TCP conservée après le handshake
* Trames binaires ou texte dans les deux sens
* Ping/Pong pour garder la connexion vivante
* Fermeture via trame Close

---

## Concepts clés

* **Handshake** — Upgrade HTTP → WebSocket
* **Frame** — Unité de transmission
* **Opcode** — Type de trame (text, binary, close, ping, pong)
* **Masking** — Obfuscation des frames client → serveur
* **Subprotocol** — Négocié via `Sec-WebSocket-Protocol`
* **wss://** — WebSocket sur TLS

---

## Exemple

```javascript
// Client
const ws = new WebSocket('wss://chat.example.com');

ws.onopen = () => ws.send(JSON.stringify({ type: 'hello' }));
ws.onmessage = (e) => console.log('Received:', e.data);
ws.onclose = () => console.log('Disconnected');
ws.onerror = (err) => console.error(err);

// Serveur Node.js (ws)
import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    wss.clients.forEach((c) => c.send(msg));
  });
});
```

---

## Avantages

* Communication bidirectionnelle à faible latence
* Pas d'overhead HTTP par message
* Push serveur natif
* Supporté nativement par les navigateurs
* Idéal pour le temps réel

---

## Inconvénients

* Connexions persistantes coûteuses en mémoire serveur
* Complexité de la scalabilité horizontale (sticky sessions)
* Pas de cache HTTP
* Proxies/firewalls peuvent bloquer
* Pas de codes de statut HTTP

---

## Pièges courants

* Oublier de gérer la reconnexion côté client
* Pas de heartbeat → connexions zombies
* Scalabilité : oublier Redis pub/sub pour le broadcasting
* Ne pas limiter la taille des messages (DoS)

---

## À ne pas confondre

* WebSocket vs SSE (bidirectionnel vs serveur→client)
* WebSocket vs HTTP Long Polling (persistant vs simulé)
* WebSocket vs WebRTC (serveur vs P2P)

---

## Explication simplifiée

HTTP classique c'est comme envoyer des lettres : tu demandes, tu attends la réponse. WebSocket c'est un téléphone : une fois la ligne ouverte, les deux côtés peuvent parler quand ils veulent, sans raccrocher. Parfait pour un chat ou un jeu en ligne.

---

## Explication avancée

Le handshake WebSocket réutilise HTTP pour traverser les proxies : le client envoie `Upgrade: websocket` avec une clé aléatoire, le serveur répond avec une clé calculée (SHA-1 + GUID). Après le switch, la connexion TCP est gouvernée par le protocole WebSocket, pas HTTP. Les messages sont encapsulés en frames avec header court (2-14 octets). Pour scaler horizontalement, il faut un backend pub/sub (Redis, NATS) car chaque connexion est liée à un serveur unique.

---

## Points critiques à retenir

* [CRITIQUE] Utiliser wss:// en production (TLS)
* [CRITIQUE] Gérer la reconnexion automatique côté client
* [IMPORTANT] Heartbeat (ping/pong) pour détecter les déconnexions
* [IMPORTANT] Redis pub/sub pour scaler horizontalement
* [PIÈGE] Connexions persistantes = charge mémoire serveur
