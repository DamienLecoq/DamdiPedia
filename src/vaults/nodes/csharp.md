---
id: csharp
label: C#
category: langage
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:19.663Z'
updatedAt: '2026-04-14T17:58:19.663Z'
relations:
  - target: poo
    type: implements
    weight: 0.9
  - target: aspnet-core
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle C# - Microsoft
    url: 'https://learn.microsoft.com/fr-fr/dotnet/csharp/'
  - type: cours
    title: C# Tutorial - W3Schools
    url: 'https://www.w3schools.com/cs/'
  - type: vidéo
    title: C# Full Course - freeCodeCamp
    url: 'https://www.youtube.com/watch?v=GhQdlMFjVpI'
  - type: documentation
    title: C# Language Reference
    url: 'https://learn.microsoft.com/fr-fr/dotnet/csharp/language-reference/'
  - type: blog
    title: Blog .NET officiel de Microsoft
    url: 'https://devblogs.microsoft.com/dotnet/'
---

## Résumé rapide
C# est un langage de programmation orienté objet, fortement typé, développé par Microsoft dans le cadre de la plateforme .NET. Il est largement utilisé pour le développement d'applications web, desktop, mobiles et de jeux vidéo. Sa syntaxe, inspirée de C++ et Java, le rend accessible tout en offrant des fonctionnalités modernes puissantes.

---

## Définition
C# (prononcé "C sharp") est un langage de programmation multi-paradigme créé par Anders Hejlsberg chez Microsoft en 2000. Il combine la puissance de C++ avec la simplicité de langages plus modernes, et s'exécute principalement sur le runtime .NET (anciennement .NET Framework). C# est un langage compilé en code intermédiaire (IL) qui est ensuite exécuté par le CLR (Common Language Runtime).

---

## Histoire
* **2000** — Anders Hejlsberg conçoit C# chez Microsoft, initialement nommé "Cool", pour accompagner la plateforme .NET.
* **2002** — Sortie de C# 1.0 avec .NET Framework 1.0, introduisant les concepts de base du langage.
* **2005** — C# 2.0 apporte les generics, les types nullable et les itérateurs.
* **2012** — C# 5.0 introduit async/await, révolutionnant la programmation asynchrone.
* **2023** — C# 12 avec .NET 8 apporte les constructeurs primaires pour les classes, les expressions de collection et les alias de types.

---

## Objectif
* Fournir un langage moderne, sûr et orienté objet pour le développement sur la plateforme .NET.
* Permettre le développement multiplateforme (Windows, macOS, Linux) grâce à .NET.
* Offrir une productivité élevée avec une syntaxe claire et des outils puissants comme Visual Studio.

---

## Domaines d'utilisation
* **Développement web** — Applications web avec ASP.NET Core, API REST et applications Blazor.
* **Développement de jeux vidéo** — Moteur Unity, l'un des plus utilisés au monde.
* **Applications desktop** — WPF, WinForms, .NET MAUI pour les applications multiplateformes.
* **Services cloud** — Microservices et applications Azure avec .NET.

---

## Fonctionnement
* Le code source C# est compilé en **CIL** (Common Intermediate Language), un langage intermédiaire indépendant de la plateforme.
* Le **CLR** (Common Language Runtime) exécute le CIL en le compilant en code natif via un compilateur JIT (Just-In-Time).
* Le **garbage collector** gère automatiquement la mémoire, libérant les objets inutilisés.
* Le système de **types fort** détecte de nombreuses erreurs à la compilation plutôt qu'à l'exécution.
* Le compilateur **Roslyn** fournit des API d'analyse de code et alimente les outils de développement.

---

## Concepts clés
* **Propriétés** — Mécanisme élégant d'encapsulation avec getters/setters automatiques (`{ get; set; }`).
* **LINQ** — Language Integrated Query, permet des requêtes intégrées au langage sur des collections, bases de données, XML.
* **async/await** — Modèle de programmation asynchrone simplifié pour les opérations non bloquantes.
* **Generics** — Types paramétrés permettant d'écrire du code réutilisable et type-safe.
* **Pattern matching** — Correspondance de motifs avancée pour simplifier les branchements conditionnels complexes.
* **Records** — Types immuables par valeur pour modéliser des données simplement.

---

