---
id: ansible
label: Ansible
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-13T12:21:19.796Z'
updatedAt: '2026-04-13T12:21:19.796Z'
relations:
  - target: python
    type: depends_on
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle Ansible
    url: 'https://docs.ansible.com/ansible/latest/'
  - type: vidéo
    title: Ansible Full Course – TechWorld with Nana
    url: 'https://www.youtube.com/watch?v=1id6ERvfozo'
  - type: cours
    title: Ansible for the Absolute Beginner – Udemy
    url: 'https://www.udemy.com/course/learn-ansible/'
  - type: blog
    title: Ansible Blog – Red Hat
    url: 'https://www.ansible.com/blog'
  - type: documentation
    title: Ansible Galaxy – Rôles communautaires
    url: 'https://galaxy.ansible.com/'
---

## Résumé rapide

Ansible est un outil d'automatisation IT open source qui permet de configurer des serveurs, déployer des applications et orchestrer des tâches complexes. Il se distingue par son architecture sans agent et ses playbooks écrits en YAML, simples à lire et à maintenir.

---

## Définition

Ansible est un outil d'automatisation open source développé par Red Hat qui permet la gestion de configuration, le déploiement d'applications et l'orchestration de tâches. Il fonctionne sans agent via SSH et utilise des fichiers YAML déclaratifs appelés playbooks.

---

## Histoire

* Créé par Michael DeHaan en 2012
* Racheté par Red Hat en 2015
* Nommé d'après un dispositif de communication instantanée de science-fiction
* Ansible Tower (AWX) ajouté pour l'interface web
* Ansible Automation Platform lancé pour les entreprises

---

## Objectif

* Automatiser la configuration des serveurs
* Simplifier le déploiement d'applications
* Orchestrer des workflows complexes multi-machines
* Permettre l'Infrastructure as Code sans agent

---

## Domaines d'utilisation

* Configuration et gestion de serveurs
* Déploiement d'applications
* Provisionnement d'infrastructure (en complément de Terraform)
* Gestion de la conformité et de la sécurité
* Orchestration de workflows multi-étapes

---

## Fonctionnement

* Connexion aux machines distantes via SSH (pas d'agent requis)
* Exécution de modules Python sur les machines cibles
* Inventaire des machines cibles (statique ou dynamique)
* Playbooks YAML décrivant les tâches à exécuter
* Exécution idempotente (relancer ne modifie pas l'état si déjà correct)

---

## Concepts clés

* Playbook : fichier YAML décrivant un ensemble de tâches
* Rôle : ensemble réutilisable de tâches, variables et fichiers
* Inventaire : liste des machines cibles et de leurs groupes
* Module : unité de travail (installer un paquet, copier un fichier, etc.)
* Facts : informations collectées automatiquement sur les machines cibles

---

## Exemple

```yaml
# playbook.yml - Installation et configuration de Nginx
---
- name: Configurer le serveur web
  hosts: webservers
  become: yes
  tasks:
    - name: Installer Nginx
      apt:
        name: nginx
        state: present
        update_cache: yes

    - name: Copier la configuration
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
      notify: Redémarrer Nginx

    - name: Démarrer Nginx
      service:
        name: nginx
        state: started
        enabled: yes

  handlers:
    - name: Redémarrer Nginx
      service:
        name: nginx
        state: restarted
```

```bash
ansible-playbook -i inventaire.ini playbook.yml
```

---

## Avantages

* Sans agent (utilise SSH)
* Syntaxe YAML simple et lisible
* Idempotent par défaut
* Grande bibliothèque de modules disponibles
* Courbe d'apprentissage relativement douce

---

## Inconvénients

* Performance limitée sur un grand nombre de machines
* Pas de gestion d'état (contrairement à Terraform)
* Débogage parfois difficile avec des playbooks complexes
* Dépendance à Python sur les machines cibles
* Gestion des secrets nécessite Ansible Vault

---

## Pièges courants

* Ne pas tester l'idempotence des playbooks
* Utiliser des commandes shell au lieu de modules Ansible dédiés
* Ne pas structurer le code en rôles réutilisables
* Oublier de chiffrer les secrets avec Ansible Vault
* Ignorer les facts et recoder la détection de l'OS

---

## À ne pas confondre

* Ansible vs Terraform : Ansible configure les serveurs, Terraform provisionne l'infrastructure
* Ansible vs Chef/Puppet : Ansible est sans agent, Chef/Puppet nécessitent un agent
* Playbook vs rôle : un playbook est un fichier de tâches, un rôle est un composant réutilisable
* Module vs plugin : un module s'exécute sur la cible, un plugin s'exécute sur le contrôleur

---

## Explication simplifiée

Ansible est comme une liste d'instructions qu'on donne à un assistant pour configurer des serveurs. On écrit ce qu'on veut dans un fichier simple (YAML), et Ansible se connecte aux serveurs via SSH pour tout installer et configurer automatiquement.

---

## Explication avancée

Ansible fonctionne selon un modèle push : le noeud de contrôle se connecte aux machines cibles via SSH (ou WinRM pour Windows), transfère les modules Python nécessaires, les exécute, puis récupère les résultats. Les playbooks sont compilés en tâches séquentielles avec collecte préalable des facts via le module setup. Les variables suivent un système de précédence à 22 niveaux. Les templates Jinja2 permettent la génération dynamique de fichiers de configuration. Les callbacks et les plugins de stratégie permettent de personnaliser le comportement d'exécution.

---

## Points critiques à retenir

* [CRITIQUE] Ansible est sans agent et fonctionne via SSH
* [CRITIQUE] Les playbooks sont idempotents : les relancer ne modifie rien si l'état est correct
* [IMPORTANT] Structurer le code en rôles pour la réutilisabilité
* [IMPORTANT] Utiliser Ansible Vault pour chiffrer les secrets
* [PIÈGE] Préférer les modules Ansible aux commandes shell brutes
* [PIÈGE] Toujours tester l'idempotence des playbooks
