---
id: zero-trust
label: Zero Trust
category: concept
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:29.855Z'
updatedAt: '2026-04-14T18:00:29.855Z'
relations:
  - target: iam
    type: uses
    weight: 0.9
resources:
  - type: documentation
    title: NIST – Zero Trust Architecture (SP 800-207)
    url: 'https://csrc.nist.gov/publications/detail/sp/800-207/final'
  - type: documentation
    title: Microsoft – Zero Trust Model
    url: 'https://learn.microsoft.com/en-us/security/zero-trust/'
  - type: vidéo
    title: IBM Technology – What is Zero Trust?
    url: 'https://www.youtube.com/watch?v=yn6CPQ9RioA'
  - type: blog
    title: Cloudflare – What is Zero Trust?
    url: 'https://www.cloudflare.com/learning/security/glossary/what-is-zero-trust/'
  - type: cours
    title: Google – BeyondCorp Enterprise
    url: 'https://cloud.google.com/beyondcorp'
---

## Résumé rapide

Le Zero Trust est un modèle de sécurité basé sur le principe « ne jamais faire confiance, toujours vérifier ». Contrairement au modèle traditionnel périmétrique (confiance accordée une fois à l'intérieur du réseau), le Zero Trust vérifie chaque accès, chaque utilisateur et chaque appareil à chaque interaction.

---

## Définition

Le Zero Trust est une architecture de sécurité qui élimine la notion de confiance implicite dans un réseau. Chaque requête d'accès est authentifiée, autorisée et chiffrée, qu'elle provienne de l'intérieur ou de l'extérieur du réseau. Ce modèle repose sur la vérification continue de l'identité, du contexte et de la posture de sécurité de l'appareil avant d'accorder l'accès à une ressource.

---

## Histoire

* Le concept a été formulé en 2010 par John Kindervag (Forrester Research)
* Google a implémenté BeyondCorp en 2014 après l'attaque « Operation Aurora »
* Le NIST a publié l'architecture Zero Trust (SP 800-207) en 2020
* L'administration Biden a imposé le Zero Trust aux agences fédérales américaines en 2021
* Adoption massive post-COVID avec la généralisation du télétravail
* Aujourd'hui considéré comme le standard de la cybersécurité moderne

---

## Objectif

* Éliminer la confiance implicite dans le réseau interne
* Réduire la surface d'attaque et limiter les mouvements latéraux
* Protéger les ressources indépendamment de leur emplacement
* Appliquer le principe du moindre privilège à chaque accès
* S'adapter au monde du cloud et du travail hybride

---

## Domaines d'utilisation

* Sécurité des réseaux d'entreprise
* Accès aux applications cloud (SaaS, IaaS)
* Télétravail et BYOD (Bring Your Own Device)
* Protection des données sensibles
* Conformité réglementaire (RGPD, HIPAA, SOC 2)

---

## Fonctionnement

* Chaque demande d'accès passe par un **Policy Decision Point (PDP)**
* Le PDP vérifie l'**identité** (qui ?), le **contexte** (d'où ?, quand ?, comment ?) et la **posture** (appareil sécurisé ?)
* L'accès est accordé selon le **principe du moindre privilège**
* Toutes les communications sont **chiffrées** (même sur le réseau interne)
* La confiance est **réévaluée en continu** (pas seulement à la connexion)

```
  ┌──────────┐                    ┌─────────────┐
  │Utilisateur│──── Requête ─────▶│   Policy    │
  │ + Device  │                   │  Decision   │
  └──────────┘                    │   Point     │
                                  └──────┬──────┘
                                         │
                          Vérification :  │
                          ✓ Identité (MFA)│
                          ✓ Device posture│
                          ✓ Contexte      │
                          ✓ Moindre priv. │
                                         │
                                  ┌──────▼──────┐
                                  │  Ressource  │
                                  │  protégée   │
                                  └─────────────┘
```

---

## Concepts clés

