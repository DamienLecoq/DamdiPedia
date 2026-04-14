---
id: pytorch
label: PyTorch
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:46.278Z'
updatedAt: '2026-04-14T17:59:46.278Z'
relations:
  - target: python
    type: depends_on
    weight: 0.9
  - target: gpu
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle PyTorch
    url: 'https://pytorch.org/docs/stable/'
  - type: vidéo
    title: Andrej Karpathy – Neural Networks Zero to Hero
    url: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ'
  - type: cours
    title: fast.ai – Practical Deep Learning
    url: 'https://course.fast.ai/'
  - type: blog
    title: PyTorch Tutorials officiels
    url: 'https://pytorch.org/tutorials/'
  - type: livre
    title: Deep Learning with PyTorch – Eli Stevens
    url: 'https://www.manning.com/books/deep-learning-with-pytorch'
---

## Résumé rapide

PyTorch est un framework open source de deep learning développé par Meta AI. Il se distingue par son graphe de calcul dynamique, sa simplicité d'utilisation et son adoption massive dans la recherche en intelligence artificielle.

---

## Définition

PyTorch est une bibliothèque Python de calcul tensoriel avec accélération GPU et de différentiation automatique, conçue pour la construction et l'entraînement de réseaux de neurones profonds.

---

## Histoire

* Créé par Meta AI (Facebook AI Research) en 2016, basé sur le framework Torch (Lua)
* Version 1.0 stable sortie en décembre 2018
* Fusion avec Caffe2 pour le déploiement en production
* PyTorch 2.0 lancé en mars 2023 avec torch.compile pour des performances accrues
* Devenu le framework dominant en recherche académique, dépassant TensorFlow à partir de 2019

---

## Objectif

* Fournir un framework flexible et intuitif pour la recherche en deep learning
* Permettre un prototypage rapide grâce au mode eager (exécution immédiate)
* Offrir une accélération GPU transparente pour le calcul tensoriel
* Supporter le déploiement en production via TorchScript et TorchServe

---

## Domaines d'utilisation

* Recherche en deep learning et intelligence artificielle
* Vision par ordinateur (classification, détection, segmentation)
* Traitement du langage naturel (transformers, LLM)
* Apprentissage par renforcement
* Génération d'images et modèles génératifs (GANs, diffusion)

---

## Fonctionnement

* Tenseurs similaires à NumPy mais avec support GPU natif (CUDA)
* Graphe de calcul dynamique (define-by-run) : le graphe est construit à chaque exécution
* Autograd : différentiation automatique pour le calcul des gradients
* Modules `nn.Module` pour définir les couches et architectures
* Optimiseurs (`torch.optim`) pour la mise à jour des poids

---

## Concepts clés

* **Tensor** — Structure de données multidimensionnelle, équivalent GPU du ndarray NumPy
* **Autograd** — Moteur de différentiation automatique qui enregistre les opérations et calcule les gradients
* **nn.Module** — Classe de base pour définir les couches et modèles de réseaux de neurones
* **DataLoader** — Utilitaire pour charger les données par lots (batches) avec parallélisme
* **torch.compile** — Compilateur JIT de PyTorch 2.0 pour optimiser les performances
* **CUDA** — Interface pour exécuter les calculs sur GPU NVIDIA

---

## Exemple

```python
import torch
import torch.nn as nn
import torch.optim as optim

# Définir un réseau simple
class MonReseau(nn.Module):
    def __init__(self):
        super().__init__()
        self.couches = nn.Sequential(
            nn.Linear(784, 128),
            nn.ReLU(),
            nn.Linear(128, 10)
        )

    def forward(self, x):
        return self.couches(x)

# Créer le modèle et l'optimiseur
modele = MonReseau()
optimiseur = optim.Adam(modele.parameters(), lr=0.001)
critere = nn.CrossEntropyLoss()

# Entraînement sur un batch
entrees = torch.randn(32, 784)
cibles = torch.randint(0, 10, (32,))

sorties = modele(entrees)
perte = critere(sorties, cibles)
perte.backward()       # Calcul des gradients
optimiseur.step()      # Mise à jour des poids
optimiseur.zero_grad() # Réinitialisation des gradients
```

---

## Avantages

* Graphe dynamique : débogage facile avec pdb et print
* API pythonique et intuitive, courbe d'apprentissage douce
* Dominant en recherche académique, immense écosystème de modèles
* Excellente intégration GPU avec CUDA
* torch.compile (PyTorch 2.0) améliore significativement les performances

---

## Inconvénients

* Déploiement en production historiquement plus complexe que TensorFlow/Serving
* Consommation mémoire GPU élevée sans optimisation
* Documentation parfois fragmentée entre versions
* Le mode eager est plus lent que les graphes statiques compilés
* Écosystème mobile et embarqué moins mature que TensorFlow Lite

---

## Pièges courants

* Oublier `model.eval()` et `torch.no_grad()` en inférence (affecte BatchNorm et Dropout)
* Ne pas appeler `optimizer.zero_grad()` avant chaque backward → accumulation de gradients
* Mélanger tenseurs CPU et GPU → RuntimeError
* Ne pas gérer le device explicitement (`model.to(device)`, `tensor.to(device)`)
* Fuites mémoire GPU en gardant des références aux tenseurs du graphe de calcul

---

## À ne pas confondre

* PyTorch vs TensorFlow — Graphe dynamique vs historiquement statique, recherche vs production
* Tensor PyTorch vs ndarray NumPy — Le tensor supporte le GPU et l'autograd
* torch.compile vs TorchScript — Compilation JIT moderne vs ancien système d'export
* DataLoader vs Dataset — Le DataLoader itère sur un Dataset par lots

---

## Explication simplifiée

PyTorch est un outil qui permet de créer et entraîner des intelligences artificielles. Imagine un ensemble de matrices (tableaux de nombres) que tu fais passer à travers des opérations mathématiques. PyTorch fait ces calculs très vite sur la carte graphique et apprend automatiquement à ajuster les nombres pour que le modèle devienne intelligent.

---

## Explication avancée

PyTorch implémente un moteur de différentiation automatique en mode reverse (backpropagation) via un graphe de calcul dynamique (DAG). Chaque opération sur un tenseur avec `requires_grad=True` enregistre une fonction dans le graphe. L'appel à `.backward()` parcourt ce graphe en ordre topologique inverse pour calculer les gradients via la règle de chaîne. PyTorch 2.0 introduit `torch.compile` qui utilise TorchDynamo pour capturer le graphe d'exécution Python, TorchInductor comme backend de compilation, et génère du code Triton optimisé pour GPU. Le modèle de mémoire utilise un allocateur de cache CUDA (caching allocator) pour minimiser les appels à cudaMalloc.

---

## Points critiques à retenir

* [CRITIQUE] Toujours appeler `model.eval()` et `torch.no_grad()` en inférence
* [CRITIQUE] Graphe dynamique = flexibilité maximale mais overhead d'exécution
* [IMPORTANT] PyTorch est le standard de facto en recherche deep learning
* [IMPORTANT] torch.compile (2.0) réduit l'écart de performance avec les graphes statiques
* [PIÈGE] Ne pas oublier `zero_grad()` entre chaque étape d'entraînement
* [PIÈGE] Vérifier que tous les tenseurs sont sur le même device (CPU/GPU)
