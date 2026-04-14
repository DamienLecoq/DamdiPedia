---
id: tls-ssl
label: TLS/SSL
category: protocole
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:19.618Z'
updatedAt: '2026-04-14T18:00:19.618Z'
relations:
  - target: tcp-ip
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: RFC 8446 – TLS 1.3
    url: 'https://www.rfc-editor.org/rfc/rfc8446'
  - type: blog
    title: Cloudflare – A Detailed Look at TLS
    url: 'https://blog.cloudflare.com/a-detailed-look-at-rfc-8446-a-k-a-tls-1-3/'
  - type: cours
    title: Let's Encrypt – How it Works
    url: 'https://letsencrypt.org/how-it-works/'
---

## Résumé rapide

TLS (Transport Layer Security), successeur de SSL, est le protocole cryptographique qui sécurise les communications Internet en assurant confidentialité, intégrité et authentification via certificats X.509.

---

## Définition

TLS est un protocole de sécurité qui s'intercale entre TCP et les protocoles applicatifs (HTTP, SMTP, etc.) pour chiffrer les données, vérifier l'identité des serveurs via certificats et garantir l'intégrité des messages échangés.

---

## Histoire

* SSL 2.0 créé par Netscape en 1995
* SSL 3.0 en 1996, renommé TLS 1.0 en 1999 (RFC 2246)
* TLS 1.2 en 2008, TLS 1.3 en 2018 (RFC 8446)
* SSL complètement déprécié (POODLE, BEAST)
* Let's Encrypt démocratise les certificats en 2015

---

## Objectif

* Chiffrer les communications en transit
* Authentifier le serveur (et optionnellement le client)
* Garantir l'intégrité des données
* Protéger contre les attaques man-in-the-middle

---

## Domaines d'utilisation

* HTTPS (HTTP sécurisé)
* Email chiffré (STARTTLS)
* VPN (OpenVPN)
* Services internes (mTLS)
* MQTT et IoT sécurisés

---

## Fonctionnement

* **Handshake** — Négocie les paramètres cryptographiques
* **Certificat X.509** — Prouve l'identité via chaîne de confiance
* **Key Exchange** — ECDHE pour forward secrecy
* **Symmetric Encryption** — AES-GCM pour les données
* **MAC / AEAD** — Intégrité des messages

---

## Concepts clés

* **Certificat X.509** — Clé publique signée par une CA
* **CA** — Autorité de certification
* **CSR** — Certificate Signing Request
* **SNI** — Server Name Indication (multi-sites sur 1 IP)
* **Forward Secrecy** — Compromission future ≠ passé
* **mTLS** — Authentification client + serveur

---

## Exemple

```bash
# Générer une clé privée et un CSR
openssl req -new -newkey rsa:4096 -nodes \
  -keyout server.key -out server.csr \
  -subj "/CN=example.com"

# Tester un endpoint TLS
openssl s_client -connect example.com:443 -servername example.com

# Vérifier un certificat
openssl x509 -in cert.pem -text -noout
```

---

## Avantages

* Sécurité en transit standard
* Déploiement gratuit via Let's Encrypt
* TLS 1.3 réduit la latence (1-RTT handshake)
* Forward secrecy par défaut
* Largement supporté

---

## Inconvénients

* Overhead CPU (négligeable avec AES-NI)
* Gestion des certificats (expiration, rotation)
* Complexité de configuration (ciphers, versions)
* Révocation imparfaite (CRL, OCSP stapling)

---

## Pièges courants

* Certificats expirés (automatiser le renouvellement)
* Utiliser des ciphers obsolètes (RC4, 3DES)
* Valider uniquement le CN et pas les SAN
* Ignorer la vérification du certificat en dev puis en prod

---

## À ne pas confondre

* TLS vs SSL (TLS = successeur, SSL déprécié)
* TLS vs HTTPS (TLS = protocole, HTTPS = HTTP+TLS)
* mTLS vs TLS classique (client auth ou non)

---

## Explication simplifiée

TLS c'est l'enveloppe scellée de tes communications Internet. Quand tu vois le cadenas dans ton navigateur, ça veut dire que personne ne peut lire ce que tu envoies à ta banque, et que tu es bien sur le vrai site et pas un imitateur.

---

## Explication avancée

TLS 1.3 simplifie le handshake à 1 RTT (0 RTT en session resumption) en éliminant les ciphers obsolètes et en combinant plusieurs étapes. L'ECDHE génère une clé éphémère assurant la forward secrecy : même si la clé privée du serveur est compromise, les anciennes sessions restent sécurisées. AEAD (AES-GCM, ChaCha20-Poly1305) combine chiffrement et intégrité. La vérification du certificat suit une chaîne jusqu'à une CA racine préinstallée (trust store).

---

## Points critiques à retenir

* [CRITIQUE] SSL est déprécié, utiliser TLS 1.2 minimum (1.3 idéalement)
* [CRITIQUE] Automatiser le renouvellement (Let's Encrypt + certbot)
* [IMPORTANT] Désactiver les ciphers faibles
* [IMPORTANT] HSTS pour forcer HTTPS
* [PIÈGE] Ne jamais désactiver la vérification en prod
