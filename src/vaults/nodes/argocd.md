---
id: argocd
label: ArgoCD
category: logiciel
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:03.477Z'
updatedAt: '2026-04-14T17:58:03.477Z'
relations:
  - target: kubernetes
    type: related
    weight: 0.9
  - target: helm
    type: related
    weight: 0.6
resources:
  - type: documentation
    title: Argo CD Documentation
    url: 'https://argo-cd.readthedocs.io/'
  - type: vidéo
    title: ArgoCD Tutorial – TechWorld with Nana
    url: 'https://www.youtube.com/watch?v=MeU5_k9ssrs'
  - type: blog
    title: GitOps with ArgoCD
    url: 'https://www.weave.works/technologies/gitops/'
---

## Résumé rapide

ArgoCD est un outil GitOps open-source pour Kubernetes qui synchronise en continu l'état d'un cluster avec des manifestes versionnés dans Git, assurant déclarativité et traçabilité totale.

---

## Définition

ArgoCD est un contrôleur Kubernetes qui lit un dépôt Git contenant des manifestes (YAML, Helm, Kustomize) et applique les changements au cluster, alertant en cas de dérive (drift) et permettant le rollback à n'importe quel commit.

---

## Histoire

* Créé par Intuit en 2018
* Rejoint la CNCF en 2020, graduated en 2022
* Devient la référence GitOps pour Kubernetes
* Intégré dans Argo Workflows, Argo Rollouts
* Concurrencé par Flux CD

---

## Objectif

* Déployer déclarativement sur Kubernetes
* Traiter Git comme source de vérité unique
* Détecter et corriger la dérive de configuration
* Faciliter le rollback via l'historique Git
* Supporter plusieurs environnements et clusters

---

## Domaines d'utilisation

* Déploiements Kubernetes production
* Multi-cluster et multi-tenant
* Progressive delivery (avec Argo Rollouts)
* Infrastructure as Code
* Compliance et audit

---

## Fonctionnement

* Controller Kubernetes observant des "Applications"
* Chaque Application référence un repo Git + path
* Supporte YAML plain, Helm, Kustomize, Jsonnet
* Sync automatique ou manuel
* Drift detection et self-healing

---

## Concepts clés

* **Application** — CRD liant Git → namespace
* **AppProject** — Groupement et permissions
* **Sync Policy** — Automatic ou manual
* **Prune** — Supprime les ressources retirées du Git
* **Self-heal** — Corrige les modifications manuelles
* **ApplicationSet** — Génère des apps en batch

---

## Exemple

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: api
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/org/k8s-manifests
    targetRevision: main
    path: apps/api/prod
  destination:
    server: https://kubernetes.default.svc
    namespace: api-prod
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

---

## Avantages

* Source de vérité unique (Git)
* Traçabilité totale des changements
* Rollback via revert Git
* Visualisation graphique des ressources
* Drift detection
* Multi-cluster et multi-tenant

---

## Inconvénients

* Courbe d'apprentissage (GitOps mindset)
* Complexité opérationnelle d'ArgoCD lui-même
* Secrets dans Git = à chiffrer (Sealed Secrets, SOPS)
* Overhead pour petits clusters
* Debugging via CRDs parfois obscur

---

## Pièges courants

* Commit direct sur le cluster (ignoré par ArgoCD si self-heal)
* Secrets en clair dans Git
* Apps avec sync manuel jamais sync
* Circular dependencies entre apps
* Prune sans revue = suppression accidentelle

---

## À ne pas confondre

* ArgoCD vs Flux (outils GitOps concurrents)
* GitOps vs CIOps (pull vs push)
* Argo CD vs Argo Workflows (déploiement vs batch jobs)

---

## Explication simplifiée

ArgoCD fait du "déploiement par Git" : tu modifies un fichier YAML dans ton repo, ArgoCD le voit, et il met à jour ton cluster Kubernetes tout seul pour correspondre. Si quelqu'un change quelque chose à la main sur le cluster, ArgoCD peut le remettre comme dans Git.

---

## Explication avancée

ArgoCD implémente le modèle GitOps "pull" : le contrôleur dans le cluster cible tire les manifestes de Git, inversant le modèle "push" traditionnel (CI qui pousse vers le cluster). Cela améliore la sécurité (cluster n'a pas besoin d'être exposé au CI) et la cohérence (drift detection continue). Les ApplicationSets génèrent dynamiquement des Applications via des générateurs (list, cluster, git, pull request), idéal pour multi-env et multi-cluster. Argo Rollouts complémente pour les blue/green et canary deployments progressifs.

---

## Points critiques à retenir

* [CRITIQUE] Ne jamais commiter de secrets en clair
* [CRITIQUE] Git = source de vérité, pas de modifs manuelles
* [IMPORTANT] Self-heal + prune = état toujours conforme
* [IMPORTANT] ApplicationSet pour multi-env
* [PIÈGE] Auto-sync + mauvaise PR = prod cassée immédiatement
