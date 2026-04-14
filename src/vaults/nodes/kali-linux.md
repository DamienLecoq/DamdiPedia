---
id: kali-linux
label: Kali Linux
category: os
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:05.221Z'
updatedAt: '2026-04-14T17:59:05.221Z'
relations:
  - target: pentesting
    type: uses
    weight: 0.9
  - target: nmap
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: Kali Linux – Documentation officielle
    url: 'https://www.kali.org/docs/'
  - type: documentation
    title: Kali Tools – Liste des outils
    url: 'https://www.kali.org/tools/'
  - type: vidéo
    title: NetworkChuck – Kali Linux for Beginners
    url: 'https://www.youtube.com/watch?v=lZAoFs75_cs'
  - type: cours
    title: Offensive Security – Kali Linux Revealed
    url: 'https://kali.training/'
  - type: blog
    title: Kali Linux Tutorials – HackerSploit
    url: 'https://www.youtube.com/watch?v=U1w4T03B30I'
---

## Résumé rapide

Kali Linux est une distribution Linux basée sur Debian, spécialement conçue pour le test d'intrusion (pentesting) et l'audit de sécurité. Elle embarque plus de 600 outils de cybersécurité préinstallés comme Nmap, Metasploit, Wireshark et Burp Suite.

---

## Définition

Kali Linux est un système d'exploitation open source maintenu par Offensive Security. Il fournit un environnement complet et prêt à l'emploi pour les professionnels de la cybersécurité, les chercheurs en sécurité et les hackers éthiques. Chaque outil est configuré et optimisé pour des tâches spécifiques de test de sécurité.

---

## Histoire

* Créé en 2013 par Offensive Security comme successeur de BackTrack Linux
* BackTrack existait depuis 2006 et était basé sur Ubuntu
* Kali a été reconstruit de zéro sur Debian pour plus de stabilité
* Passage au modèle rolling release en 2016
* En 2019, passage de GNOME à Xfce comme environnement de bureau par défaut
* Support officiel de WSL (Windows Subsystem for Linux) depuis 2018

---

## Objectif

* Fournir un environnement complet pour le test d'intrusion
* Centraliser les outils de sécurité dans une distribution unique
* Offrir une plateforme standardisée pour les audits de sécurité
* Servir de support pour les certifications OSCP et OSEP

---

## Domaines d'utilisation

* Tests d'intrusion (pentesting) professionnels
* Audit de sécurité réseau et applicatif
* Analyse forensique numérique
* Rétro-ingénierie de logiciels malveillants
* Recherche de vulnérabilités
* Formation et certifications en cybersécurité

---

## Fonctionnement

* Basé sur Debian avec un noyau Linux personnalisé
* Peut être installé en **dual-boot**, sur **machine virtuelle** (VMware/VirtualBox) ou en **live USB**
* Le compte root est désactivé par défaut depuis 2020 (utilisateur `kali`/`kali`)
* Les outils sont organisés par catégories dans le menu (Information Gathering, Vulnerability Analysis, Web Application Analysis, etc.)
* Supporte les architectures x86, x64, ARM (Raspberry Pi)

---

## Concepts clés

* **Rolling Release** — Mises à jour continues sans réinstallation
* **Metapackages** — Groupes d'outils installables par catégorie (`kali-tools-web`, `kali-tools-wireless`)
* **Persistence** — Mode live USB avec sauvegarde des données entre redémarrages
* **Undercover Mode** — Thème imitant Windows 10 pour la discrétion
* **Kali NetHunter** — Version mobile pour appareils Android

---

## Exemple

```bash
# Mise à jour du système
sudo apt update && sudo apt full-upgrade -y

# Installer un metapackage d'outils web
sudo apt install kali-tools-web

# Scanner un réseau local avec Nmap
nmap -sn 192.168.1.0/24

# Lancer Metasploit Framework
msfconsole

# Vérifier les outils installés
dpkg --list | grep kali-tools

# Démarrer le service PostgreSQL pour Metasploit
sudo systemctl start postgresql
sudo msfdb init
```

---

## Avantages

* Plus de 600 outils de sécurité préinstallés et préconfigurés
* Communauté active et documentation abondante
* Mises à jour régulières (rolling release)
* Gratuit et open source
* Supporte de nombreuses plateformes (VM, USB, ARM, cloud, WSL)

---

## Inconvénients

* Ne convient pas comme système d'exploitation quotidien
* Consommation de ressources importante avec tous les outils installés
* Courbe d'apprentissage abrupte pour les débutants
* Certains outils nécessitent une configuration manuelle poussée
* Peut être instable avec certains pilotes matériels

---

## Pièges courants

* Utiliser Kali Linux sans comprendre les outils qu'on lance
* Effectuer des tests sur des systèmes sans autorisation écrite (illégal)
* Installer Kali comme système principal au quotidien
* Négliger les mises à jour, rendant les outils obsolètes
* Utiliser le compte root pour tout faire (mauvaise pratique depuis 2020)

---

## À ne pas confondre

* Kali Linux vs Parrot Security OS (deux distributions de pentesting, Parrot est plus légère)
* Kali Linux vs Ubuntu (Kali n'est pas conçu pour un usage bureautique)
* Pentesting vs hacking malveillant (le pentesting est légal et autorisé)
* Kali Linux vs BackTrack (Kali est le successeur moderne de BackTrack)

---

## Explication simplifiée

Kali Linux, c'est comme une mallette d'outils pour un serrurier : elle contient tout ce qu'il faut pour tester si une serrure (un système informatique) est solide ou s'il est possible de l'ouvrir. Mais tout comme un serrurier a besoin d'une autorisation pour tester les serrures des autres, un pentester doit avoir la permission avant de tester un système.

---

## Explication avancée

Kali Linux repose sur un noyau Linux durci avec des patches spécifiques pour l'injection de paquets réseau (monitor mode WiFi), le support des périphériques USB spécialisés (adaptateurs WiFi, SDR, HID) et des fonctionnalités de forensique (montage en lecture seule). La distribution utilise un modèle de build reproductible et signe cryptographiquement tous ses paquets. Les metapackages permettent de créer des installations minimales ou spécialisées selon le type d'audit à réaliser.

---

## Points critiques à retenir

* [CRITIQUE] Toujours obtenir une autorisation écrite avant tout test d'intrusion
* [CRITIQUE] Kali est un outil professionnel, pas un jouet pour « pirater »
* [IMPORTANT] Préférer l'installation en VM ou live USB plutôt qu'en système principal
* [IMPORTANT] Maintenir le système à jour pour avoir les dernières versions des outils
* [PIÈGE] Ne pas utiliser Kali sans comprendre les fondamentaux du réseau et de Linux
* [PIÈGE] Ne jamais tester sur des systèmes sans autorisation — c'est un délit pénal
