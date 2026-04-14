---
id: flutter
label: Flutter
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:38.938Z'
updatedAt: '2026-04-14T17:58:38.938Z'
relations:
  - target: dart
    type: uses
    weight: 0.9
resources:
  - type: documentation
    title: Flutter Documentation officielle
    url: 'https://docs.flutter.dev/'
  - type: vidéo
    title: Flutter YouTube Channel
    url: 'https://www.youtube.com/flutterdev'
  - type: cours
    title: Flutter Codelabs
    url: 'https://docs.flutter.dev/codelabs'
---

## Résumé rapide

Flutter est un framework UI open-source créé par Google pour construire des applications natives multiplateformes (iOS, Android, web, desktop) à partir d'une seule base de code Dart.

---

## Définition

Flutter est un framework de développement d'applications déclaratif qui utilise son propre moteur de rendu (Skia/Impeller) pour dessiner directement l'interface, garantissant une cohérence visuelle et des performances natives sur toutes les plateformes.

---

## Histoire

* Annoncé par Google en 2015 sous le nom "Sky"
* Version stable 1.0 en décembre 2018
* Support desktop (Windows, macOS, Linux) en 2022
* Flutter 3 apporte le support multi-plateforme complet
* Utilisé par BMW, Google Ads, Alibaba, eBay Motors

---

## Objectif

* Un seul code pour toutes les plateformes
* Performances natives 60/120 FPS
* Hot-reload pour itération rapide
* Interface hautement customisable

---

## Domaines d'utilisation

* Applications mobiles (iOS et Android)
* Applications desktop multi-OS
* Applications web (via Flutter Web)
* Applications embarquées

---

## Fonctionnement

* Tout est widget (immutable, composable)
* Moteur de rendu Skia/Impeller pour dessiner chaque pixel
* Arbre de widgets → arbre d'éléments → arbre de render
* Hot-reload injecte le nouveau code sans redémarrer
* Compilation AOT en production, JIT en développement

---

## Concepts clés

* **Widget** — Brique de base UI, immutable
* **StatefulWidget / StatelessWidget** — Avec ou sans état mutable
* **BuildContext** — Référence à la position dans l'arbre
* **State Management** — Provider, Riverpod, BLoC
* **Material / Cupertino** — Design systems Android / iOS

---

## Exemple

```dart
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Flutter')),
        body: const Center(child: Text('Hello, Flutter!')),
      ),
    );
  }
}
```

---

## Avantages

* Hot-reload ultra-rapide
* Code unique multi-plateformes
* Rendu cohérent sur toutes les plateformes
* Performances natives
* Large bibliothèque de widgets

---

## Inconvénients

* Taille des binaires plus grande
* Pas d'accès natif direct sans plugins
* Courbe d'apprentissage de Dart
* UI peut sembler non-native sans effort

---

## Pièges courants

* Reconstruire tout l'arbre au lieu d'extraire des widgets
* Oublier `const` sur les widgets stables
* Mal gérer le state management
* Utiliser `setState` dans un widget parent lourd

---

## À ne pas confondre

* Flutter vs React Native (moteur propre vs bridge natif)
* Flutter vs Ionic (natif vs webview)
* StatelessWidget vs StatefulWidget

---

## Explication simplifiée

Flutter c'est comme Lego pour les apps : tu assembles des widgets (boutons, textes, listes) en Dart, et Flutter dessine le tout de manière identique sur iPhone, Android et desktop. Le hot-reload te permet de voir tes changements en 1 seconde.

---

## Explication avancée

Flutter court-circuite les widgets natifs en dessinant lui-même chaque pixel via Skia/Impeller. L'arbre de widgets (configuration) est transformé en arbre d'éléments (cycle de vie) puis en arbre de render objects (layout et painting). Le diff entre deux builds permet de mettre à jour uniquement les parties modifiées, comme React mais compilé natif.

---

## Points critiques à retenir

* [CRITIQUE] Widgets immutables — reconstruire plutôt que muter
* [CRITIQUE] `const` sur widgets stables pour éviter les rebuilds
* [IMPORTANT] Choisir un state management (Provider/Riverpod/BLoC)
* [IMPORTANT] Hot-reload vs hot-restart (état préservé ou non)
* [PIÈGE] setState() reconstruit tout le widget, pas juste la partie modifiée
