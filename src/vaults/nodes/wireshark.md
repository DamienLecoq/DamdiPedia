---
id: wireshark
label: Wireshark
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-13T12:21:21.676Z'
updatedAt: '2026-04-13T12:21:21.676Z'
relations:
  - target: tcp-ip
    type: uses
    weight: 0.9
resources:
  - type: documentation
    title: Wireshark – Documentation officielle
    url: 'https://www.wireshark.org/docs/'
  - type: documentation
    title: Wireshark Display Filter Reference
    url: 'https://www.wireshark.org/docs/dfref/'
  - type: vidéo
    title: Chris Greer – Wireshark Masterclass
    url: 'https://www.youtube.com/watch?v=lb1Dw0elw0Q'
  - type: blog
    title: Wireshark Wiki – Capture Filters
    url: 'https://wiki.wireshark.org/CaptureFilters'
  - type: cours
    title: Udemy – Wireshark Network Analysis
    url: 'https://www.udemy.com/course/wireshark/'
---

## Résumé rapide

Wireshark est un analyseur de protocoles réseau open source. Il capture et inspecte le trafic réseau en temps réel, permettant d'analyser chaque paquet au niveau octet. C'est l'outil de référence pour le diagnostic réseau et l'analyse de sécurité.

---

## Définition

Wireshark est un sniffeur de paquets avec une interface graphique qui permet de capturer le trafic sur une interface réseau et de le décoder couche par couche (Ethernet, IP, TCP, HTTP, etc.). Il supporte des centaines de protocoles et fournit des filtres puissants pour isoler le trafic pertinent. Son équivalent en ligne de commande est `tshark`.

---

## Histoire

* Créé en 1998 par Gerald Combs sous le nom Ethereal
* Renommé Wireshark en 2006 suite à un changement d'employeur
* Projet open source sous licence GPL
* Plus de 600 contributeurs actifs
* Supporte plus de 3000 protocoles différents
* Interface graphique reconstruite avec Qt en 2015 (version 2.0)

---

## Objectif

* Diagnostiquer les problèmes réseau (latence, pertes de paquets)
* Analyser le trafic pour détecter des comportements malveillants
* Comprendre le fonctionnement des protocoles en profondeur
* Valider la configuration des pare-feux et des règles de sécurité
* Effectuer de l'analyse forensique réseau

---

## Domaines d'utilisation

* Administration et diagnostic réseau
* Cybersécurité et analyse forensique
* Développement d'applications réseau
* Enseignement des protocoles réseau
* Audit de conformité et débogage de protocoles

---

## Fonctionnement

* Wireshark utilise la bibliothèque **libpcap** (Linux) ou **Npcap** (Windows) pour capturer les paquets
* Chaque paquet est **décodé** couche par couche selon le modèle OSI
* Les **filtres d'affichage** permettent d'isoler le trafic pertinent
* Les **filtres de capture** limitent ce qui est capturé à la source
* Les paquets peuvent être **exportés** et analysés hors ligne

```
  Trafic réseau
       │
       ▼
  ┌──────────┐    Capture     ┌──────────────┐
  │Interface │──────────────▶│  Wireshark    │
  │ réseau   │   (libpcap)   │              │
  └──────────┘               │ Couche 2: ETH │
                              │ Couche 3: IP  │
                              │ Couche 4: TCP │
                              │ Couche 7: HTTP│
                              └──────────────┘
```

---

## Concepts clés

* **Capture Filter** — Filtre BPF appliqué à la capture (`host 192.168.1.1`, `port 80`)
* **Display Filter** — Filtre appliqué à l'affichage (`http.request.method == "GET"`)
* **Dissecteur** — Module qui décode un protocole spécifique
* **Follow Stream** — Reconstitution d'une conversation TCP/UDP complète
* **Coloring Rules** — Coloration des paquets selon le protocole ou les erreurs
* **Pcap** — Format de fichier standard pour les captures réseau

---

## Exemple

