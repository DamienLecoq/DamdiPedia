---
id: kiss
label: KISS
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:07.478Z'
updatedAt: '2026-04-14T17:59:07.478Z'
relations:
  - targetId: dry
    type: related
resources:
  - type: documentation
    title: Wikipedia – Principe KISS
    url: 'https://fr.wikipedia.org/wiki/Principe_KISS'
  - type: vidéo
    title: Fireship – KISS Principle
    url: 'https://www.youtube.com/watch?v=SaLgnEuHdlQ'
  - type: blog
    title: freeCodeCamp – KISS Principle in Software Development
    url: 'https://www.freecodecamp.org/news/kiss-keep-it-simple-stupid/'
  - type: blog
    title: Martin Fowler – Is Design Dead?
    url: 'https://martinfowler.com/articles/designDead.html'
  - type: livre
    title: Clean Code – Robert C. Martin
    url: 'https://www.amazon.com/dp/0132350882'
---

## Résumé rapide

KISS (Keep It Simple, Stupid) est un principe de conception qui prône la simplicité comme objectif premier. La plupart des systèmes fonctionnent mieux lorsqu'ils restent simples plutôt que compliqués. La complexité inutile doit être évitée.

---

## Définition

KISS est un acronyme pour "Keep It Simple, Stupid" (garde ça simple, idiot). Ce principe affirme que la simplicité devrait être un objectif clé de la conception et que toute complexité non nécessaire devrait être évitée. Un code simple est plus facile à comprendre, à maintenir et à déboguer.

---

## Histoire

* Origine attribuée à Kelly Johnson, ingénieur en chef chez Lockheed Martin (années 1960)
* Appliqué à l'origine dans l'ingénierie aéronautique
* Adopté en informatique comme principe fondamental de conception logicielle
* Proche du rasoir d'Occam : la solution la plus simple est souvent la meilleure
* Popularisé dans le développement agile et l'Extreme Programming

---

## Objectif

* Réduire la complexité du code pour faciliter sa compréhension
* Minimiser les risques de bugs liés à la sur-ingénierie
* Accélérer le développement en évitant les abstractions inutiles
* Faciliter l'intégration de nouveaux développeurs dans un projet

---

## Domaines d'utilisation

* Développement logiciel (conception, architecture, code)
* Design d'interfaces utilisateur (UX/UI)
* Architecture système et infrastructure
* Rédaction de documentation technique
* Gestion de projet et processus métier

---

## Fonctionnement

Le principe KISS s'applique en se posant constamment la question : "Est-ce que je peux faire plus simple ?"

* **Au niveau du code** — Préférer les solutions directes aux solutions "élégantes" mais complexes
* **Au niveau de l'architecture** — Ne pas ajouter de couches ou de patterns sans besoin réel
* **Au niveau des fonctionnalités** — Ne développer que ce qui est vraiment nécessaire
* **Au niveau de la communication** — Nommer clairement, commenter quand c'est utile

---

## Concepts clés

* **Simplicité** — Le code le plus simple qui fonctionne est souvent le meilleur
* **Lisibilité** — Le code est lu bien plus souvent qu'il n'est écrit
* **Sur-ingénierie** — L'ennemi de KISS : ajouter de la complexité "au cas où"
* **Refactoring** — Simplifier le code existant en continu
* **YAGNI** — Principe complémentaire : ne pas coder ce dont on n'a pas besoin

---

## Exemple

```python
# ❌ Violation KISS : sur-ingénierie pour un besoin simple
class NumberClassifier:
    def __init__(self, strategy=None):
        self.strategy = strategy or DefaultClassificationStrategy()

    def classify(self, number):
        return self.strategy.execute(number)

class DefaultClassificationStrategy:
    def execute(self, number):
        if number % 2 == 0:
            return "pair"
        return "impair"

classifier = NumberClassifier()
result = classifier.classify(4)

# ✅ KISS respecté : simple et direct
def pair_ou_impair(nombre):
    return "pair" if nombre % 2 == 0 else "impair"

result = pair_ou_impair(4)
```

---

## Avantages

* Code plus facile à lire et à comprendre
* Moins de bugs car moins de complexité
* Maintenance simplifiée
* Onboarding des nouveaux développeurs accéléré
* Débogage plus rapide

---

## Inconvénients

* Peut être utilisé comme excuse pour ne pas concevoir correctement
* La simplicité est subjective — ce qui est simple pour un expert peut être obscur pour un débutant
* Risque de sous-ingénierie si mal interprété
* Parfois, une solution "complexe" est objectivement meilleure pour la maintenabilité à long terme

---

## Pièges courants

* Confondre "simple" et "simpliste" — un code simple peut être bien conçu
* Utiliser KISS pour justifier du code de mauvaise qualité ou non structuré
* Ignorer la complexité essentielle d'un problème (certains problèmes sont intrinsèquement complexes)
* Refuser toute abstraction sous prétexte de KISS
* Confondre "court" et "simple" — un one-liner illisible n'est pas simple

---

## À ne pas confondre

* KISS vs DRY — KISS prône la simplicité, DRY l'unicité de la logique
* KISS vs YAGNI — KISS concerne la manière de coder, YAGNI ce qu'on code
* Simplicité vs facilité — Simple ne veut pas dire facile à implémenter
* KISS vs absence de design — KISS ne signifie pas "ne pas réfléchir à l'architecture"

---

## Explication simplifiée

KISS, c'est comme choisir le chemin le plus court pour aller d'un point A à un point B. En programmation, si tu peux résoudre un problème avec une simple fonction de 5 lignes, n'écris pas une architecture complexe avec 3 classes et 2 interfaces. Le code le plus simple qui fait le travail est souvent le meilleur.

---

## Explication avancée

KISS est un méta-principe qui guide toutes les décisions de conception. Il rejoint le concept de complexité accidentelle vs complexité essentielle de Fred Brooks ("No Silver Bullet", 1986). La complexité essentielle est inhérente au problème à résoudre ; la complexité accidentelle est introduite par nos choix techniques. KISS demande de minimiser la complexité accidentelle. Dans la pratique, cela implique de reporter les décisions d'abstraction jusqu'à ce qu'un besoin concret les justifie, et de toujours chercher la solution qui minimise la charge cognitive pour le lecteur du code.

---

## Points critiques à retenir

* [CRITIQUE] La simplicité est un objectif de conception, pas une excuse pour l'absence de conception
* [CRITIQUE] Le code est lu 10 fois plus souvent qu'il n'est écrit — optimiser pour la lisibilité
* [IMPORTANT] Distinguer complexité essentielle (du problème) et accidentelle (de notre code)
* [IMPORTANT] KISS, DRY et YAGNI forment un trio de principes complémentaires
* [PIÈGE] "Simple" ne veut pas dire "court" — un one-liner cryptique viole KISS
* [PIÈGE] Ne pas utiliser KISS pour justifier l'absence de tests ou de documentation
