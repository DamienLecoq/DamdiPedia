---
id: devsecops
label: DevSecOps
category: concept
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:26.128Z'
updatedAt: '2026-04-14T17:58:26.128Z'
relations:
  - target: github-actions
    type: related
    weight: 0.5
resources:
  - type: documentation
    title: OWASP DevSecOps Guideline
    url: 'https://owasp.org/www-project-devsecops-guideline/'
  - type: blog
    title: Snyk – What is DevSecOps?
    url: 'https://snyk.io/series/devsecops/'
  - type: vidéo
    title: DevSecOps Explained
    url: 'https://www.youtube.com/watch?v=nrhxNNH5lt0'
---

## Résumé rapide

DevSecOps est une approche qui intègre la sécurité dès le début et tout au long du cycle de vie du développement logiciel, automatisant les contrôles de sécurité dans les pipelines CI/CD (shift-left security).

---

## Définition

DevSecOps étend DevOps en ajoutant la sécurité comme responsabilité partagée entre dev, ops et sécurité. L'objectif est de détecter et corriger les vulnérabilités au plus tôt via l'automatisation (SAST, DAST, SCA, IaC scanning) plutôt que d'auditer après coup.

---

## Histoire

* Terme popularisé vers 2012 avec la montée de DevOps
* Réponse au goulot d'étranglement des audits tardifs
* Adopté massivement avec le cloud et les microservices
* SBOM et supply chain deviennent critiques (Log4Shell 2021)
* Régulation croissante (EU Cyber Resilience Act)

---

## Objectif

* Shifter la sécurité à gauche (tôt dans le cycle)
* Automatiser les contrôles de sécurité
* Partager la responsabilité de la sécurité
* Réduire le time-to-fix des vulnérabilités
* Améliorer la conformité et l'audit

---

## Domaines d'utilisation

* Pipelines CI/CD
* Applications cloud-native
* Systèmes soumis à compliance (PCI, HIPAA, RGPD)
* Projets open-source avec supply chain
* Infrastructure as Code

---

## Fonctionnement

* **SAST** — Analyse statique du code source
* **DAST** — Analyse dynamique de l'appli en cours
* **SCA** — Scan des dépendances (CVEs)
* **IaC Scanning** — Analyse Terraform, YAML, Dockerfile
* **SBOM** — Inventaire des composants
* **Secret Scanning** — Détection de secrets

---

## Concepts clés

* **Shift-left** — Sécurité dès le code
* **Shift-right** — Sécurité en production (WAF, runtime)
* **SAST / DAST / SCA** — Types d'analyses
* **SBOM** — Software Bill of Materials
* **CI/CD Gates** — Bloquer sur CVEs critiques
* **Threat Modeling** — Modélisation des menaces

---

## Exemple

```yaml
# GitHub Actions – exemple DevSecOps
name: security
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: SAST (Semgrep)
        uses: returntocorp/semgrep-action@v1
        with: { config: p/security-audit }

      - name: SCA (Dependabot / Snyk)
        uses: snyk/actions/node@master
        env: { SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }} }

      - name: IaC scan (Checkov)
        uses: bridgecrewio/checkov-action@master

      - name: Secret scan (Gitleaks)
        uses: gitleaks/gitleaks-action@v2

      - name: SBOM generation
        run: syft . -o spdx-json=sbom.json
```

---

## Avantages

* Détection précoce des failles (moins coûteuses à corriger)
* Automatisation de la sécurité
* Culture de responsabilité partagée
* Compliance facilitée
* Audit trail intégré

---

## Inconvénients

* Faux positifs fréquents des scanners
* Courbe d'apprentissage pour les devs
* Charge initiale de mise en place
* Outils nombreux et fragmentés
* Coût de licence des outils commerciaux

---

## Pièges courants

* Bloquer le CI sur tous les findings (paralysie)
* Secrets dans le repo (détectés trop tard)
* Scanners obsolètes avec vieilles CVEs
* Ignorer les warnings "medium"
* SBOM généré mais jamais utilisé

---

## À ne pas confondre

* DevSecOps vs DevOps (intégration de la sécurité)
* SAST vs DAST (code statique vs runtime)
* SCA vs SAST (dépendances vs code maison)

---

## Explication simplifiée

DevSecOps c'est mettre des alarmes de sécurité à chaque étape de la construction d'un logiciel, au lieu d'attendre qu'il soit en prod pour l'auditer. Chaque push passe par des scanners qui cherchent des failles dans le code, les dépendances, l'infra — et bloquent si c'est grave.

---

## Explication avancée

DevSecOps repose sur le "shift-left" (détecter tôt, moins cher à corriger) mais complète avec le "shift-right" (monitoring runtime, RASP, WAF). La gouvernance impose des politiques comme des CI gates : pas de CVE critique, pas de secret en clair, pas de Dockerfile non signé. Les SBOM (SPDX, CycloneDX) permettent de répondre rapidement à un incident type Log4Shell en identifiant l'exposition. Les signatures Sigstore et la provenance SLSA renforcent la supply chain. La culture compte autant que les outils : sans adhésion dev, les scans deviennent du bruit ignoré.

---

## Points critiques à retenir

* [CRITIQUE] Secret scanning pré-commit (détecter avant push)
* [CRITIQUE] SBOM généré à chaque build
* [IMPORTANT] Bloquer uniquement sur critiques, pas tout
* [IMPORTANT] Signer images et artefacts (Sigstore, cosign)
* [PIÈGE] Faux positifs ignorés → on ignore aussi les vrais
