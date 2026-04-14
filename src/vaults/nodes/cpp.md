---
id: cpp
label: C++
category: langage
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:16.790Z'
updatedAt: '2026-04-14T17:58:16.790Z'
relations:
  - target: c
    type: extends
    weight: 0.9
  - target: poo
    type: implements
    weight: 0.8
resources:
  - type: documentation
    title: cppreference.com — Référence C++
    url: 'https://en.cppreference.com/w/'
  - type: documentation
    title: Documentation C++ — Microsoft Learn
    url: 'https://learn.microsoft.com/fr-fr/cpp/cpp/'
  - type: vidéo
    title: C++ Full Course - freeCodeCamp
    url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y'
  - type: cours
    title: Learn C++ — learncpp.com
    url: 'https://www.learncpp.com/'
  - type: livre
    title: The C++ Programming Language — Bjarne Stroustrup
    url: 'https://www.stroustrup.com/4th.html'
---

## Résumé rapide
C++ est un langage de programmation compilé, multi-paradigme, offrant à la fois la programmation orientée objet et un contrôle bas niveau de la mémoire. Créé par Bjarne Stroustrup comme extension du C, il est le langage de référence pour les systèmes nécessitant des performances maximales. Il est omniprésent dans les moteurs de jeux, les systèmes d'exploitation et les logiciels embarqués.

---

## Définition
C++ est un langage de programmation compilé, statiquement typé, créé en 1979 par Bjarne Stroustrup aux Bell Labs. Il étend le langage C avec la programmation orientée objet, les templates (programmation générique), et de nombreuses abstractions modernes. C++ offre un contrôle direct sur le matériel tout en permettant des abstractions de haut niveau sans coût supplémentaire à l'exécution (principe du "zero-cost abstraction").

---

## Histoire
* **1979** — Bjarne Stroustrup commence le développement de "C with Classes" aux Bell Labs.
* **1985** — Première édition de "The C++ Programming Language" et première version commerciale du compilateur.
* **1998** — C++98, première norme ISO du langage (ISO/IEC 14882:1998), standardisant la STL.
* **2011** — C++11 révolutionne le langage avec les lambdas, les smart pointers, `auto`, `move semantics` et `std::thread`.
* **2020** — C++20 introduit les concepts, les coroutines, les modules et les ranges, modernisant profondément le langage.

---

## Objectif
* Fournir un langage offrant des performances proches du matériel tout en supportant l'abstraction orientée objet.
* Permettre la programmation système, embarquée et temps réel avec un contrôle fin des ressources.
* Garantir la compatibilité ascendante avec le C tout en proposant des fonctionnalités modernes.
* Offrir le principe de "zero-overhead abstraction" : on ne paie que pour ce que l'on utilise.

---

## Domaines d'utilisation
* **Jeux vidéo** — Moteurs de jeux (Unreal Engine, CryEngine) et rendu graphique (OpenGL, Vulkan, DirectX).
* **Systèmes d'exploitation** — Noyaux (Windows, parties de Linux), drivers et logiciels système.
* **Finance** — Trading haute fréquence et systèmes nécessitant une latence ultra-faible.
* **Embarqué et IoT** — Systèmes temps réel, microcontrôleurs et logiciels critiques (aéronautique, automobile).

---

## Fonctionnement
* Le code C++ est **compilé directement en code machine** natif par un compilateur (GCC, Clang, MSVC).
* Le **préprocesseur** traite les directives `#include`, `#define` et les macros avant la compilation.
* L'**édition de liens** (linking) assemble les fichiers objets et les bibliothèques en un exécutable final.
* La gestion mémoire est **manuelle** (new/delete) mais les smart pointers modernes (`unique_ptr`, `shared_ptr`) automatisent la libération.
* Les **templates** sont résolus à la compilation, générant du code spécialisé pour chaque type utilisé.

---

## Concepts clés
* **RAII (Resource Acquisition Is Initialization)** — La durée de vie des ressources est liée à la durée de vie des objets, garantissant leur libération automatique.
* **Smart Pointers** — `unique_ptr`, `shared_ptr` et `weak_ptr` gèrent la mémoire automatiquement sans garbage collector.
* **Move Semantics** — Transfert de propriété des ressources sans copie, optimisant les performances.
* **Templates** — Programmation générique résolue à la compilation, permettant du code réutilisable et performant.
* **STL (Standard Template Library)** — Bibliothèque standard offrant conteneurs, algorithmes et itérateurs.
* **Concepts (C++20)** — Contraintes sur les templates pour des messages d'erreur plus clairs et du code plus expressif.

---

## Exemple
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <memory>

class Animal {
public:
    virtual ~Animal() = default;
    virtual std::string cri() const = 0;
};

