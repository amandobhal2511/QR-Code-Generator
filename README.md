# QR.Gen — QR Code Generator

A simple, fast, and clean QR Code Generator built using **HTML, Tailwind CSS, JavaScript, Node.js, Express.js, PostgreSQL, Docker, and Drizzle ORM**.

QR.Gen allows users to generate downloadable QR codes from any URL or text. Generated QR codes are stored in PostgreSQL, and duplicate content is detected using SHA-256 hashing so that an existing QR code can be reused instead of generating and storing it again.

---

## ✨ Features

- Generate QR codes from URLs or plain text
- Download generated QR codes as PNG
- Clean and responsive user interface
- Input validation
- PostgreSQL database integration
- SHA-256 based duplicate detection
- Reuses previously generated QR codes
- Drizzle ORM for database operations
- PostgreSQL running locally using Docker
- REST API built with Express.js

---

## 🖥️ Preview

> A live demo will be added after deployment.

<!-- Add a screenshot here later:

![QR.Gen Preview](./assets/preview.png)

-->

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- Tailwind CSS
- JavaScript

### Backend

- Node.js
- Express.js
- QRCode
- Node.js Crypto

### Database

- PostgreSQL
- Drizzle ORM
- Docker

---

## 📁 Project Structure

```text
QR-Code-Generator/
│
├── frontend/
│   ├── index.html
│   └── script.js
│
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── models/
│   ├── routes/
│   ├── server/
│   ├── drizzle.config.js
│   ├── package.json
│   └── package-lock.json
│
├── database/
│   ├── docker-compose.yml
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ How It Works

When a user enters text or a URL:

1. The frontend sends the content to the Express backend.
2. The backend trims and validates the input.
3. A **SHA-256 hash** is generated from the content.
4. PostgreSQL is checked for an existing record with the same hash.
5. If the QR code already exists, the stored QR code is returned.
6. Otherwise, a new QR code is generated.
7. The content, hash, QR image, and creation time are stored in PostgreSQL.
8. The generated QR code is returned to the frontend.
9. The user can download the QR code as a PNG image.

### Duplicate Detection Flow

```text
User Input
    │
    ▼
Generate SHA-256 Hash
    │
    ▼
Search PostgreSQL
    │
    ├──── Already Exists ────► Return Stored QR
    │
    └──── Does Not Exist ────► Generate New QR
                                  │
                                  ▼
                            Store in Database
                                  │
                                  ▼
                              Return QR
```

---

## 🚀 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/amandobhal2511/QR-Code-Generator.git
```

Move into the project:

```bash
cd QR-Code-Generator
```

---

### 2. Install backend dependencies

```bash
cd backend
npm install
```

---

### 3. Configure environment variables

Create a `.env` file inside the `backend` directory.

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/YOUR_DATABASE
```

Replace the values according to your PostgreSQL configuration.

> The `.env` file is ignored by Git and should never be committed to the repository.

---

### 4. Start PostgreSQL with Docker

Move to the database directory:

```bash
cd ../database
```

Start the PostgreSQL container:

```bash
docker compose up -d
```

Check that the container is running:

```bash
docker compose ps
```

---

### 5. Push the Drizzle schema

Return to the backend directory:

```bash
cd ../backend
```

Run:

```bash
npx drizzle-kit push
```

You can optionally inspect the database using Drizzle Studio:

```bash
npx drizzle-kit studio
```

---

### 6. Start the backend

```bash
npm start
```

The Express server runs locally on:

```text
http://localhost:8000
```

---

### 7. Start the frontend

Open the `frontend` directory using a local development server such as VS Code Live Server.

The frontend will communicate with the Express backend to generate QR codes.

---

## 🗄️ Database Schema

QR.Gen stores the following information for each unique QR code:

| Column | Purpose |
|---|---|
| `id` | Unique record ID |
| `content` | Original URL or text |
| `content_hash` | SHA-256 hash used for duplicate detection |
| `qr_image` | Generated QR code image |
| `created_at` | Record creation timestamp |

---

## 🔐 Environment Variables

The project uses environment variables for sensitive configuration.

```env
DATABASE_URL=your_postgresql_connection_string
```

Never commit your `.env` file.

The `.gitignore` includes:

```gitignore
.env
node_modules/
```

---

## 🎯 Why Duplicate Detection?

Generating and storing a new QR image every time the same content is submitted would create unnecessary duplicate records.

QR.Gen generates a SHA-256 hash for the submitted content:

```text
https://example.com
        │
        ▼
      SHA-256
        │
        ▼
Unique Content Hash
```

The hash is searched in PostgreSQL before generating a new QR code.

This means:

```text
Same Content → Same Hash → Existing QR Returned
```

This keeps the database cleaner and avoids unnecessary QR generation and storage.

---

## 🔮 Future Improvements

Some features that may be added in the future:

- QR code customization
- Custom QR colors
- QR size selection
- QR generation history
- Copy/share functionality
- User authentication
- Improved error handling
- Production deployment

---

## 👨‍💻 Author

**Aman Dobhal**

Computer Science student and developer interested in building practical web applications and learning backend development.

---

## ⭐ Support

If you found this project useful or interesting, consider giving the repository a **star ⭐**.

It helps support the project and motivates further development.