* **Never Trust, Always Verify** — Principe fondateur : aucune confiance implicite
* **Least Privilege** — Accorder uniquement les droits strictement nécessaires
* **Micro-segmentation** — Diviser le réseau en zones isolées ultra-granulaires
* **MFA (Multi-Factor Authentication)** — Authentification renforcée obligatoire
* **Device Posture** — Évaluation de la conformité et de la sécurité de l'appareil
* **Continuous Verification** — Vérification permanente, pas seulement au login
* **Policy Engine** — Moteur de décision centralisé pour les accès

---

## Exemple

```
Scénario : Un employé veut accéder à un document confidentiel

Modèle traditionnel (périmétrique) :
  1. L'employé se connecte au VPN → accès au réseau interne
  2. Une fois « dedans », il accède librement aux ressources
  ⚠️ Si un attaquant compromet le VPN, il a accès à tout

Modèle Zero Trust :
  1. L'employé s'authentifie avec MFA (mot de passe + app mobile)
  2. Son appareil est vérifié (à jour, antivirus actif, chiffré)
  3. Le contexte est analysé (localisation, heure, comportement)
  4. L'accès au document spécifique est accordé (pas au réseau entier)
  5. L'accès est réévalué périodiquement pendant la session
  ✅ Un attaquant avec un seul facteur ne peut rien faire
```

---

## Avantages

* Réduit drastiquement la surface d'attaque
* Limite les mouvements latéraux en cas de compromission
* Adapté au cloud, au télétravail et au BYOD
* Visibilité complète sur qui accède à quoi
* Conforme aux exigences réglementaires modernes

---

## Inconvénients

* Mise en oeuvre complexe et progressive (pas un produit à installer)
* Peut impacter l'expérience utilisateur (vérifications fréquentes)
* Coût d'implémentation élevé (outils, infrastructure, formation)
* Nécessite une gestion des identités mature (IAM)
* Risque de sur-ingénierie si mal dimensionné

---

## Pièges courants

* Penser que le Zero Trust est un produit à acheter (c'est une architecture)
* Vouloir tout implémenter d'un coup au lieu d'une approche progressive
* Négliger l'expérience utilisateur et créer de la friction excessive
* Oublier les accès machine-to-machine (API, microservices)
* Ne pas avoir de solution IAM robuste avant de commencer

---

## À ne pas confondre

* Zero Trust vs VPN (le VPN donne accès au réseau, Zero Trust donne accès aux ressources)
* Zero Trust vs pare-feu (complémentaires, pas interchangeables)
* Zero Trust vs ZTNA (ZTNA est une composante technologique du modèle Zero Trust)
* Micro-segmentation vs segmentation réseau (granularité beaucoup plus fine)

---

## Explication simplifiée

Imagine un immeuble de bureaux. Dans le modèle traditionnel, une fois que tu passes le badge à l'entrée, tu peux aller partout. Avec le Zero Trust, chaque porte de chaque bureau vérifie ton identité, ton autorisation et même si tu as une raison valable d'être là, à chaque fois que tu veux entrer.

---

## Explication avancée

L'architecture Zero Trust repose sur trois piliers fondamentaux définis par le NIST SP 800-207 : le Policy Engine (PE) qui prend les décisions d'accès, le Policy Administrator (PA) qui établit ou ferme les chemins de communication, et le Policy Enforcement Point (PEP) qui applique les décisions. Le modèle intègre des signaux multiples (identity provider, SIEM, EDR, MDM, threat intelligence) dans le PE pour une évaluation continue du risque. La micro-segmentation utilise des software-defined perimeters (SDP) ou des service meshes pour isoler les workloads. Les implémentations matures utilisent des scores de risque dynamiques combinant le risque utilisateur, le risque appareil et le risque contextuel pour moduler les niveaux d'accès en temps réel.

---

## Points critiques à retenir

* [CRITIQUE] Le Zero Trust n'est pas un produit mais une architecture et une philosophie
* [CRITIQUE] « Ne jamais faire confiance, toujours vérifier » — même sur le réseau interne
* [IMPORTANT] L'IAM et le MFA sont les fondations indispensables du Zero Trust
* [IMPORTANT] La mise en oeuvre doit être progressive, en commençant par les actifs critiques
* [PIÈGE] Le VPN n'est pas du Zero Trust — il crée un tunnel, pas une vérification continue
* [PIÈGE] Ne pas oublier les communications machine-to-machine dans la stratégie
