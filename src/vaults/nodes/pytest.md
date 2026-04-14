---
id: pytest
label: pytest
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:44.010Z'
updatedAt: '2026-04-14T17:59:44.010Z'
relations:
  - target: python
    type: related
    weight: 0.9
resources:
  - type: documentation
    title: pytest Documentation
    url: 'https://docs.pytest.org/'
  - type: livre
    title: Python Testing with pytest – Brian Okken
    url: >-
      https://pragprog.com/titles/bopytest2/python-testing-with-pytest-second-edition/
  - type: blog
    title: Real Python – pytest
    url: 'https://realpython.com/pytest-python-testing/'
---

## Résumé rapide

pytest est le framework de tests le plus populaire en Python, offrant une syntaxe minimaliste, des fixtures puissantes, la découverte automatique et un écosystème riche de plugins.

---

## Définition

pytest permet d'écrire des tests Python avec de simples fonctions et l'instruction `assert`, sans boilerplate. Son système de fixtures gère la configuration et le cleanup, et son introspection offre des messages d'erreur détaillés.

---

## Histoire

* Issu de `py.test` de Holger Krekel en 2004
* Renommé pytest en 2015
* Devient le standard de facto au-dessus de unittest
* Écosystème de plugins énorme (pytest-cov, pytest-asyncio, pytest-mock)
* Référence moderne pour les tests Python

---

## Objectif

* Rendre les tests Python simples à écrire
* Fournir des fixtures puissantes et composables
* Offrir des messages d'erreur clairs
* Supporter parallelisation et plugins
* Remplacer la verbosité d'unittest

---

## Domaines d'utilisation

* Tests unitaires et d'intégration Python
* Data science et ML
* Web (Django, Flask, FastAPI)
* CLI tools
* Bibliothèques Python

---

## Fonctionnement

* Découverte automatique : `test_*.py` + `test_*()`
* Assertion réécrite pour des messages riches
* Fixtures injectées en paramètres
* Parametrize pour tests tabulaires
* Plugins pour étendre

---

## Concepts clés

* **Fixture** — Setup/teardown injecté
* **Parametrize** — Générer N tests d'un seul
* **Marker** — Tagger des tests (`@pytest.mark.slow`)
* **Conftest** — Fixtures partagées entre fichiers
* **Monkeypatch** — Patch dynamique
* **Plugin** — Extension (cov, xdist, asyncio)

---

## Exemple

```python
import pytest

@pytest.fixture
def user():
    return {'name': 'Alice', 'age': 30}

def test_user_name(user):
    assert user['name'] == 'Alice'

@pytest.mark.parametrize('a,b,expected', [
    (1, 2, 3),
    (5, 7, 12),
    (-1, 1, 0),
])
def test_add(a, b, expected):
    assert a + b == expected

@pytest.mark.slow
def test_integration(db):
    assert db.count() > 0
```

```bash
pytest                      # Lance tous les tests
pytest -k "user"            # Filtre par nom
pytest -m "not slow"        # Exclure un marker
pytest --cov=myapp          # Couverture
pytest -n 4                 # Parallèle (xdist)
```

---

## Avantages

* Syntaxe ultra-concise (pas de classes)
* Messages d'erreur très détaillés
* Fixtures composables et scoped
* Écosystème de plugins énorme
* Compatible avec unittest
* Parametrize puissant

---

## Inconvénients

* Fixtures avancées parfois magiques
* Parallélisation via plugin (xdist)
* Debugging des fixtures complexes
* Ecosystem fragmenté (quel plugin choisir)

---

## Pièges courants

* Fixtures avec scope mal choisi (perfs)
* État partagé entre tests (session scope)
* Oublier `monkeypatch` pour restaurer
* Mélanger style unittest et pytest
* Tests asynchrones sans `pytest-asyncio`

---

## À ne pas confondre

* pytest vs unittest (moderne vs stdlib)
* Fixture vs mock
* Marker vs skip

---

## Explication simplifiée

pytest c'est écrire des tests Python sans chichi : une fonction qui commence par `test_`, un `assert`, et basta. Pas besoin de classes ni de méthodes pompeuses. Si ça plante, pytest te montre précisément la valeur attendue et la valeur reçue.

---

## Explication avancée

pytest utilise la réécriture d'AST pour instrumenter `assert` et générer des messages riches sans recourir à `assertEqual`. Les fixtures sont résolues par injection de dépendances : pytest analyse la signature de la fonction de test, construit le graphe de dépendances, et instancie les fixtures dans l'ordre. Les scopes (function, class, module, session) contrôlent la durée de vie. `conftest.py` permet de partager des fixtures sans imports. pytest-xdist distribue les tests sur plusieurs processus, parfait pour les grosses suites.

---

## Points critiques à retenir

* [CRITIQUE] Fixtures isolées par défaut (scope function)
* [CRITIQUE] Tests indépendants, pas d'état partagé implicite
* [IMPORTANT] `parametrize` pour éviter la duplication
* [IMPORTANT] `conftest.py` pour factoriser les fixtures
* [PIÈGE] Scope session = fixtures persistantes (attention au cleanup)
