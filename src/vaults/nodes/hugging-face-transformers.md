---
id: hugging-face-transformers
label: Hugging Face Transformers
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:55.289Z'
updatedAt: '2026-04-14T17:58:55.289Z'
relations:
  - target: pytorch
    type: related
    weight: 0.8
  - target: python
    type: related
    weight: 0.8
resources:
  - type: documentation
    title: Hugging Face Transformers Docs
    url: 'https://huggingface.co/docs/transformers'
  - type: cours
    title: Hugging Face NLP Course
    url: 'https://huggingface.co/learn/nlp-course'
  - type: blog
    title: Hugging Face Blog
    url: 'https://huggingface.co/blog'
---

## Résumé rapide

Hugging Face Transformers est une bibliothèque Python open-source offrant des milliers de modèles pré-entraînés (BERT, GPT, LLaMA, Whisper) accessibles en quelques lignes de code pour le NLP, la vision et l'audio.

---

## Définition

Transformers est un framework unifié pour télécharger, utiliser et fine-tuner des modèles d'IA pré-entraînés partagés sur le Hub Hugging Face, avec une API cohérente couvrant PyTorch, TensorFlow et JAX.

---

## Histoire

* Lancé en 2018 (initialement pour BERT)
* Couvre rapidement tous les grands modèles NLP
* Étendu à la vision (ViT) et l'audio (Whisper) en 2022
* Hub devient la "GitHub des modèles IA"
* Indispensable à l'écosystème open-source LLM

---

## Objectif

* Démocratiser l'accès aux modèles pré-entraînés
* Fournir une API unifiée quel que soit le modèle
* Faciliter le fine-tuning et l'inférence
* Centraliser le partage de modèles
* Supporter tous les backends (PT, TF, JAX)

---

## Domaines d'utilisation

* NLP (classification, NER, QA, translation)
* Génération de texte (LLMs)
* Vision (classification, segmentation, détection)
* Audio (STT, TTS, classification)
* RAG et embeddings

---

## Fonctionnement

* **Hub** — Registre de modèles versionnés
* **AutoModel / AutoTokenizer** — Chargement générique
* **Pipeline** — API haut-niveau pour usage courant
* **Trainer** — Boucle d'entraînement optimisée
* **Tokenizer** — Conversion texte ↔ tokens

---

## Concepts clés

* **Model** — Architecture + poids pré-entraînés
* **Tokenizer** — Découpe le texte en tokens
* **Pipeline** — Interface simplifiée par tâche
* **Trainer** — Abstraction pour fine-tuning
* **Dataset (datasets lib)** — Chargement de données
* **Hub** — Stockage et versioning

---

## Exemple

```python
from transformers import pipeline

# Pipeline one-liner
classifier = pipeline('sentiment-analysis')
print(classifier('I love this movie!'))
# [{'label': 'POSITIVE', 'score': 0.9998}]

# Modèle + tokenizer explicites
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

model_name = 'meta-llama/Llama-3-8b'
tok = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.bfloat16)

inputs = tok('Write a poem about code:', return_tensors='pt')
output = model.generate(**inputs, max_new_tokens=100)
print(tok.decode(output[0]))
```

---

## Avantages

* Des milliers de modèles en un import
* API unifiée (NLP, vision, audio)
* Communauté massive
* Compatible PyTorch, TF, JAX
* Fine-tuning et quantization intégrés
* Hub avec versioning et model cards

---

## Inconvénients

* Consommation mémoire (gros modèles)
* Dépendances lourdes
* Breaking changes parfois fréquents
* Modèles non tous MIT (vérifier la licence)
* Pipelines parfois trop abstraits pour debug

---

## Pièges courants

* Télécharger un modèle de 70B sur une machine modeste
* Oublier la licence (commercial vs non)
* Tokenizer incompatible avec le modèle
* Ne pas utiliser `torch.no_grad()` en inference
* Ignorer le padding side pour les LLMs

---

## À ne pas confondre

* Transformers (lib) vs Transformer (architecture)
* Pipeline vs Model direct
* Inference vs Fine-tuning

---

## Explication simplifiée

Hugging Face Transformers c'est l'app store des modèles d'IA. Tu veux traduire, résumer, générer ou classifier ? Tu tapes `pipeline('tâche')`, ça télécharge le modèle adapté et tu l'utilises en une ligne. Toute la complexité est cachée.

---

## Explication avancée

Transformers expose une hiérarchie d'abstractions : `pipeline` (one-liner), `Auto*` classes (chargement générique), classes spécifiques (contrôle total). Le Hub sert les poids via Git LFS et le CDN, avec un système de tags et revisions. Les tokenizers "fast" sont écrits en Rust (lib `tokenizers`) pour les performances. L'écosystème inclut `datasets` (streaming, caching), `accelerate` (multi-GPU, mixed precision), `peft` (LoRA, QLoRA) et `bitsandbytes` (quantization 8/4-bit). La synergie avec vLLM et TGI permet le serving optimisé.

---

## Points critiques à retenir

* [CRITIQUE] Vérifier la licence du modèle (commercial OK ?)
* [CRITIQUE] `torch.no_grad()` ou `eval()` en inference
* [IMPORTANT] Tokenizer doit matcher le modèle exactement
* [IMPORTANT] PEFT/LoRA pour fine-tuner sans gros GPU
* [PIÈGE] Les gros modèles peuvent ne pas tenir en mémoire
