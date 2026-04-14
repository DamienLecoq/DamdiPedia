---
id: jest
label: Jest
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:02.014Z'
updatedAt: '2026-04-14T17:59:02.014Z'
relations:
  - target: javascript
    type: related
    weight: 0.8
  - target: react
    type: related
    weight: 0.6
resources:
  - type: documentation
    title: Jest Documentation
    url: 'https://jestjs.io/'
  - type: cours
    title: Jest Crash Course
    url: 'https://www.youtube.com/watch?v=7r4xVDI2vho'
  - type: blog
    title: Jest – Testing JavaScript
    url: 'https://testingjavascript.com/'
---

## Résumé rapide

Jest est un framework de test JavaScript créé par Facebook, offrant zéro configuration, des mocks puissants, du snapshot testing et une excellente intégration avec React et les projets modernes.

---

## Définition

Jest est un framework de test all-in-one qui fournit test runner, assertions, mocks, couverture de code et snapshot testing dans un seul package. Conçu pour fonctionner sans configuration sur la plupart des projets JavaScript.

---

## Histoire

* Créé chez Facebook en 2014
* Open-source dès ses débuts
* Devient standard dans l'écosystème React
* v24+ passe de Jasmine à son propre runtime
* Concurrencé par Vitest depuis 2022

---

## Objectif

* Tester du code JavaScript simplement
* Offrir une expérience zéro-config
* Supporter les tests unitaires et d'intégration
* Fournir mocks et couverture nativement

---

## Domaines d'utilisation

* Applications React (créées avec CRA historiquement)
* Bibliothèques JavaScript/TypeScript
* API Node.js
* Tests unitaires et d'intégration

---

## Fonctionnement

* Exécution parallèle sur plusieurs workers
* Isolation par fichier de test
* Matchers expressifs (`toBe`, `toEqual`, `toMatchSnapshot`)
* Mocks automatiques et manuels
* Coverage via Istanbul

---

## Concepts clés

* **describe / it / test** — Structure des tests
* **expect / matchers** — Assertions
* **beforeEach / afterEach** — Hooks
* **mock / spy** — Simulation de fonctions et modules
* **snapshot** — Capture de sortie
* **coverage** — Couverture de code

---

## Exemple

```javascript
// sum.js
export const sum = (a, b) => a + b;

// sum.test.js
import { sum } from './sum';

describe('sum', () => {
  test('adds two numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('handles negatives', () => {
    expect(sum(-1, 1)).toBe(0);
  });
});

// Mock d'un module
jest.mock('./api', () => ({
  fetchUser: jest.fn(() => Promise.resolve({ id: 1, name: 'Alice' }))
}));
```

---

## Avantages

* Zéro configuration sur la plupart des projets
* Écosystème mature
* Snapshot testing intégré
* Mocks puissants
* Watch mode interactif
* Excellent support React

---

## Inconvénients

* Lent comparé à Vitest sur grosses bases
* Transformation Babel coûteuse
* Support ESM historiquement laborieux
* Configuration des mocks parfois obscure
* Mémoire importante sur gros projets

---

## Pièges courants

* Mocks partiels fuyant entre tests
* `beforeAll` mutant l'état partagé
* Snapshots jamais revus (faux positifs)
* Oublier `--detectOpenHandles` sur les timers
* Tests asynchrones sans `await`

---

## À ne pas confondre

* Jest vs Vitest (API proche, runtime différent)
* Jest vs Mocha (all-in-one vs composable)
* Jest vs Playwright (unit vs E2E)

---

## Explication simplifiée

Jest c'est l'outil qui vérifie que ton code fait ce qu'il est censé faire. Tu écris des petites fonctions `test("ça marche", ...)`, et Jest les exécute toutes et te dit ce qui passe et ce qui casse.

---

## Explication avancée

Jest parallélise les tests en isolant chaque fichier dans un worker (processus ou thread), évitant les effets de bord entre suites. Le snapshot testing sérialise une sortie attendue dans un fichier versionné, utile pour les composants React mais risqué si peu reviewé. Le système de mock automatique génère des stubs pour chaque export d'un module mocké. L'essor d'ESM natif et de Vitest (même API, Vite runner) pousse Jest à évoluer, avec un support ESM maintenant stable mais historiquement douloureux.

---

## Points critiques à retenir

* [CRITIQUE] Isoler les tests (pas d'état global partagé)
* [CRITIQUE] Reviewer les snapshots à chaque changement
* [IMPORTANT] `--runInBand` pour debugging
* [IMPORTANT] Mocker au bon niveau (pas trop profond)
* [PIÈGE] Async sans `await` = faux positifs
