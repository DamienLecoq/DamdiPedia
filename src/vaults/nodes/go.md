---
id: go
label: Go
category: langage
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:45.130Z'
updatedAt: '2026-04-14T17:58:45.130Z'
relations:
  - target: docker
    type: related
    weight: 0.8
  - target: kubernetes
    type: related
    weight: 0.8
resources:
  - type: documentation
    title: A Tour of Go
    url: 'https://go.dev/tour/'
  - type: documentation
    title: Go Documentation officielle
    url: 'https://go.dev/doc/'
  - type: vidéo
    title: freeCodeCamp – Learn Go Programming
    url: 'https://www.youtube.com/watch?v=YS4e4q9oBaU'
  - type: livre
    title: The Go Programming Language – Donovan & Kernighan
    url: 'https://www.gopl.io/'
---

## Résumé rapide

Go (Golang) est un langage compilé créé par Google, conçu pour la simplicité, la concurrence et la performance. Il est particulièrement populaire pour les services backend, le cloud natif et les outils CLI.

---

## Définition

Go est un langage compilé, statiquement typé, avec un garbage collector, conçu pour être simple à apprendre, rapide à compiler et efficace en production. Il intègre nativement la concurrence via les goroutines et les channels.

---

## Histoire

* Créé par Rob Pike, Ken Thompson et Robert Griesemer chez Google en 2007
* Publié en open-source en 2009
* Version 1.0 sortie en 2012
* Utilisé pour Docker, Kubernetes, Terraform, Prometheus
* Generics ajoutés en 2022 (Go 1.18)

---

## Objectif

* Simplifier le développement de services scalables
* Réduire les temps de compilation vs C++
* Offrir une concurrence native et légère
* Produire des binaires statiques autonomes

---

## Domaines d'utilisation

* Microservices et API backend
* Outils cloud-native (Docker, Kubernetes)
* CLI et DevOps tooling
* Proxy, load balancers, bases de données

---

## Fonctionnement

* Compilation AOT vers binaire natif autonome
* Garbage collector concurrent à faible latence
* Goroutines multiplexées sur threads OS (M:N scheduler)
* Channels pour communication entre goroutines
* Interfaces implicites (duck typing statique)

---

## Concepts clés

* **Goroutine** — Thread léger managé par le runtime Go
* **Channel** — Canal typé pour communication entre goroutines
* **Interface** — Contrat implicite, satisfait automatiquement
* **Struct** — Type composite, pas de classes
* **defer** — Exécution différée à la sortie de fonction
* **go mod** — Système de modules pour gestion de dépendances

---

## Exemple

```go
package main

import "fmt"

func main() {
    ch := make(chan int)

    go func() {
        ch <- 42
    }()

    value := <-ch
    fmt.Println("Reçu:", value)
}
```

---

## Avantages

* Simplicité et lisibilité du code
* Compilation extrêmement rapide
* Concurrence native et performante
* Binaires statiques faciles à déployer
* Écosystème cloud-native riche

---

## Inconvénients

* Pas d'exceptions (gestion d'erreurs verbeuse)
* Pas d'héritage ni de génériques avant 1.18
* GC peut causer des pauses (quoique courtes)
* Moins expressif que Rust ou Python

---

## Pièges courants

* Oublier de vérifier les erreurs retournées
* Goroutine leaks (channel jamais fermé)
* Race conditions sans utiliser les channels
* Mauvaise utilisation de `defer` dans une boucle

---

## À ne pas confondre

* Go vs Rust (GC vs ownership, simplicité vs sécurité stricte)
* Go vs Java (compilé natif vs JVM)
* Goroutine vs Thread OS (légère, multiplexée)

---

## Explication simplifiée

Go c'est un langage volontairement simple : peu de mots-clés, pas de classes, pas d'héritage compliqué. Il excelle à gérer des milliers de connexions en parallèle grâce à ses goroutines, ce qui en fait le langage de prédilection pour Docker et Kubernetes.

---

## Explication avancée

Go utilise un scheduler M:N qui multiplexe des milliers de goroutines sur un nombre limité de threads OS. Chaque goroutine démarre avec une stack de 2 KB qui grandit dynamiquement. Les channels implémentent le modèle CSP (Communicating Sequential Processes) de Hoare. Le garbage collector tri-color mark-sweep vise des pauses sub-milliseconde.

---

## Points critiques à retenir

* [CRITIQUE] Toujours vérifier les erreurs retournées (`if err != nil`)
* [CRITIQUE] Communiquer via channels, pas via mémoire partagée
* [IMPORTANT] Les goroutines sont légères mais pas gratuites
* [IMPORTANT] `go mod` pour la gestion des dépendances
* [PIÈGE] `defer` dans une boucle accumule les différés
