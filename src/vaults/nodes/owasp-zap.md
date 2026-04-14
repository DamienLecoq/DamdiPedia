---
id: owasp-zap
label: OWASP ZAP
category: logiciel
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:31.979Z'
updatedAt: '2026-04-14T17:59:31.979Z'
relations:
  - target: burp-suite
    type: related
    weight: 0.8
resources:
  - type: documentation
    title: ZAP – Documentation officielle
    url: 'https://www.zaproxy.org/docs/'
  - type: documentation
    title: OWASP – ZAP Getting Started
    url: 'https://www.zaproxy.org/getting-started/'
  - type: vidéo
    title: OWASP – ZAP Deep Dive
    url: 'https://www.youtube.com/watch?v=CxjHGWk4BCs'
  - type: blog
    title: ZAP Blog officiel
    url: 'https://www.zaproxy.org/blog/'
  - type: cours
    title: ZAP in Ten – Tutoriels vidéo
    url: 'https://www.zaproxy.org/zap-in-ten/'
---

## Résumé rapide

OWASP ZAP (Zed Attack Proxy) est un scanner de sécurité web open source et gratuit, maintenu par la communauté OWASP. Il offre des fonctionnalités similaires à Burp Suite (proxy d'interception, scanner, fuzzer) mais entièrement gratuites, ce qui en fait l'alternative open source de référence.

---

## Définition

OWASP ZAP est un outil de test de sécurité des applications web qui fonctionne comme un proxy d'interception. Il permet de scanner automatiquement les applications web à la recherche de vulnérabilités (XSS, SQLi, CSRF, etc.) et d'effectuer des tests manuels avancés. Développé sous l'égide de l'OWASP (Open Web Application Security Project), il est conçu pour être accessible aux débutants tout en restant puissant pour les professionnels.

---

## Histoire

* Créé en 2010 comme fork du projet Paros Proxy
* Devenu un projet flagship de l'OWASP
* Développé principalement par Simon Bennetts
* En 2023, le projet a migré sous la Software Security Project (SSP)
* Renommé ZAP (sans le préfixe OWASP) lors de cette migration
* L'un des outils de sécurité open source les plus populaires au monde

---

## Objectif

* Offrir un outil de test de sécurité web gratuit et complet
* Permettre l'intégration dans les pipelines CI/CD (DevSecOps)
* Détecter automatiquement les vulnérabilités web courantes
* Fournir une alternative open source à Burp Suite Professional
* Rendre la sécurité applicative accessible à tous

---

## Domaines d'utilisation

* Tests de sécurité automatisés dans les pipelines CI/CD
* Pentesting d'applications web
* Audit de sécurité pour les petites et moyennes entreprises
* Formation et sensibilisation à la sécurité web
* Bug bounty (utilisé en complément de Burp Suite)

---

## Fonctionnement

* ZAP fonctionne comme un **proxy** entre le navigateur et l'application cible
* Le **Spider** explore automatiquement l'application pour découvrir les pages
* Le **scanner actif** teste chaque point d'entrée avec des payloads d'attaque
* Le **scanner passif** analyse le trafic sans envoyer de requêtes supplémentaires
* Les résultats sont classés par niveau de risque (High, Medium, Low, Info)

---

## Concepts clés

* **Spider** — Crawle l'application pour découvrir toutes les URLs
* **Active Scan** — Envoie des payloads d'attaque pour détecter les vulnérabilités
* **Passive Scan** — Analyse le trafic existant sans requêtes additionnelles
* **Contexts** — Définition du périmètre de test (URLs, authentification)
* **Alert** — Vulnérabilité détectée avec niveau de risque et description
* **Add-ons** — Extensions installables depuis le marketplace ZAP
* **Automation Framework** — Configuration YAML pour l'automatisation

---

## Exemple

```bash
# Lancer ZAP en mode daemon (sans GUI) pour l'intégration CI/CD
zap.sh -daemon -port 8080

# Scanner rapide en ligne de commande
zap-cli quick-scan http://example.com

# Scan complet avec l'API
curl "http://localhost:8080/JSON/spider/action/scan/?url=http://target.com"
curl "http://localhost:8080/JSON/ascan/action/scan/?url=http://target.com"

# Utilisation avec Docker
docker run -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py \
  -t http://target.com

# Scan de base dans un pipeline CI/CD (GitHub Actions)
# - name: ZAP Baseline Scan
#   uses: zaproxy/action-baseline@v0.9.0
#   with:
#     target: 'http://localhost:8080'

# Générer un rapport HTML
zap-cli report -o rapport.html -f html
```

---

## Avantages

* Entièrement gratuit et open source
* Scanner actif et passif complets sans restriction
* Intégration CI/CD native (Docker, GitHub Actions, Jenkins)
* API REST complète pour l'automatisation
* Communauté OWASP active et nombreux add-ons

---

## Inconvénients

* Interface graphique moins intuitive que Burp Suite
* Scanner parfois moins précis que Burp Suite Professional
* Faux positifs plus fréquents qu'avec des outils commerciaux
* Moins d'extensions disponibles que le BApp Store de Burp
* Documentation parfois incomplète pour les fonctionnalités avancées

---

## Pièges courants

* Lancer un scan actif sur un site en production sans précaution (peut causer des perturbations)
* Ne pas configurer le contexte et scanner des domaines hors périmètre
* Ignorer les résultats du scanner passif qui détecte les headers de sécurité manquants
* Ne pas authentifier ZAP auprès de l'application (scanner uniquement les pages publiques)
* Confondre les alertes informationnelles avec des vulnérabilités critiques

---

## À ne pas confondre

* ZAP vs Burp Suite (open source vs commercial, ZAP plus adapté au CI/CD)
* Scanner actif vs passif (le passif n'envoie pas de requêtes supplémentaires)
* ZAP vs Nikto (ZAP est un proxy complet, Nikto est un scanner simple)
* OWASP ZAP vs OWASP Top 10 (outil vs liste de vulnérabilités)

---

## Explication simplifiée

ZAP, c'est comme un inspecteur sanitaire gratuit pour les sites web. Il visite chaque page du site, vérifie les portes et les fenêtres (points d'entrée), et essaie de trouver des failles. À la fin, il te donne un rapport détaillé des problèmes trouvés avec des conseils pour les corriger.

---

## Explication avancée

ZAP utilise un proxy MITM basé sur Java avec support SSL/TLS via génération dynamique de certificats. Le spider traditionnel analyse le DOM HTML pour trouver les liens, tandis que l'AJAX Spider utilise un navigateur headless (Selenium) pour découvrir les endpoints générés dynamiquement par JavaScript. Le scanner actif utilise des plugins de scan (rules) qui testent différentes catégories de vulnérabilités en injectant des payloads et en analysant les réponses (différentielle, temporelle, out-of-band). L'Automation Framework permet de définir des plans de test en YAML reproductibles, intégrables dans les pipelines CI/CD avec des seuils de qualité (fail si vulnérabilité High détectée).

---

## Points critiques à retenir

* [CRITIQUE] ZAP est gratuit et complet — pas besoin de licence pour le scanner
* [CRITIQUE] Idéal pour l'intégration CI/CD grâce au mode daemon et Docker
* [IMPORTANT] Configurer le contexte et l'authentification pour des résultats pertinents
* [IMPORTANT] Combiner scanner actif et passif pour une couverture maximale
* [PIÈGE] Le scan actif peut perturber une application en production
* [PIÈGE] Toujours vérifier les alertes — les faux positifs sont possibles
