---
id: numpy
label: NumPy
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:27.121Z'
updatedAt: '2026-04-14T17:59:27.121Z'
relations:
  - target: python
    type: uses
    weight: 0.9
resources:
  - type: documentation
    title: NumPy Documentation officielle
    url: 'https://numpy.org/doc/stable/'
  - type: documentation
    title: NumPy Absolute Beginners Guide
    url: 'https://numpy.org/doc/stable/user/absolute_beginners.html'
  - type: vidéo
    title: Keith Galli – NumPy Tutorial
    url: 'https://www.youtube.com/watch?v=GB9ByFAIAH4'
---

## Résumé rapide

NumPy est la bibliothèque fondamentale pour le calcul scientifique en Python. Elle fournit le ndarray, un tableau N-dimensionnel performant qui est la base de tout l'écosystème data science Python.

---

## Définition

NumPy (Numerical Python) est une bibliothèque open-source offrant un type de tableau N-dimensionnel (ndarray) implémenté en C, ainsi qu'un vaste ensemble d'opérations mathématiques vectorisées ultra-performantes.

---

## Histoire

* Créé par Travis Oliphant en 2005 (fusion de Numeric et Numarray)
* Version 1.0 en 2006
* Base de SciPy, Pandas, scikit-learn, TensorFlow
* Financement NSF et Moore Foundation pour la pérennité
* Standard de facto pour le calcul numérique Python

---

## Objectif

* Offrir des tableaux N-dim performants à Python
* Remplacer les boucles Python par des opérations vectorisées
* Fournir une base pour tout le stack scientifique
* Intégrer les bibliothèques BLAS/LAPACK pour l'algèbre linéaire

---

## Domaines d'utilisation

* Calcul scientifique et ingénierie
* Machine learning (fondation de scikit-learn, TF, PyTorch)
* Traitement du signal et d'images
* Simulations numériques et statistiques

---

## Fonctionnement

* `ndarray` stocké contigu en mémoire, typé (dtype)
* Opérations vectorisées exécutées en C
* Broadcasting : alignement automatique des dimensions
* Views : sous-tableaux sans copie mémoire
* Appel direct à BLAS/LAPACK pour l'algèbre linéaire

---

## Concepts clés

* **ndarray** — Tableau N-dimensionnel typé et homogène
* **dtype** — Type de données (int32, float64, etc.)
* **shape** — Dimensions du tableau
* **Broadcasting** — Règles d'alignement automatique
* **View vs Copy** — Vue partagée ou tableau indépendant
* **Vectorisation** — Opérations élément-wise sans boucle Python

---

## Exemple

```python
import numpy as np

# Créer un tableau
a = np.array([[1, 2, 3], [4, 5, 6]])

# Opérations vectorisées
b = a * 2 + 1
c = np.dot(a, a.T)  # Produit matriciel

# Broadcasting
row = np.array([10, 20, 30])
result = a + row  # Ajoute row à chaque ligne

print(result)
```

---

## Avantages

* Performances C-speed via vectorisation
* API concise et expressive
* Base de tout l'écosystème scientifique Python
* Broadcasting puissant
* Intégration BLAS/LAPACK pour l'algèbre linéaire

---

## Inconvénients

* Consommation mémoire (tout en RAM)
* Pas de GPU natif (nécessite CuPy ou JAX)
* Debugging de broadcasting parfois complexe
* Types hétérogènes non supportés (utiliser Pandas)

---

## Pièges courants

* Confondre view et copy (modification involontaire)
* Oublier que l'indexation avancée retourne toujours une copie
* Broadcasting silencieux causant des bugs subtils
* Utiliser `np.array` dans une boucle Python

---

## À ne pas confondre

* NumPy vs Pandas (numérique pur vs tabulaire labellisé)
* NumPy vs list Python (contigu typé vs hétérogène)
* View vs Copy (partage mémoire vs indépendant)

---

## Explication simplifiée

NumPy c'est le moteur de calcul mathématique de Python. Au lieu de faire une boucle pour additionner 1 million de nombres (lent), NumPy le fait en une seule opération en C (ultra rapide). C'est sur NumPy que reposent Pandas, TensorFlow et tous les autres.

---

## Explication avancée

NumPy stocke les données dans un buffer C contigu avec un dtype uniforme, permettant des opérations SIMD et l'appel direct à BLAS/LAPACK. Le broadcasting applique des règles de diffusion pour aligner des tableaux de shapes différentes sans allocation. Les views permettent de créer des sous-tableaux sans copier la mémoire, ce qui est essentiel pour la performance mais source de bugs subtils.

---

## Points critiques à retenir

* [CRITIQUE] Vectoriser au lieu de boucler en Python
* [CRITIQUE] `dtype` est uniforme — tout le ndarray a le même type
* [IMPORTANT] Broadcasting aligne les dimensions automatiquement
* [IMPORTANT] `.copy()` pour éviter les modifications involontaires
* [PIÈGE] Slicing crée une view, indexation avancée une copie
