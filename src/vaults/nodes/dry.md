---
id: dry
label: DRY
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:30.210Z'
updatedAt: '2026-04-14T17:58:30.210Z'
relations:
  - targetId: solid
    type: related
resources:
  - type: documentation
    title: Wikipedia – Don't Repeat Yourself
    url: 'https://fr.wikipedia.org/wiki/Ne_vous_r%C3%A9p%C3%A9tez_pas'
  - type: vidéo
    title: Fireship – DRY Programming
    url: 'https://www.youtube.com/watch?v=SaLgnEuHdlQ'
  - type: blog
    title: The Pragmatic Programmer – DRY Principle
    url: 'https://pragprog.com/tips/'
  - type: blog
    title: Baeldung – DRY Principle in Java
    url: 'https://www.baeldung.com/java-dry-principle'
  - type: livre
    title: The Pragmatic Programmer – Hunt & Thomas
    url: 'https://www.amazon.com/dp/0135957052'
---

## Résumé rapide

DRY (Don't Repeat Yourself) est un principe fondamental de développement logiciel qui stipule que chaque élément de connaissance doit avoir une représentation unique, non ambiguë et faisant autorité au sein d'un système. Il vise à éliminer la duplication de logique et de code.

---

## Définition

DRY signifie "Don't Repeat Yourself" (Ne vous répétez pas). Ce principe stipule que chaque morceau de connaissance ou de logique dans un système doit exister en un seul et unique endroit. La duplication de code n'est qu'un symptôme — le vrai enjeu est la duplication de connaissances.

---

## Histoire

* Formulé par Andrew Hunt et David Thomas dans "The Pragmatic Programmer" (1999)
* Inspiré par des pratiques antérieures de normalisation en bases de données
* Devenu un acronyme incontournable du développement logiciel
* Souvent enseigné comme le premier réflexe de tout bon développeur
* Complété par le principe WET (Write Everything Twice) comme anti-pattern

---

## Objectif

* Réduire la duplication de logique métier dans le code
* Faciliter la maintenance en centralisant les modifications
* Diminuer le risque de bugs liés à des copies obsolètes
* Améliorer la lisibilité et la cohérence du code

---

## Domaines d'utilisation

* Développement logiciel en général (tous langages)
* Conception de bases de données (normalisation)
* Configuration d'infrastructure (templates, variables partagées)
* Rédaction de documentation technique
* Tests automatisés (factorisation des fixtures)

---

## Fonctionnement

Le principe DRY s'applique à plusieurs niveaux :

* **Code** — Extraire les blocs dupliqués en fonctions, méthodes ou classes
* **Données** — Normaliser les bases de données pour éviter la redondance
* **Configuration** — Centraliser les constantes et paramètres
* **Logique** — Abstraire les algorithmes communs en modules réutilisables
* **Documentation** — Générer la documentation à partir du code quand c'est possible

---

## Concepts clés

* **Duplication de connaissance** — La vraie cible de DRY : deux endroits qui expriment la même règle métier
* **Duplication accidentelle** — Du code qui se ressemble mais qui représente des concepts différents (ne pas factoriser !)
* **Abstraction** — Le mécanisme principal pour éliminer la duplication
* **Single Source of Truth** — Chaque information a une seule source de vérité
* **WET (Write Everything Twice)** — L'anti-pattern opposé à DRY

---

## Exemple

```java
// ❌ Violation DRY : logique de validation dupliquée
class UserService {
    void createUser(String email) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Email invalide");
        }
        // ...
    }

    void updateEmail(String email) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Email invalide");
        }
        // ...
    }
}

// ✅ DRY respecté : logique centralisée
class EmailValidator {
    static void validate(String email) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Email invalide");
        }
    }
}

class UserService {
    void createUser(String email) {
        EmailValidator.validate(email);
        // ...
    }

    void updateEmail(String email) {
        EmailValidator.validate(email);
        // ...
    }
}
```

---

## Avantages

* Maintenance simplifiée : un seul endroit à modifier
* Réduction des bugs liés aux copies oubliées
* Code plus lisible et plus concis
* Encourage la création d'abstractions utiles
* Facilite les tests unitaires (une seule logique à tester)

---

## Inconvénients

* Risque de sur-abstraction prématurée
* Peut créer du couplage entre des modules qui ne devraient pas être liés
* L'abstraction forcée peut rendre le code plus difficile à comprendre
* Parfois, un peu de duplication est préférable à une mauvaise abstraction

---

## Pièges courants

* Confondre duplication accidentelle et duplication de connaissance
* Factoriser trop tôt avant de comprendre les vrais patterns
* Créer des fonctions "fourre-tout" avec trop de paramètres pour gérer tous les cas
* Appliquer DRY à la documentation au point de la rendre illisible
* Oublier que "la mauvaise abstraction coûte plus cher que la duplication"

---

## À ne pas confondre

* DRY vs KISS — DRY élimine la duplication, KISS prône la simplicité
* DRY vs normalisation — DRY est un principe de code, la normalisation concerne les données
* Duplication de code vs duplication de connaissance — Seule la seconde viole DRY
* DRY vs réutilisabilité — DRY est une conséquence, pas un objectif en soi

---

## Explication simplifiée

DRY, c'est comme avoir un seul carnet d'adresses plutôt que dix copies partout dans la maison. Si un numéro change, tu ne le modifies qu'une fois. En programmation, si tu copies-colles du code, c'est un signal d'alerte : il faut centraliser cette logique dans une seule fonction ou classe.

---

## Explication avancée

DRY, tel que défini par Hunt et Thomas, va au-delà de la simple factorisation de code. Il concerne toute forme de duplication de connaissance : schémas de base, règles métier, configurations, documentation. L'objectif est qu'une modification d'une règle métier ne nécessite qu'un changement à un seul endroit. Cependant, il faut distinguer la duplication réelle (même concept, même raison de changer) de la duplication apparente (code similaire mais raisons de changer différentes). Sandi Metz résume bien : "duplication is far cheaper than the wrong abstraction."

---

## Points critiques à retenir

* [CRITIQUE] DRY concerne la duplication de connaissances, pas juste la duplication de code
* [CRITIQUE] Ne jamais factoriser de la duplication accidentelle — si les raisons de changer sont différentes, c'est normal
* [IMPORTANT] La règle des 3 : dupliquer une fois est acceptable, à la troisième occurrence on factorise
* [IMPORTANT] Une mauvaise abstraction est pire que la duplication
* [PIÈGE] Factoriser trop tôt mène à du couplage artificiel entre modules indépendants
* [PIÈGE] DRY appliqué dogmatiquement peut violer KISS et créer de la complexité inutile
