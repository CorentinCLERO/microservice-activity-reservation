# Système de Réservation d'Activités - Architecture Microservices

## Description
Ce projet implémente un système de réservation d'activités basé sur une architecture microservices. Il se compose de trois services principaux :
- API Gateway : Point d'entrée unique pour toutes les requêtes clients
- Orchestrator : Gestion de la logique métier et coordination des services
- Notification Service : Gestion des notifications par email

## Structure du Projet
```
microservice-activity-reservation/
├── api-gateway/
│   ├── src/
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
├── orchestrator/
│   ├── src/
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
├── notification-service/
│   ├── src/
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Prérequis
- Node.js (v18 ou supérieur)
- Docker et Docker Compose
- Compte SMTP (Gmail ou autre service de messagerie)
- Git

## Installation

1. **Cloner le repository**
```bash
git clone https://github.com/CorentinCLERO/microservice-activity-reservation.git
cd microservice-activity-reservation
```

2. **Configuration des variables d'environnement**
Copier les fichiers .env.example et les renommer en .env dans chaque service :

Pour l'API Gateway (./api-gateway/.env) :
```
PORT=3000
JWT_SECRET=votre_secret_jwt
ORCHESTRATOR_URL=http://orchestrator:3004
```

Pour l'Orchestrator (./orchestrator/.env) :
```
PORT=3004
NOTIFICATION_SERVICE_URL=http://notification-service:3005
```

Pour le Service de Notification (./notification-service/.env) :
```
PORT=3005
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre.email@gmail.com
SMTP_PASS=votre_mot_de_passe_application
```

3. **Construction et démarrage des services**
```bash
docker compose up --build
```

## Configuration SMTP

### Gmail
1. Activer la validation en deux étapes sur votre compte Google
2. Générer un mot de passe d'application :
   - Accéder aux paramètres de sécurité du compte Google
   - Sélectionner "Mots de passe des applications"
   - Créer un nouveau mot de passe pour l'application
3. Utiliser ce mot de passe dans la variable SMTP_PASS

## Utilisation des Services

### API Gateway (Port 3000)
Gestion des Utilisateurs:
  - POST /api/users/register
Description : Inscription d'un nouvel utilisateur
Body : { "email": "string", "password": "string", "name": "string" }

  - POST /api/users/login
Description : Connexion utilisateur
Body : { "email": "string", "password": "string" }

  - GET /api/users/profile
Description : Récupération du profil utilisateur
Auth : Required (JWT Token)

  - PUT /api/users/profile
Description : Mise à jour du profil utilisateur
Auth : Required (JWT Token)
Body : { "name": "string", "email": "string" }

  - GET /api/users
Description : Liste des utilisateurs (Admin seulement)
Auth : Required (Admin JWT Token)

  - DELETE /api/users/:id
Description : Suppression d'un utilisateur (Admin seulement)
Auth : Required (Admin JWT Token)


Gestion des Activités:
  - GET /api/activities
Description : Liste de toutes les activités
Auth : Not Required

  - GET /api/activities/:id
Description : Détails d'une activité spécifique
Auth : Not Required

  - POST /api/activities
Description : Création d'une activité (Admin seulement)
Auth : Required (Admin JWT Token)
Body : { "name": "string", "description": "string", "price": number }

  - PUT /api/activities/:id
Description : Mise à jour d'une activité (Admin seulement)
Auth : Required (Admin JWT Token)
Body : { "name": "string", "description": "string", "price": number }

  - DELETE /api/activities/:id
Description : Suppression d'une activité (Admin seulement)
Auth : Required (Admin JWT Token)


Gestion des Réservations:
  - POST /api/orchestrate-reservation
Description : Création d'une réservation
Auth : Required (JWT Token)
Body : { "activityId": "string", "date": "string" }


### Orchestrator (Port 3004)
Gère la logique métier et coordonne les services.

### Service de Notification (Port 3005)
Gère l'envoi des emails de confirmation et notifications.

## Logs et Monitoring
- Les logs du service de notification sont persistés dans un volume Docker
- Healthcheck configuré pour le service de notification
- Accès aux logs : `docker compose logs [service-name]`

## Dépannage

### Problèmes courants
1. **Erreur de port déjà utilisé**
```bash
docker compose down
docker compose up --build
```

2. **Erreur d'authentification SMTP**
- Vérifier les identifiants SMTP
- S'assurer que le mot de passe d'application est correct
- Vérifier la connexion réseau

3. **Services inaccessibles**
- Vérifier que tous les services sont en cours d'exécution : `docker compose ps`
- Vérifier les logs : `docker compose logs`

## Développement

### Tests locaux
Pour exécuter un service individuellement :
```bash
cd [service-directory]
npm install
npm run dev
```

### Reconstruction des services
```bash
docker compose build [service-name]
docker compose up -d
```

## Sécurité
- Utilisation de JWT pour l'authentification
- Variables d'environnement pour les informations sensibles
- CORS configuré dans l'API Gateway
- Helmet pour la sécurité des headers HTTP