class Chat : public Animal {
    std::string nom_;
public:
    explicit Chat(std::string nom) : nom_(std::move(nom)) {}
    std::string cri() const override { return nom_ + " fait miaou !"; }
};

int main() {
    // Smart pointers pour la gestion mémoire
    auto animaux = std::vector<std::unique_ptr<Animal>>();
    animaux.push_back(std::make_unique<Chat>("Felix"));
    animaux.push_back(std::make_unique<Chat>("Garfield"));

    // Algorithme STL avec lambda
    std::for_each(animaux.begin(), animaux.end(),
        [](const auto& a) { std::cout << a->cri() << "\n"; });

    return 0;
}
```

---

## Avantages
* Performances maximales grâce à la compilation native et au contrôle direct de la mémoire.
* Multi-paradigme : orienté objet, générique, fonctionnel et procédural dans un seul langage.
* Énorme écosystème de bibliothèques et compatibilité avec les bibliothèques C existantes.
* Contrôle fin du matériel, adapté aux systèmes embarqués et temps réel.
* Le standard évolue régulièrement (C++23, C++26) en ajoutant des fonctionnalités modernes.

---

## Inconvénients
* Courbe d'apprentissage très raide : le langage est vaste et complexe avec de nombreux pièges subtils.
* La gestion manuelle de la mémoire (sans smart pointers) est source de fuites mémoire et de bugs critiques.
* Les temps de compilation peuvent être très longs, surtout avec un usage intensif des templates.
* Les messages d'erreur liés aux templates sont souvent cryptiques et difficiles à interpréter.

---

## Pièges courants
* **Undefined Behavior (UB)** — Accéder à de la mémoire libérée, dépasser les limites d'un tableau, ou déréférencer un pointeur nul sont des comportements indéfinis silencieux.
* **Fuites mémoire** — Oublier un `delete` ou ne pas utiliser de smart pointers entraîne des fuites progressives.
* **Slicing d'objet** — Passer un objet dérivé par valeur à une fonction attendant la classe de base perd les données spécifiques à la classe dérivée.
* **Ordre d'initialisation des variables statiques** — L'ordre d'initialisation des variables statiques entre unités de compilation est indéfini.

---

## À ne pas confondre
* **C++ vs C** — C++ étend C avec la POO, les templates, les exceptions et la STL, mais reste compatible avec la plupart du code C.
* **C++ vs Rust** — Rust offre des garanties de sécurité mémoire à la compilation que C++ ne fournit pas sans outils externes.
* **C++ vs Java/C#** — C++ n'a pas de garbage collector ni de machine virtuelle ; il compile directement en code natif.

---

## Explication simplifiée
C++ est comme un atelier de mécanique complet : vous avez tous les outils possibles pour construire n'importe quoi, de la montre suisse au moteur de fusée. C'est extrêmement puissant, mais il faut de l'expérience pour ne pas se blesser. Contrairement à des langages comme Java qui rangent automatiquement l'atelier, en C++ c'est à vous de tout nettoyer.

---

## Explication avancée
C++ repose sur un modèle de compilation séparé où chaque unité de traduction (.cpp) est compilée indépendamment en code objet avant d'être liée. Le système de types distingue les types valeur (stack-allocated) et les types pointeur/référence (indirection vers le heap), offrant un contrôle précis du layout mémoire. Les templates sont instanciés à la compilation selon le principe de monomorphisation, générant du code spécialisé pour chaque combinaison de types. Le move semantics de C++11 s'appuie sur les rvalue references (`&&`) pour distinguer les objets temporaires des objets nommés, permettant le transfert de ressources sans copie coûteuse. Le modèle mémoire de C++11 formalise les opérations atomiques et les ordres de mémoire (memory ordering), essentiel pour la programmation concurrente lock-free.

---

## Points critiques à retenir
* [CRITIQUE] Le C++ ne protège pas contre les undefined behaviors : un accès mémoire invalide peut corrompre silencieusement les données sans crash immédiat.
* [IMPORTANT] RAII est le pattern fondamental en C++ : toute ressource (mémoire, fichier, mutex) doit être encapsulée dans un objet dont le destructeur la libère.
* [PIÈGE] Ne jamais utiliser `new`/`delete` directement en C++ moderne — préférer `std::make_unique` et `std::make_shared`.
* [IMPORTANT] La règle des cinq (Rule of Five) : si une classe définit un destructeur, un constructeur de copie/move ou un opérateur d'affectation, elle devrait définir les cinq.
* [CRITIQUE] Les templates génèrent du code dupliqué pour chaque instanciation, ce qui peut exploser la taille du binaire (template bloat).