## Exemple
```csharp
using System;
using System.Linq;

var nombres = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// LINQ pour filtrer et transformer
var pairs = nombres.Where(n => n % 2 == 0).Select(n => n * n);

Console.WriteLine("Carrés des nombres pairs :");
foreach (var p in pairs)
{
    Console.WriteLine(p); // 4, 16, 36, 64, 100
}

// Pattern matching avec switch
object valeur = 42;
string resultat = valeur switch
{
    int n when n > 0 => $"Nombre positif : {n}",
    int n => $"Nombre négatif ou nul : {n}",
    string s => $"Texte : {s}",
    _ => "Type inconnu"
};
Console.WriteLine(resultat);
```

---

## Avantages
* Langage fortement typé avec inférence de type, réduisant les erreurs tout en restant concis.
* Écosystème .NET très riche avec des milliers de bibliothèques NuGet disponibles.
* Excellente intégration avec les outils Microsoft (Visual Studio, Azure, SQL Server).
* Performances très élevées, comparables à Java et proches du C++ dans certains scénarios.
* Évolution constante avec des mises à jour annuelles ajoutant des fonctionnalités modernes.

---

## Inconvénients
* Historiquement lié à l'écosystème Microsoft, bien que .NET soit désormais open source et multiplateforme.
* Courbe d'apprentissage significative pour maîtriser toutes les fonctionnalités avancées (LINQ, async, generics).
* Les applications GUI multiplateformes restent moins matures que les solutions natives (malgré .NET MAUI).
* La quantité de fonctionnalités accumulées au fil des versions peut rendre le langage complexe.

---

## Pièges courants
* **Oublier `await`** — Appeler une méthode async sans `await` ne lève pas d'erreur mais la tâche ne sera pas attendue, causant des comportements imprévisibles.
* **Null Reference Exception** — Malgré l'introduction des types nullable (`?`), les références null restent une source fréquente de bugs.
* **Capture de variable dans les closures** — Les lambdas capturent la variable elle-même, pas sa valeur, ce qui peut causer des résultats inattendus dans les boucles.
* **Comparaison de chaînes** — Ne pas utiliser `StringComparison` peut mener à des bugs liés à la culture locale.

---

## À ne pas confondre
* **C# vs C++** — C# est un langage managé avec garbage collector, tandis que C++ offre un contrôle direct de la mémoire.
* **C# vs Java** — Bien que similaires en syntaxe, C# possède des fonctionnalités plus modernes (LINQ, propriétés, async/await natif) et s'intègre à l'écosystème .NET.
* **.NET Framework vs .NET (Core)** — .NET Framework est l'ancien runtime Windows uniquement, .NET (anciennement .NET Core) est la version moderne, multiplateforme et open source.

---

## Explication simplifiée
C# est comme un architecte qui conçoit des bâtiments dans un quartier bien organisé (.NET). Il dispose d'outils modernes et d'un plan de construction strict (typage fort) qui empêche de faire des erreurs grossières. Comme un bon architecte, il peut concevoir aussi bien une maison (application desktop) qu'un gratte-ciel (application cloud).

---

## Explication avancée
C# est un langage multi-paradigme qui compile vers le CIL (Common Intermediate Language) exécuté par le CLR via compilation JIT. Le système de types de C# repose sur un modèle unifié où tous les types dérivent de `System.Object`, incluant les types valeur (structs) via le boxing/unboxing. Les fonctionnalités avancées comme les Span<T>, les ref structs et le pool de mémoire permettent des optimisations zero-allocation critiques pour les performances. Le modèle async/await repose sur des machines à états générées par le compilateur, transformant le code asynchrone en continuations chaînées via des `Task` et des `SynchronizationContext`. Le compilateur Roslyn expose une API complète d'analyse syntaxique et sémantique, permettant la création d'analyseurs de code personnalisés et de générateurs de source au moment de la compilation.

---

## Points critiques à retenir
* [CRITIQUE] C# est un langage managé : le CLR gère la mémoire via le garbage collector, mais il faut implémenter `IDisposable` pour les ressources non managées.
* [IMPORTANT] LINQ est l'un des atouts majeurs de C# : il unifie les requêtes sur les collections, les bases de données et le XML avec une syntaxe fluide.
* [IMPORTANT] Depuis .NET 5+, C# est véritablement multiplateforme et open source, brisant la dépendance historique à Windows.
* [PIÈGE] Les closures en C# capturent les variables par référence : dans une boucle `for`, toutes les lambdas partageront la même variable si elle n'est pas copiée localement.
* [CRITIQUE] Le pattern async/await doit être utilisé de bout en bout ("async all the way") — mélanger du code synchrone et asynchrone peut causer des deadlocks.
