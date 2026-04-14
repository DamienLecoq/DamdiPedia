---
id: django
label: Django
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:27.065Z'
updatedAt: '2026-04-14T17:58:27.065Z'
relations:
  - target: python
    type: uses
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle Django
    url: 'https://docs.djangoproject.com/fr/'
  - type: vidéo
    title: freeCodeCamp – Django Full Course
    url: 'https://www.youtube.com/watch?v=F5mRW0jo-U4'
  - type: vidéo
    title: Fireship – Django in 100 Seconds
    url: 'https://www.youtube.com/watch?v=0sMceGCmLTo'
  - type: blog
    title: Django Girls Tutorial
    url: 'https://tutorial.djangogirls.org/fr/'
  - type: cours
    title: Mozilla MDN – Tutoriel Django
    url: 'https://developer.mozilla.org/fr/docs/Learn/Server-side/Django'
---

## Résumé rapide

Django est un framework web Python de haut niveau qui encourage le développement rapide et une conception propre. Il suit le principe "batteries included" en fournissant un ORM, un système d'administration, l'authentification et bien plus, directement intégrés.

---

## Définition

Django est un framework web Python open source, full-stack et opiné, qui suit le pattern MVT (Model-View-Template). Il intègre un ORM, un panneau d'administration automatique, un système de routage, la gestion des formulaires et l'authentification pour permettre un développement rapide et sécurisé.

---

## Histoire

* Créé en 2003 par Adrian Holovaty et Simon Willison au journal Lawrence Journal-World (Kansas)
* Publié en open source en 2005, nommé d'après le guitariste Django Reinhardt
* Django 1.0 sorti en 2008 avec une API stable
* Adopté par Instagram, Pinterest, Mozilla, Disqus, The Washington Post
* Maintenu par la Django Software Foundation, versions LTS régulières

---

## Objectif

* Permettre le développement rapide d'applications web complexes
* Fournir une solution complète "batteries included" (ORM, admin, auth, etc.)
* Encourager les bonnes pratiques (DRY, convention over configuration)
* Offrir une sécurité robuste par défaut (CSRF, XSS, SQL injection)

---

## Domaines d'utilisation

* Applications web full-stack (sites de contenu, e-commerce, réseaux sociaux)
* API REST avec Django REST Framework (DRF)
* Panneau d'administration et back-offices
* CMS et systèmes de gestion de contenu
* Applications scientifiques et data-driven

---

## Fonctionnement

* Architecture MVT (Model-View-Template) : le modèle gère les données, la vue la logique, le template le rendu
* ORM intégré qui traduit les classes Python en tables SQL
* Système de routage par URL (URLconf) qui associe les URL aux vues
* Middleware pipeline pour le traitement des requêtes/réponses
* Commandes de gestion (`manage.py`) pour les migrations, le serveur de dev, etc.

---

## Concepts clés

* **MVT (Model-View-Template)** — Séparation des responsabilités : données, logique, présentation
* **ORM** — Mapping objet-relationnel intégré pour manipuler la base de données en Python
* **Migrations** — Gestion versionnée du schéma de base de données
* **Admin** — Panneau d'administration auto-généré à partir des modèles
* **URLconf** — Fichier de routage qui mappe les URL vers les vues
* **Middleware** — Couches de traitement autour des requêtes et réponses

---

## Exemple

```python
# models.py
from django.db import models

class Article(models.Model):
    titre = models.CharField(max_length=200)
    contenu = models.TextField()
    date_publication = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titre

# views.py
from django.http import JsonResponse
from .models import Article

def liste_articles(request):
    articles = Article.objects.all().values('id', 'titre', 'date_publication')
    return JsonResponse(list(articles), safe=False)

# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('api/articles/', views.liste_articles, name='liste_articles'),
]
```

---

## Avantages

* "Batteries included" : ORM, admin, auth, formulaires, tout est intégré
* Sécurité robuste par défaut (protection CSRF, XSS, injection SQL)
* ORM puissant et migrations automatiques du schéma
* Panneau d'administration auto-généré remarquable
* Documentation excellente et communauté très active

---

## Inconvénients

* Monolithique et opiné → moins de flexibilité sur l'architecture
* ORM parfois limité pour les requêtes SQL complexes
* Couplage fort entre les composants du framework
* Pas conçu pour les applications temps réel ou les WebSocket (nécessite Django Channels)
* Courbe d'apprentissage pour l'ensemble des fonctionnalités intégrées

---

## Pièges courants

* Faire des requêtes N+1 avec l'ORM (oublier `select_related` / `prefetch_related`)
* Ne pas créer de migrations après modification des modèles
* Oublier le token CSRF dans les formulaires POST
* Mettre de la logique métier dans les vues au lieu des modèles ou services
* Ne pas configurer correctement les fichiers statiques en production

---

## À ne pas confondre

* Django vs Flask (full-stack opiné vs micro-framework flexible)
* Django vs Django REST Framework (web full-stack vs API REST)
* MVT vs MVC (Template ≈ View dans MVC, View ≈ Controller dans MVC)
* Django ORM vs SQLAlchemy (intégré et simple vs flexible et puissant)

---

## Explication simplifiée

Django est comme une cuisine toute équipée pour construire des sites web. Au lieu d'acheter chaque ustensile séparément, Django te fournit tout : le four (base de données), les casseroles (formulaires), le réfrigérateur (cache), et même un tableau de bord (panneau admin) pour tout surveiller.

---

## Explication avancée

Django suit le pattern MVT où le routeur (URLconf) dispatch les requêtes vers les vues, qui interagissent avec les modèles via l'ORM (basé sur le pattern Active Record). L'ORM génère des requêtes SQL via des QuerySets lazy (évalués uniquement à l'itération). Le système de migrations utilise un graphe de dépendances pour appliquer les changements de schéma de manière ordonnée. Le middleware pipeline traite les requêtes en couches (session, auth, CSRF, security) avant et après la vue. Le système de templates utilise un moteur de rendu avec héritage de templates et tags personnalisables. Django Channels étend le framework au protocole ASGI pour le support WebSocket et l'asynchronisme.

---

## Points critiques à retenir

* [CRITIQUE] Architecture MVT (Model-View-Template) avec routage URLconf
* [CRITIQUE] ORM intégré avec système de migrations automatiques
* [IMPORTANT] Panneau d'administration auto-généré à partir des modèles
* [IMPORTANT] Sécurité par défaut (CSRF, XSS, SQL injection)
* [PIÈGE] Requêtes N+1 : toujours utiliser `select_related` / `prefetch_related`
* [PIÈGE] Ne pas confondre MVT de Django avec MVC classique
