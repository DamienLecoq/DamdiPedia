---
id: webassembly
label: WebAssembly
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:24.163Z'
updatedAt: '2026-04-14T18:00:24.163Z'
relations:
  - target: javascript
    type: related
    weight: 0.7
  - target: rust
    type: related
    weight: 0.7
resources:
  - type: documentation
    title: WebAssembly.org
    url: 'https://webassembly.org/'
  - type: documentation
    title: MDN – WebAssembly
    url: 'https://developer.mozilla.org/en-US/docs/WebAssembly'
  - type: vidéo
    title: WebAssembly in 100 Seconds – Fireship
    url: 'https://www.youtube.com/watch?v=cbB3QEwWMlA'
---

## Résumé rapide

WebAssembly (Wasm) est un format binaire portable permettant d'exécuter du code compilé à vitesse quasi-native dans un navigateur ou un runtime Wasm, issu de langages comme Rust, C++, Go ou C#.

---

## Définition

WebAssembly est un bytecode compact conçu pour être chargé rapidement et exécuté de manière sécurisée par une machine virtuelle. Il sert de cible de compilation universelle pour des langages performants, exécutable dans le navigateur et au-delà.

---

## Histoire

* Annoncé en 2015 par W3C, Mozilla, Google, Microsoft, Apple
* v1.0 standardisée en 2017
* Support natif dans tous les navigateurs
* Wasm en dehors du navigateur via WASI (2019)
* Adoption croissante pour plugins, edge computing, smart contracts

---

## Objectif

* Exécuter du code haute performance dans le navigateur
* Offrir une cible de compilation universelle
* Isoler le code (sandbox sécurisé)
* Remplacer asm.js avec un format optimisé
* Supporter plusieurs langages sur le web

---

## Domaines d'utilisation

* Applications web intensives (jeux, CAO, édition photo)
* Plugins sandbox (Envoy, Istio, Shopify)
* Smart contracts (CosmWasm, Near)
* Edge computing (Fastly, Cloudflare Workers)
* Serverless (Fermyon, WasmCloud)

---

## Fonctionnement

* Code source compilé en `.wasm` (binaire)
* Chargé via JavaScript ou runtime Wasm
* Exécuté dans une sandbox à mémoire linéaire
* Import/export de fonctions avec l'hôte
* Pas d'accès direct au DOM (via JS)

---

## Concepts clés

* **Module** — Binaire Wasm compilé
* **Instance** — Module instancié avec imports
* **Memory** — Mémoire linéaire partagée
* **Table** — Références de fonctions
* **WASI** — System interface pour hors navigateur
* **Component Model** — Composition de modules

---

## Exemple

```rust
// Rust → Wasm
#[no_mangle]
pub extern "C" fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

```bash
# Compiler
rustc --target wasm32-unknown-unknown -O --crate-type=cdylib add.rs
```

```javascript
// Charger dans le navigateur
const response = await fetch('add.wasm');
const bytes = await response.arrayBuffer();
const { instance } = await WebAssembly.instantiate(bytes);
console.log(instance.exports.add(2, 3)); // 5
```

---

## Avantages

* Performance quasi-native
* Portabilité totale
* Sandbox sécurisée
* Multi-langages (Rust, Go, C++, C#, AssemblyScript)
* Démarrage rapide (idéal pour serverless)

---

## Inconvénients

* Pas d'accès direct au DOM depuis Wasm
* Taille des binaires parfois élevée
* Debugging moins mature
* Écosystème encore en construction
* Garbage collection pas encore universel

---

## Pièges courants

* Charger de gros modules sans streaming compile
* Oublier la gestion manuelle de la mémoire (Rust/C++)
* Conversion coûteuse JS ↔ Wasm (strings, objets)
* Supposer que tous les runtimes supportent WASI

---

## À ne pas confondre

* WebAssembly vs JavaScript (binaire vs dynamique)
* Wasm vs asm.js (binaire natif vs JS subset)
* WASI vs Web APIs (system vs navigateur)

---

## Explication simplifiée

WebAssembly permet de faire tourner du code Rust ou C++ compilé directement dans ton navigateur, à une vitesse presque native. C'est ce qui permet à Figma, Photoshop Web ou des jeux 3D lourds de tourner dans Chrome.

---

## Explication avancée

Wasm est une machine à pile avec une mémoire linéaire unique, des types numériques simples et un format binaire ultra-compact. Le navigateur le compile en code natif via un JIT streaming compile. WASI standardise l'accès système pour les runtimes hors navigateur (Wasmtime, Wasmer), permettant d'exécuter du Wasm sur serveur, edge ou IoT avec une isolation légère. Le Component Model vise à faire de Wasm un "langage universel" composable entre modules écrits en langages différents.

---

## Points critiques à retenir

* [CRITIQUE] Wasm n'accède pas au DOM directement
* [CRITIQUE] Le coût JS↔Wasm limite les petits appels
* [IMPORTANT] WASI pour les workloads serveur
* [IMPORTANT] Streaming compile pour réduire le TTI
* [PIÈGE] Binaires parfois plus gros que JS équivalent
