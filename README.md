#  HNG Stage 0 Backend Task

A simple **Node.js + Express** backend service that exposes two endpoints:  
- `/` → Returns a basic status message  
- `/me` → Fetches a random cat fact from an external API and returns user info along with it.  

This project demonstrates clean backend structure, API fetching, error handling, environment variables, and adherence to best practices.

---

##  Features

- Fetches a new cat fact on every `/me` request  
- Handles API timeouts and network errors gracefully  
- Returns proper HTTP status codes (`200` / `502`)  
- Uses environment variables for configuration  
- Includes basic logging and optional CORS support  
- Easily extensible for deployment

---

## Tech Stack

- **Node.js** (v18+)
- **Express.js**
- **Dotenv**
- **CORS**
- *(Optional)* `express-rate-limit` for rate limiting

---

##  Setup Instructions

### 1️ Clone the repository

```bash
git clone https://github.com/guardianprime/profile-information-endpoint.git
cd profile-information-endpoint
```

### 2️ Install dependencies

```bash
npm install
```

### 3️ Create a `.env` file in the root directory

```env
PORT=3000
CAT_API_URL=https://catfact.ninja/fact
```

### 4️ Start the server

```bash
npm start
# or
node index.js
```

---

## API Endpoints

### `GET /`
Returns a basic status message.

### `GET /me`
Fetches a random cat fact and returns user information.

---

## Author

**Gordian Okon**  
Backend Developer | Node.js Enthusiast
