---
id: tcpip
label: TCP/IP
category: protocole
priority: high
status: learning
createdAt: 2025-01-08T10:00:00Z
updatedAt: 2025-01-08T10:00:00Z
relations:
  - target: linux
    type: runs_on
    weight: 0.6
resources:
  - type: documentation
    title: RFC 793 - TCP
    url: https://www.rfc-editor.org/rfc/rfc793
---

## Qu'est-ce que TCP/IP ?

TCP/IP (Transmission Control Protocol / Internet Protocol) est la suite de protocoles fondamentale pour la communication sur Internet.

## Les 4 couches

1. **Application** — HTTP, DNS, FTP, SSH
2. **Transport** — TCP (fiable) / UDP (rapide, sans garantie)
3. **Internet** — Adressage IP, routage (IPv4/IPv6)
4. **Liaison** — Ethernet, Wi-Fi, transmission physique

## TCP vs UDP

| Caractéristique | TCP | UDP |
|----------------|-----|-----|
| Fiabilité | ✓ garantie | ✗ best-effort |
| Ordre | ✓ ordonné | ✗ non ordonné |
| Vitesse | plus lent | plus rapide |
| Usage | HTTP, SSH | vidéo, DNS |

## Concepts clés

- **Adresse IP** : Identifiant réseau unique (192.168.1.1)
- **Port** : Identifiant de processus (HTTP=80, HTTPS=443, SSH=22)
- **Poignée de main à 3 temps** : SYN → SYN-ACK → ACK
- **Masque de sous-réseau** : Définit la partie réseau vs hôte
