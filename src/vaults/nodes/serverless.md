---
id: serverless
label: Serverless
category: concept
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:58.047Z'
updatedAt: '2026-04-14T17:59:58.047Z'
relations:
  - target: aws
    type: related
    weight: 0.7
  - target: microservices
    type: related
    weight: 0.6
resources:
  - type: documentation
    title: AWS Lambda Documentation
    url: 'https://docs.aws.amazon.com/lambda/'
  - type: blog
    title: Martin Fowler – Serverless
    url: 'https://martinfowler.com/articles/serverless.html'
  - type: vidéo
    title: Serverless in 100 Seconds – Fireship
    url: 'https://www.youtube.com/watch?v=W_VV2Fx32_Y'
---

## Résumé rapide

Le serverless est un modèle de cloud computing où le fournisseur gère entièrement l'infrastructure, exécutant le code à la demande via des fonctions (FaaS) ou des services managés, facturés uniquement à l'usage.

---

## Définition

Serverless ne veut pas dire "sans serveur" mais "sans gestion de serveur" : le développeur écrit du code (fonctions ou containers), le cloud provisionne, scale et facture à l'exécution. Couvre FaaS (Lambda, Cloud Functions) et BaaS (Firebase, DynamoDB).

---

## Histoire

* AWS Lambda lancé en 2014 (pionnier)
* Google Cloud Functions, Azure Functions suivent
* Cloud Run (2019) introduit le serverless container
* Framework Serverless pour simplifier le déploiement
* Adopté pour les workloads événementiels

---

## Objectif

* Éliminer la gestion d'infrastructure
* Facturer uniquement à l'usage (pas de coût idle)
* Scaler automatiquement à zéro ou à l'infini
* Accélérer le time-to-market
* Focaliser sur le code métier

---

## Domaines d'utilisation

* APIs à trafic variable
* Traitement d'événements (upload, webhook)
* Tâches planifiées (cron)
* Pipelines de données
* Chatbots et automatisations

---

## Fonctionnement

* **Fonction** — Code court déployé sans serveur
* **Trigger** — Événement qui déclenche l'exécution
* **Cold start** — Première exécution après inactivité
* **Facturation** — Au nombre d'invocations et durée
* **Scaling** — Automatique, horizontale

---

## Concepts clés

* **FaaS** — Functions as a Service (Lambda)
* **BaaS** — Backend as a Service (Firebase)
* **Cold Start** — Latence au démarrage
* **Event-driven** — Déclenchement par événements
* **Stateless** — Pas d'état entre invocations
* **Edge Functions** — Exécution proche de l'utilisateur

---

## Exemple

```javascript
// AWS Lambda (Node.js)
export const handler = async (event) => {
  const { name } = JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello ${name}` })
  };
};
```

```yaml
# serverless.yml
service: hello-api
provider:
  name: aws
  runtime: nodejs20.x
functions:
  hello:
    handler: index.handler
    events:
      - httpApi: 'POST /hello'
```

---

## Avantages

* Zéro gestion serveur
* Facturation à l'usage précise
* Scaling automatique
* Time-to-market rapide
* Focus sur le code métier

---

## Inconvénients

* Cold starts (latence)
* Durée d'exécution limitée (15 min Lambda)
* Vendor lock-in fort
* Debugging et testing complexes
* Coût imprévisible à grande échelle

---

## Pièges courants

* Appels synchrones entre Lambdas (chaînage coûteux)
* Timeouts mal configurés
* Cold starts sur workloads latence-critiques
* Variables d'environnement avec secrets non chiffrés

---

## À ne pas confondre

* Serverless vs Containers (FaaS vs runtime complet)
* FaaS vs BaaS (code vs service managé)
* Cloud Run vs Lambda (container vs fonction)

---

## Explication simplifiée

Serverless c'est payer l'électricité uniquement quand tu allumes la lumière. Tu écris ta fonction, tu la déposes chez le cloud, et elle ne s'exécute (et ne coûte) que quand quelqu'un l'appelle. Zéro serveur à gérer.

---

## Explication avancée

Le serverless repose sur une isolation lightweight (MicroVMs comme Firecracker pour Lambda) permettant un démarrage rapide sans compromis de sécurité. Les cold starts dépendent du runtime (Node < 100ms, Java > 1s), mitigés par le provisioned concurrency au prix d'une facture fixe. L'architecture serverless force le découplage via événements et le stateless, aligné avec les bonnes pratiques cloud-native. Le pricing est granulaire (100ms sur Lambda) mais peut dépasser un VM classique pour des workloads soutenus.

---

## Points critiques à retenir

* [CRITIQUE] Stateless obligatoire entre invocations
* [CRITIQUE] Vendor lock-in fort, abstraire si possible
* [IMPORTANT] Cold starts à considérer pour la latence
* [IMPORTANT] Éviter les chaînes d'invocations synchrones
* [PIÈGE] Pas toujours moins cher qu'un VM pour charge soutenue
