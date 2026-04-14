---
id: android-studio
label: Android Studio
category: logiciel
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:57:56.951Z'
updatedAt: '2026-04-14T17:57:56.951Z'
relations:
  - targetId: kotlin
    type: supports
    description: Langage officiel recommandé pour le développement Android
  - targetId: java
    type: supports
    description: Langage historique du développement Android
resources:
  - type: documentation
    title: Documentation officielle Android Studio
    url: 'https://developer.android.com/studio'
  - type: vidéo
    title: Android Developers – Getting Started
    url: 'https://developer.android.com/courses'
  - type: blog
    title: Android Developers Blog
    url: 'https://android-developers.googleblog.com/'
  - type: cours
    title: Google – Android Basics with Compose
    url: 'https://developer.android.com/courses/android-basics-compose/course'
  - type: documentation
    title: Android Studio User Guide
    url: 'https://developer.android.com/studio/intro'
---

## Résumé rapide

Android Studio est l'IDE officiel de Google pour le développement d'applications Android. Basé sur IntelliJ IDEA, il offre un éditeur de layout visuel, un émulateur Android intégré, un profilage de performances et le support complet de Kotlin et Jetpack Compose.

---

## Définition

Android Studio est un environnement de développement intégré basé sur la plateforme IntelliJ IDEA de JetBrains, spécialisé dans la création d'applications Android. Il intègre le SDK Android, un émulateur, un éditeur de mise en page, des outils de profilage et le système de build Gradle.

---

## Histoire

* Annoncé par Google lors de la Google I/O en mai 2013
* Basé sur IntelliJ IDEA Community Edition
* Remplace Eclipse + ADT comme IDE officiel Android en 2014
* Kotlin devenu langage officiel Android en 2017
* Jetpack Compose (UI déclarative) introduit en 2021

---

## Objectif

* Fournir l'IDE officiel et complet pour le développement Android
* Supporter Kotlin et Jetpack Compose comme standards modernes
* Intégrer tous les outils de développement, test et profilage Android
* Faciliter le développement sur la diversité des appareils Android

---

## Domaines d'utilisation

* Développement d'applications Android natives
* Développement multiplateforme avec Kotlin Multiplatform
* Développement de Wear OS, Android TV et Android Auto
* Développement de bibliothèques et SDK Android

---

## Fonctionnement

* Basé sur **IntelliJ IDEA** : mêmes fonctionnalités de refactoring et navigation
* **Gradle** comme système de build pour la compilation, le packaging et la signature
* **Émulateur AVD** (Android Virtual Device) pour tester sur différentes versions et tailles d'écran
* **Layout Editor** / **Compose Preview** : construction visuelle de l'interface
* **App Inspection** : inspection de la base de données, du réseau et du layout en temps réel

---

## Concepts clés

* **Activity / Fragment** — Composants de base d'une application Android (architecture classique)
* **Jetpack Compose** — Framework UI déclaratif moderne (remplace les layouts XML)
* **Gradle** — Système de build avec les fichiers `build.gradle.kts`
* **AVD (Android Virtual Device)** — Émulateur pour tester sur différents appareils
* **APK / AAB** — Formats de package pour la distribution (AAB pour le Play Store)
* **Logcat** — Journal de logs de l'appareil/émulateur pour le débogage

---

## Exemple

```kotlin
// Application Jetpack Compose minimale
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Greeting("Android")
            }
        }
    }
}

@Composable
fun Greeting(name: String) {
    var count by remember { mutableStateOf(0) }
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Bonjour $name !", style = MaterialTheme.typography.headlineMedium)
        Button(onClick = { count++ }) {
            Text("Cliqué $count fois")
        }
    }
}
```

---

## Avantages

* IDE officiel de Google pour Android, toujours à jour
* Basé sur IntelliJ : refactoring et analyse de code puissants
* Émulateur intégré avec Google Play Services
* Support complet de Kotlin et Jetpack Compose
* Outils de profilage (CPU, mémoire, réseau, batterie) intégrés

---

## Inconvénients

* Très gourmand en ressources (RAM, CPU, espace disque)
* Builds Gradle lents, surtout sur les gros projets
* Mises à jour fréquentes qui peuvent casser la configuration
* L'émulateur nécessite la virtualisation matérielle (HAXM/KVM)

---

## Pièges courants

* Ne pas activer la virtualisation matérielle → émulateur extrêmement lent
* Ignorer les migrations Gradle lors des mises à jour d'Android Studio
* Ne pas tester sur plusieurs tailles d'écran et versions d'Android
* Confondre les fichiers `build.gradle` au niveau projet et au niveau module

---

## À ne pas confondre

* Android Studio vs IntelliJ IDEA (spécialisé Android vs généraliste JVM)
* APK vs AAB (package direct vs bundle pour le Play Store)
* View system (XML) vs Jetpack Compose (impératif vs déclaratif)
* SDK Android vs NDK (Java/Kotlin vs code natif C/C++)

---

## Explication simplifiée

Android Studio c'est l'atelier officiel de Google pour créer des applications Android. Tu écris le code en Kotlin, tu dessines l'interface, tu testes sur un téléphone virtuel intégré et tu publies sur le Play Store. C'est comme Xcode, mais pour Android.

---

## Explication avancée

Android Studio est construit sur IntelliJ IDEA Platform et étend ses fonctionnalités avec le plugin Android. Le système de build utilise Gradle avec le Android Gradle Plugin (AGP) qui gère la compilation, le minification (R8/ProGuard), le packaging en APK/AAB et la signature. L'émulateur utilise QEMU avec accélération matérielle (HAXM sur Intel, Hypervisor Framework sur macOS, KVM sur Linux) pour émuler les processeurs ARM sur x86. Jetpack Compose utilise un compilateur Kotlin spécialisé qui transforme les fonctions @Composable en un arbre de nœuds UI avec recomposition intelligente.

---

## Points critiques à retenir

* [CRITIQUE] Android Studio est obligatoire pour le développement Android professionnel
* [CRITIQUE] Kotlin + Jetpack Compose sont les standards modernes recommandés par Google
* [IMPORTANT] Activer la virtualisation matérielle pour des performances d'émulateur acceptables
* [IMPORTANT] Comprendre Gradle est essentiel pour gérer les dépendances et le build
* [PIÈGE] Les builds Gradle lents sont souvent dus à des dépendances non optimisées
* [PIÈGE] Toujours tester sur plusieurs versions d'Android (fragmentation)
