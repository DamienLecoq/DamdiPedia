---
id: decorator
label: Decorator
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:23.955Z'
updatedAt: '2026-04-14T17:58:23.955Z'
relations:
  - targetId: design-patterns
    type: part_of
  - targetId: poo
    type: uses
resources:
  - type: documentation
    title: Refactoring Guru – Decorator
    url: 'https://refactoring.guru/design-patterns/decorator'
  - type: blog
    title: Baeldung – Decorator Pattern in Java
    url: 'https://www.baeldung.com/java-decorator-pattern'
  - type: vidéo
    title: Christopher Okhravi – Decorator Pattern
    url: 'https://www.youtube.com/watch?v=GCraGHx6gso'
  - type: documentation
    title: SourceMaking – Decorator
    url: 'https://sourcemaking.com/design_patterns/decorator'
  - type: livre
    title: Design Patterns – Gang of Four
    url: 'https://www.amazon.com/dp/0201633612'
---

## Résumé rapide

Le Decorator est un design pattern structurel qui permet d'ajouter dynamiquement des comportements à un objet en l'enveloppant dans un objet décorateur. Il offre une alternative flexible à l'héritage pour étendre les fonctionnalités.

---

## Définition

Le pattern Decorator attache des responsabilités supplémentaires à un objet de manière dynamique. Les décorateurs fournissent une alternative souple à l'héritage pour étendre les fonctionnalités. Chaque décorateur encapsule l'objet original et ajoute son propre comportement avant ou après la délégation.

---

## Histoire

* Défini dans le livre du Gang of Four (1994)
* Classé parmi les patterns structurels
* Utilisé massivement dans la bibliothèque Java I/O (InputStream, BufferedReader)
* Inspiration pour les décorateurs Python (@decorator) et TypeScript (@Component)
* Reste un pattern fondamental en conception orientée objet

---

## Objectif

* Ajouter des comportements à un objet sans modifier sa classe
* Composer des fonctionnalités de manière dynamique et flexible
* Éviter l'explosion combinatoire des sous-classes liée à l'héritage
* Respecter le principe Open/Closed (extension sans modification)

---

## Domaines d'utilisation

* Flux d'entrée/sortie (Java I/O : InputStream → BufferedInputStream → GZIPInputStream)
* Middleware dans les frameworks web (Express.js, Spring)
* Systèmes de logging et de monitoring
* Ajout de fonctionnalités transversales (cache, authentification, compression)
* Composition d'interfaces graphiques

---

## Fonctionnement

Le Decorator repose sur la composition :

1. **Interface commune** — Le décorateur et l'objet décoré implémentent la même interface
2. **Encapsulation** — Le décorateur contient une référence vers l'objet décoré
3. **Délégation** — Le décorateur appelle la méthode de l'objet décoré
4. **Extension** — Le décorateur ajoute son propre comportement avant/après la délégation
5. **Composition** — Plusieurs décorateurs peuvent être empilés

---

## Concepts clés

