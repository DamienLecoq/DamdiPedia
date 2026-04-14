---
id: langchain
label: LangChain
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:10.784Z'
updatedAt: '2026-04-14T17:59:10.784Z'
relations:
  - target: python
    type: depends_on
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle LangChain
    url: 'https://python.langchain.com/docs/get_started/introduction'
  - type: documentation
    title: LangChain API Reference
    url: 'https://api.python.langchain.com/'
  - type: vidéo
    title: freeCodeCamp – LangChain Full Course
    url: 'https://www.youtube.com/watch?v=lG7Uxts9SXs'
  - type: blog
    title: Blog officiel LangChain
    url: 'https://blog.langchain.dev/'
  - type: documentation
    title: LangSmith – Plateforme d'observabilité
    url: 'https://docs.smith.langchain.com/'
---

## Résumé rapide

LangChain est un framework Python/JavaScript pour développer des applications alimentées par des grands modèles de langage (LLM). Il fournit des abstractions pour chaîner des appels LLM, gérer la mémoire conversationnelle, interroger des documents et créer des agents autonomes.

---

## Définition

LangChain est un framework d'orchestration qui permet de construire des applications utilisant des LLM en composant des chaînes de traitement, des agents, des outils et des systèmes de récupération d'information (RAG), avec une interface unifiée pour de multiples fournisseurs de modèles.

---

## Histoire

* Créé par Harrison Chase, première version open source en octobre 2022
* Croissance explosive en 2023, devenu le framework LLM le plus populaire
* LangChain Expression Language (LCEL) introduit pour la composition déclarative
* LangSmith lancé comme plateforme d'observabilité et de débogage
* LangGraph ajouté pour les workflows multi-agents avec état
* Écosystème devenu vaste : LangServe, LangChain Hub, intégrations multiples

---

## Objectif

* Simplifier le développement d'applications basées sur les LLM
* Fournir une interface unifiée pour différents fournisseurs (OpenAI, Anthropic, etc.)
* Permettre la construction de pipelines RAG (Retrieval-Augmented Generation)
* Offrir des outils pour créer des agents autonomes utilisant des LLM

---

## Domaines d'utilisation

* Chatbots et assistants conversationnels avec mémoire
* Systèmes de questions-réponses sur documents (RAG)
* Agents autonomes utilisant des outils externes (API, bases de données)
* Extraction structurée d'information depuis du texte
* Automatisation de workflows complexes avec LLM

---

## Fonctionnement

* Modèle de composants : Models, Prompts, Chains, Agents, Memory, Retrievers
* LCEL (LangChain Expression Language) : composition avec l'opérateur `|` (pipe)
* Interface unifiée `Runnable` pour tous les composants
* Intégrations avec des centaines de fournisseurs (LLM, vector stores, outils)
* LangGraph pour les workflows avec état et cycles (multi-agents)

---

## Concepts clés

* **Chain** — Séquence de composants exécutés les uns après les autres
* **Agent** — LLM qui décide dynamiquement quels outils utiliser et dans quel ordre
* **RAG (Retrieval-Augmented Generation)** — Récupérer des documents pertinents pour enrichir le contexte du LLM
* **LCEL** — Langage d'expression pour composer les composants avec `|`
* **Memory** — Gestion de l'historique de conversation pour le contexte
* **Tool** — Fonction externe que l'agent peut invoquer (recherche web, calculatrice, API)

---

## Exemple

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Créer un pipeline RAG simple avec LCEL
llm = ChatOpenAI(model="gpt-4")

prompt = ChatPromptTemplate.from_template(
    "Réponds à la question en te basant sur le contexte.\n"
    "Contexte : {contexte}\n"
    "Question : {question}"
)

# Composition avec LCEL (opérateur pipe)
chaine = prompt | llm | StrOutputParser()

# Exécution
reponse = chaine.invoke({
    "contexte": "Python a été créé par Guido van Rossum en 1991.",
    "question": "Qui a créé Python ?"
})
print(reponse)  # "Python a été créé par Guido van Rossum."
```

---

## Avantages

* Écosystème le plus riche pour le développement d'applications LLM
* Interface unifiée pour des dizaines de fournisseurs de modèles
* LCEL permet une composition élégante et lisible
* LangSmith pour le débogage et le monitoring en production
* Communauté très active et documentation abondante

---

## Inconvénients

* Abstractions parfois trop lourdes pour des cas d'usage simples
* API qui change fréquemment entre les versions (breaking changes)
* Courbe d'apprentissage due au grand nombre de concepts et modules
* Overhead de performance par rapport à des appels directs aux API des LLM
* Difficulté à déboguer les chaînes complexes sans LangSmith

---

## Pièges courants

* Utiliser LangChain pour des cas simples où un appel API direct suffirait
* Ne pas gérer les erreurs et timeouts des appels LLM dans les chaînes
* Ignorer le coût des appels API en chaînant trop de composants
* Confondre les anciennes API (LLMChain) avec les nouvelles (LCEL)
* Ne pas utiliser LangSmith pour le débogage → difficile de tracer les erreurs

---

## À ne pas confondre

* LangChain vs LlamaIndex — Orchestration générale vs spécialisé RAG/indexation
* Chain vs Agent — Séquence fixe vs décision dynamique par le LLM
* LangChain vs LCEL — Le framework vs le langage de composition
* LangChain vs LangGraph — Chaînes linéaires vs workflows avec état et cycles

---

## Explication simplifiée

LangChain est un outil qui permet de connecter des intelligences artificielles (comme ChatGPT) à des sources de données et des outils externes. Au lieu de juste poser une question, tu peux créer des pipelines où l'IA cherche dans tes documents, utilise des outils et enchaîne plusieurs étapes pour répondre.

---

## Explication avancée

LangChain s'articule autour de l'interface `Runnable` qui définit un protocole uniforme (`invoke`, `batch`, `stream`, `ainvoke`) pour tous les composants. LCEL utilise la surcharge de l'opérateur `__or__` pour composer des `RunnableSequence`. Les agents utilisent le paradigme ReAct (Reasoning + Acting) où le LLM génère alternativement des réflexions et des actions. Le système RAG combine un `Retriever` (souvent basé sur un vector store avec embeddings) avec un `Chain` de génération. LangGraph étend ce modèle avec un graphe d'état fini (StateGraph) permettant des cycles, des branchements conditionnels et de la persistance d'état.

---

## Points critiques à retenir

* [CRITIQUE] LangChain est le framework dominant pour les applications LLM
* [CRITIQUE] LCEL est la méthode moderne de composition (remplace les anciennes chains)
* [IMPORTANT] RAG est le pattern le plus courant : retrieval + generation
* [IMPORTANT] LangSmith est essentiel pour le débogage en production
* [PIÈGE] Ne pas sur-abstraire : LangChain ajoute de la complexité, l'utiliser à bon escient
* [PIÈGE] L'API évolue rapidement, vérifier la compatibilité des versions