```bash
# Lancer une capture en ligne de commande avec tshark
tshark -i eth0 -c 100

# Capturer uniquement le trafic HTTP
tshark -i eth0 -f "port 80" -c 50

# Lire un fichier de capture
tshark -r capture.pcap

# Filtrer les requêtes DNS dans un fichier
tshark -r capture.pcap -Y "dns.qr == 0"

# Exporter les requêtes HTTP
tshark -r capture.pcap -Y "http.request" -T fields -e http.host -e http.request.uri
```

**Filtres d'affichage courants dans Wireshark :**
```
ip.addr == 192.168.1.100          # Tout le trafic vers/depuis cette IP
tcp.port == 443                    # Trafic HTTPS
http.request.method == "POST"     # Requêtes HTTP POST
dns                                # Tout le trafic DNS
tcp.flags.syn == 1                 # Paquets SYN (début de connexion)
tcp.analysis.retransmission        # Retransmissions TCP
frame.len > 1000                   # Paquets de plus de 1000 octets
```

---

## Avantages

* Interface graphique intuitive et puissante
* Supporte plus de 3000 protocoles
* Filtres d'affichage extrêmement flexibles
* Gratuit et open source
* Export en de nombreux formats (pcap, CSV, JSON, XML)

---

## Inconvénients

* Peut consommer beaucoup de mémoire sur de grosses captures
* Ne peut pas capturer le trafic chiffré (TLS) sans les clés
* Nécessite des droits administrateur pour la capture
* L'analyse de gros fichiers pcap peut être lente
* Courbe d'apprentissage importante pour l'analyse avancée

---

## Pièges courants

* Capturer tout le trafic sans filtre et se retrouver submergé de données
* Confondre les filtres de capture (BPF) et les filtres d'affichage (syntaxe différente)
* Oublier que le trafic chiffré (HTTPS) ne peut pas être lu sans les clés de session
* Capturer sur la mauvaise interface réseau
* Ne pas utiliser les profils pour sauvegarder ses configurations de filtres

---

## À ne pas confondre

* Wireshark vs tcpdump (GUI vs CLI, même base libpcap)
* Capture filter vs Display filter (BPF syntax vs Wireshark syntax)
* Wireshark vs Nmap (analyse de trafic vs scan de ports)
* Sniffing vs Man-in-the-Middle (observer vs intercepter et modifier)

---

## Explication simplifiée

Wireshark, c'est comme un microscope pour le réseau. De la même façon qu'un microscope permet de voir des choses invisibles à l'oeil nu, Wireshark te permet de voir chaque paquet de données qui circule sur le réseau, d'en examiner le contenu et de comprendre exactement ce qui se passe.

---

## Explication avancée

Wireshark utilise libpcap pour mettre l'interface réseau en mode promiscuous, capturant ainsi tous les paquets visibles sur le segment réseau (pas seulement ceux destinés à la machine). Chaque paquet est décodé par une chaîne de dissecteurs spécialisés qui extraient les champs de chaque couche protocolaire. Pour le trafic TLS, Wireshark peut déchiffrer les échanges si on lui fournit la clé privée du serveur (RSA sans PFS) ou les clés de session via la variable d'environnement SSLKEYLOGFILE. Les statistiques intégrées (IO Graphs, Flow Graphs, Expert Information) permettent d'identifier rapidement les anomalies réseau comme les retransmissions excessives, les fenêtres TCP nulles ou les temps de réponse anormaux.

---

## Points critiques à retenir

* [CRITIQUE] Wireshark capture le trafic en clair — le trafic chiffré nécessite les clés
* [CRITIQUE] Utiliser des filtres pour cibler l'analyse et éviter la surcharge
* [IMPORTANT] Distinguer filtres de capture (BPF) et filtres d'affichage (Wireshark syntax)
* [IMPORTANT] Follow TCP Stream permet de reconstituer une conversation complète
* [PIÈGE] Capturer le trafic d'un réseau sans autorisation est illégal
* [PIÈGE] Les captures volumineuses peuvent saturer la mémoire de la machine
