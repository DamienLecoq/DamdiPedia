---
id: scikit-learn
label: Scikit-learn
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:55.920Z'
updatedAt: '2026-04-14T17:59:55.920Z'
relations:
  - target: python
    type: uses
    weight: 0.9
  - target: numpy
    type: depends_on
    weight: 0.9
resources:
  - type: documentation
    title: Scikit-learn Documentation officielle
    url: 'https://scikit-learn.org/stable/'
  - type: cours
    title: Scikit-learn User Guide
    url: 'https://scikit-learn.org/stable/user_guide.html'
  - type: vidéo
    title: StatQuest – Machine Learning
    url: 'https://www.youtube.com/c/joshstarmer'
---

## Résumé rapide

Scikit-learn est la bibliothèque de référence pour le machine learning classique en Python. Elle offre une API unifiée pour la classification, la régression, le clustering et la réduction de dimensionnalité.

---

## Définition

Scikit-learn est une bibliothèque open-source construite sur NumPy et SciPy, fournissant des algorithmes de ML supervisés et non-supervisés avec une API cohérente (fit/predict/transform) et des outils de preprocessing, évaluation et sélection de modèles.

---

## Histoire

* Projet Google Summer of Code 2007 par David Cournapeau
* Premier release public en 2010
* Financement INRIA puis scikit-learn consortium
* Devenue la bibliothèque ML Python de référence
* Contribution open-source massive

---

## Objectif

* Rendre le machine learning accessible en Python
* Offrir une API cohérente pour tous les algorithmes
* Intégrer preprocessing, modélisation et évaluation
* Fournir des implémentations de qualité production

---

## Domaines d'utilisation

* Classification (spam, fraude, diagnostic)
* Régression (prévision de ventes, prix)
* Clustering (segmentation clients)
* Réduction de dimensionnalité (PCA, t-SNE)

---

## Fonctionnement

* API uniforme : `fit()`, `predict()`, `transform()`, `score()`
* Pipelines pour chaîner preprocessing et modèles
* Cross-validation et GridSearchCV pour tuning
* Évalue via métriques (accuracy, F1, ROC-AUC)
* Sérialisation via joblib

---

## Concepts clés

* **Estimator** — Objet avec `.fit()` (classifier, regressor)
* **Transformer** — Objet avec `.transform()` (scaler, encoder)
* **Pipeline** — Chaîne transformers + estimator
* **Cross-validation** — Évaluation robuste
* **GridSearchCV** — Recherche d'hyperparamètres
* **Train/test split** — Séparation des données

---

## Exemple

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)
print("Accuracy:", accuracy_score(y_test, clf.predict(X_test)))
```

---

## Avantages

* API cohérente et prévisible
* Documentation exemplaire
* Large choix d'algorithmes classiques
* Pipelines pour production robuste
* Intégration NumPy/Pandas native

---

## Inconvénients

* Pas de deep learning (utiliser PyTorch/TensorFlow)
* Pas de GPU natif
* Moins adapté au big data (> RAM)
* Peu flexible pour custom layers

---

## Pièges courants

* Fitter le scaler sur train+test (data leakage)
* Oublier `stratify=y` pour classes déséquilibrées
* Utiliser accuracy sur des classes très déséquilibrées
* Ne pas utiliser Pipeline (risque de leakage)

---

## À ne pas confondre

* Scikit-learn vs PyTorch/TF (ML classique vs deep learning)
* fit vs fit_transform vs transform
* RandomForest vs Gradient Boosting

---

## Explication simplifiée

Scikit-learn c'est ta boîte à outils ML : tu as tes données, tu choisis un algorithme (forêt aléatoire, régression, SVM), tu appelles `.fit()` pour entraîner et `.predict()` pour prédire. Toujours la même interface, peu importe l'algorithme.

---

## Explication avancée

Scikit-learn implémente les algorithmes en Cython pour la performance et en NumPy pour l'accessibilité. L'API est unifiée autour du trio Estimator/Transformer/Predictor. Les pipelines garantissent que le preprocessing est appliqué de manière cohérente entre train et test, évitant le data leakage. GridSearchCV parallélise la recherche d'hyperparamètres via joblib.

---

## Points critiques à retenir

* [CRITIQUE] `fit()` uniquement sur train, `transform()` sur train et test
* [CRITIQUE] Utiliser Pipeline pour éviter le data leakage
* [IMPORTANT] Choisir la bonne métrique selon le problème
* [IMPORTANT] `stratify` pour classes déséquilibrées
* [PIÈGE] Accuracy trompeuse sur datasets déséquilibrés
