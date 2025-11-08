# 🏆 Live Scoreboard Backend Module

## 📘 Overview

This backend module powers a **real-time scoreboard** system that displays the **top 10 users** based on their scores. It supports **live updates**, **secure score modifications**, and **optimized leaderboard performance** for a seamless user experience.

---

## ⚙️ Software Requirements

### 1. Scoreboard Display
- The system provides a **scoreboard endpoint** that retrieves the **top 10 users** with the highest scores.
- Assuming data includes:
  - `user_id`
  - `username`
  - `score`
  - `rank`
- Scores are ordered in **descending** order.

### 2. Live Scoreboard Updates
- The scoreboard updates **in real-time** whenever a user's score changes.
- Supported methods:
  - **WebSockets** for instant client updates.
  - **Server-Sent Events (SSE)** as an alternative for lightweight streaming.

### 3. Score Update Mechanism
- Users perform an **action**.
- Upon completion, the client triggers an **authenticated API call**:

```POST /api/score/increase```

with payload:
```json
{
  "user_id": "uuid",
  "increment": 10
}
```
- The backend securely validates and updates the score.

### 4. Security & Authorization
To prevent unauthorized score increases, multiple layers of protection should be implemented:

#### a. Authentication
Each request must include a valid JWT access token in the Authorization header:
```
Authorization: Bearer <token>
```
The token ensures the user is authenticated and authorized to modify their own score.

#### b. Server-Side Validation
The backend ignores any client-submitted ```user_id``` but determines the user from the authenticated session or token payload.

#### c. Rate Limiting
To mitigate brute-force or spam attacks, each user is limited to a maximum number of score updates per time window.

## 🧩 API Specification
- ```GET /api/scoreboard```

Description: Retrieve the top 10 users by score.

Response:
```json
[
  {
    "rank": 1,
    "user_id": "uuid",
    "username": "PlayerOne",
    "score": 1250
  },
  ...
]
```

- ```POST /api/score/increase```

Description: Securely increase the authenticated user’s score after a verified action.

Headers:
```
Authorization: Bearer <JWT>
Content-Type: application/json
```
Request Body:
```json
{
  "increment": 10
}
```

Response:
```json
{
  "message": "Score updated successfully",
  "newScore": 1260
}
```

Errors:

- ```401 Unauthorized``` — Invalid or missing JWT token.

- ```429 Too Many Requests``` — Rate limit exceeded.

- ```400 Bad Request``` — Invalid payload or unverified action.

## ⚡ Real-Time Updates

### WebSocket Channel

- Clients subscribe to the ```/scoreboard``` channel.

- When a user’s score changes:

    - The backend emits an update event with the refreshed top 10 leaderboard.

Example message:
```json
{
  "type": "scoreboard_update",
  "data": [
    { "rank": 1, "username": "PlayerOne", "score": 1300 },
    { "rank": 2, "username": "PlayerTwo", "score": 1200 }
  ]
}
```

## 🚀 Future Enhancements
- Add persistent WebSocket rooms per user for targeted notifications.

- Use a message queue (e.g., RabbitMQ or Kafka) for scalable score update broadcasting.

- Integrate audit logs for score changes.

## Execution flow
See in attached workflow diagram.