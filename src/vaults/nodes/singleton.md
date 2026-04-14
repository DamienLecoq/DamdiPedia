---
id: singleton
label: Singleton
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:59.336Z'
updatedAt: '2026-04-14T17:59:59.336Z'
relations:
  - targetId: design-patterns
    type: part_of
resources:
  - type: documentation
    title: Refactoring Guru – Singleton
    url: 'https://refactoring.guru/design-patterns/singleton'
  - type: vidéo
    title: Fireship – Singleton Pattern
    url: 'https://www.youtube.com/watch?v=tv-_1er1mWI'
  - type: blog
    title: Baeldung – Singleton Pattern in Java
    url: 'https://www.baeldung.com/java-singleton'
  - type: documentation
    title: SourceMaking – Singleton
    url: 'https://sourcemaking.com/design_patterns/singleton'
  - type: livre
    title: Design Patterns – Gang of Four
    url: 'https://www.amazon.com/dp/0201633612'
---

## Résumé rapide

Le Singleton est un design pattern créationnel qui garantit qu'une classe n'a qu'une seule instance dans toute l'application et fournit un point d'accès global à cette instance. C'est l'un des patterns les plus connus mais aussi les plus controversés.

---

## Définition

Le pattern Singleton restreint l'instanciation d'une classe à un seul objet. Il fournit un mécanisme pour obtenir cette instance unique depuis n'importe quel endroit du programme. Le constructeur est privé et l'accès se fait via une méthode statique.

---

## Histoire

* Défini dans le livre "Design Patterns" du Gang of Four (1994)
* L'un des 23 patterns classiques du GoF
* Classé dans la catégorie des patterns créationnels
* Fortement critiqué depuis les années 2000 pour ses effets secondaires
* Considéré comme un anti-pattern par certains développeurs modernes

---

## Objectif

* Garantir qu'une seule instance d'une classe existe
* Fournir un point d'accès global à cette instance
* Contrôler l'accès à une ressource partagée (connexion BDD, fichier de config)
* Coordonner des actions à travers le système

---

## Domaines d'utilisation

* Gestion de connexions à la base de données (connection pool)
* Systèmes de logging centralisé
* Gestion de configuration applicative
* Caches applicatifs partagés
* Gestionnaires de threads ou de ressources système

---

## Fonctionnement

Le Singleton fonctionne en 3 mécanismes :

1. **Constructeur privé** — Empêche la création d'instances depuis l'extérieur
2. **Variable statique** — Stocke la seule instance de la classe
3. **Méthode statique d'accès** — Crée l'instance au premier appel, puis retourne toujours la même

---

## Concepts clés

* **Instance unique** — Une seule instance est créée durant tout le cycle de vie de l'application
* **Lazy initialization** — L'instance est créée au premier appel, pas au démarrage
* **Thread safety** — En environnement multi-thread, la création doit être synchronisée
* **État global** — Le Singleton introduit un état global implicite dans le programme
* **Anti-pattern** — Souvent considéré comme problématique en raison du couplage qu'il crée

---

## Exemple

```java
// ╔══════════════════════════════════════╗
// ║         DIAGRAMME UML               ║
// ╠══════════════════════════════════════╣
// ║  Singleton                          ║
// ║  ─────────────────────────          ║
// ║  - instance: Singleton              ║
// ║  - Singleton()                      ║
// ║  ─────────────────────────          ║
// ║  + getInstance(): Singleton         ║
// ║  + operation(): void                ║
// ╚══════════════════════════════════════╝

// Implémentation thread-safe avec double-checked locking
public class DatabaseConnection {
    private static volatile DatabaseConnection instance;

    private final Connection connection;

    // Constructeur privé
    private DatabaseConnection() {
        this.connection = createConnection();
    }

    // Point d'accès global
    public static DatabaseConnection getInstance() {
        if (instance == null) {
            synchronized (DatabaseConnection.class) {
                if (instance == null) {
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }

    public void executeQuery(String sql) {
        // utilise this.connection
    }

    private Connection createConnection() {
        // ... création de la connexion
        return null;
    }
}

// Utilisation
DatabaseConnection db = DatabaseConnection.getInstance();
db.executeQuery("SELECT * FROM users");

// Alternative moderne : enum Singleton (recommandée par Joshua Bloch)
public enum Logger {
    INSTANCE;

    public void log(String message) {
        System.out.println("[LOG] " + message);
    }
}

// Utilisation
Logger.INSTANCE.log("Application démarrée");
```

---

## Avantages

* Garantit une seule instance (utile pour les ressources partagées)
* Point d'accès global simple
* L'instance n'est créée que si nécessaire (lazy initialization)
* Contrôle centralisé de la ressource

---

## Inconvénients

* Introduit un état global caché dans l'application
* Rend les tests unitaires très difficiles (impossible de mocker facilement)
* Crée un couplage fort entre la classe Singleton et ses consommateurs
* Viole le principe de responsabilité unique (gère son propre cycle de vie)
* Complique le multi-threading si mal implémenté

---

## Pièges courants

* Utiliser Singleton pour tout, par facilité, plutôt que par nécessité
* Oublier la synchronisation en environnement multi-thread
* Ne pas prévoir le nettoyage de l'instance dans les tests
* Créer des Singletons mutables qui deviennent des sources de bugs subtils
* Confondre "je veux un seul instance" et "j'ai besoin d'un Singleton"

---

## À ne pas confondre

* Singleton vs variable globale — Le Singleton contrôle la création, la globale non
* Singleton vs injection de dépendances — Préférer l'injection en scope "singleton" (Spring, Guice)
* Singleton vs pool — Un pool gère N instances, le Singleton une seule
* Singleton vs static class — Le Singleton est un objet instancié, la classe statique ne l'est pas

---

## Explication simplifiée

Imagine le directeur d'une école : il n'y en a qu'un seul. Si tu veux lui parler, tu passes toujours par le même bureau (point d'accès unique). En programmation, un Singleton fait pareil : il n'existe qu'une seule instance d'un objet, et tout le monde accède à la même.

---

## Explication avancée

Le Singleton est le pattern le plus simple du GoF mais aussi l'un des plus problématiques. En Java, l'implémentation thread-safe nécessite soit le double-checked locking avec `volatile`, soit l'initialisation par holder class (Bill Pugh), soit un `enum` (Joshua Bloch, "Effective Java"). Le vrai problème du Singleton n'est pas technique mais architectural : il introduit un couplage statique et un état global qui rendent le code difficile à tester et à raisonner. Les frameworks d'injection de dépendances (Spring, Guice) résolvent le même besoin via des scopes "singleton" managés, tout en conservant la testabilité grâce à l'injection.

---

## Points critiques à retenir

* [CRITIQUE] Un Singleton = une seule instance + point d'accès global
* [CRITIQUE] Préférer l'injection de dépendances en scope singleton à un vrai Singleton
* [IMPORTANT] En Java, l'enum Singleton est l'implémentation la plus sûre
* [IMPORTANT] Le Singleton rend les tests unitaires difficiles — toujours se demander si c'est vraiment nécessaire
* [PIÈGE] Le Singleton est souvent un état global déguisé
* [PIÈGE] Ne pas oublier le thread safety — le double-checked locking nécessite `volatile`
