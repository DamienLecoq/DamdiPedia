---
id: aws
label: AWS
category: service
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:06.529Z'
updatedAt: '2026-04-14T17:58:06.529Z'
relations:
  - target: terraform
    type: related
    weight: 0.8
resources:
  - type: documentation
    title: AWS Documentation officielle
    url: 'https://docs.aws.amazon.com/'
  - type: cours
    title: AWS Skill Builder
    url: 'https://skillbuilder.aws/'
  - type: vidéo
    title: freeCodeCamp – AWS Certified Cloud Practitioner
    url: 'https://www.youtube.com/watch?v=SOTamWNgDKc'
---

## Résumé rapide

AWS (Amazon Web Services) est le leader mondial du cloud computing, offrant plus de 200 services : calcul, stockage, bases de données, machine learning, réseau et plus encore.

---

## Définition

AWS est une plateforme cloud publique proposant des services à la demande en pay-as-you-go, permettant aux entreprises de provisionner compute, storage, networking, databases et services managés sans gérer d'infrastructure physique.

---

## Histoire

* Lancé en 2006 avec S3 et EC2
* Devient leader du cloud public en 2010
* Dépasse 200 services en 2020
* Génère plus de 80 milliards $ en 2023
* Concurrents principaux : Azure, Google Cloud

---

## Objectif

* Éliminer la gestion d'infrastructure physique
* Scaler à la demande (élasticité)
* Facturer uniquement l'usage réel
* Fournir des services managés prêts à l'emploi

---

## Domaines d'utilisation

* Hébergement d'applications web et mobiles
* Big data et analytics (Redshift, EMR)
* Machine learning (SageMaker, Bedrock)
* Backup, archivage et disaster recovery

---

## Fonctionnement

* **Régions** — Zones géographiques indépendantes
* **Availability Zones** — Data centers isolés par région
* **IAM** — Gestion des identités et permissions
* **CloudFormation / Terraform** — Infrastructure as Code
* **API / CLI / Console** — Accès aux services

---

## Concepts clés

* **EC2** — Machines virtuelles à la demande
* **S3** — Stockage objet scalable
* **RDS** — Bases de données relationnelles managées
* **Lambda** — Fonctions serverless
* **VPC** — Réseau privé virtuel
* **IAM** — Identity and Access Management

---

## Exemple

```bash
# AWS CLI : créer un bucket S3
aws s3 mb s3://mon-bucket-unique

# Copier un fichier
aws s3 cp rapport.pdf s3://mon-bucket-unique/

# Lister les instances EC2
aws ec2 describe-instances
```

---

## Avantages

* Catalogue de services inégalé
* Haute disponibilité globale
* Écosystème et communauté massifs
* Certifications et conformité (SOC, HIPAA, PCI)
* Élasticité et pay-as-you-go

---

## Inconvénients

* Facturation complexe et parfois surprenante
* Courbe d'apprentissage très raide
* Vendor lock-in
* Services qui se chevauchent (choix difficile)

---

## Pièges courants

* Oublier des ressources qui tournent (facture)
* Credentials exposés dans le code
* Permissions IAM trop permissives
* Pas de tags pour le cost tracking

---

## À ne pas confondre

* EC2 vs Lambda (VMs vs serverless)
* S3 vs EBS (objet vs block)
* IAM User vs Role vs Policy

---

## Explication simplifiée

AWS c'est le plus gros "data center à louer" du monde. Au lieu d'acheter des serveurs physiques, tu loues du compute, du stockage, des bases de données à la minute, et tu paies uniquement ce que tu consommes.

---

## Explication avancée

AWS est organisé en régions géographiques contenant plusieurs availability zones isolées. L'IAM est le pilier de la sécurité avec des policies JSON définissant précisément les permissions. Les services sont interconnectés via VPC pour le networking, IAM pour l'auth, CloudWatch pour l'observabilité. L'IaC via CloudFormation ou Terraform est indispensable pour la reproductibilité.

---

## Points critiques à retenir

* [CRITIQUE] Jamais de credentials en dur — utiliser IAM roles
* [CRITIQUE] Principe du moindre privilège sur IAM
* [IMPORTANT] Tags pour cost allocation
* [IMPORTANT] CloudFormation / Terraform pour l'IaC
* [PIÈGE] Transfert de données entre régions coûte cher
