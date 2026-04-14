---
id: jax
label: JAX
category: framework
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:59.666Z'
updatedAt: '2026-04-14T17:58:59.666Z'
relations:
  - target: python
    type: depends_on
    weight: 0.9
  - target: numpy
    type: extends
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle JAX
    url: 'https://jax.readthedocs.io/en/latest/'
  - type: vidéo
    title: DeepMind – JAX Ecosystem
    url: 'https://www.youtube.com/watch?v=WdTeDXsOSj4'
  - type: blog
    title: JAX – Tutoriels officiels
    url: 'https://jax.readthedocs.io/en/latest/tutorials.html'
  - type: cours
    title: UvA – JAX Tutorial
    url: >-
      https://uvadlc-notebooks.readthedocs.io/en/latest/tutorial_notebooks/JAX/tutorial2/Introduction_to_JAX.html
  - type: documentation
    title: Flax – Bibliothèque de réseaux de neurones pour JAX
    url: 'https://flax.readthedocs.io/en/latest/'
---

## Résumé rapide

JAX est une bibliothèque de calcul numérique développée par Google DeepMind, qui combine une API compatible NumPy avec la différentiation automatique, la compilation JIT via XLA et la parallélisation automatique sur GPU/TPU.

---

## Définition

JAX est un framework de calcul numérique haute performance qui étend NumPy avec la différentiation automatique (`grad`), la compilation just-in-time (`jit`), la vectorisation (`vmap`) et la parallélisation (`pmap`), le tout optimisé pour accélérateurs matériels.

---

## Histoire

* Développé par Google Brain / DeepMind, première version publique en 2018
* Conçu comme successeur d'Autograd (bibliothèque de différentiation automatique)
* Utilisé en interne chez Google et DeepMind pour la recherche de pointe
* Écosystème croissant : Flax, Optax, Haiku pour le deep learning
* Adopté pour des projets majeurs comme AlphaFold et Gemini

---

## Objectif

* Fournir un NumPy accéléré sur GPU/TPU avec différentiation automatique
* Permettre des transformations fonctionnelles composables (jit, grad, vmap, pmap)
* Offrir des performances maximales via la compilation XLA
* Supporter la recherche en machine learning avec une approche fonctionnelle pure

---

## Domaines d'utilisation

* Recherche avancée en deep learning (DeepMind, Google)
* Calcul scientifique haute performance
* Physique computationnelle et simulations
* Optimisation numérique et statistiques bayésiennes
* Modèles de fondation et grands modèles de langage

---

## Fonctionnement

* API quasi identique à NumPy (`jax.numpy` remplace `numpy`)
* Transformations fonctionnelles : `jit` (compilation), `grad` (gradient), `vmap` (vectorisation), `pmap` (parallélisation)
* Compilation via XLA (Accelerated Linear Algebra) pour GPU et TPU
* Paradigme fonctionnel pur : pas d'effets de bord, état explicite
* PRNG (générateur de nombres aléatoires) explicite avec des clés

---

## Concepts clés

* **jax.numpy** — API compatible NumPy exécutée sur accélérateurs
* **jit** — Compilation just-in-time d'une fonction Python vers du code XLA optimisé
* **grad** — Calcul automatique du gradient d'une fonction
* **vmap** — Vectorisation automatique d'une fonction sur un batch
* **pmap** — Parallélisation automatique sur plusieurs dispositifs (GPU/TPU)
* **pytree** — Structure de données arborescente (dict, list, tuple) manipulée nativement

---

## Exemple

```python
import jax
import jax.numpy as jnp

# Définir une fonction de perte
def perte(params, x, y):
    predictions = jnp.dot(x, params['w']) + params['b']
    return jnp.mean((predictions - y) ** 2)

# Calculer automatiquement le gradient
grad_perte = jax.grad(perte)

# Compiler avec JIT pour la performance
@jax.jit
def etape_entrainement(params, x, y, lr=0.01):
    grads = grad_perte(params, x, y)
    return {
        'w': params['w'] - lr * grads['w'],
        'b': params['b'] - lr * grads['b']
    }

# Initialisation
cle = jax.random.PRNGKey(42)
params = {'w': jax.random.normal(cle, (3,)), 'b': 0.0}

# Vectorisation automatique sur un batch
predictions_batch = jax.vmap(lambda x: jnp.dot(x, params['w']))(x_batch)
```

---

## Avantages

* Performances exceptionnelles grâce à la compilation XLA
* Transformations composables (jit + grad + vmap)
* Support natif des TPU Google
* API familière pour les utilisateurs de NumPy
* Paradigme fonctionnel favorisant la reproductibilité

---

## Inconvénients

* Courbe d'apprentissage raide (paradigme fonctionnel pur)
* Écosystème plus petit que PyTorch ou TensorFlow
* Débogage difficile avec le code compilé JIT
* Pas de mutation in-place des tableaux (immutabilité)
* Messages d'erreur parfois cryptiques avec les transformations

---

## Pièges courants

* Oublier que les tableaux JAX sont immuables (pas de modification in-place)
* Utiliser `numpy` au lieu de `jax.numpy` → pas de compilation ni GPU
* Ne pas gérer explicitement les clés PRNG → reproductibilité compromise
* Effets de bord dans les fonctions jit (print, mutation de variables) → ignorés
* Traces conditionnelles dans `jit` : utiliser `jax.lax.cond` au lieu de `if`

---

## À ne pas confondre

* JAX vs NumPy — JAX étend NumPy avec grad, jit, vmap et support GPU
* JAX vs PyTorch — Fonctionnel pur vs orienté objet, recherche vs généraliste
* jit vs eager — Code compilé optimisé vs exécution immédiate Python
* Flax vs JAX — Flax est une bibliothèque de réseaux de neurones au-dessus de JAX

---

## Explication simplifiée

JAX, c'est comme NumPy avec des super-pouvoirs. Tu écris du code mathématique comme d'habitude, mais JAX peut automatiquement calculer les dérivées, accélérer le code sur carte graphique, et paralléliser les calculs. C'est l'outil favori des chercheurs qui veulent le maximum de performance.

---

## Explication avancée

JAX est construit autour d'un système de traces (tracing) qui convertit les fonctions Python en représentations intermédiaires (jaxpr) avant compilation XLA. Les transformations (`jit`, `grad`, `vmap`, `pmap`) sont des opérations sur ces jaxprs, composables librement. La différentiation automatique utilise le mode forward et reverse, avec support des dérivées d'ordre supérieur. Le système de types utilise les ShapedArray pour l'analyse statique des formes. Le PRNG utilise un système de clés splittables (Threefry counter-based) garantissant la reproductibilité en contexte parallèle. XLA compile les graphes HLO en noyaux optimisés par dispositif (CPU, GPU CUDA, TPU).

---

## Points critiques à retenir

* [CRITIQUE] JAX est fonctionnel pur : pas de mutation, état explicite
* [CRITIQUE] Les transformations jit/grad/vmap/pmap sont composables
* [IMPORTANT] API compatible NumPy mais tableaux immuables
* [IMPORTANT] Support natif TPU, utilisé pour les grands modèles Google/DeepMind
* [PIÈGE] Ne pas utiliser d'effets de bord (print, mutation) dans les fonctions jit
* [PIÈGE] Gérer explicitement les clés PRNG pour la reproductibilité
