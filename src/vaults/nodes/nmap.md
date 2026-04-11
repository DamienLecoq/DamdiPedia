---
id: nmap
label: Nmap
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-11T14:57:30.731Z'
updatedAt: '2026-04-11T14:57:30.731Z'
relations:
  - target: tcp-ip
    type: uses
    weight: 0.9
resources:
  - type: documentation
    title: Nmap – Documentation officielle
    url: 'https://nmap.org/book/man.html'
  - type: documentation
    title: Nmap Reference Guide
    url: 'https://nmap.org/book/man.html'
  - type: vidéo
    title: NetworkChuck – Nmap Tutorial
    url: 'https://www.youtube.com/watch?v=4t4kBkMsDbQ'
  - type: blog
    title: HackerTarget – Nmap Cheat Sheet
    url: 'https://hackertarget.com/nmap-cheatsheet-a-quick-reference-guide/'
  - type: cours
    title: TryHackMe – Nmap Room
    url: 'https://tryhackme.com/room/furthernmap'
---

## Résumé rapide

Nmap (Network Mapper) est un scanner de réseau open source utilisé pour la découverte d'hôtes, le scan de ports, la détection de services et de systèmes d'exploitation. C'est l'outil de reconnaissance réseau le plus utilisé en cybersécurité.

---

## Définition

Nmap est un outil en ligne de commande qui permet d'explorer un réseau et d'auditer sa sécurité. Il envoie des paquets spécialement forgés vers les cibles et analyse les réponses pour déterminer quels hôtes sont actifs, quels ports sont ouverts, quels services tournent et quel système d'exploitation est utilisé. Il dispose aussi d'un moteur de scripts (NSE) pour automatiser des tâches avancées.

---

## Histoire

* Créé en 1997 par Gordon « Fyodor » Lyon
* Publié initialement dans le magazine Phrack
* Apparition dans le film Matrix Reloaded (2003) — scène de hacking réaliste
* Le Nmap Scripting Engine (NSE) a été ajouté en 2006
* Zenmap (interface graphique) créé pour faciliter l'accès aux débutants
* Toujours activement maintenu et mis à jour

---

## Objectif

* Découvrir les hôtes actifs sur un réseau
* Identifier les ports ouverts et les services associés
* Détecter le système d'exploitation et les versions de logiciels
* Automatiser des audits de sécurité avec les scripts NSE
* Cartographier la topologie d'un réseau

---

## Domaines d'utilisation

* Audit de sécurité et pentesting
* Administration système et réseau
* Inventaire des actifs réseau
* Détection de services non autorisés
* Vérification de la conformité des pare-feux

---

## Fonctionnement

