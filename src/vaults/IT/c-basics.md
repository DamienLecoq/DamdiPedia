---
id: c-basics
label: C++ Bases
category: language
priority: medium
status: to_review
last_quiz_score: 3/5
next_review: '2026-04-11'
ease_factor: 2.36
interval: 6
createdAt: 'Sun Jan 12 2025 11:00:00 GMT+0100 (heure normale d’Europe centrale)'
updatedAt: '2026-04-05T07:59:56.158Z'
relations: []
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
