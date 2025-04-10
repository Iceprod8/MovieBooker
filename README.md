# 🎬 MovieBooker

**MovieBooker** est une application complète de réservation de films construite avec un backend Node.js (NestJS), une base de données PostgreSQL, et un frontend React avec Vite. Ce projet gère l'inscription, la connexion, la gestion des films, et les réservations, avec une interface simple et efficace.

🟢 **Frontend en ligne** : [https://moviebooker-1.onrender.com](https://moviebooker-1.onrender.com)  
🟢 **Backend en ligne** : [https://moviebooker-qfod.onrender.com](https://moviebooker-qfod.onrender.com)

---

## 🧠 Sommaire

- [Fonctionnalités principales](#fonctionnalités-principales)
- [🛣️ Routes Backend](#routes-backend)
- [🧪 Tests](#tests)
- [📦 Base de données](#base-de-données)
- [🚀 Lancer le projet avec Docker](#lancer-le-projet-avec-docker)
- [🧰 Ressources & Expérience](#ressources--expérience)

---

## Fonctionnalités principales

- Authentification : inscription, connexion
- Réservation de films
- Liste des films avec pagination
- Système de recherche
- Interface responsive
- Documentation Swagger pour le backend

---

## 🛣️ Routes Backend

Les principales routes disponibles dans le backend (NestJS) :

| Méthode | Route                   | Description               |
| ------- | ----------------------- | ------------------------- |
| POST    | `/auth/register`        | Inscription utilisateur   |
| POST    | `/auth/login`           | Connexion utilisateur     |
| GET     | `/movies`               | Liste paginée des films   |
| GET     | `/movies/:id`           | Détails d’un film         |
| GET     | `/reservation`          | Liste des réservations    |
| POST    | `/reservation/:movieId` | Réserver un film          |
| DELETE  | `/reservation/:id`      | Supprimer une réservation |

🔎 **Swagger disponible** : accédez à [http://localhost:3000/api](http://localhost:3000/api) ou à l’instance déployée : [https://moviebooker-qfod.onrender.com/api](https://moviebooker-qfod.onrender.com/api) pour tester toutes les routes backend via Swagger UI.

---

## 🧪 Tests

### Backend - Tests unitaires

✅ Tous les tests unitaires du backend passent avec succès.

Pour les exécuter :

```bash
cd backend
npm run test
```

---

### Frontend - Tests Cypress

✅ La majorité des tests Cypress passent. Certains échouent à cause de détails dans le rendu ou dans les attributs DOM, mais **l’ensemble des fonctionnalités sont bien opérationnelles**.

Pour exécuter Cypress :

```bash
cd frontend
npx cypress run
```

### Exemples de routes testables :

- `/register` – Crée un compte
- `/login` – Se connecter
- `/movies` – Voir les films
- `/movies/:id` – Voir les détails d’un film
- `/reservation` – Réserver un film

---

## 📦 Base de données

La base de données PostgreSQL contient les entités principales suivantes :

### 🧍‍♂️ `User`

```ts
@Entity("user")
export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  reservations: Reservation[];
}
```

### 🎟️ `Reservation`

```ts
@Entity("reservation")
export class Reservation {
  id: number;
  movieId: string;
  user: User;
  date: Date;
}
```

Chaque réservation est liée à un utilisateur et à un film.

---

## 🚀 Lancer le projet avec Docker

Tout est prévu pour être instancié avec Docker Compose.

### Étapes :

1. Lancer le projet :

```bash
docker-compose up --build
```

---

## 🧰 Ressources & Expérience

Ce projet a été développé avec une certaine expérience en backend et frontend. Les erreurs rencontrées (auth, routage, etc.) ont été résolues en s’appuyant sur :

- [StackOverflow](https://stackoverflow.com/)
- [NestJS documentation](https://docs.nestjs.com/)
- [React documentation](https://react.dev/)
- [Cypress documentation](https://docs.cypress.io/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
