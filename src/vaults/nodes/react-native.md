---
id: react-native
label: React Native
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:49.232Z'
updatedAt: '2026-04-14T17:59:49.232Z'
relations:
  - target: react
    type: extends
    weight: 0.9
  - target: javascript
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: React Native Documentation officielle
    url: 'https://reactnative.dev/docs/getting-started'
  - type: vidéo
    title: React Native Tutorial – freeCodeCamp
    url: 'https://www.youtube.com/watch?v=0-S5a0eXPoc'
  - type: cours
    title: Expo Learn
    url: 'https://docs.expo.dev/tutorial/introduction/'
---

## Résumé rapide

React Native est un framework créé par Meta permettant de développer des applications mobiles natives pour iOS et Android en utilisant React et JavaScript, avec un rendu via composants natifs.

---

## Définition

React Native traduit le code React en véritables composants natifs iOS et Android via un bridge (ou JSI dans la nouvelle architecture), offrant une expérience utilisateur native avec la productivité du développement web.

---

## Histoire

* Développé en interne chez Facebook en 2013
* Open-source en mars 2015
* Nouvelle architecture (Fabric, TurboModules) depuis 2022
* Utilisé par Instagram, Discord, Shopify, Tesla
* Expo est devenu le framework recommandé officiellement

---

## Objectif

* Réutiliser la connaissance React pour le mobile
* Partager du code entre iOS et Android
* Offrir des composants natifs réels (pas une webview)
* Itérer rapidement avec hot-reload

---

## Domaines d'utilisation

* Applications mobiles multi-plateformes
* MVPs et prototypes rapides
* Apps avec UI native sur iOS et Android
* Extension d'apps web existantes en React

---

## Fonctionnement

* Code JS exécuté dans un moteur JS (Hermes, JSC)
* Bridge (ou JSI) communique avec les composants natifs
* Les `View`, `Text`, etc. sont des composants natifs réels
* Nouvelle archi : rendu synchrone via Fabric
* Metro bundler pour packager le JS

---

## Concepts clés

* **Bridge / JSI** — Couche de communication JS ↔ natif
* **Metro** — Bundler par défaut
* **Hermes** — Moteur JS optimisé pour mobile
* **Expo** — SDK/toolchain simplifiant le développement
* **Fabric** — Nouveau renderer, architecture synchrone

---

## Exemple

```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, React Native!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});
```

---

## Avantages

* Réutiliser React et l'écosystème JS
* Composants natifs réels (vraie UX native)
* Hot-reload rapide
* Grande communauté et écosystème
* Code partagé iOS/Android

---

## Inconvénients

* Bridge (ancienne archi) peut être goulot d'étranglement
* Mises à jour natives parfois douloureuses
* Debugger parfois frustrant
* Dépendance à des libs natives tierces

---

## Pièges courants

* Mélanger libs natives incompatibles
* Oublier d'adapter pour iOS ET Android
* Mauvaise gestion de la mémoire sur les listes longues
* Utiliser `setState` trop souvent dans des listes

---

## À ne pas confondre

* React Native vs Flutter (JS + natif vs Dart + moteur propre)
* React Native vs Ionic (natif vs webview)
* Expo vs CLI bare (SDK managed vs accès natif complet)

---

## Explication simplifiée

React Native te permet d'écrire ton app mobile en React (comme pour le web), mais au final ça produit une vraie app iOS et Android avec de vrais boutons, listes et vues natifs — pas une webview.

---

## Explication avancée

L'ancienne architecture utilise un bridge asynchrone pour sérialiser les messages entre JS et natif, ce qui peut créer des goulots d'étranglement. La nouvelle architecture (JSI/Fabric/TurboModules) permet un appel direct synchrone JS ↔ C++ ↔ natif, éliminant la sérialisation. Hermes compile le JS en bytecode pour un démarrage plus rapide.

---

## Points critiques à retenir

* [CRITIQUE] Tester sur iOS ET Android, pas juste un simulateur
* [IMPORTANT] Utiliser Expo pour démarrer (sauf besoin natif spécifique)
* [IMPORTANT] FlatList pour les listes longues (virtualisation)
* [PIÈGE] Le bridge asynchrone peut causer des lags d'animation
