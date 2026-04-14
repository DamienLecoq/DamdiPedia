---
id: solidjs
label: SolidJS
category: framework
priority: low
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:02.208Z'
updatedAt: '2026-04-14T18:00:02.208Z'
relations:
  - target: javascript
    type: depends_on
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle SolidJS
    url: 'https://www.solidjs.com/docs/latest'
  - type: cours
    title: Tutoriel interactif SolidJS
    url: 'https://www.solidjs.com/tutorial/introduction_basics'
  - type: vidéo
    title: 'SolidJS: Reactivity to Rendering - Ryan Carniato'
    url: 'https://www.youtube.com/watch?v=J70HXl1KhWE'
  - type: blog
    title: Blog SolidJS
    url: 'https://www.solidjs.com/blog'
  - type: documentation
    title: SolidJS Playground
    url: 'https://playground.solidjs.com/'
---

## Résumé rapide
SolidJS est un framework JavaScript réactif qui utilise du JSX comme React mais avec une réactivité granulaire sans DOM virtuel. Il offre des performances proches du JavaScript natif tout en gardant une API déclarative familière. SolidJS est connu pour dominer les benchmarks de performance front-end.
---
## Définition
SolidJS est un framework JavaScript déclaratif et réactif qui utilise un système de réactivité à grain fin basé sur des signaux. Contrairement à React, les composants SolidJS ne sont exécutés qu'une seule fois, et les mises à jour sont propagées directement aux nœuds DOM concernés sans passer par un DOM virtuel ou un re-rendu de composant.
---
## Histoire
* **2018** — Ryan Carniato commence le développement de SolidJS en explorant des approches réactives alternatives aux frameworks existants.
* **2021** — SolidJS 1.0 est publié, attirant l'attention grâce à ses performances exceptionnelles dans les benchmarks.
* **2022** — SolidStart, le méta-framework de SolidJS, entre en développement actif.
* **2023** — SolidJS gagne en notoriété, influençant d'autres frameworks (les Signals d'Angular, les Runes de Svelte).
* **2024** — SolidJS 2.0 est en développement avec des améliorations majeures de l'API et du compilateur.
---
## Objectif
* Atteindre des performances maximales en éliminant le DOM virtuel et les re-rendus de composants.
* Offrir une API familière (JSX) tout en utilisant une réactivité fondamentalement différente de React.
* Démontrer qu'une réactivité à grain fin peut être combinée avec une API déclarative ergonomique.
---
## Domaines d'utilisation
* **Applications haute performance** — interfaces nécessitant des mises à jour fréquentes et rapides.
* **Visualisations de données** — graphiques interactifs, tableaux dynamiques avec beaucoup de données.
* **Applications temps réel** — chats, flux en direct, dashboards avec mises à jour constantes.
* **Applications à ressources limitées** — environnements où chaque kilooctet de bundle compte.
---
## Fonctionnement
* Les **signaux** (`createSignal`) sont des conteneurs réactifs qui trackent automatiquement leurs abonnés.
* Les **effets** (`createEffect`) s'exécutent automatiquement quand les signaux dont ils dépendent changent.
* Les **composants** ne sont exécutés **qu'une seule fois** — il n'y a pas de re-rendu comme dans React.
* Le JSX de SolidJS est compilé en appels DOM réels, pas en createElement comme React.
* Les **memos** (`createMemo`) mettent en cache les valeurs dérivées et ne recalculent que lorsque les dépendances changent.
---
## Concepts clés
* **Signal** — Primitive réactive de base contenant une valeur et notifiant ses abonnés lors de changements.
* **Effect** — Fonction qui s'exécute automatiquement chaque fois qu'un signal dont elle dépend est modifié.
* **Memo** — Valeur dérivée mise en cache qui ne recalcule que lorsque ses dépendances changent.
* **Store** — Objet réactif profondément observé pour gérer l'état complexe avec des mises à jour granulaires.
* **JSX réactif** — Le JSX de SolidJS est compilé en DOM réel, pas en DOM virtuel — chaque expression est un point de mise à jour.
* **Composant unique** — Les fonctions de composants s'exécutent une seule fois lors du montage, contrairement à React.
---
## Exemple
```jsx
import { createSignal, createMemo, For } from 'solid-js';

function ListeTaches() {
  const [taches, setTaches] = createSignal([
    { id: 1, texte: 'Apprendre SolidJS', fait: false },
    { id: 2, texte: 'Créer un projet', fait: false },
  ]);
  const [nouveauTexte, setNouveauTexte] = createSignal('');

  const restantes = createMemo(() =>
    taches().filter(t => !t.fait).length
  );

  function ajouter() {
    if (nouveauTexte().trim()) {
      setTaches([...taches(), {
        id: Date.now(),
        texte: nouveauTexte(),
        fait: false,
      }]);
      setNouveauTexte('');
    }
  }

  return (
    <div>
      <h1>Tâches ({restantes()} restantes)</h1>
      <input
        value={nouveauTexte()}
        onInput={(e) => setNouveauTexte(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && ajouter()}
      />
      <For each={taches()}>
        {(tache) => <p>{tache.texte}</p>}
      </For>
    </div>
  );
}
```
---
## Avantages
* Performances parmi les meilleures de tous les frameworks JavaScript, proches du vanilla JS.
* Pas de re-rendu de composants : les mises à jour sont chirurgicales et directes.
* API familière pour les développeurs React grâce à l'utilisation du JSX.
* Bundle très léger (environ 7 Ko gzippé pour le runtime).
* Réactivité à grain fin qui élimine les problèmes d'optimisation manuelle (memo, callback).
---
## Inconvénients
* Écosystème très jeune et limité comparé à React ou Vue.
* Communauté encore petite, peu de ressources d'apprentissage en français.
* Le JSX ressemble à React mais fonctionne fondamentalement différemment, source de confusion.
* Peu d'offres d'emploi spécifiquement pour SolidJS.
---
## Pièges courants
* **Déstructurer les props** — Contrairement à React, déstructurer les props dans SolidJS brise la réactivité. Il faut utiliser `props.nom` ou `mergeProps`.
* **Oublier les parenthèses sur les signaux** — Un signal est une fonction : `count()` pour lire, pas `count`.
* **Penser comme React** — Croire que le composant se ré-exécute à chaque changement alors qu'il ne s'exécute qu'une fois.
---
## À ne pas confondre
* **SolidJS vs React** — SolidJS utilise du JSX mais fonctionne sans DOM virtuel et sans re-rendu ; les composants sont des fonctions setup exécutées une seule fois.
* **Signaux SolidJS vs useState React** — Les signaux sont des primitives réactives à grain fin, `useState` déclenche un re-rendu complet du composant.
* **SolidJS vs Svelte** — Les deux évitent le DOM virtuel, mais Svelte est un compilateur tandis que SolidJS utilise un runtime réactif léger.
---
## Explication simplifiée
Imaginez une feuille de calcul : quand vous changez une cellule, seules les cellules qui dépendent de cette valeur sont recalculées, pas toute la feuille. SolidJS fonctionne exactement comme ça : seules les parties précises de la page qui dépendent d'une donnée sont mises à jour quand cette donnée change.
---
## Explication avancée
SolidJS implémente un système de réactivité à grain fin inspiré de Knockout et MobX, mais compilé en instructions DOM directes. Les signaux sont des primitives observables qui maintiennent un graphe de dépendances dynamique. Lorsqu'un signal est lu dans un contexte réactif (effet, memo, binding JSX), une souscription automatique est créée. La compilation JSX de SolidJS transforme les expressions en effets qui mettent à jour des nœuds DOM spécifiques, permettant des mises à jour O(1) indépendantes de la taille de l'arbre de composants. Ce modèle élimine complètement le besoin de `shouldComponentUpdate`, `React.memo` ou `useMemo`.
---
## Points critiques à retenir
* [CRITIQUE] Ne jamais déstructurer les props dans SolidJS — cela brise la réactivité. Utiliser `props.propriete` directement.
* [IMPORTANT] Les composants SolidJS s'exécutent une seule fois — ce n'est pas comme React où la fonction est ré-invoquée à chaque rendu.
* [PIÈGE] Les signaux sont des fonctions : il faut appeler `count()` pour lire la valeur, pas simplement `count`.
* [IMPORTANT] SolidJS a influencé les Signals d'Angular, les Runes de Svelte et les signaux de Preact — comprendre SolidJS aide à comprendre l'évolution de l'écosystème.
* [CRITIQUE] Le JSX de SolidJS n'est PAS du React JSX — les composants conditionnels doivent utiliser `<Show>` et les listes `<For>`, pas les ternaires ou `.map()`.
