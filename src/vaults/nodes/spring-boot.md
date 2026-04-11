---
id: spring-boot
label: Spring Boot
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-11T10:01:48.091Z'
updatedAt: '2026-04-11T10:01:48.091Z'
relations:
  - target: java
    type: uses
    weight: 0.9
  - target: api-rest
    type: implements
    weight: 0.9
  - target: maven
    type: built_with
    weight: 0.7
  - target: hibernate
    type: uses
    weight: 0.7
  - target: microservices
    type: enables
    weight: 0.8
  - target: docker
    type: deployed_with
    weight: 0.7
resources:
  - type: documentation
    title: Documentation officielle Spring Boot
    url: 'https://docs.spring.io/spring-boot/docs/current/reference/html/'
  - type: documentation
    title: Spring Initializr
    url: 'https://start.spring.io/'
  - type: vidéo
    title: Amigoscode – Spring Boot Tutorial
    url: 'https://www.youtube.com/watch?v=9SGDpanrc8U'
  - type: vidéo
    title: Java Brains – Spring Boot Quick Start
    url: 'https://www.youtube.com/watch?v=msXL2oDexqw'
  - type: blog
    title: Baeldung – Spring Boot
    url: 'https://www.baeldung.com/spring-boot'
  - type: cours
    title: Udemy – Spring Boot Masterclass
    url: 'https://www.udemy.com/course/spring-boot-tutorial-for-beginners/'
  - type: livre
    title: Spring in Action – Craig Walls
    url: 'https://www.amazon.com/dp/1617297577'
  - type: autre
    title: Spring Guides – Tutoriels officiels
    url: 'https://spring.io/guides'
---

## Résumé rapide

Spring Boot est le framework Java le plus populaire pour construire des applications backend et des microservices. Il simplifie la configuration de Spring en appliquant des conventions par défaut, permettant de démarrer un projet rapidement.

---

## Définition

Spring Boot est un framework basé sur Spring Framework qui fournit une configuration automatique (auto-configuration), un serveur embarqué et des opinions par défaut pour créer des applications Java prêtes pour la production avec un minimum de configuration.

---

## Histoire

* Spring Framework créé en 2003 par Rod Johnson (alternative à Java EE)
* Spring Boot lancé en 2014 par Pivotal pour simplifier Spring
* Adoption massive grâce à la convention over configuration
* Aujourd'hui le framework Java le plus utilisé au monde
* Maintenu par VMware / Broadcom

---

## Objectif

* Éliminer la configuration boilerplate de Spring
* Fournir un serveur embarqué (pas besoin de WAR/Tomcat externe)
* Accélérer le développement d'applications backend
* Standardiser la création de microservices Java

---

## Domaines d'utilisation

* API REST et microservices
* Applications web backend
* Applications d'entreprise (banque, assurance, e-commerce)
* Services de traitement de données (batch processing)
* Applications cloud-native

---

## Fonctionnement

* **Auto-configuration** — Détecte les dépendances et configure automatiquement
* **Starters** — Packs de dépendances pré-configurés (`spring-boot-starter-web`, etc.)
* **Serveur embarqué** — Tomcat/Jetty intégré, l'app se lance comme un simple JAR
* **Actuator** — Endpoints de monitoring et health checks intégrés
* **Profiles** — Configuration par environnement (dev, staging, prod)

---

## Concepts clés

* **Injection de dépendances** — Le conteneur Spring gère les instances (beans)
* **Annotations** — `@RestController`, `@Service`, `@Repository`, `@Autowired`
* **Auto-configuration** — Configuration intelligente basée sur le classpath
* **Spring Data** — Abstraction d'accès aux données (JPA, MongoDB, Redis…)
* **Spring Security** — Authentification et autorisation
* **Spring Cloud** — Outils pour les architectures distribuées

---

## Exemple

```java
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAll() {
        return userService.findAll();
    }

    @PostMapping("/users")
    public User create(@RequestBody User user) {
        return userService.save(user);
    }
}
```

---

## Structure / Architecture

* `src/main/java/` — Code source (controllers, services, repositories)
* `src/main/resources/application.yml` — Configuration
* `src/test/` — Tests unitaires et d'intégration
* Architecture en couches : Controller → Service → Repository → Database

---

## Syntaxe et spécificités

* Configuration via `application.yml` ou `application.properties`
* Annotations omniprésentes (`@Component`, `@Bean`, `@Value`…)
* Convention sur la structure des packages
* Profils d'environnement : `application-dev.yml`, `application-prod.yml`

---

## Avantages

* Démarrage rapide d'un projet (Spring Initializr)
* Écosystème énorme (Spring Data, Security, Cloud, Batch…)
* Auto-configuration intelligente
* Grande communauté et documentation abondante
* Très demandé sur le marché du travail

---

## Inconvénients

* "Magie" de l'auto-configuration (difficile à débugger quand ça casse)
* Consommation mémoire importante
* Temps de démarrage lent (amélioré par Spring Native / GraalVM)
* Courbe d'apprentissage pour comprendre Spring en profondeur

---

## Pièges courants

* Ne pas comprendre l'injection de dépendances (circular dependencies)
* Mauvaise gestion des transactions (`@Transactional` mal placé)
* Ignorer les profils d'environnement (secrets en dur dans le code)
* Sur-utiliser les annotations sans comprendre ce qu'elles font

---

## À ne pas confondre

* Spring vs Spring Boot (framework vs sur-couche de configuration)
* `@Component` vs `@Bean` (scan automatique vs déclaration manuelle)
* `@Controller` vs `@RestController` (rendu HTML vs JSON)
* Spring Boot vs Quarkus/Micronaut (même niche, philosophies différentes)

---

## Explication simplifiée

Spring Boot est une boîte à outils qui te permet de créer une application Java backend très rapidement. Tu ajoutes des dépendances, tu écris quelques annotations, et le framework s'occupe de toute la plomberie.

---

## Explication avancée

Spring Boot s'appuie sur le conteneur IoC (Inversion of Control) de Spring Framework avec un système d'auto-configuration basé sur les conditions (`@ConditionalOnClass`, `@ConditionalOnProperty`). Au démarrage, il scanne le classpath, détecte les bibliothèques présentes et configure automatiquement les beans correspondants. Le serveur servlet embarqué permet un déploiement en JAR exécutable sans serveur d'application externe.

---

## Points critiques à retenir

* [CRITIQUE] Spring Boot = Spring Framework + auto-configuration + serveur embarqué
* [CRITIQUE] L'injection de dépendances est le cœur du framework
* [IMPORTANT] Les Starters simplifient la gestion des dépendances
* [IMPORTANT] Spring Initializr pour démarrer un projet rapidement
* [PIÈGE] La "magie" de l'auto-configuration peut rendre le débogage difficile
* [PIÈGE] @Transactional ne fonctionne que sur les méthodes publiques appelées depuis l'extérieur du bean
