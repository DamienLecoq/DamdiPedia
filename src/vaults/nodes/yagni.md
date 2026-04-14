---
id: yagni
label: YAGNI
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:28.618Z'
updatedAt: '2026-04-14T18:00:28.618Z'
relations:
  - targetId: kiss
    type: related
  - targetId: agile
    type: related
resources:
  - type: documentation
    title: Wikipedia – YAGNI
    url: 'https://fr.wikipedia.org/wiki/YAGNI'
  - type: blog
    title: Martin Fowler – Yagni
    url: 'https://martinfowler.com/bliki/Yagni.html'
  - type: vidéo
    title: CodeAesthetic – Don't Build It Yet
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  - type: blog
    title: Ron Jeffries – You're NOT Gonna Need It
    url: 'https://ronjeffries.com/xprog/articles/practices/pracnotneed/'
  - type: livre
    title: Extreme Programming Explained – Kent Beck
    url: 'https://www.amazon.com/dp/0321278658'
---

## Résumé rapide

YAGNI (You Aren't Gonna Need It) est un principe de développement issu de l'Extreme Programming qui interdit d'implémenter une fonctionnalité tant qu'elle n'est pas réellement nécessaire. Il lutte contre la tentation d'anticiper des besoins futurs hypothétiques.

---

## Définition

YAGNI signifie "You Aren't Gonna Need It" (Tu n'en auras pas besoin). Ce principe stipule qu'un développeur ne devrait pas ajouter de fonctionnalité, d'abstraction ou de code tant qu'il n'y a pas un besoin immédiat et concret pour celui-ci. Toute anticipation de besoins futurs est considérée comme du gaspillage.

---

## Histoire

* Formulé par Ron Jeffries dans le cadre de l'Extreme Programming (XP) à la fin des années 1990
* Découlé de la philosophie agile de développement itératif
* Popularisé par Kent Beck dans "Extreme Programming Explained" (1999)
* Complète les principes KISS et DRY dans la triade des principes de simplicité
* Repris dans toutes les méthodologies agiles modernes

---

## Objectif

* Éviter de développer des fonctionnalités inutiles
* Réduire le gaspillage de temps et de ressources
* Maintenir une base de code légère et compréhensible
* Favoriser un développement itératif et centré sur les besoins réels

---

## Domaines d'utilisation

* Développement logiciel agile
* Conception d'architecture et d'API
* Planification de sprints et de backlog
* Refactoring et simplification de code existant
* Choix de technologies et d'outils

---

## Fonctionnement

YAGNI s'applique au quotidien par une discipline de questionnement :

* **Avant d'ajouter du code** — "Ai-je besoin de ça maintenant, pour la user story en cours ?"
* **Avant d'ajouter une abstraction** — "Y a-t-il un deuxième cas d'usage concret aujourd'hui ?"
* **Avant de choisir une technologie** — "Est-ce que j'ai besoin de cette complexité maintenant ?"
* **Avant d'ajouter un paramètre** — "Est-ce que quelqu'un demande cette flexibilité ?"

---

## Concepts clés

* **Coût du développement prématuré** — Code à écrire, tester, maintenir et documenter pour rien
* **Coût du retard** — L'énergie dépensée sur du code inutile est perdue pour les vraies priorités
* **Coût de la complexité** — Chaque ligne de code ajoutée augmente la charge de maintenance
* **Itération** — Développer le minimum viable, puis itérer selon les retours
* **Last Responsible Moment** — Reporter une décision jusqu'au dernier moment raisonnable

---

## Exemple

```java
// ❌ Violation YAGNI : on anticipe des besoins futurs
interface MessageSender {
    void send(String message);
}

class EmailSender implements MessageSender {
    public void send(String message) { /* envoi email */ }
}

class SmsSender implements MessageSender {
    public void send(String message) { /* envoi SMS */ }
}

class PushNotificationSender implements MessageSender {
    public void send(String message) { /* envoi push */ }
}

class MessageFactory {
    static MessageSender create(String type) {
        // ... factory complexe alors qu'on n'utilise que l'email
    }
}

// ✅ YAGNI respecté : on ne code que le besoin actuel
class EmailSender {
    void send(String message) {
        // envoi email — simple et direct
    }
}
// On ajoutera SmsSender et l'interface QUAND on en aura besoin
```

---

## Avantages

* Réduction significative du code inutile
* Développement plus rapide car focalisé sur l'essentiel
* Base de code plus petite et plus facile à maintenir
* Moins de bugs (moins de code = moins de bugs)
* Meilleure allocation du temps de développement

---

## Inconvénients

* Peut mener à du refactoring fréquent quand les besoins évoluent
* Nécessite une bonne capacité de refactoring (tests, CI/CD)
* Mal compris, peut servir d'excuse pour ignorer la qualité architecturale
* Ne s'applique pas aux fondations critiques (sécurité, performances de base)

---

## Pièges courants

* Confondre YAGNI avec "ne jamais penser à l'avenir"
* Ignorer les besoins non fonctionnels évidents (sécurité, scalabilité de base)
* Utiliser YAGNI pour justifier du code de mauvaise qualité
* Appliquer YAGNI aux tests ("pas besoin de tests pour l'instant")
* Ne pas itérer après : YAGNI suppose qu'on refactorisera quand le besoin apparaîtra

---

## À ne pas confondre

* YAGNI vs architecture logicielle — YAGNI ne dit pas de ne pas concevoir, mais de ne pas anticiper
* YAGNI vs KISS — KISS concerne la manière de coder, YAGNI concerne quoi coder
* YAGNI vs lazy coding — YAGNI est un choix réfléchi, pas de la paresse
* YAGNI vs dette technique — Reporter un besoin réel crée de la dette, YAGNI élimine le superflu

---

## Explication simplifiée

YAGNI, c'est comme ne pas acheter un parapluie géant "au cas où il neigerait" alors qu'on est en été. En programmation, ne code pas une fonctionnalité "au cas où on en aurait besoin un jour". Développe ce qui est nécessaire maintenant, et ajoute le reste quand le besoin sera réel.

---

## Explication avancée

YAGNI repose sur une observation statistique : la majorité des fonctionnalités anticipées ne sont jamais utilisées ou le sont différemment de ce qui avait été prévu. Le coût total d'une fonctionnalité prématurée inclut : le temps de développement, le temps de test, la complexité ajoutée au système, le coût de maintenance, et le coût d'opportunité (ce qu'on aurait pu faire à la place). Martin Fowler distingue le "presumptive feature" (fonctionnalité présumée) du besoin réel validé. YAGNI fonctionne en synergie avec les pratiques agiles : petites itérations, feedback rapide, refactoring continu et tests automatisés.

---

## Points critiques à retenir

* [CRITIQUE] Ne jamais coder une fonctionnalité sans besoin immédiat et concret
* [CRITIQUE] YAGNI nécessite la capacité de refactoriser facilement (tests automatisés obligatoires)
* [IMPORTANT] YAGNI ne s'applique PAS aux fondations de sécurité et de qualité
* [IMPORTANT] La majorité des fonctionnalités anticipées ne sont jamais utilisées telles que prévues
* [PIÈGE] YAGNI n'est pas une excuse pour ignorer l'architecture — c'est un principe de priorisation
* [PIÈGE] Ne pas appliquer YAGNI aux tests ou à la qualité du code