* **Composition over inheritance** — Le Decorator illustre parfaitement ce principe
* **Transparence** — Le décorateur est utilisé exactement comme l'objet original
* **Empilage** — Plusieurs décorateurs peuvent être combinés dans n'importe quel ordre
* **Wrapper** — Autre nom pour le Decorator (il "enveloppe" l'objet)
* **Middleware** — Concept moderne directement inspiré du Decorator

---

## Exemple

```java
// ╔═══════════════════════════════════════════════════════════════╗
// ║                    DIAGRAMME UML                             ║
// ║                                                              ║
// ║  «interface»                                                 ║
// ║  Coffee                                                      ║
// ║  ─────────────────                                           ║
// ║  + getDescription(): String                                  ║
// ║  + getCost(): double                                         ║
// ║        ▲                        ▲                            ║
// ║        │                        │                            ║
// ║  SimpleCoffee          CoffeeDecorator (abstract)            ║
// ║                        ──────────────────────                ║
// ║                        - coffee: Coffee                      ║
// ║                              ▲                               ║
// ║                    ┌─────────┼──────────┐                    ║
// ║                MilkDecorator  SugarDecorator  WhipDecorator  ║
// ╚═══════════════════════════════════════════════════════════════╝

// Interface commune
interface Coffee {
    String getDescription();
    double getCost();
}

// Composant concret
class SimpleCoffee implements Coffee {
    public String getDescription() { return "Café simple"; }
    public double getCost() { return 2.0; }
}

// Décorateur abstrait
abstract class CoffeeDecorator implements Coffee {
    protected final Coffee coffee;

    CoffeeDecorator(Coffee coffee) {
        this.coffee = coffee;
    }
}

// Décorateurs concrets
class MilkDecorator extends CoffeeDecorator {
    MilkDecorator(Coffee coffee) { super(coffee); }

    public String getDescription() {
        return coffee.getDescription() + " + lait";
    }

    public double getCost() {
        return coffee.getCost() + 0.5;
    }
}

class SugarDecorator extends CoffeeDecorator {
    SugarDecorator(Coffee coffee) { super(coffee); }

    public String getDescription() {
        return coffee.getDescription() + " + sucre";
    }

    public double getCost() {
        return coffee.getCost() + 0.3;
    }
}

// Utilisation : composition dynamique
Coffee myCoffee = new SimpleCoffee();                    // Café simple — 2.0€
myCoffee = new MilkDecorator(myCoffee);                  // Café simple + lait — 2.5€
myCoffee = new SugarDecorator(myCoffee);                 // Café simple + lait + sucre — 2.8€

System.out.println(myCoffee.getDescription()); // Café simple + lait + sucre
System.out.println(myCoffee.getCost());        // 2.8
```

---

## Avantages

* Extension dynamique des fonctionnalités sans modifier les classes existantes
* Évite l'explosion combinatoire des sous-classes
* Combinaison flexible de comportements dans n'importe quel ordre
* Respect du principe de responsabilité unique (chaque décorateur = une responsabilité)
* Respect du principe Open/Closed

---

## Inconvénients

* Peut produire de nombreuses petites classes
* Le code de configuration (empilage des décorateurs) peut devenir verbeux
* L'ordre d'empilage peut impacter le résultat
* Difficile de retirer un décorateur spécifique une fois empilé
* Le débogage peut être complexe avec de nombreux niveaux d'empilage

---

## Pièges courants

* Confondre Decorator et héritage — le Decorator utilise la composition
* Créer des décorateurs qui dépendent de l'ordre d'empilage sans le documenter
* Oublier de déléguer l'appel au composant encapsulé
* Utiliser le Decorator quand un simple héritage suffit (KISS)
* Ne pas respecter le contrat de l'interface dans le décorateur

---

## À ne pas confondre

* Decorator vs Proxy — Le Proxy contrôle l'accès, le Decorator ajoute des fonctionnalités
* Decorator vs Adapter — L'Adapter change l'interface, le Decorator garde la même
* Decorator vs Strategy — La Strategy change l'algorithme interne, le Decorator enveloppe l'objet
* Decorator vs Chain of Responsibility — La chaîne peut interrompre le flux, le Decorator exécute toujours

---

## Explication simplifiée

Le Decorator, c'est comme personnaliser un café : tu commences avec un café simple, puis tu ajoutes du lait, du sucre, de la crème fouettée. Chaque ajout "décore" le café de base sans le modifier. En programmation, tu enveloppes un objet dans un autre qui ajoute une fonctionnalité tout en gardant la même interface.

---

## Explication avancée

Le Decorator exploite le polymorphisme et la composition pour créer une chaîne d'objets transparente. En Java, l'API I/O est l'exemple canonique : `new BufferedReader(new InputStreamReader(new FileInputStream("file.txt")))`. Chaque couche ajoute une fonctionnalité (buffering, conversion de caractères) tout en restant un `Reader`. Les annotations `@Decorator` en CDI (Java EE) et les décorateurs Python (`@functools.wraps`) sont des implémentations modernes du même concept. Le middleware Express.js et les intercepteurs Spring sont des applications architecturales du pattern Decorator.

---

## Points critiques à retenir

* [CRITIQUE] Le Decorator et l'objet décoré implémentent la même interface — c'est la clé du pattern
* [CRITIQUE] Composition over inheritance — le Decorator est l'illustration parfaite de ce principe
* [IMPORTANT] Java I/O est l'exemple canonique : InputStream → BufferedInputStream → GZIPInputStream
* [IMPORTANT] Les décorateurs peuvent être empilés dans n'importe quel ordre
* [PIÈGE] Ne pas confondre Decorator et Proxy — l'intention est différente
* [PIÈGE] L'ordre d'empilage peut affecter le résultat — le documenter si c'est le cas
