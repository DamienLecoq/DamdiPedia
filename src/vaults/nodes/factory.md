---
id: factory
label: Factory
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:35.967Z'
updatedAt: '2026-04-14T17:58:35.967Z'
relations:
  - targetId: design-patterns
    type: part_of
  - targetId: poo
    type: uses
resources:
  - type: documentation
    title: Refactoring Guru – Factory Method
    url: 'https://refactoring.guru/design-patterns/factory-method'
  - type: documentation
    title: Refactoring Guru – Abstract Factory
    url: 'https://refactoring.guru/design-patterns/abstract-factory'
  - type: blog
    title: Baeldung – Factory Pattern in Java
    url: 'https://www.baeldung.com/java-factory-pattern'
  - type: vidéo
    title: Derek Banas – Factory Design Pattern
    url: 'https://www.youtube.com/watch?v=ub0DXaeV6hA'
  - type: livre
    title: Head First Design Patterns
    url: 'https://www.amazon.com/dp/0596007124'
---

## Résumé rapide

Le pattern Factory (Fabrique) est un design pattern créationnel qui fournit une interface pour créer des objets sans exposer la logique de création au client. Il délègue l'instanciation à des sous-classes ou à des méthodes spécialisées, favorisant le découplage et l'extensibilité.

---

## Définition

Le pattern Factory encapsule la logique de création d'objets dans une méthode ou une classe dédiée. Le client n'a pas besoin de connaître la classe concrète de l'objet créé — il travaille avec une interface ou une classe abstraite. Il existe deux variantes principales : Factory Method (méthode de fabrique) et Abstract Factory (fabrique abstraite).

---

## Histoire

* Défini dans le livre du Gang of Four (1994) avec deux variantes : Factory Method et Abstract Factory
* L'un des patterns créationnels les plus utilisés
* Intégré nativement dans de nombreux frameworks (Spring BeanFactory, Java Calendar.getInstance())
* Évolué vers les static factory methods popularisées par Joshua Bloch ("Effective Java")
* Reste l'un des patterns les plus pertinents en développement moderne

---

## Objectif

* Découpler la création d'objets de leur utilisation
* Permettre la création d'objets sans connaître leur classe concrète
* Centraliser la logique de création pour faciliter les modifications
* Respecter le principe Open/Closed (ajout de nouveaux types sans modifier le code existant)

---

## Domaines d'utilisation

* Frameworks et bibliothèques (Spring, Hibernate)
* Systèmes avec plusieurs implémentations interchangeables
* Parsing et conversion de formats (JSON, XML, CSV)
* Systèmes de plugins et d'extensions
* Création d'interfaces utilisateur multi-plateformes

---

## Fonctionnement

Le pattern Factory fonctionne en séparant deux responsabilités :

* **Le client** — Sait de quel type d'objet il a besoin (via un paramètre ou un contexte)
* **La factory** — Sait comment créer l'objet concret correspondant
* **Le produit** — L'interface commune que tous les objets créés implémentent

---

## Concepts clés

* **Factory Method** — Une méthode qui retourne un objet, laissant les sous-classes décider du type concret
* **Abstract Factory** — Une interface pour créer des familles d'objets liés
* **Static Factory Method** — Une méthode statique qui remplace le constructeur (ex: `List.of()`)
* **Produit abstrait** — L'interface ou classe abstraite commune aux objets créés
* **Produit concret** — L'implémentation réelle retournée par la factory

---

## Exemple

