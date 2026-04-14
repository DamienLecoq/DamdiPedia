---
id: c
label: C
category: langage
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:11.548Z'
updatedAt: '2026-04-14T17:58:11.548Z'
relations:
  - target: cpp
    type: related
    weight: 0.9
resources:
  - type: documentation
    title: C Reference — cppreference.com
    url: 'https://en.cppreference.com/w/c'
  - type: cours
    title: C Programming Tutorial - freeCodeCamp
    url: 'https://www.youtube.com/watch?v=KJgsSFOSQv0'
  - type: livre
    title: The C Programming Language — Kernighan & Ritchie
    url: >-
      https://www.amazon.com/Programming-Language-2nd-Brian-Kernighan/dp/0131103628
  - type: documentation
    title: GNU C Reference Manual
    url: 'https://www.gnu.org/software/gnu-c-manual/'
  - type: cours
    title: Learn C - W3Schools
    url: 'https://www.w3schools.com/c/'
---

## Résumé rapide
Le C est un langage de programmation procédural créé en 1972, considéré comme le fondement de l'informatique moderne. Il offre un accès direct à la mémoire et au matériel, ce qui en fait le langage de prédilection pour les systèmes d'exploitation, les pilotes et les systèmes embarqués. La plupart des langages modernes (C++, Java, C#, Python) tirent leur syntaxe du C.

---

## Définition
Le C est un langage de programmation impératif et procédural, créé par Dennis Ritchie aux Bell Labs en 1972 pour le développement du système Unix. C'est un langage compilé, de bas niveau, qui fournit un accès direct à la mémoire via les pointeurs et un contrôle précis du matériel. Sa simplicité et sa portabilité en ont fait la lingua franca de la programmation système.

---

## Histoire
* **1972** — Dennis Ritchie crée le langage C aux Bell Labs pour réécrire le système Unix, initialement écrit en assembleur.
* **1978** — Publication de "The C Programming Language" (K&R) par Brian Kernighan et Dennis Ritchie, devenant la référence du langage.
* **1989** — ANSI C (C89/C90) standardise le langage, introduisant les prototypes de fonctions et la bibliothèque standard.
* **1999** — C99 ajoute les types `long long`, les tableaux de longueur variable (VLA), les commentaires `//` et `<stdbool.h>`.
* **2011** — C11 introduit le support du multithreading (`<threads.h>`), les assertions statiques et les expressions génériques (`_Generic`).

---

## Objectif
* Fournir un langage portable de bas niveau proche du matériel, traduisible efficacement en code machine.
* Permettre le développement de systèmes d'exploitation, de compilateurs et de logiciels embarqués.
* Offrir un langage minimal et prévisible dont le comportement correspond directement aux instructions processeur.

---

## Domaines d'utilisation
* **Systèmes d'exploitation** — Linux, Windows (noyau), macOS (Darwin) et la majorité des OS sont écrits principalement en C.
* **Systèmes embarqués** — Microcontrôleurs, firmware, systèmes temps réel (RTOS) et IoT.
* **Bibliothèques fondamentales** — SQLite, OpenSSL, zlib, libpng et des milliers de bibliothèques critiques.
* **Implémentation de langages** — Les interpréteurs de Python (CPython), Ruby (CRuby) et PHP sont écrits en C.

---

## Fonctionnement
* Le code C est traité par un **préprocesseur** qui gère les `#include`, `#define` et les compilations conditionnelles.
* Le **compilateur** (GCC, Clang, MSVC) traduit le code source en code assembleur puis en code objet.
* L'**éditeur de liens** (linker) combine les fichiers objets et les bibliothèques en un exécutable binaire natif.
* La mémoire est gérée **manuellement** : allocation avec `malloc()`/`calloc()` et libération avec `free()`.
* Le programme s'exécute **directement sur le processeur** sans machine virtuelle ni runtime lourd.

---

## Concepts clés
* **Pointeurs** — Variables contenant des adresses mémoire, permettant l'accès direct et la manipulation de la mémoire.
* **Gestion manuelle de la mémoire** — `malloc()`, `calloc()`, `realloc()` pour allouer et `free()` pour libérer la mémoire sur le tas.
* **Structures (struct)** — Types composés regroupant des données hétérogènes, base de l'organisation des données en C.
* **Préprocesseur** — Système de macros et d'inclusion de fichiers traité avant la compilation.
* **Undefined Behavior (UB)** — Comportements indéfinis par la norme que le compilateur peut optimiser de manière imprévisible.

---

## Exemple
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char nom[50];
    int age;
} Personne;

