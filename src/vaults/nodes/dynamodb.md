---
id: dynamodb
label: DynamoDB
category: bdd
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:31.250Z'
updatedAt: '2026-04-14T17:58:31.250Z'
relations:
  - target: aws
    type: related
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle DynamoDB
    url: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/'
  - type: vidéo
    title: 'AWS re:Invent – DynamoDB Deep Dive'
    url: 'https://www.youtube.com/watch?v=6yqfmXiZTlM'
  - type: blog
    title: Alex DeBrie – DynamoDB Guide
    url: 'https://www.dynamodbguide.com/'
  - type: cours
    title: AWS Skill Builder – DynamoDB
    url: >-
      https://explore.skillbuilder.aws/learn/course/external/view/elearning/14724/amazon-dynamodb-service-introduction
  - type: livre
    title: The DynamoDB Book – Alex DeBrie
    url: 'https://www.dynamodbbook.com/'
---

## Résumé rapide

Amazon DynamoDB est une base de données NoSQL clé-valeur et document, entièrement managée par AWS. Elle offre des performances prévisibles à n'importe quelle échelle avec une latence de l'ordre de la milliseconde.

---

## Définition

DynamoDB est un service de base de données NoSQL serverless et entièrement managé par Amazon Web Services. Il stocke des données sous forme clé-valeur et document, avec un débit provisionné ou à la demande, et offre une réplication automatique sur trois zones de disponibilité.

---

## Histoire

* Inspiré du papier de recherche Amazon Dynamo (2007)
* Lancé en 2012 comme service AWS entièrement managé
* DynamoDB Streams (2014) pour la capture des changements
* DynamoDB On-Demand (2018) pour la facturation à la requête
* DAX (DynamoDB Accelerator) pour le cache en mémoire intégré

---

## Objectif

* Fournir une base de données NoSQL sans administration (serverless)
* Garantir des performances prévisibles quelle que soit l'échelle
* Supporter des millions de requêtes par seconde
* Offrir une intégration native avec l'écosystème AWS (Lambda, S3, Kinesis)

---

## Domaines d'utilisation

* Applications serverless (AWS Lambda + API Gateway + DynamoDB)
* Jeux vidéo (profils, classements, inventaires)
* Applications IoT (ingestion massive de données)
* E-commerce (paniers, sessions, catalogues)
* Applications mobiles avec synchronisation (AppSync)

---

## Fonctionnement

* Service **entièrement managé** (pas de serveurs à administrer)
* Stockage distribué automatiquement sur **3 zones de disponibilité**
* **Partition Key** (hash key) pour la distribution des données
* **Sort Key** optionnelle pour organiser les items dans une partition
* Modes de capacité : **provisionné** (RCU/WCU) ou **à la demande**

---

## Concepts clés

* **Partition Key + Sort Key** — Clé primaire composite pour l'accès aux données
* **GSI (Global Secondary Index)** — Index sur des attributs différents de la clé primaire
* **LSI (Local Secondary Index)** — Index alternatif sur la sort key
* **DynamoDB Streams** — Capture des changements (CDC) pour les événements
* **TTL** — Suppression automatique des items expirés
* **DAX** — Cache en mémoire compatible DynamoDB (latence microseconde)
* **Single-table design** — Stocker plusieurs entités dans une seule table

---

## Exemple

```python
import boto3

# Création d'une table
dynamodb = boto3.resource('dynamodb')
table = dynamodb.create_table(
    TableName='Commandes',
    KeySchema=[
        {'AttributeName': 'PK', 'KeyType': 'HASH'},   # Partition key
        {'AttributeName': 'SK', 'KeyType': 'RANGE'}    # Sort key
    ],
    AttributeDefinitions=[
        {'AttributeName': 'PK', 'AttributeType': 'S'},
        {'AttributeName': 'SK', 'AttributeType': 'S'}
    ],
    BillingMode='PAY_PER_REQUEST'
)

# Insertion (single-table design)
table.put_item(Item={
    'PK': 'CLIENT#123',
    'SK': 'COMMANDE#2025-01-15',
    'montant': 89.99,
    'statut': 'validee'
})

# Requête sur la partition key
response = table.query(
    KeyConditionExpression='PK = :pk AND begins_with(SK, :prefix)',
    ExpressionAttributeValues={
        ':pk': 'CLIENT#123',
        ':prefix': 'COMMANDE#'
    }
)
```

---

## Avantages

* Entièrement managé (zéro administration)
* Performances prévisibles à n'importe quelle échelle
* Mode on-demand : facturation à la requête (pas de provisionnement)
* Réplication automatique sur 3 AZ
* Intégration native avec l'écosystème AWS
* DynamoDB Streams pour les architectures événementielles

---

## Inconvénients

* Vendor lock-in complet (AWS uniquement)
* Modèle de données très contraint (pas de jointures, requêtes limitées)
* Coût élevé à grande échelle (surtout les GSI)
* Taille maximale d'un item : 400 Ko
* Requêtes ad hoc très limitées (pas de SQL flexible)

---

## Pièges courants

* Concevoir le modèle de données sans connaître les access patterns
* Créer une partition key avec faible cardinalité (hot partitions)
* Utiliser le mode provisionné sans autoscaling (throttling)
* Scanner la table entière au lieu d'utiliser des requêtes ciblées
* Ignorer le coût des GSI (chaque GSI = une copie des données)

---

## À ne pas confondre

* DynamoDB vs MongoDB (managé AWS vs auto-hébergé/Atlas)
* Partition Key vs Sort Key (distribution vs tri)
* GSI vs LSI (index global flexible vs index local limité)
* On-Demand vs Provisioned (facturation à l'usage vs capacité réservée)

---

## Explication simplifiée

DynamoDB est une base de données d'Amazon qui fonctionne dans le cloud sans que tu aies besoin de gérer de serveurs. Tu stockes des données avec une clé et tu les retrouves instantanément. C'est comme un gigantesque dictionnaire qui fonctionne à n'importe quelle échelle.

---

## Explication avancée

DynamoDB distribue les données via un consistent hashing basé sur la partition key, chaque partition supportant jusqu'à 3000 RCU et 1000 WCU. Le stockage utilise un B-tree avec réplication synchrone sur 3 nœuds (quorum write). Les GSI sont des tables matérialisées asynchrones avec leur propre schéma de partitionnement. Le single-table design exploite les sort key hiérarchiques (PK=ENTITY#id, SK=TYPE#date) pour colocaliser les données liées dans la même partition, minimisant les requêtes réseau. DynamoDB Streams utilise un log de changements avec des shards de 24h de rétention pour la propagation événementielle.

---

## Points critiques à retenir

* [CRITIQUE] Concevoir le modèle à partir des access patterns (pas du modèle relationnel)
* [CRITIQUE] La partition key détermine la distribution — forte cardinalité obligatoire
* [IMPORTANT] Le single-table design est la best practice pour DynamoDB
* [IMPORTANT] Chaque GSI coûte en stockage et en capacité d'écriture
* [PIÈGE] Scan = lecture de toute la table = coût élevé et lenteur
* [PIÈGE] La taille maximale d'un item est de 400 Ko
