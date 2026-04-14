---
id: gpu
label: GPU
category: matériel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:47.175Z'
updatedAt: '2026-04-14T17:58:47.175Z'
relations:
  - target: cpu
    type: related
    weight: 0.6
resources:
  - type: blog
    title: NVIDIA – What is a GPU
    url: 'https://www.nvidia.com/en-us/about-nvidia/ai-computing/'
  - type: vidéo
    title: How GPUs Work – Branch Education
    url: 'https://www.youtube.com/watch?v=h9Z4oGN89MU'
  - type: documentation
    title: CUDA Programming Guide
    url: 'https://docs.nvidia.com/cuda/cuda-c-programming-guide/'
---

## Résumé rapide

Le GPU (Graphics Processing Unit) est un processeur massivement parallèle conçu initialement pour le rendu graphique, devenu incontournable pour le calcul scientifique, le deep learning et le minage.

---

## Définition

Un GPU contient des milliers de petits cœurs optimisés pour exécuter la même opération sur des données différentes (SIMD/SIMT). Cette architecture le rend idéal pour les calculs parallèles massifs comme les matrices et la 3D.

---

## Histoire

* GPU programmable avec NVIDIA GeForce 256 (1999)
* CUDA lancé par NVIDIA en 2007 (GPGPU)
* Explosion du deep learning dès 2012 (AlexNet sur GPU)
* NVIDIA domine le marché IA avec H100, B200
* AMD et Intel suivent avec ROCm et oneAPI

---

## Objectif

* Rendre des scènes 3D en temps réel
* Accélérer les calculs matriciels massifs
* Entraîner et inférer des modèles deep learning
* Simuler physique, fluides, cryptographie

---

## Domaines d'utilisation

* Jeux vidéo et rendu 3D
* Deep learning (training + inference)
* Calcul scientifique (HPC)
* Vidéo (encodage, IA)
* Crypto mining (historiquement)

---

## Fonctionnement

* Milliers de cœurs (CUDA cores, stream processors)
* Architecture SIMT (Single Instruction, Multiple Thread)
* Mémoire dédiée haute bande passante (HBM, GDDR)
* Kernels lancés en grilles de blocks de threads
* Synchronisation intra-block uniquement

---

## Concepts clés

* **CUDA core** — Unité de calcul scalaire
* **Warp** — 32 threads exécutant la même instruction
* **Block** — Groupe de threads synchronisables
* **Grid** — Ensemble de blocks
* **Shared memory** — RAM locale au block
* **Tensor core** — Unité dédiée matmul (IA)

---

## Exemple

```python
# PyTorch — utiliser le GPU
import torch
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
x = torch.randn(1000, 1000, device=device)
y = torch.randn(1000, 1000, device=device)
z = x @ y  # Matrix multiply sur GPU

# Voir l'utilisation GPU
# nvidia-smi
```

---

## Avantages

* Parallélisme massif (des milliers de cœurs)
* Bande passante mémoire élevée
* Tensor cores dédiés au deep learning
* Écosystème CUDA mature
* Rapport performance/énergie sur les tâches parallélisables

---

## Inconvénients

* Inefficace pour le code séquentiel
* Coût élevé (H100 > 30k€)
* Écosystème majoritairement NVIDIA
* Transfert CPU↔GPU coûteux
* Mémoire limitée comparée à la RAM

---

## Pièges courants

* Transférer trop souvent entre CPU et GPU
* Warp divergence (branches divergentes dans un warp)
* Oublier de synchroniser les streams
* Sous-utiliser la shared memory

---

## À ne pas confondre

* GPU vs CPU (parallèle massif vs généraliste)
* GPU vs TPU (généraliste vs spécialisé tenseurs)
* CUDA vs OpenCL (NVIDIA vs ouvert)

---

## Explication simplifiée

Si le CPU est un expert très intelligent qui résout un problème à la fois, le GPU est une armée de calculateurs moyens qui résolvent des milliers de petits problèmes identiques en parallèle. Parfait pour la 3D et l'IA où on multiplie des matrices géantes.

---

## Explication avancée

Les GPU modernes exécutent les threads par warps de 32 (NVIDIA) : tous les threads d'un warp exécutent la même instruction sur des données différentes. La divergence (if/else) sérialise l'exécution, tuant les perfs. La shared memory (~100Ko par SM) est 100x plus rapide que la VRAM globale. Les Tensor Cores des GPU récents multiplient des matrices 4x4 en une instruction, offrant un pic théorique de centaines de TFLOPS en FP16/BF16 pour l'IA.

---

## Points critiques à retenir

* [CRITIQUE] Minimiser les transferts CPU↔GPU
* [CRITIQUE] Éviter la divergence dans un warp
* [IMPORTANT] Utiliser la shared memory pour la localité
* [IMPORTANT] Tensor cores pour le deep learning
* [PIÈGE] Le GPU ne sert à rien si le workload est séquentiel