```java
// ╔═══════════════════════════════════════════════════════════╗
// ║                DIAGRAMME UML                             ║
// ║                                                          ║
// ║  «interface»              «interface»                    ║
// ║  NotificationFactory      Notification                   ║
// ║  ─────────────────        ──────────────                 ║
// ║  + create(): Notification + send(msg): void              ║
// ║        ▲                        ▲                        ║
// ║        │                        │                        ║
// ║   ┌────┴─────┐          ┌───────┼────────┐              ║
// ║   │          │          │       │        │              ║
// ║ EmailFactory SmsFactory Email   Sms   PushNotif         ║
// ╚═══════════════════════════════════════════════════════════╝

// Interface produit
interface Notification {
    void send(String message);
}

// Produits concrets
class EmailNotification implements Notification {
    public void send(String message) {
        System.out.println("Email envoyé : " + message);
    }
}

class SmsNotification implements Notification {
    public void send(String message) {
        System.out.println("SMS envoyé : " + message);
    }
}

class PushNotification implements Notification {
    public void send(String message) {
        System.out.println("Push envoyé : " + message);
    }
}

// Factory Method
class NotificationFactory {
    public static Notification create(String type) {
        return switch (type) {
            case "email" -> new EmailNotification();
            case "sms"   -> new SmsNotification();
            case "push"  -> new PushNotification();
            default -> throw new IllegalArgumentException(
                "Type inconnu : " + type
            );
        };
    }
}

// Utilisation — le client ne connaît pas les classes concrètes
Notification notif = NotificationFactory.create("email");
notif.send("Bienvenue !");  // Email envoyé : Bienvenue !
```

---

## Avantages

* Découplage entre création et utilisation des objets
* Facilite l'ajout de nouveaux types sans modifier le code client
* Centralise la logique de création (un seul endroit à modifier)
* Respecte le principe Open/Closed
* Facilite les tests unitaires (on peut injecter des mocks via la factory)

---

## Inconvénients

* Ajoute des classes supplémentaires (complexité structurelle)
* Peut être de la sur-ingénierie pour des cas simples
* L'Abstract Factory peut devenir complexe avec de nombreuses familles de produits
* Nécessite de modifier la factory pour chaque nouveau type (sauf avec réflexion)

---

## Pièges courants

* Utiliser une Factory quand un simple constructeur suffit
* Créer une Factory avec un seul produit concret (YAGNI)
* Oublier de gérer les cas inconnus (toujours un `default` ou une exception)
* Confondre Factory Method et Abstract Factory
* Utiliser la réflexion pour éviter le switch — ajoute de la fragilité

---

## À ne pas confondre

* Factory Method vs Abstract Factory — La première crée un produit, la seconde une famille de produits liés
* Factory vs Builder — Factory crée en une étape, Builder construit étape par étape
* Factory vs Prototype — Factory crée de nouveaux objets, Prototype clone des existants
* Factory vs injection de dépendances — La DI résout le même problème de manière plus générale

---

## Explication simplifiée

Imagine une pizzeria : tu commandes une "Margherita" sans savoir comment elle est fabriquée. Le pizzaiolo (la factory) sait exactement quels ingrédients utiliser et comment la préparer. En programmation, la Factory fait pareil : tu demandes un objet par son type, et elle se charge de le créer correctement.

---

## Explication avancée

Le pattern Factory repose sur le principe d'inversion de dépendances (DIP) : le code client dépend d'une abstraction (l'interface Notification) plutôt que des classes concrètes. La Factory Method du GoF est en réalité un pattern basé sur l'héritage : une classe abstraite définit une méthode `create()` que les sous-classes implémentent. En pratique, les static factory methods (comme `List.of()`, `Optional.of()`, `Calendar.getInstance()`) sont bien plus courantes en Java moderne. Spring Framework utilise le pattern Factory de manière intensive avec le `BeanFactory` et l'`ApplicationContext` pour créer et gérer les beans.

---

## Points critiques à retenir

* [CRITIQUE] La Factory découple la création de l'utilisation — le client ne connaît que l'interface
* [CRITIQUE] Toujours retourner une interface ou classe abstraite, jamais un type concret
* [IMPORTANT] Factory Method = une méthode, Abstract Factory = une interface pour familles de produits
* [IMPORTANT] Les static factory methods (Joshua Bloch) sont une forme moderne et très courante
* [PIÈGE] Ne pas créer de Factory pour un seul type concret — c'est de la sur-ingénierie
* [PIÈGE] Penser à gérer les types inconnus avec une exception claire
