---
id: python
label: Python
category: langage
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-11T10:01:38.727Z'
updatedAt: '2026-04-11T10:01:38.727Z'
relations:
  - target: poo
    type: implements
    weight: 0.7
  - target: api-rest
    type: related
    weight: 0.6
  - target: linux
    type: runs_on
    weight: 0.6
  - target: sql
    type: related
    weight: 0.5
  - target: docker
    type: deployed_with
    weight: 0.5
  - target: json
    type: uses
    weight: 0.4
resources:
  - type: documentation
    title: Documentation officielle Python
    url: 'https://docs.python.org/fr/3/'
  - type: documentation
    title: Python Tutorial officiel
    url: 'https://docs.python.org/fr/3/tutorial/'
  - type: vidéo
    title: freeCodeCamp – Python Full Course
    url: 'https://www.youtube.com/watch?v=rfscVS0vtbw'
  - type: vidéo
    title: Corey Schafer – Python Tutorials
    url: 'https://www.youtube.com/c/Coreyms'
  - type: blog
    title: Real Python
    url: 'https://realpython.com/'
  - type: blog
    title: Python.org – Blog officiel
    url: 'https://www.python.org/blogs/'
  - type: cours
    title: Coursera – Python for Everybody
    url: 'https://www.coursera.org/specializations/python'
  - type: cours
    title: Codecademy – Learn Python
    url: 'https://www.codecademy.com/learn/learn-python-3'
  - type: livre
    title: Automate the Boring Stuff with Python
    url: 'https://automatetheboringstuff.com/'
  - type: livre
    title: Fluent Python – Luciano Ramalho
    url: 'https://www.amazon.com/dp/1492056359'
  - type: autre
    title: LeetCode – Python Problems
    url: 'https://leetcode.com/problemset/all/?languageTags=python3'
  - type: autre
    title: Python Tutor – Visualisation d'exécution
    url: 'https://pythontutor.com/'
---

## Résumé rapide

Python est un langage de programmation polyvalent, lisible et accessible, utilisé massivement en data science, scripting, backend web et automatisation. Sa syntaxe claire et son écosystème de bibliothèques en font l'un des langages les plus populaires au monde.

---

## Définition

Python est un langage de programmation interprété, dynamiquement typé, multi-paradigme (orienté objet, fonctionnel, impératif), conçu pour la lisibilité du code et la productivité du développeur.

---

## Histoire

* Créé par Guido van Rossum en 1991 aux Pays-Bas
* Nommé d'après les Monty Python (pas le serpent)
* Python 2 vs Python 3 : migration longue et difficile (2008-2020)
* Python 2 officiellement abandonné en janvier 2020
* Aujourd'hui n°1 ou n°2 dans tous les classements de popularité (TIOBE, Stack Overflow)

---

## Objectif

* Fournir un langage lisible et concis ("Readability counts")
* Permettre un prototypage rapide
* Être polyvalent (web, data, scripting, automatisation, IA)
* Abaisser la barrière d'entrée pour les débutants

---

## Domaines d'utilisation

* Data science et machine learning (NumPy, Pandas, Scikit-learn, TensorFlow)
* Backend web (Django, Flask, FastAPI)
* Scripts et automatisation (sys admin, DevOps)
* Intelligence artificielle (PyTorch, Hugging Face)
* Enseignement et prototypage rapide

---

## Fonctionnement

* Code source interprété par CPython (pas de compilation séparée)
* Typage dynamique (types vérifiés à l'exécution, pas à la compilation)
* Gestion mémoire automatique (reference counting + garbage collector)
* GIL (Global Interpreter Lock) → un seul thread Python exécuté à la fois
* Modules et packages importés dynamiquement

---

## Concepts clés

* **Indentation significative** — L'indentation définit les blocs de code (pas les accolades)
* **Duck typing** — "Si ça marche comme un canard, c'est un canard"
* **List comprehension** — Création concise de listes `[x*2 for x in range(10)]`
* **Décorateurs** — Fonctions qui modifient d'autres fonctions (`@property`, `@staticmethod`)
* **Générateurs** — Fonctions lazy avec `yield`
* **Type hints** — Annotations de type optionnelles (PEP 484)

---

## Exemple

```python
from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int

users = [User("Alice", 30), User("Bob", 17), User("Charlie", 25)]

# List comprehension + filtrage
adults = [u.name for u in users if u.age >= 18]
print(adults)  # ['Alice', 'Charlie']
```

---

## Structure / Architecture

* **Modules** — Fichiers `.py` contenant du code
* **Packages** — Répertoires avec `__init__.py`
* **Virtual environments** — Isolation des dépendances par projet
* **pip** — Gestionnaire de packages (PyPI)

---

## Syntaxe et spécificités

* Indentation obligatoire (4 espaces par convention)
* Pas de point-virgule, pas d'accolades
* `self` explicite dans les méthodes de classe
* Multiparadigme : OOP, fonctionnel, impératif
* Tout est objet (même les fonctions et les classes)

---

## Avantages

* Syntaxe très lisible et concise
* Écosystème énorme (data, web, IA, scripting)
* Courbe d'apprentissage douce
* Grande communauté et abondance de ressources
* Prototypage très rapide

---

## Inconvénients

* Performances lentes (interprété, pas compilé)
* GIL limite le parallélisme CPU
* Typage dynamique → erreurs détectées à l'exécution
* Packaging et gestion des dépendances complexes (pip, conda, poetry…)
* Pas idéal pour les applications mobiles ou embarquées

---

## Pièges courants

* Arguments mutables par défaut (`def f(x=[])` → même liste partagée)
* Confusion entre `is` et `==` (identité vs égalité)
* Oublier que les strings et tuples sont immuables
* GIL : les threads ne parallélisent pas le CPU (utiliser multiprocessing)
* Mélanger Python 2 et Python 3

---

## À ne pas confondre

* Python vs Java (dynamique/concis vs statique/verbose)
* `is` vs `==` (même objet vs même valeur)
* Liste vs tuple (mutable vs immuable)
* pip vs conda (packages Python vs packages multi-langage)

---

## Explication simplifiée

Python est un langage facile à lire et à écrire, qui te permet de faire presque tout : des scripts d'automatisation, des sites web, de l'intelligence artificielle. Son code ressemble presque à de l'anglais.

---

## Explication avancée

Python est implémenté principalement via CPython, un interpréteur qui compile le source en bytecode (.pyc) exécuté par une VM. Le GIL (Global Interpreter Lock) sérialise l'accès au runtime, limitant le parallélisme CPU aux processus séparés (multiprocessing). Le typage dynamique repose sur le duck typing et le protocole de descripteurs (MRO, __getattr__, __slots__). Les type hints (PEP 484) permettent une vérification statique optionnelle via mypy sans impacter l'exécution.

---

## Points critiques à retenir

* [CRITIQUE] Python est interprété et dynamiquement typé
* [CRITIQUE] L'indentation définit la structure du code
* [IMPORTANT] Écosystème dominant en data science et IA
* [IMPORTANT] Virtual environments pour isoler les dépendances par projet
* [PIÈGE] Arguments mutables par défaut (liste, dict) → bugs subtils
* [PIÈGE] GIL empêche le vrai parallélisme CPU avec les threads
