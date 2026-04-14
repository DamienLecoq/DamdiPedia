---
id: burp-suite
label: Burp Suite
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:10.354Z'
updatedAt: '2026-04-14T17:58:10.354Z'
relations:
  - target: pentesting
    type: uses
    weight: 0.9
  - target: api-rest
    type: uses
    weight: 0.7
resources:
  - type: documentation
    title: PortSwigger – Documentation Burp Suite
    url: 'https://portswigger.net/burp/documentation'
  - type: documentation
    title: PortSwigger – Web Security Academy
    url: 'https://portswigger.net/web-security'
  - type: vidéo
    title: John Hammond – Burp Suite Tutorial
    url: 'https://www.youtube.com/watch?v=G3hpAeoZ4ek'
  - type: blog
    title: PortSwigger Research Blog
    url: 'https://portswigger.net/research'
  - type: cours
    title: TryHackMe – Burp Suite Basics
    url: 'https://tryhackme.com/room/burpsuitebasics'
---

## Résumé rapide

Burp Suite est une plateforme intégrée de test de sécurité des applications web développée par PortSwigger. Elle agit comme un proxy d'interception HTTP/HTTPS permettant d'analyser, modifier et rejouer les requêtes entre le navigateur et le serveur.

---

## Définition

Burp Suite est un outil de sécurité applicative qui fonctionne comme un proxy man-in-the-middle entre le navigateur de l'utilisateur et le serveur web cible. Il permet d'intercepter, d'inspecter et de modifier toutes les requêtes et réponses HTTP/HTTPS. Il intègre des outils de scan automatisé de vulnérabilités, de fuzzing, d'analyse et de reporting.

---

## Histoire

* Créé en 2003 par Dafydd Stuttard (PortSwigger)
* Développé en Java pour assurer la portabilité
* Version Community (gratuite) et Professional (payante) depuis le début
* Burp Suite Enterprise lancé pour l'intégration CI/CD
* Web Security Academy créée en 2018 comme plateforme d'apprentissage gratuite
* Intégration de Bambda (filtres basés sur Java) dans les versions récentes

---

## Objectif

* Tester la sécurité des applications web
* Intercepter et analyser le trafic HTTP/HTTPS
* Identifier les vulnérabilités web (XSS, SQLi, CSRF, etc.)
* Automatiser les tests de sécurité avec le scanner intégré
* Étendre les tests avec des extensions personnalisées

---

## Domaines d'utilisation

* Pentesting d'applications web
* Bug bounty
* Audit de sécurité des APIs REST et GraphQL
* Développement sécurisé (tests pendant le développement)
* Formation à la sécurité web

---

## Fonctionnement

* Le navigateur est configuré pour utiliser Burp comme **proxy** (127.0.0.1:8080)
* Burp intercepte chaque requête et réponse HTTP/HTTPS
* Le certificat CA de Burp doit être installé pour intercepter le trafic HTTPS
* L'utilisateur peut **modifier**, **rejouer** ou **automatiser** les requêtes
* Le scanner analyse automatiquement les points d'entrée pour détecter les vulnérabilités

```
  ┌───────────┐    Requête     ┌───────────┐    Requête    ┌──────────┐
  │ Navigateur│──────────────▶│ Burp Suite│─────────────▶│ Serveur  │
  │           │◀──────────────│  (Proxy)  │◀─────────────│   Web    │
  └───────────┘    Réponse     └───────────┘    Réponse    └──────────┘
                                     │
                              Interception
                              Modification
                              Analyse
```

---

## Concepts clés

* **Proxy** — Intercepte le trafic HTTP/HTTPS entre le navigateur et le serveur
* **Repeater** — Permet de modifier et rejouer manuellement des requêtes
* **Intruder** — Outil de fuzzing et de brute-force automatisé
* **Scanner** — Détection automatique de vulnérabilités (version Pro)
* **Decoder** — Encodage/décodage de données (Base64, URL, HTML, etc.)
* **Comparer** — Comparaison visuelle de requêtes ou réponses
* **Extender** — Système d'extensions (BApp Store) pour ajouter des fonctionnalités