* Nmap envoie des **paquets TCP/UDP/ICMP** vers les cibles
* Il analyse les **réponses** (ou l'absence de réponse) pour déterminer l'état des ports
* Les états possibles d'un port : **open**, **closed**, **filtered**, **unfiltered**
* La détection d'OS utilise le **TCP/IP fingerprinting** (analyse des particularités de la pile réseau)
* Le moteur NSE exécute des scripts Lua pour des tests avancés

```
  ┌─────────┐    SYN     ┌──────────┐
  │  Nmap   │───────────▶│  Cible   │
  │(scanner)│◀───────────│ (hôte)   │
  └─────────┘  SYN/ACK   └──────────┘
       │         ou RST
       │         ou rien (filtered)
       ▼
  Analyse des réponses
  → Port ouvert / fermé / filtré
```

---

## Concepts clés

* **SYN Scan (-sS)** — Scan furtif (half-open), le plus courant, ne complète pas la connexion TCP
* **Connect Scan (-sT)** — Scan complet TCP, utilisé sans privilèges root
* **UDP Scan (-sU)** — Scan des ports UDP, plus lent car pas de réponse garantie
* **Service Detection (-sV)** — Identification des services et de leurs versions
* **OS Detection (-O)** — Détection du système d'exploitation par fingerprinting
* **NSE Scripts (--script)** — Moteur de scripts pour automatiser des tests
* **Timing Templates (-T0 à -T5)** — Contrôle de la vitesse de scan

---

## Exemple

```bash
# Scan de découverte d'hôtes (ping sweep)
nmap -sn 192.168.1.0/24

# Scan SYN des 1000 ports les plus courants
sudo nmap -sS 192.168.1.100

# Scan complet avec détection de services et d'OS
sudo nmap -sS -sV -O -A 192.168.1.100

# Scan de tous les 65535 ports TCP
sudo nmap -sS -p- 192.168.1.100

# Scan de ports spécifiques
nmap -p 22,80,443,8080 192.168.1.100

# Scan UDP des ports courants
sudo nmap -sU --top-ports 100 192.168.1.100

# Utilisation de scripts NSE (détection de vulnérabilités)
nmap --script vuln 192.168.1.100

# Scan furtif avec timing lent
sudo nmap -sS -T2 -f 192.168.1.100

# Export des résultats en XML
nmap -sV -oX resultats.xml 192.168.1.100

# Scan avec script spécifique (HTTP)
nmap --script http-enum -p 80,443 192.168.1.100
```

---

## Avantages

* Gratuit et open source
* Extrêmement puissant et flexible
* Moteur de scripts extensible (NSE) avec des centaines de scripts
* Multi-plateformes (Linux, Windows, macOS)
* Documentation exhaustive et communauté immense

---

## Inconvénients

* Les scans complets peuvent être lents (surtout UDP)
* Peut être détecté par les systèmes de détection d'intrusion (IDS/IPS)
* Nécessite les droits root/administrateur pour les scans avancés (SYN, OS)
* La syntaxe peut être complexe pour les débutants
* Résultats parfois imprécis pour la détection d'OS

---

## Pièges courants

* Scanner un réseau sans autorisation (illégal dans la plupart des pays)
* Utiliser `-T5` (timing agressif) et se faire bloquer par l'IDS
* Oublier le scan UDP (de nombreux services critiques utilisent UDP)
* Ne pas exporter les résultats pour analyse ultérieure
* Confondre un port filtré avec un port fermé

---

## À ne pas confondre

* Nmap vs Masscan (Nmap est plus précis, Masscan est beaucoup plus rapide)
* Nmap vs Netcat (Nmap scanne, Netcat établit des connexions)
* Scan SYN vs Scan Connect (SYN est furtif et nécessite root, Connect ne l'est pas)
* Nmap vs Nessus (Nmap découvre, Nessus évalue les vulnérabilités en profondeur)

---

## Explication simplifiée

Nmap, c'est comme sonner à toutes les portes d'un immeuble pour voir qui est chez soi. Quand quelqu'un répond, tu sais que cette porte (port) est ouverte. En écoutant attentivement la réponse, tu peux même deviner qui habite là (quel service tourne).

---

## Explication avancée

Nmap utilise des techniques de manipulation de paquets TCP/IP bas niveau pour l'analyse réseau. Le SYN scan envoie un paquet SYN et analyse la réponse : un SYN/ACK indique un port ouvert (Nmap envoie alors un RST pour ne pas compléter la connexion), un RST indique un port fermé, et l'absence de réponse indique un port filtré. La détection d'OS repose sur l'analyse des particularités de l'implémentation de la pile TCP/IP (window size, TTL, DF bit, options TCP) comparées à une base de signatures. Le NSE permet d'écrire des scripts Lua qui interagissent avec les services découverts pour de la détection de vulnérabilités, du brute-force ou de l'extraction d'informations.

---

## Points critiques à retenir

* [CRITIQUE] Toujours obtenir une autorisation avant de scanner un réseau
* [CRITIQUE] `-sS` (SYN scan) est le scan par défaut et le plus utilisé
* [IMPORTANT] `-sV` permet de détecter les versions des services
* [IMPORTANT] Le NSE étend considérablement les capacités de Nmap
* [PIÈGE] Ne pas négliger le scan UDP (`-sU`)
* [PIÈGE] Un port filtré ne signifie pas qu'il est fermé
