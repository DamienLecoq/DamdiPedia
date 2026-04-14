---
id: tcp-ip
label: TCP/IP
category: protocole
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:16.124Z'
updatedAt: '2026-04-14T18:00:16.124Z'
relations: []
resources:
  - type: livre
    title: TCP/IP Illustrated – W. Richard Stevens
    url: 'https://www.goodreads.com/book/show/161154.TCP_IP_Illustrated_Volume_1'
  - type: documentation
    title: RFC 793 – Transmission Control Protocol
    url: 'https://www.rfc-editor.org/rfc/rfc793'
  - type: vidéo
    title: Computerphile – TCP Explained
    url: 'https://www.youtube.com/watch?v=PpsEaqJV_A0'
---

## Résumé rapide

TCP/IP est la suite de protocoles fondamentale d'Internet. TCP fournit une communication fiable orientée connexion, tandis qu'IP assure le routage des paquets entre machines via des adresses uniques.

---

## Définition

TCP (Transmission Control Protocol) et IP (Internet Protocol) forment le modèle à 4 couches utilisé par Internet : liaison, réseau (IP), transport (TCP/UDP), application. TCP garantit ordre, intégrité et livraison via des accusés de réception.

---

## Histoire

* Conçu par Vint Cerf et Bob Kahn en 1974
* Standardisé en 1981 (RFC 791 pour IPv4, RFC 793 pour TCP)
* Remplace NCP sur ARPANET le 1er janvier 1983
* IPv6 standardisé en 1998 (RFC 2460)
* Fondement technique d'Internet moderne

---

## Objectif

* Permettre la communication entre machines hétérogènes
* Garantir livraison fiable (TCP)
* Router les paquets via des réseaux interconnectés (IP)
* Offrir une abstraction universelle de communication

---

## Domaines d'utilisation

* Web (HTTP sur TCP)
* Email (SMTP, IMAP)
* SSH et accès distant
* Quasi-totalité des communications Internet

---

## Fonctionnement

* **IP** — Adresse et route les paquets (best effort)
* **TCP** — Établit une connexion (3-way handshake)
* **Segmentation** — Découpe les données en segments
* **Accusés** — ACK pour confirmer la réception
* **Retransmission** — En cas de perte ou timeout
* **Contrôle de flux** — Fenêtre glissante

---

## Concepts clés

* **3-Way Handshake** — SYN, SYN-ACK, ACK
* **Port** — Identifie un service sur une machine
* **Socket** — Couple IP:Port
* **MTU/MSS** — Taille max d'un paquet/segment
* **Congestion Control** — Slow start, AIMD
* **TIME_WAIT** — État post-fermeture

---

## Exemple

```bash
# Voir les connexions TCP établies
ss -tnp

# Tester un port TCP
nc -vz example.com 443

# Capturer un handshake TCP
tcpdump -i any -n 'tcp[tcpflags] & (tcp-syn|tcp-ack) != 0'

# Trace route IP
traceroute example.com
```

---

## Avantages

* Fiabilité (livraison garantie)
* Ordre des données préservé
* Gestion de la congestion
* Interopérabilité universelle
* Socket API standardisée

---

## Inconvénients

* Overhead important (handshake, ACK)
* Latence liée à la retransmission
* Head-of-line blocking
* Non adapté au temps réel (préférer UDP/QUIC)

---

## Pièges courants

* Oublier la gestion des TIME_WAIT (ports épuisés)
* Confondre TCP et UDP dans le choix du protocole
* Ignorer la taille MTU (fragmentation)
* Ne pas gérer les reconnexions

---

## À ne pas confondre

* TCP vs UDP (fiable vs rapide)
* IPv4 vs IPv6 (32 vs 128 bits)
* TCP vs QUIC (TCP vs UDP+TLS)

---

## Explication simplifiée

IP c'est l'adresse postale, TCP c'est le recommandé avec accusé de réception. IP achemine chaque paquet au bon destinataire, TCP s'assure que tout arrive dans l'ordre, sans perte, et redemande si quelque chose manque.

---

## Explication avancée

TCP établit une connexion via un 3-way handshake (SYN → SYN-ACK → ACK), puis utilise des numéros de séquence pour ordonner les segments et détecter les pertes. Le contrôle de congestion (Reno, Cubic, BBR) adapte le débit selon le réseau. IP route les paquets de manière stateless via des tables de routage. IPv6 apporte un espace d'adressage massif et simplifie l'en-tête. QUIC (HTTP/3) remplace TCP par UDP+TLS pour réduire la latence et le head-of-line blocking.

---

## Points critiques à retenir

* [CRITIQUE] TCP est orienté connexion, UDP non
* [CRITIQUE] 3-way handshake établit la connexion
* [IMPORTANT] Ports 0-1023 réservés aux services système
* [IMPORTANT] IPv6 pour l'avenir (épuisement IPv4)
* [PIÈGE] TIME_WAIT peut épuiser les ports éphémères
