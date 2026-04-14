---
id: playwright
label: Playwright
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:35.573Z'
updatedAt: '2026-04-14T17:59:35.573Z'
relations:
  - target: javascript
    type: related
    weight: 0.7
resources:
  - type: documentation
    title: Playwright Documentation
    url: 'https://playwright.dev/'
  - type: cours
    title: Playwright Tutorial – Automation Testing
    url: 'https://www.youtube.com/watch?v=wawbt1cATsk'
  - type: blog
    title: Playwright Blog
    url: 'https://playwright.dev/blog'
---

## Résumé rapide

Playwright est un framework de tests end-to-end moderne créé par Microsoft, capable d'automatiser Chromium, Firefox et WebKit avec une API unifiée, des auto-waits intelligents et un excellent support multi-langages.

---

## Définition

Playwright est une bibliothèque d'automatisation de navigateur qui permet d'écrire des tests E2E (end-to-end) ou de scraper des sites web, en pilotant les navigateurs via le protocole DevTools directement, sans WebDriver.

---

## Histoire

* Lancé par Microsoft en 2020
* Équipe issue de Puppeteer (Google)
* Support multi-langages : TS/JS, Python, .NET, Java
* Playwright Test framework intégré (2021)
* Devient la référence E2E moderne, concurrence Cypress

---

## Objectif

* Tester les applications web end-to-end
* Automatiser les tâches navigateur
* Supporter multiple navigateurs et plateformes
* Éliminer les flaky tests via auto-waits

---

## Domaines d'utilisation

* Tests E2E d'applications web
* Tests d'accessibilité
* Visual regression testing
* Scraping et automatisation
* Tests de compatibilité cross-browser

---

## Fonctionnement

* Lance un navigateur (headless ou headed)
* Ouvre une `BrowserContext` isolée
* Crée une `Page` et interagit via locators
* Auto-waits sur les actions
* Traces et vidéos pour debugger

---

## Concepts clés

* **Browser** — Instance de navigateur
* **Context** — Session isolée (comme un profil)
* **Page** — Onglet
* **Locator** — Sélecteur résilient
* **Auto-wait** — Attente implicite avant chaque action
* **Trace Viewer** — Rejoue le test étape par étape

---

## Exemple

```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('https://example.com/login');

  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('secret');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText('Welcome')).toBeVisible();
});
```

```bash
npx playwright test              # Lance les tests
npx playwright test --ui         # Mode UI interactif
npx playwright show-report       # Rapport HTML
```

---

## Avantages

* Auto-waits éliminent les flaky tests
* Support Chromium, Firefox, WebKit
* Multi-langages (TS, Python, .NET, Java)
* Trace Viewer exceptionnel pour debugger
* Test isolation via contexts parallèles
* Mobile emulation intégrée

---

## Inconvénients

* Plus récent que Cypress (moins d'exemples legacy)
* Binaires des navigateurs lourds à télécharger
* Courbe d'apprentissage pour les patterns
* Tests parfois plus verbeux que Cypress

---

## Pièges courants

* Sélecteurs fragiles (CSS/XPath vs locators)
* Tests non isolés partageant un context
* Oublier `--workers=1` pour debug
* Attente explicite superflue (`waitForTimeout`)

---

## À ne pas confondre

* Playwright vs Puppeteer (multi-browser vs Chrome)
* Playwright vs Cypress (out-of-process vs in-browser)
* Playwright vs Selenium (DevTools vs WebDriver)

---

## Explication simplifiée

Playwright c'est un robot qui pilote ton navigateur pour tester ton site comme le ferait un humain : il ouvre des pages, clique sur des boutons, remplit des formulaires, et vérifie que tout fonctionne. Si quelque chose casse, il peut rejouer exactement ce qui s'est passé.

---

## Explication avancée

Playwright pilote les navigateurs via leurs protocoles DevTools directement (CDP pour Chromium, protocole custom pour Firefox/WebKit), évitant l'intermédiaire WebDriver. Les locators sont des abstractions résilientes qui ré-évaluent le DOM à chaque action, réduisant la fragilité. L'auto-wait attend l'actionabilité (visible, enabled, stable) avant chaque opération. Les BrowserContexts permettent d'isoler des sessions complètes en parallèle sans lancer plusieurs navigateurs. Le Trace Viewer enregistre DOM snapshots, network, console — idéal pour post-mortem.

---

## Points critiques à retenir

* [CRITIQUE] Utiliser les locators, pas les CSS bruts
* [CRITIQUE] Laisser faire l'auto-wait, éviter `waitForTimeout`
* [IMPORTANT] Isolation via BrowserContexts
* [IMPORTANT] Trace Viewer pour debug post-mortem
* [PIÈGE] Tests flaky = sélecteurs fragiles, pas timings
