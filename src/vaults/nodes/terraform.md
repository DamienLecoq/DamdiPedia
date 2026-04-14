---
id: terraform
label: Terraform
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:18.421Z'
updatedAt: '2026-04-14T18:00:18.421Z'
relations:
  - target: aws
    type: related
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle Terraform
    url: 'https://developer.hashicorp.com/terraform/docs'
  - type: vidéo
    title: Terraform Tutorial for Beginners – TechWorld with Nana
    url: 'https://www.youtube.com/watch?v=l5k1ai_GBDE'
  - type: cours
    title: HashiCorp Certified Terraform Associate – Udemy
    url: 'https://www.udemy.com/course/terraform-beginner-to-advanced/'
  - type: documentation
    title: Terraform Registry – Providers et modules
    url: 'https://registry.terraform.io/'
  - type: blog
    title: HashiCorp Blog – Terraform
    url: 'https://www.hashicorp.com/blog/products/terraform'
---

## Résumé rapide

Terraform est un outil d'Infrastructure as Code (IaC) qui permet de définir et provisionner des ressources d'infrastructure de manière déclarative. Il supporte de nombreux fournisseurs cloud et services, et utilise son propre langage HCL pour décrire l'état souhaité de l'infrastructure.

---

## Définition

Terraform est un outil open source d'Infrastructure as Code développé par HashiCorp. Il permet de définir des ressources d'infrastructure (serveurs, réseaux, bases de données) dans des fichiers de configuration déclaratifs, puis de les créer, modifier ou supprimer de manière automatisée et reproductible.

---

## Histoire

* Créé par Mitchell Hashimoto et HashiCorp en 2014
* Adoption rapide grâce au support multi-cloud
* Terraform 0.12 (2019) a amélioré significativement le langage HCL
* Changement de licence en 2023 (BSL au lieu de MPL)
* Fork open source OpenTofu créé en réponse au changement de licence

---

## Objectif

* Automatiser le provisionnement d'infrastructure
* Permettre la gestion multi-cloud depuis un seul outil
* Versionner l'infrastructure comme du code
* Garantir la reproductibilité et la cohérence des environnements

---

## Domaines d'utilisation

* Provisionnement d'infrastructure cloud (AWS, Azure, GCP)
* Gestion de réseaux et de DNS
* Configuration de services SaaS (Datadog, GitHub, etc.)
* Création d'environnements de développement et de test
* Infrastructure multi-cloud et hybride

---

## Fonctionnement

* Fichiers de configuration en HCL (HashiCorp Configuration Language)
* terraform plan pour prévisualiser les changements
* terraform apply pour appliquer les changements
* Le state file stocke l'état actuel de l'infrastructure
* Les providers interagissent avec les API des fournisseurs

---

## Concepts clés

* Provider : plugin qui interagit avec une API (AWS, Azure, GCP...)
* Resource : élément d'infrastructure à gérer (VM, réseau, BDD...)
* State : fichier qui enregistre l'état réel de l'infrastructure
* Module : bloc réutilisable de configuration Terraform
* Plan : aperçu des changements avant application

---

## Exemple

```hcl
# Configuration du provider AWS
provider "aws" {
  region = "eu-west-3"
}

# Création d'une instance EC2
resource "aws_instance" "serveur_web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"

  tags = {
    Name = "serveur-web-prod"
  }
}

# Output
output "ip_publique" {
  value = aws_instance.serveur_web.public_ip
}
```

```bash
terraform init    # Initialiser le projet
terraform plan    # Prévisualiser les changements
terraform apply   # Appliquer les changements
terraform destroy # Supprimer l'infrastructure
```

---

## Avantages

* Support multi-cloud et multi-services
* Approche déclarative et idempotente
* Plan avant application (prévisualisation des changements)
* Écosystème riche de providers et modules
* Gestion de l'état pour la détection des dérives

---

## Inconvénients

* Le state file est critique et doit être protégé
* Changement de licence (BSL) controversé
* Courbe d'apprentissage pour HCL et les concepts IaC
* Gestion des dépendances parfois complexe
* Difficile de gérer des ressources créées manuellement

---

## Pièges courants

* Stocker le state file localement au lieu d'un backend distant (S3, etc.)
* Ne pas verrouiller le state lors de travail en équipe
* Modifier manuellement des ressources gérées par Terraform
* Ne pas utiliser de modules pour éviter la duplication
* Stocker des secrets en clair dans les fichiers .tf

---

## À ne pas confondre

* Terraform vs Ansible : Terraform provisionne l'infrastructure, Ansible configure les serveurs
* Terraform vs CloudFormation : Terraform est multi-cloud, CloudFormation est AWS uniquement
* Terraform vs Pulumi : Terraform utilise HCL, Pulumi utilise des langages de programmation
* State vs plan : le state est l'état actuel, le plan est les changements prévus

---

## Explication simplifiée

Terraform permet de décrire dans des fichiers texte toute l'infrastructure dont on a besoin (serveurs, réseaux, bases de données). On lance ensuite une commande et Terraform crée tout automatiquement. Si on modifie le fichier, il ne change que ce qui est nécessaire.

---

## Explication avancée

Terraform construit un graphe de dépendances acyclique dirigé (DAG) à partir des ressources déclarées, permettant la parallélisation des opérations indépendantes. Le state file sérialise l'état réel en JSON et permet la détection de dérives (drift). Les providers sont des plugins gRPC qui traduisent les déclarations HCL en appels API. Le backend distant (S3+DynamoDB, Terraform Cloud) assure le verrouillage du state pour le travail en équipe. Les workspaces permettent de gérer plusieurs environnements avec la même configuration.

---

## Points critiques à retenir

* [CRITIQUE] Le state file est la source de vérité de l'infrastructure
* [CRITIQUE] Toujours utiliser terraform plan avant terraform apply
* [IMPORTANT] Utiliser un backend distant pour le state en équipe
* [IMPORTANT] Les modules permettent de réutiliser et standardiser les configurations
* [PIÈGE] Ne jamais modifier manuellement des ressources gérées par Terraform
* [PIÈGE] Ne jamais stocker de secrets dans les fichiers Terraform
