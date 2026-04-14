---
id: azure
label: Microsoft Azure
category: service
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:07.462Z'
updatedAt: '2026-04-14T17:58:07.462Z'
relations:
  - target: csharp
    type: related
    weight: 0.7
resources:
  - type: documentation
    title: Azure Documentation officielle
    url: 'https://learn.microsoft.com/en-us/azure/'
  - type: cours
    title: Microsoft Learn – Azure
    url: 'https://learn.microsoft.com/en-us/training/azure/'
  - type: vidéo
    title: John Savill's Technical Training
    url: 'https://www.youtube.com/c/NTFAQGuy'
---

## Résumé rapide

Microsoft Azure est la plateforme cloud de Microsoft, deuxième acteur mondial derrière AWS. Elle excelle dans l'intégration avec l'écosystème Microsoft (Windows, .NET, Office 365, Active Directory).

---

## Définition

Azure est une plateforme cloud publique offrant des services IaaS, PaaS et SaaS couvrant compute, storage, networking, databases, AI et DevOps, avec une intégration profonde aux technologies Microsoft et une présence forte en entreprise.

---

## Histoire

* Annoncé en 2008, lancé en 2010 sous le nom "Windows Azure"
* Renommé "Microsoft Azure" en 2014
* Satya Nadella pousse Azure au sommet en tant que CEO
* Deuxième cloud mondial en parts de marché
* Intégration forte avec GitHub, Microsoft 365, Copilot

---

## Objectif

* Offrir une alternative cloud aux clients Microsoft
* Permettre le cloud hybride (Azure Arc)
* Intégrer l'écosystème entreprise (AD, Office)
* Fournir des services IA managés (OpenAI, Cognitive Services)

---

## Domaines d'utilisation

* Entreprises Microsoft (Office 365, AD)
* Développement .NET et applications Windows
* Services IA et data (Azure OpenAI, Synapse)
* Cloud hybride et edge computing

---

## Fonctionnement

* **Régions / Zones** — Infrastructure globale distribuée
* **Resource Groups** — Conteneurs logiques de ressources
* **Azure Active Directory** — Identité et accès
* **ARM Templates / Bicep** — Infrastructure as Code
* **Portal / CLI / PowerShell** — Accès multi-interface

---

## Concepts clés

* **Virtual Machines** — IaaS compute
* **App Service** — PaaS pour apps web
* **Functions** — Serverless
* **Cosmos DB** — Base NoSQL multi-modèle
* **AKS** — Kubernetes managé
* **Entra ID** — Nouveau nom d'Azure AD

---

## Exemple

```bash
# Azure CLI : créer un resource group
az group create --name MyRG --location westeurope

# Créer une VM
az vm create \
  --resource-group MyRG \
  --name MyVM \
  --image UbuntuLTS \
  --admin-username azureuser
```

---

## Avantages

* Intégration Microsoft inégalée
* Cloud hybride via Azure Arc
* Fortes garanties entreprise (SLA, conformité)
* Azure OpenAI Service (accès privilégié à GPT)
* Support Windows Server natif

---

## Inconvénients

* Facturation complexe
* Interface (portal) parfois lente
* Certains services moins matures qu'AWS
* Documentation parfois fragmentée

---

## Pièges courants

* Confondre Azure AD et Active Directory on-premises
* Oublier les ressources orphelines (load balancers, IPs)
* Permissions RBAC trop larges
* Pas de verrouillage des ressources critiques

---

## À ne pas confondre

* Azure AD vs Active Directory (cloud vs on-premises)
* App Service vs Functions (PaaS persistent vs serverless)
* AKS vs ACI (Kubernetes vs container instances)

---

## Explication simplifiée

Azure c'est le cloud de Microsoft. Si ton entreprise utilise Office 365, Windows Server ou Active Directory, Azure s'intègre nativement. C'est le choix naturel dans l'écosystème Microsoft.

---

## Explication avancée

Azure organise les ressources via des Resource Groups au sein de souscriptions liées à un tenant Entra ID. ARM (Azure Resource Manager) est l'API unifiée pour toutes les opérations, exposée via Bicep (DSL déclaratif) ou Terraform. L'intégration avec Entra ID permet le SSO, les Managed Identities (credentials automatiques pour les services) et le Conditional Access.

---

## Points critiques à retenir

* [CRITIQUE] Utiliser Managed Identities au lieu de secrets en dur
* [CRITIQUE] Principe du moindre privilège avec RBAC
* [IMPORTANT] Resource Groups pour cost tracking et cleanup
* [IMPORTANT] Bicep ou Terraform pour l'IaC
* [PIÈGE] Les ressources orphelines continuent de facturer
