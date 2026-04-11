---
id: maven
label: maven
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-11T10:01:09.982Z'
updatedAt: '2026-04-11T10:01:09.982Z'
relations: []
resources: []
---
---
id: maven
label: Maven
category: logiciel
priority: medium
status: learning
createdAt: 2025-01-15T10:00:00Z
updatedAt: 2025-01-15T10:00:00Z
relations:
  - target: java
    type: uses
    weight: 0.9
  - target: spring-boot
    type: used_by
    weight: 0.7
  - target: hibernate
    type: related
    weight: 0.4
resources:
  - type: documentation
    title: Documentation officielle Maven
    url: https://maven.apache.org/guides/
  - type: documentation
    title: Maven Central Repository
    url: https://search.maven.org/
  - type: vidéo
    title: freeCodeCamp – Maven Tutorial
    url: https://www.youtube.com/watch?v=Xatr8AZLOsE
  - type: blog
    title: Baeldung – Maven Guide
    url: https://www.baeldung.com/maven
  - type: livre
    title: Maven: The Definitive Guide
    url: https://books.sonatype.com/mvnref-book/reference/
---

## Résumé rapide

Maven est l'outil de build et de gestion de dépendances standard de l'écosystème Java. Il structure les projets avec des conventions, gère le téléchargement automatique des bibliothèques et orchestre le cycle de build (compile, test, package).

---

## Définition

Maven est un outil de gestion de projets Java basé sur le concept de POM (Project Object Model). Il automatise le build, la gestion des dépendances, les tests et le packaging via un fichier de configuration XML (`pom.xml`).

---

## Histoire

* Créé en 2004 par la fondation Apache
* Successeur d'Apache Ant (qui n'avait pas de gestion de dépendances)
* Maven Central devient le registre de référence pour les bibliothèques Java
* Aujourd'hui concurrencé par Gradle mais reste dominant en entreprise

---

## Objectif

* Standardiser la structure des projets Java
* Gérer les dépendances automatiquement (téléchargement, versions, transitives)
* Automatiser le cycle de build (compilation, tests, packaging)
* Fournir un modèle reproductible de build

---

## Domaines d'utilisation

* Projets Java / Kotlin (backend, bibliothèques)
* Applications Spring Boot
* Bibliothèques open source publiées sur Maven Central
* Projets d'entreprise multi-modules

---

## Fonctionnement

* Le projet est décrit dans un fichier `pom.xml`
* Les **dépendances** sont déclarées avec groupId, artifactId et version
* Maven télécharge les JARs depuis **Maven Central** (ou un nexus privé)
* Le **cycle de vie** enchaîne les phases : compile → test → package → install → deploy
* Les **plugins** ajoutent des fonctionnalités (compilation, tests, rapport…)

---

## Concepts clés

* **POM** — Project Object Model, fichier `pom.xml` décrivant le projet
* **Dépendance** — Bibliothèque externe déclarée dans le POM
* **Dépendance transitive** — Dépendance d'une dépendance (gérée automatiquement)
* **Repository** — Registre de bibliothèques (Central, privé)
* **Lifecycle** — Enchaînement de phases de build
* **Plugin** — Extension qui exécute une tâche dans le lifecycle

---

## Exemple

```xml
<!-- pom.xml minimal -->
<project>
    <groupId>com.example</groupId>
    <artifactId>mon-app</artifactId>
    <version>1.0.0</version>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>3.2.0</version>
        </dependency>
    </dependencies>
</project>
```

```bash
mvn clean install    # Nettoyer + compiler + tester + packager
mvn test             # Lancer les tests uniquement
mvn dependency:tree  # Afficher l'arbre des dépendances
```

---

## Structure / Architecture

```
mon-projet/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/        # Code source
│   │   └── resources/   # Fichiers de configuration
│   └── test/
│       ├── java/        # Tests
│       └── resources/
└── target/              # Artefacts de build (généré)
```

---

## Avantages

* Convention over configuration (structure standardisée)
* Gestion des dépendances transitives automatique
* Écosystème mature (Maven Central : des millions de bibliothèques)
* Reproductibilité du build
* Très utilisé en entreprise

---

## Inconvénients

* Configuration XML verbose
* Difficile à personnaliser hors des conventions
* Plus lent que Gradle
* Gestion des conflits de versions parfois complexe

---

## Pièges courants

* Conflits de versions entre dépendances transitives
* Ne pas fixer les versions (`LATEST`, `RELEASE` → builds non reproductibles)
* Ignorer le scope des dépendances (compile, test, provided, runtime)
* Oublier de vérifier l'arbre de dépendances (`mvn dependency:tree`)

---

## À ne pas confondre

* Maven vs Gradle (XML/convention vs Groovy/Kotlin DSL/flexible)
* Maven vs npm (écosystème Java vs JavaScript)
* `mvn install` vs `mvn deploy` (local vs remote repository)
* Scope `compile` vs `provided` (inclus dans le JAR vs fourni par le serveur)

---

## Explication simplifiée

Maven c'est l'outil qui gère ton projet Java : il télécharge les bibliothèques dont tu as besoin, compile ton code, lance les tests, et produit un fichier prêt à déployer. Tout est configuré dans un seul fichier (`pom.xml`).

---

## Explication avancée

Maven implémente un modèle déclaratif de build : le POM décrit le projet (métadonnées, dépendances, plugins), et Maven infère le processus de build via des lifecycles prédéfinis (default, clean, site). La résolution de dépendances utilise un algorithme de plus-proche-gagnant (nearest-wins) pour les versions transitives, avec un cache local (`~/.m2/repository`) pour éviter les téléchargements redondants.

---

## Points critiques à retenir

* [CRITIQUE] Le `pom.xml` est le cœur de tout projet Maven
* [CRITIQUE] Les dépendances transitives sont gérées automatiquement
* [IMPORTANT] Convention de structure standard (src/main/java, src/test/java)
* [IMPORTANT] `mvn dependency:tree` pour diagnostiquer les conflits
* [PIÈGE] Ne jamais utiliser `LATEST` ou `RELEASE` comme version
* [PIÈGE] Conflits de versions transitives = cause fréquente de bugs mystérieux
