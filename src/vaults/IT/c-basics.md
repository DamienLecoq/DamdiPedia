---
id: c-basics
label: C++ Bases
category: language
priority: medium
status: learning
createdAt: 2025-01-12T10:00:00Z
updatedAt: 2025-01-12T10:00:00Z
relations:
  - target: linux
    type: compiles_on
    weight: 0.4
resources:
  - type: documentation
    title: cppreference.com
    url: https://en.cppreference.com
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
