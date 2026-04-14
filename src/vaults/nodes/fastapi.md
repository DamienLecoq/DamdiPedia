---
id: fastapi
label: FastAPI
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:36.960Z'
updatedAt: '2026-04-14T17:58:36.960Z'
relations:
  - target: python
    type: uses
    weight: 0.9
  - target: api-rest
    type: implements
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle FastAPI
    url: 'https://fastapi.tiangolo.com/'
  - type: vidéo
    title: freeCodeCamp – FastAPI Full Course
    url: 'https://www.youtube.com/watch?v=tLKKmouUams'
  - type: vidéo
    title: Fireship – FastAPI in 100 Seconds
    url: 'https://www.youtube.com/watch?v=iWS9ogMPOI0'
  - type: blog
    title: Real Python – FastAPI Tutorial
    url: 'https://realpython.com/fastapi-python-web-apis/'
  - type: blog
    title: TestDriven.io – FastAPI Tutorial
    url: 'https://testdriven.io/blog/fastapi-crud/'
---

## Résumé rapide

FastAPI est un framework web Python moderne et haute performance pour construire des API. Il exploite les type hints Python pour la validation automatique des données, la sérialisation et la génération de documentation OpenAPI, tout en offrant des performances proches de Node.js et Go grâce à l'asynchronisme ASGI.

---

## Définition

FastAPI est un framework web Python ASGI, conçu pour créer des API REST et GraphQL rapidement, avec validation automatique des données via Pydantic, documentation interactive auto-générée (Swagger UI / ReDoc), et support natif de l'asynchronisme via async/await.

---

## Histoire

* Créé par Sebastián Ramírez en décembre 2018
* Construit sur Starlette (framework ASGI) et Pydantic (validation de données)
* Inspiré par Flask (simplicité), Django REST Framework (API), et APIStar (type hints)
* Adoption fulgurante : l'un des frameworks Python à la croissance la plus rapide
* Utilisé par Microsoft, Uber, Netflix, et de nombreuses startups

---

## Objectif

* Offrir les meilleures performances possibles pour un framework Python
* Exploiter les type hints Python pour la validation et la documentation automatique
* Réduire les bugs grâce au typage et à la validation automatique
* Générer automatiquement une documentation API interactive (OpenAPI / Swagger)

---

## Domaines d'utilisation

* API REST haute performance
* Microservices backend
* APIs pour applications de machine learning et data science
* Services asynchrones (WebSocket, SSE, long polling)
* Backends d'applications mobiles et SPA

---

## Fonctionnement

* Basé sur ASGI (Asynchronous Server Gateway Interface) via Starlette
* Les type hints Python sont utilisés pour la validation automatique des paramètres
* Pydantic valide et sérialise les données d'entrée/sortie automatiquement
* La documentation OpenAPI (Swagger UI + ReDoc) est générée automatiquement
* Support natif async/await pour les opérations d'E/S non bloquantes

---

## Concepts clés

* **Type hints** — Les annotations de type Python pilotent la validation et la documentation
* **Pydantic models** — Schémas de validation des données avec sérialisation automatique
* **Dependency Injection** — Système de DI intégré via le paramètre `Depends()`
* **Path operations** — Décorateurs `@app.get()`, `@app.post()` pour définir les endpoints
* **Async/await** — Support natif des fonctions asynchrones pour les performances
* **OpenAPI auto-doc** — Documentation Swagger UI et ReDoc générée automatiquement

---

## Exemple

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Utilisateur(BaseModel):
    nom: str
    email: str
    age: int | None = None

utilisateurs: list[Utilisateur] = []

@app.get("/api/utilisateurs", response_model=list[Utilisateur])
async def lister_utilisateurs():
    return utilisateurs

@app.post("/api/utilisateurs", response_model=Utilisateur, status_code=201)
async def creer_utilisateur(utilisateur: Utilisateur):
    utilisateurs.append(utilisateur)
    return utilisateur

@app.get("/api/utilisateurs/{index}")
async def obtenir_utilisateur(index: int):
    if index >= len(utilisateurs):
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    return utilisateurs[index]
```

---

## Avantages

* Performances excellentes (comparable à Node.js grâce à ASGI)
* Validation automatique des données via Pydantic et type hints
* Documentation API interactive auto-générée (Swagger UI, ReDoc)
* Support natif async/await
* Réduction significative des bugs grâce au typage strict

---

## Inconvénients

* Écosystème moins mature que Django ou Flask
* Pas de panneau d'administration intégré
* Pas d'ORM intégré (utiliser SQLAlchemy, Tortoise ORM, etc.)
* Nécessite une bonne compréhension des type hints Python
* Moins adapté pour les applications web full-stack avec rendu HTML

---

## Pièges courants

* Mélanger fonctions sync et async sans comprendre l'impact sur le thread pool
* Oublier que les modèles Pydantic valident à l'instanciation (pas lazy)
* Ne pas utiliser `Depends()` pour l'injection de dépendances (dupliquer la logique)
* Confondre `response_model` et le type de retour de la fonction
* Ne pas configurer CORS pour les appels depuis un frontend

---

## À ne pas confondre

* FastAPI vs Flask (ASGI async + validation auto vs WSGI sync + manuel)
* FastAPI vs Django REST Framework (léger et rapide vs full-stack et complet)
* Pydantic vs Marshmallow (validation par type hints vs par schéma déclaratif)
* ASGI vs WSGI (asynchrone vs synchrone)

---

## Explication simplifiée

FastAPI est comme un assistant intelligent pour créer des API. Tu lui décris à quoi doivent ressembler les données (avec les types Python), et il vérifie automatiquement que tout est correct, crée la documentation tout seul, et répond très vite aux requêtes.

---

## Explication avancée

FastAPI s'appuie sur Starlette pour la couche ASGI (gestion des connexions HTTP, WebSocket, middleware) et sur Pydantic pour la validation des données via les type hints Python (PEP 484). À l'initialisation, FastAPI introspecte les signatures des fonctions de route pour extraire les paramètres (path, query, body, header) et génère automatiquement le schéma OpenAPI 3.x. Pydantic utilise les modèles de données avec validation au runtime basée sur les annotations de type, incluant la coercion de types et la génération de schémas JSON. Le système de Dependency Injection résout un graphe de dépendances pour chaque requête, supportant les dépendances synchrones et asynchrones avec gestion automatique du cycle de vie (yield dependencies).

---

## Points critiques à retenir

* [CRITIQUE] Les type hints Python pilotent la validation, la sérialisation et la documentation
* [CRITIQUE] Basé sur ASGI (Starlette) avec support natif async/await
* [IMPORTANT] Documentation OpenAPI générée automatiquement (Swagger UI + ReDoc)
* [IMPORTANT] Pydantic valide les données d'entrée et de sortie automatiquement
* [PIÈGE] Ne pas mélanger sync et async sans comprendre l'impact sur les performances
* [PIÈGE] Toujours configurer CORS pour les appels cross-origin
