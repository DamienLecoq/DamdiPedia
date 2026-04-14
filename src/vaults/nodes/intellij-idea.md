---
id: intellij-idea
label: IntelliJ IDEA
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:56.767Z'
updatedAt: '2026-04-14T17:58:56.767Z'
relations:
  - targetId: java
    type: supports
    description: IDE de référence pour le développement Java
  - targetId: kotlin
    type: supports
    description: 'Support natif de Kotlin, créé par le même éditeur (JetBrains)'
resources:
  - type: documentation
    title: Documentation officielle IntelliJ IDEA
    url: 'https://www.jetbrains.com/idea/documentation/'
  - type: vidéo
    title: JetBrains – IntelliJ IDEA Tips & Tricks
    url: 'https://www.youtube.com/watch?v=QYO5_riePOQ'
  - type: blog
    title: JetBrains Blog – IntelliJ IDEA
    url: 'https://blog.jetbrains.com/idea/'
  - type: cours
    title: JetBrains Academy – IntelliJ IDEA Guide
    url: 'https://www.jetbrains.com/guide/java/'
  - type: documentation
    title: IntelliJ IDEA Shortcuts Reference
    url: 'https://www.jetbrains.com/help/idea/mastering-keyboard-shortcuts.html'
---

## Résumé rapide

IntelliJ IDEA est l'IDE Java/Kotlin le plus puissant du marché, développé par JetBrains. Avec son refactoring avancé, son analyse de code intelligente et son intégration complète de l'écosystème JVM, il est le choix privilégié des développeurs Java professionnels.

---

## Définition

IntelliJ IDEA est un environnement de développement intégré (IDE) propriétaire créé par JetBrains, spécialisé dans le développement JVM (Java, Kotlin, Scala, Groovy). Il offre une analyse de code profonde, un refactoring automatisé, un débogage avancé et une intégration native avec les outils de build (Maven, Gradle) et les frameworks (Spring, Jakarta EE).

---

## Histoire

* Première version publiée en janvier 2001 par JetBrains (anciennement IntelliJ Software)
* Premier IDE Java à proposer la navigation avancée dans le code et le refactoring intégré
* Version Community (gratuite, open source) et Ultimate (payante) depuis 2009
* Choisi par Google comme base d'Android Studio en 2013
* Kotlin, créé par JetBrains, bénéficie d'un support natif prioritaire

---

## Objectif

* Fournir l'IDE le plus intelligent pour le développement JVM
* Maximiser la productivité grâce au refactoring et à l'analyse de code
* Intégrer tous les outils de l'écosystème Java/Kotlin en un seul environnement
* Réduire le code boilerplate via la génération et les inspections

---

## Domaines d'utilisation

* Développement d'applications Java d'entreprise (Spring, Jakarta EE)
* Développement Kotlin (backend, Android, multiplateforme)
* Développement Scala et Groovy
* Microservices et applications cloud-native

---

## Fonctionnement

* **Indexation complète** du projet au démarrage pour une navigation et recherche instantanées
* **Analyse statique** en temps réel détectant les bugs, le code mort et les mauvaises pratiques
* **Refactoring structurel** : renommage intelligent, extraction de méthode, changement de signature avec propagation
* Intégration avec **Maven/Gradle** pour la résolution des dépendances et le build
* **Débogueur avancé** avec évaluation d'expressions, points d'arrêt conditionnels et débogage à distance

---

## Concepts clés

* **Inspections** — Analyses automatiques détectant les problèmes dans le code
* **Intentions (Alt+Enter)** — Actions contextuelles rapides pour corriger ou améliorer le code
* **Refactoring** — Transformations structurelles du code en toute sécurité
* **Run/Debug Configurations** — Profils d'exécution et de débogage personnalisables
* **Project Structure** — Configuration des SDK, modules et dépendances
* **Plugins** — Extensions ajoutant des fonctionnalités (support de frameworks, thèmes)

---

## Exemple

```java
// IntelliJ détecte automatiquement les améliorations possibles
// Avant (signalé par une inspection) :
List<String> result = new ArrayList<>();
for (String s : list) {
    if (s.length() > 3) {
        result.add(s.toUpperCase());
    }
}

// Après refactoring automatique (Alt+Enter → "Replace with Stream API") :
List<String> result = list.stream()
    .filter(s -> s.length() > 3)
    .map(String::toUpperCase)
    .collect(Collectors.toList());
```

```
Raccourcis essentiels :
Ctrl+Shift+A     → Recherche d'action (équivalent Command Palette)
Alt+Enter        → Afficher les intentions / quick fixes
Shift+Shift      → Recherche globale (Search Everywhere)
Ctrl+Alt+L       → Reformater le code
Ctrl+Alt+M       → Extraire une méthode
```

---

## Avantages

* Refactoring le plus avancé de tous les IDE du marché
* Analyse de code profonde et inspections intelligentes
* Intégration parfaite avec Maven, Gradle, Spring, Jakarta EE
* Débogueur extrêmement puissant
* Support natif de Kotlin (même éditeur)

---

## Inconvénients

* Version Ultimate payante (environ 500€/an, gratuite pour étudiants)
* Consommation mémoire élevée (1-4 Go de RAM)
* Temps de démarrage et d'indexation longs sur les gros projets
* Courbe d'apprentissage pour maîtriser toutes les fonctionnalités

---

## Pièges courants

* Ne pas invalider les caches quand l'IDE se comporte bizarrement (File → Invalidate Caches)
* Ignorer les inspections et les suggestions d'IntelliJ (elles détectent de vrais bugs)
* Ne pas configurer le JDK correctement dans Project Structure
* Utiliser la version Community pour du développement Spring/Jakarta EE (nécessite Ultimate)

---

## À ne pas confondre

* IntelliJ IDEA Community vs Ultimate (gratuit limité vs payant complet)
* IntelliJ IDEA vs Android Studio (Android Studio est basé sur IntelliJ mais spécialisé Android)
* IntelliJ IDEA vs Eclipse (philosophies différentes : intelligent vs configurable)
* IntelliJ IDEA vs VS Code (IDE complet vs éditeur extensible)

---

## Explication simplifiée

IntelliJ IDEA c'est comme un copilote très intelligent pour ton code Java : il comprend la structure de ton programme, détecte les erreurs avant que tu les voies, et peut transformer ton code automatiquement. C'est l'outil le plus puissant mais aussi le plus gourmand en ressources.

---

## Explication avancée

IntelliJ IDEA repose sur une indexation complète du code source et des dépendances au démarrage, construisant un modèle sémantique (PSI — Program Structure Interface) de l'ensemble du projet. Ce modèle permet des analyses statiques profondes, un refactoring structurel sûr (renommage avec propagation dans tout le graphe de dépendances) et une navigation instantanée. Les inspections utilisent l'analyse de flux de données pour détecter les NullPointerException potentielles, le code mort et les violations de contrat. Le système de plugins repose sur l'architecture IntelliJ Platform, partagée avec tous les IDE JetBrains.

---

## Points critiques à retenir

* [CRITIQUE] IntelliJ indexe tout le projet : c'est ce qui le rend intelligent mais gourmand
* [CRITIQUE] Alt+Enter est le raccourci le plus important (intentions et quick fixes)
* [IMPORTANT] Version Community = Java/Kotlin de base ; Ultimate = frameworks d'entreprise
* [IMPORTANT] Invalidate Caches résout la majorité des problèmes mystérieux
* [PIÈGE] Ne pas ignorer les inspections : elles détectent des bugs réels
* [PIÈGE] Configurer le bon JDK dès le début du projet