Personne* creer_personne(const char* nom, int age) {
    Personne* p = malloc(sizeof(Personne));
    if (p == NULL) {
        fprintf(stderr, "Erreur d'allocation mémoire\n");
        exit(EXIT_FAILURE);
    }
    strncpy(p->nom, nom, sizeof(p->nom) - 1);
    p->nom[sizeof(p->nom) - 1] = '\0';
    p->age = age;
    return p;
}

int main(void) {
    Personne* alice = creer_personne("Alice", 30);
    printf("%s a %d ans\n", alice->nom, alice->age);
    free(alice); // Libération obligatoire
    return 0;
}
```

---

## Avantages
* Performances maximales : compilation native sans overhead de runtime ni garbage collector.
* Portabilité exceptionnelle : un compilateur C existe pour quasiment toutes les architectures existantes.
* Langage minimal et prévisible : le programmeur sait exactement ce que chaque instruction fait au niveau machine.
* Base de tout l'écosystème logiciel : interface universelle (ABI C) que tous les langages peuvent appeler.
* Maturité et stabilité : le langage est stable depuis des décennies, le code C écrit il y a 30 ans compile encore.

---

## Inconvénients
* La gestion manuelle de la mémoire est source de bugs critiques (fuites, buffer overflows, use-after-free).
* Pas de programmation orientée objet native : l'encapsulation et le polymorphisme nécessitent des patterns manuels.
* La bibliothèque standard est minimaliste : pas de structures de données avancées (hashmap, listes chaînées) intégrées.
* Les chaînes de caractères terminées par `\0` sont une source historique de vulnérabilités de sécurité.

---

## Pièges courants
* **Buffer overflow** — Écrire au-delà des limites d'un tableau corrompt la mémoire silencieusement et peut être exploité par des attaquants.
* **Oublier `free()`** — Chaque `malloc()` doit avoir un `free()` correspondant, sinon la mémoire fuit progressivement.
* **Déréférencer un pointeur NULL** — Toujours vérifier le retour de `malloc()` avant d'utiliser le pointeur.
* **Dangling pointer** — Utiliser un pointeur après avoir libéré la mémoire qu'il référençait mène à un comportement indéfini.

---

## À ne pas confondre
* **C vs C++** — C est un langage procédural ; C++ ajoute la POO, les templates, les exceptions et la STL tout en restant largement compatible avec C.
* **C vs C#** — C# est un langage managé de haut niveau (garbage collector, runtime .NET) sans rapport direct avec C hormis la syntaxe inspirée.

---

## Explication simplifiée
Le C est comme un couteau suisse minimaliste : il ne contient que les outils essentiels, mais avec eux vous pouvez construire absolument tout. Contrairement aux langages modernes qui rangent automatiquement après vous, en C vous êtes responsable de chaque octet de mémoire que vous utilisez, comme un artisan qui doit nettoyer chaque outil après usage.

---

## Explication avancée
Le C est conçu comme une abstraction fine au-dessus de l'assembleur : chaque construction du langage se traduit de manière prévisible en un nombre restreint d'instructions machine. Le modèle mémoire du C expose directement la mémoire linéaire du processeur via les pointeurs, avec une distinction entre allocation sur la pile (variables automatiques) et sur le tas (malloc/free). La norme C définit explicitement des cas de "undefined behavior" (dépassement d'entiers signés, déréférencement de pointeur nul) que le compilateur peut exploiter pour des optimisations agressives. L'ABI C (Application Binary Interface) est devenue le standard de facto pour l'interopérabilité entre langages, et la FFI (Foreign Function Interface) de la plupart des langages cible les conventions d'appel du C. Le modèle de compilation séparé avec headers et unités de traduction reste un héritage influent mais considéré comme obsolète par les approches modernes (modules C++20, systèmes de paquets).

---

## Points critiques à retenir
* [CRITIQUE] Chaque `malloc()` doit être suivi d'un `free()` — il n'y a pas de garbage collector en C, les fuites mémoire s'accumulent.
* [CRITIQUE] Les buffer overflows en C sont la cause historique la plus fréquente de failles de sécurité (CVE).
* [IMPORTANT] Le C est la lingua franca de la programmation système : comprendre le C, c'est comprendre comment fonctionne un ordinateur.
* [PIÈGE] Un comportement indéfini (UB) en C ne provoque pas nécessairement un crash — le programme peut sembler fonctionner puis échouer de manière aléatoire.
* [IMPORTANT] Toujours utiliser des fonctions sécurisées (`strncpy` au lieu de `strcpy`, `snprintf` au lieu de `sprintf`) pour éviter les dépassements de buffer.
