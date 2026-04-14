---
id: keras
label: Keras
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:06.239Z'
updatedAt: '2026-04-14T17:59:06.239Z'
relations:
  - target: tensorflow
    type: part_of
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle Keras
    url: 'https://keras.io/api/'
  - type: cours
    title: DeepLearning.AI – Introduction to TensorFlow/Keras
    url: 'https://www.coursera.org/learn/introduction-tensorflow'
  - type: vidéo
    title: Sentdex – Keras with TensorFlow
    url: 'https://www.youtube.com/playlist?list=PLQVvvaa0QuDfhTox0AjmQ6tvTgMBZBEXN'
  - type: blog
    title: Keras – Exemples de code officiels
    url: 'https://keras.io/examples/'
  - type: livre
    title: Deep Learning with Python – François Chollet
    url: 'https://www.manning.com/books/deep-learning-with-python-second-edition'
---

## Résumé rapide

Keras est une API haut niveau pour le deep learning, conçue pour être simple, modulaire et extensible. Initialement bibliothèque indépendante, elle est devenue l'interface officielle de TensorFlow et supporte désormais plusieurs backends (TensorFlow, JAX, PyTorch) via Keras 3.

---

## Définition

Keras est une interface de programmation haut niveau pour la construction, l'entraînement et l'évaluation de modèles de réseaux de neurones, abstraisant la complexité des frameworks sous-jacents derrière une API intuitive et cohérente.

---

## Histoire

* Créé par François Chollet (ingénieur Google) en mars 2015
* Conçu initialement comme interface multi-backend (Theano, TensorFlow, CNTK)
* Intégré comme API officielle de TensorFlow à partir de TF 2.0 (2019)
* Keras 3 (2023) revient au multi-backend : TensorFlow, JAX et PyTorch
* Reste l'une des API de deep learning les plus utilisées au monde

---

## Objectif

* Simplifier la création de modèles de deep learning avec une API intuitive
* Permettre un prototypage rapide avec un minimum de code
* Abstraire la complexité des backends (TF, JAX, PyTorch)
* Standardiser les bonnes pratiques de construction de modèles

---

## Domaines d'utilisation

* Prototypage rapide de modèles de deep learning
* Classification d'images et vision par ordinateur
* Traitement du langage naturel
* Séries temporelles et prédiction
* Enseignement du deep learning

---

## Fonctionnement

* Trois API de construction : Sequential (linéaire), Functional (DAG), Subclassing (libre)
* Workflow standard : définir → compiler → entraîner (fit) → évaluer → prédire
* Callbacks pour personnaliser le processus d'entraînement
* Keras 3 : le même code tourne sur TensorFlow, JAX ou PyTorch
* Sérialisation des modèles au format Keras natif ou SavedModel

---

## Concepts clés

* **Sequential API** — Empilement linéaire de couches, le plus simple
* **Functional API** — Construction de graphes complexes avec entrées/sorties multiples
* **Layer** — Brique de base encapsulant des poids et une transformation
* **Callback** — Hook exécuté à différentes étapes de l'entraînement (EarlyStopping, ModelCheckpoint)
* **compile/fit/evaluate** — Workflow standard : configurer l'optimiseur, entraîner, évaluer
* **Keras 3 multi-backend** — Un seul code compatible TensorFlow, JAX et PyTorch

---

## Exemple

```python
import keras
from keras import layers

# API Functional pour un modèle avec deux entrées
entree_texte = keras.Input(shape=(100,), name="texte")
entree_meta = keras.Input(shape=(10,), name="meta")

x = layers.Dense(64, activation="relu")(entree_texte)
x = layers.Dropout(0.3)(x)
y = layers.Dense(16, activation="relu")(entree_meta)

combine = layers.concatenate([x, y])
sortie = layers.Dense(1, activation="sigmoid")(combine)

modele = keras.Model(inputs=[entree_texte, entree_meta], outputs=sortie)

modele.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])
modele.summary()

# Entraînement avec callbacks
modele.fit(
    {"texte": x_texte, "meta": x_meta}, y_train,
    epochs=10,
    callbacks=[keras.callbacks.EarlyStopping(patience=3)]
)
```

---

## Avantages

* API extrêmement simple et lisible, idéale pour débuter
* Prototypage rapide : peu de code pour un modèle fonctionnel
* Keras 3 : interchangeabilité des backends (TF, JAX, PyTorch)
* Excellente documentation et nombreux exemples officiels
* Callbacks puissants pour personnaliser l'entraînement

---

## Inconvénients

* Moins de contrôle fin que les API bas niveau de PyTorch ou TF
* Abstractions parfois trop opaques pour le débogage avancé
* Performances légèrement inférieures au code bas niveau optimisé
* L'historique multi-backend a créé de la confusion (Keras standalone vs tf.keras vs Keras 3)
* Personnalisation avancée nécessite le subclassing, qui perd certains avantages

---

## Pièges courants

* Confondre `keras` (Keras 3 standalone) et `tf.keras` (intégré à TensorFlow)
* Oublier de compiler le modèle avant `fit()` → erreur
* Ne pas utiliser les callbacks (EarlyStopping, ModelCheckpoint) → sur-entraînement
* Utiliser Sequential pour des architectures non linéaires → utiliser Functional
* Ne pas vérifier les shapes des entrées/sorties → erreurs silencieuses de dimensions

---

## À ne pas confondre

* Keras vs TensorFlow — Keras est l'API, TensorFlow est un des backends
* Sequential vs Functional — Linéaire simple vs graphe complexe
* tf.keras vs keras — Version intégrée TF vs version standalone multi-backend
* Layer vs Model — Un Model est un ensemble de Layers

---

## Explication simplifiée

Keras est comme un jeu de construction pour l'intelligence artificielle. Tu empiles des briques (couches) les unes sur les autres pour construire un modèle, tu lui donnes des données pour apprendre, et en quelques lignes de code tu obtiens un modèle capable de faire des prédictions.

---

## Explication avancée

Keras fonctionne comme une couche d'abstraction au-dessus de frameworks de calcul tensoriel. Chaque `Layer` encapsule un état (poids) et une transformation (méthode `call`). L'API Functional construit un DAG symbolique de `KerasTensor` qui est ensuite matérialisé par le backend choisi. Le `compile()` configure la fonction de perte, l'optimiseur et les métriques comme des objets composables. Le `fit()` orchestre la boucle d'entraînement avec gestion des epochs, batches, callbacks et distribution. Keras 3 utilise une couche d'abstraction (`keras.ops`) qui mappe les opérations vers les primitives du backend sélectionné (tf.*, jax.numpy.*, torch.*).

---

## Points critiques à retenir

* [CRITIQUE] Keras est l'API haut niveau officielle de TensorFlow
* [CRITIQUE] Trois modes de construction : Sequential, Functional, Subclassing
* [IMPORTANT] Keras 3 supporte TensorFlow, JAX et PyTorch comme backends
* [IMPORTANT] Toujours utiliser des callbacks (EarlyStopping, ModelCheckpoint) en production
* [PIÈGE] Ne pas confondre keras standalone et tf.keras
* [PIÈGE] Vérifier les dimensions des entrées avant l'entraînement
