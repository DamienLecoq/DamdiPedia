---
id: c-bases
label: C++ Bases
category: language
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: 'Sun Jan 12 2025 11:00:00 GMT+0100 (heure normale d’Europe centrale)'
updatedAt: '2026-04-03T14:46:10.482Z'
relations:
  - target: linux
    type: compiles_on
    weight: 0.4
resources:
  - type: documentation
    title: cppreference.com
    url: 'https://en.cppreference.com'
---

## Qu'est-ce que C++ ?

C++ est un langage de programmation généraliste créé comme extension du C, ajoutant la programmation orientée objet, générique et fonctionnelle.

## Concepts clés

- **Variables et types** : `int`, `double`, `bool`, `std::string`
- **Pointeurs** : Adresses mémoire — `int* ptr = &x;`
- **Références** : Alias — `int& ref = x;`
- **Classes** : Encapsulent données et comportement
- **Templates** : Programmation générique
- **RAII** : Acquisition de ressource à l'initialisation

## Hello World

```cpp
#include <iostream>
int main() {
    std::cout << "Bonjour, Monde !" << std::endl;
    return 0;
}
```

## Gestion de la mémoire

- Pile : automatique, rapide, taille limitée
- Tas : `new` / `delete`, gestion manuelle
- Pointeurs intelligents : `std::unique_ptr`, `std::shared_ptr`
