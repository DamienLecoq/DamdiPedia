---
id: flask
label: Flask
category: framework
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:37.863Z'
updatedAt: '2026-04-14T17:58:37.863Z'
relations:
  - target: python
    type: uses
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle Flask
    url: 'https://flask.palletsprojects.com/'
  - type: vidéo
    title: freeCodeCamp – Flask Full Course
    url: 'https://www.youtube.com/watch?v=Z1RJmh_OqeA'
  - type: vidéo
    title: Fireship – Flask in 100 Seconds
    url: 'https://www.youtube.com/watch?v=x_c8pTW8ZUc'
  - type: blog
    title: Real Python – Flask Tutorials
    url: 'https://realpython.com/tutorials/flask/'
  - type: blog
    title: Miguel Grinberg – The Flask Mega-Tutorial
    url: >-
      https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world
---

## Résumé rapide

Flask est un micro-framework web Python léger et flexible. Il fournit le strict minimum pour créer une application web (routage, templates, requêtes) et laisse le développeur libre de choisir ses outils pour le reste (ORM, authentification, etc.).

---

## Définition

Flask est un micro-framework web Python WSGI, léger et extensible, qui fournit les fonctionnalités de base pour le développement web (routage, templates Jinja2, gestion des requêtes) sans imposer de choix pour la base de données, les formulaires ou l'authentification.

---

## Histoire

* Créé par Armin Ronacher en 2010 comme un "poisson d'avril" devenu un vrai projet
* Construit sur Werkzeug (utilitaire WSGI) et Jinja2 (moteur de templates)
* Philosophie inspirée de Sinatra (Ruby) : minimalisme et liberté
* Adopté par Netflix, LinkedIn, Reddit, Uber pour des services internes
* Maintenu par le projet Pallets, communauté active et stable

---

## Objectif

* Offrir un framework web minimal sans imposer de structure
* Laisser le développeur libre de choisir ses composants (ORM, auth, etc.)
* Permettre un démarrage rapide avec très peu de code
* Être extensible via un système de blueprints et d'extensions

---

## Domaines d'utilisation

* API REST simples et microservices
* Prototypage rapide d'applications web
* Applications web légères et outils internes
* Services backend pour des projets data science / ML
* Passerelles et proxy légers

---

## Fonctionnement

* Application WSGI construite sur Werkzeug pour le dispatch HTTP
* Décorateurs Python pour le routage (`@app.route`)
* Jinja2 comme moteur de templates pour le rendu HTML
* Contexte applicatif et contexte de requête gérés par des piles de contexte
* Extensions (Flask-SQLAlchemy, Flask-Login, etc.) pour ajouter des fonctionnalités

---

## Concepts clés

* **Route / Décorateur** — `@app.route('/chemin')` associe une URL à une fonction Python
* **Blueprint** — Module réutilisable pour organiser l'application en composants
* **Jinja2** — Moteur de templates avec héritage, filtres et macros
* **Contexte applicatif** — Pile de contexte contenant `g`, `current_app`, `request`, `session`
* **Extension** — Plugin tiers qui s'intègre proprement à Flask (SQLAlchemy, Migrate, etc.)

---

## Exemple

```python
from flask import Flask, jsonify, request

app = Flask(__name__)

utilisateurs = [
    {'id': 1, 'nom': 'Alice'},
    {'id': 2, 'nom': 'Bob'}
]

@app.route('/api/utilisateurs', methods=['GET'])
def obtenir_utilisateurs():
    return jsonify(utilisateurs)

@app.route('/api/utilisateurs', methods=['POST'])
def creer_utilisateur():
    data = request.get_json()
    nouvel_utilisateur = {'id': len(utilisateurs) + 1, 'nom': data['nom']}
    utilisateurs.append(nouvel_utilisateur)
    return jsonify(nouvel_utilisateur), 201

if __name__ == '__main__':
    app.run(debug=True)
```

---

## Avantages

* Extrêmement léger et simple à prendre en main
* Grande flexibilité : aucune contrainte de structure
* Idéal pour le prototypage rapide et les petits projets
* Écosystème d'extensions riche (SQLAlchemy, Marshmallow, etc.)
* Code explicite et lisible — facile à déboguer

---

## Inconvénients

* Pas de structure imposée → désorganisation possible sur les gros projets
* Pas d'ORM intégré (nécessite Flask-SQLAlchemy ou autre)
* Pas de panneau d'administration automatique (contrairement à Django)
* WSGI synchrone par défaut (pas d'async natif sans Quart)
* Nécessite beaucoup d'extensions pour un projet complet

---

## Pièges courants

* Ne pas organiser le code en Blueprints → fichier monolithique ingérable
* Utiliser des variables globales au lieu du contexte applicatif (`g`)
* Oublier de configurer correctement les environnements (dev/prod)
* Ne pas gérer les erreurs HTTP proprement (utiliser `@app.errorhandler`)
* Confondre le contexte d'application et le contexte de requête

---

## À ne pas confondre

* Flask vs Django (micro-framework vs full-stack batteries included)
* Flask vs FastAPI (WSGI synchrone vs ASGI asynchrone avec validation automatique)
* Blueprint vs Extension (organisation du code vs ajout de fonctionnalité)
* Flask vs Quart (synchrone vs asynchrone, API compatible)

---

## Explication simplifiée

Flask est comme une boîte à outils de base pour construire un site web. Il te donne un marteau et des clous (le routage et les templates), mais c'est à toi de choisir le bois, la peinture et le design. C'est simple pour un petit meuble, mais pour une maison entière, il faut s'organiser.

---

## Explication avancée

Flask repose sur Werkzeug, une bibliothèque WSGI qui gère le parsing des requêtes HTTP, le dispatch des routes et la gestion des réponses. Les décorateurs de route enregistrent des fonctions dans une Map de règles d'URL. Le système de contexte utilise des piles thread-local (`LocalStack`) pour gérer le contexte applicatif (`current_app`, `g`) et le contexte de requête (`request`, `session`). Les Blueprints permettent de créer des composants modulaires avec leur propre espace de noms de routes, templates et fichiers statiques. L'application factory pattern (`create_app()`) est recommandé pour la configuration et les tests.

---

## Points critiques à retenir

* [CRITIQUE] Micro-framework minimal — l'architecture est à la charge du développeur
* [CRITIQUE] Basé sur WSGI (Werkzeug) et Jinja2 pour le rendu
* [IMPORTANT] Utiliser les Blueprints pour structurer les projets importants
* [IMPORTANT] Le pattern Application Factory est recommandé pour la testabilité
* [PIÈGE] Ne pas accéder à `request` en dehors du contexte de requête
* [PIÈGE] Flask est synchrone par défaut — pas d'async natif
