---
id: tensorflow
label: TensorFlow
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:17.322Z'
updatedAt: '2026-04-14T18:00:17.322Z'
relations:
  - target: python
    type: depends_on
    weight: 0.9
  - target: keras
    type: uses
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle TensorFlow
    url: 'https://www.tensorflow.org/api_docs'
  - type: cours
    title: DeepLearning.AI – TensorFlow Developer Certificate
    url: 'https://www.coursera.org/professional-certificates/tensorflow-in-practice'
  - type: vidéo
    title: TensorFlow – Chaîne YouTube officielle
    url: 'https://www.youtube.com/@TensorFlow'
  - type: blog
    title: Blog officiel TensorFlow
    url: 'https://blog.tensorflow.org/'
  - type: livre
    title: Hands-On Machine Learning – Aurélien Géron
    url: >-
      https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125974/
---

## Résumé rapide

TensorFlow est un framework open source de machine learning et deep learning développé par Google Brain. Il offre un écosystème complet allant de la recherche au déploiement en production sur serveur, mobile et navigateur.

---

## Définition

TensorFlow est une plateforme end-to-end de machine learning qui permet de construire, entraîner et déployer des modèles d'apprentissage automatique à grande échelle, avec support multi-plateformes (serveur, mobile, edge, web).

---

## Histoire

* Développé par l'équipe Google Brain, successeur interne de DistBelief
* Première version open source publiée en novembre 2015
* TensorFlow 2.0 sorti en septembre 2019, adoptant Keras comme API principale et le mode eager par défaut
* TensorFlow Lite pour mobile/embarqué, TensorFlow.js pour le navigateur
* Bien que toujours très utilisé en industrie, la recherche a largement migré vers PyTorch

---

## Objectif

* Fournir une plateforme complète du prototypage au déploiement en production
* Supporter le déploiement sur toutes les plateformes (serveur, mobile, edge, navigateur)
* Permettre l'entraînement distribué à grande échelle
* Offrir des outils de visualisation et de monitoring (TensorBoard)

---

## Domaines d'utilisation

* Déploiement de modèles en production à grande échelle (TensorFlow Serving)
* Applications mobiles et embarquées (TensorFlow Lite)
* Machine learning dans le navigateur (TensorFlow.js)
* Systèmes de recommandation
* Vision par ordinateur et traitement du langage naturel

---

## Fonctionnement

* Historiquement basé sur un graphe de calcul statique (define-and-run)
* TF 2.0 : mode eager par défaut avec possibilité d'utiliser `tf.function` pour compiler en graphe
* Tenseurs comme structure de données fondamentale
* API Keras intégrée pour la construction de modèles haut niveau
* SavedModel comme format standard de sérialisation des modèles

---

## Concepts clés

* **tf.Tensor** — Structure de données immuable multidimensionnelle
* **tf.function** — Décorateur qui compile une fonction Python en graphe TensorFlow optimisé
* **Keras API** — Interface haut niveau pour définir, entraîner et évaluer des modèles
* **TensorBoard** — Outil de visualisation pour le suivi des métriques d'entraînement
* **SavedModel** — Format de sérialisation portable pour le déploiement
* **tf.data** — API pour construire des pipelines de données performants

---

## Exemple

```python
import tensorflow as tf
from tensorflow import keras

# Construire un modèle avec l'API Keras
modele = keras.Sequential([
    keras.layers.Dense(128, activation='relu', input_shape=(784,)),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation='softmax')
])

# Compiler le modèle
modele.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Entraîner le modèle
modele.fit(x_train, y_train, epochs=5, batch_size=32, validation_split=0.2)

# Évaluer le modèle
perte, precision = modele.evaluate(x_test, y_test)
print(f"Précision : {precision:.4f}")
```

---

## Avantages

* Écosystème complet : entraînement, déploiement, monitoring
* Déploiement multi-plateformes (serveur, mobile, edge, web)
* TensorBoard pour la visualisation intégrée
* Support natif de l'entraînement distribué
* Large base installée en production dans l'industrie

---

## Inconvénients

* API historiquement complexe et parfois déroutante (TF 1.x vs 2.x)
* Débogage plus difficile avec les graphes statiques
* Moins populaire en recherche académique que PyTorch
* Migration TF 1.x vers 2.x a fragmenté la communauté
* Courbe d'apprentissage plus raide pour les fonctionnalités avancées

---

## Pièges courants

* Confondre le mode eager et le mode graphe (comportements différents dans `tf.function`)
* Utiliser des opérations Python standard au lieu d'opérations TF dans `tf.function`
* Négliger les effets de bord dans les fonctions décorées avec `@tf.function`
* Mauvaise gestion de la mémoire GPU (croissance mémoire non limitée par défaut)
* Mélanger les API TF 1.x et 2.x dans le même projet

---

## À ne pas confondre

* TensorFlow vs PyTorch — Écosystème production vs flexibilité recherche
* TensorFlow vs Keras — TF est la plateforme, Keras est l'API haut niveau intégrée
* tf.function vs mode eager — Graphe compilé optimisé vs exécution immédiate
* TensorFlow Serving vs TensorFlow Lite — Déploiement serveur vs mobile/edge

---

## Explication simplifiée

TensorFlow est une boîte à outils créée par Google pour construire des intelligences artificielles. On définit un modèle (une série de calculs), on lui donne des données pour apprendre, puis on peut déployer ce modèle partout : sur un serveur, un téléphone ou même dans un navigateur web.

---

## Explication avancée

TensorFlow repose sur un runtime C++ qui exécute des graphes de calcul dirigés acycliques (DAG). Le décorateur `@tf.function` trace l'exécution Python pour générer un graphe intermédiaire (FuncGraph) qui est ensuite optimisé par Grappler (fusion d'opérations, élimination de code mort, placement de dispositifs). XLA (Accelerated Linear Algebra) compile ces graphes en noyaux machine optimisés pour CPU, GPU ou TPU. L'entraînement distribué utilise des stratégies (`MirroredStrategy`, `TPUStrategy`, `MultiWorkerMirroredStrategy`) qui abstraient la communication inter-dispositifs via NCCL ou gRPC.

---

## Points critiques à retenir

* [CRITIQUE] TF 2.0 utilise le mode eager par défaut, `tf.function` pour compiler en graphe
* [CRITIQUE] Keras est l'API officielle de TensorFlow pour construire les modèles
* [IMPORTANT] Écosystème le plus complet pour le déploiement multi-plateformes
* [IMPORTANT] TensorBoard est l'outil de référence pour le suivi des expériences
* [PIÈGE] Attention aux différences de comportement entre mode eager et `tf.function`
* [PIÈGE] Limiter la croissance mémoire GPU avec `tf.config.experimental.set_memory_growth`
