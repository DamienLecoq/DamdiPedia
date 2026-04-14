---
id: pandas
label: Pandas
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:32.954Z'
updatedAt: '2026-04-14T17:59:32.954Z'
relations:
  - target: python
    type: uses
    weight: 0.9
  - target: numpy
    type: depends_on
    weight: 0.9
resources:
  - type: documentation
    title: Pandas Documentation officielle
    url: 'https://pandas.pydata.org/docs/'
  - type: cours
    title: 10 Minutes to pandas
    url: 'https://pandas.pydata.org/docs/user_guide/10min.html'
  - type: vidéo
    title: Corey Schafer – Pandas Tutorials
    url: 'https://www.youtube.com/playlist?list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS'
---

## Résumé rapide

Pandas est la bibliothèque Python de référence pour la manipulation et l'analyse de données tabulaires. Elle fournit le DataFrame, structure inspirée des feuilles de calcul et de R.

---

## Définition

Pandas est une bibliothèque open-source construite sur NumPy qui offre des structures de données performantes (Series, DataFrame) et des outils pour charger, nettoyer, transformer, agréger et analyser des données structurées.

---

## Histoire

* Créé par Wes McKinney en 2008 chez AQR Capital
* Open-source depuis 2009
* Version 1.0 en 2020 (standardisation API)
* Pandas 2.0 en 2023 avec backend PyArrow
* Devenue la bibliothèque standard de data science Python

---

## Objectif

* Manipuler facilement des données tabulaires
* Remplacer Excel/R pour l'analyse de données à grande échelle
* Offrir des opérations vectorisées performantes
* Intégrer le chargement de multiples formats (CSV, Excel, SQL, JSON, Parquet)

---

## Domaines d'utilisation

* Data science et analyse exploratoire
* ETL et préparation de données pour ML
* Reporting et business intelligence
* Nettoyage et agrégation de logs

---

## Fonctionnement

* **Series** — Tableau 1D avec index
* **DataFrame** — Tableau 2D (lignes × colonnes) avec index
* Opérations vectorisées via NumPy (évite les boucles Python)
* Groupby pour agrégations SQL-like
* Merge/join pour combiner des DataFrames

---

## Concepts clés

* **DataFrame** — Structure 2D principale
* **Series** — Colonne typée avec index
* **Index** — Identifiant des lignes, peut être multi-niveau
* **groupby** — Split-apply-combine pour agrégations
* **merge / join** — Jointures style SQL
* **apply / map** — Application de fonctions sur lignes/colonnes

---

## Exemple

```python
import pandas as pd

df = pd.read_csv('ventes.csv')

# Filtrer et agréger
result = (df[df['montant'] > 100]
          .groupby('region')['montant']
          .agg(['sum', 'mean', 'count'])
          .sort_values('sum', ascending=False))

print(result.head())
```

---

## Avantages

* API expressive et intuitive
* Performances vectorisées (C/Cython)
* Intégration native avec NumPy et Matplotlib
* Support de nombreux formats d'I/O
* Écosystème data science complet

---

## Inconvénients

* Consommation mémoire élevée (charge tout en RAM)
* Performances limitées sur données massives (> RAM)
* API parfois incohérente (inplace, axis, etc.)
* Chaining peut devenir illisible

---

## Pièges courants

* `SettingWithCopyWarning` — modifier une vue au lieu d'une copie
* Oublier `reset_index()` après un groupby
* Boucle `for` au lieu d'opérations vectorisées
* Utiliser `apply` quand `vectorize` suffit

---

## À ne pas confondre

* Pandas vs Polars (Polars plus rapide, API différente)
* Pandas vs NumPy (tabulaire avec labels vs tableaux numériques purs)
* `.loc` vs `.iloc` (label-based vs position-based)

---

## Explication simplifiée

Pandas c'est comme Excel mais en code Python : tu charges ton CSV, tu filtres tes lignes, tu fais des sommes par catégorie, tu fusionnes plusieurs fichiers — le tout avec des performances incomparables à des boucles classiques.

---

## Explication avancée

Pandas utilise NumPy sous le capot pour stocker les colonnes en arrays typés, ce qui permet des opérations vectorisées C-speed. Les index permettent l'alignement automatique dans les opérations entre Series. Pandas 2.0 introduit un backend PyArrow optionnel pour de meilleures performances mémoire et des types nullables natifs.

---

## Points critiques à retenir

* [CRITIQUE] Pandas charge tout en RAM — inadapté si données > mémoire
* [CRITIQUE] Préférer les opérations vectorisées aux boucles `for`
* [IMPORTANT] `.copy()` pour éviter `SettingWithCopyWarning`
* [IMPORTANT] `.loc` pour labels, `.iloc` pour positions
* [PIÈGE] `apply` est souvent un anti-pattern (plus lent que vectorisé)