---

## Exemple

```
# Configuration du proxy dans le navigateur
Proxy: 127.0.0.1
Port: 8080

# Installation du certificat CA de Burp
# 1. Naviguer vers http://burpsuite
# 2. Télécharger le certificat CA
# 3. L'importer dans le navigateur

# Exemple d'interception d'une requête POST de login
POST /api/login HTTP/1.1
Host: example.com
Content-Type: application/json

{"username": "admin", "password": "test123"}

# Modification dans Repeater pour tester une injection SQL
POST /api/login HTTP/1.1
Host: example.com
Content-Type: application/json

{"username": "admin' OR '1'='1", "password": "anything"}

# Intruder — Positions pour brute-force
POST /api/login HTTP/1.1
Host: example.com
Content-Type: application/json

{"username": "admin", "password": "§payload§"}
# Charger une wordlist dans les payloads
```

---

## Avantages

* Interface intégrée regroupant tous les outils nécessaires
* Repeater extrêmement puissant pour les tests manuels
* Extensible via le BApp Store (centaines d'extensions)
* Web Security Academy gratuite pour l'apprentissage
* Version Community gratuite suffisante pour débuter

---

## Inconvénients

* Version Community limitée (pas de scanner, Intruder lent)
* Version Professional payante (environ 449 $/an)
* Consomme beaucoup de mémoire (application Java)
* Configuration initiale du proxy et du certificat CA nécessaire
* Peut être lent sur de très gros sites web

---

## Pièges courants

* Oublier d'installer le certificat CA de Burp pour intercepter le HTTPS
* Laisser l'interception activée et bloquer involontairement la navigation
* Ne pas filtrer le trafic et se retrouver noyé de requêtes
* Utiliser Intruder en version Community (throttled) au lieu de scripts Python
* Tester des vulnérabilités sur des sites sans autorisation

---

## À ne pas confondre

* Burp Suite vs OWASP ZAP (commercial vs open source)
* Proxy d'interception vs VPN (l'un analyse, l'autre chiffre le trafic)
* Scanner automatique vs test manuel (complémentaires, pas interchangeables)
* Burp Suite Community vs Pro (le scanner et Intruder rapide sont Pro uniquement)

---

## Explication simplifiée

Burp Suite, c'est comme un agent de contrôle à la frontière. Chaque « colis » (requête web) qui passe entre ton navigateur et le site web est inspecté. Tu peux ouvrir le colis, regarder ce qu'il contient, le modifier, ou même en créer de nouveaux pour tester comment le destinataire réagit.

---

## Explication avancée

Burp Suite fonctionne comme un proxy MITM transparent. Pour le HTTPS, il génère des certificats à la volée signés par sa propre CA (installée dans le navigateur). Le scanner actif envoie des payloads spécifiques à chaque point d'insertion (paramètres GET/POST, headers, cookies) et analyse les réponses pour détecter les vulnérabilités via des techniques de détection différentielle et d'analyse comportementale. Le moteur Intruder supporte différents types d'attaques (Sniper, Battering Ram, Pitchfork, Cluster Bomb) pour la combinaison de payloads. L'API d'extension (Montoya API) permet de développer des plugins en Java, Python (Jython) ou Ruby (JRuby) pour automatiser des workflows complexes.

---

## Points critiques à retenir

* [CRITIQUE] Toujours installer le certificat CA pour intercepter le HTTPS
* [CRITIQUE] Configurer les filtres de scope pour cibler uniquement le site testé
* [IMPORTANT] Repeater est l'outil le plus utilisé pour les tests manuels
* [IMPORTANT] La version Community est suffisante pour apprendre les bases
* [PIÈGE] Ne jamais oublier de désactiver l'interception quand on a terminé
* [PIÈGE] Tester uniquement sur des applications pour lesquelles on a une autorisation
