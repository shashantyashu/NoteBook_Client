# React OTP & Google Notes Client

A **React + TypeScript frontend** for a Notes application, built with **Vite** and **Tailwind CSS**, supporting authentication via **OTP** and **Google Sign-In**. This frontend communicates with a backend server via API requests.

---

## **Features**

* User authentication:

  * Email + OTP
  * Google Sign-In
* Notes management:

  * Create, view, edit, delete notes
* Responsive UI with **Tailwind CSS**
* Client-side routing with **React Router DOM**
* Axios for API requests
* TypeScript for type safety and maintainability

---

## **Tech Stack**

* **Frontend:** React, TypeScript, Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Build Tool:** Vite
* **Static Server:** serve

---

## **Installation**

1. Clone the repository:

```bash
git clone https://github.com/yourusername/react-otp-google-notes-client.git
cd react-otp-google-notes-client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (if needed) and add environment variables for API URLs:

```env
VITE_API_URL=https://your-backend.onrender.com
```

---

## **Available Scripts**

* **Development** (hot-reloading):

```bash
npm run dev
```

* **Build** for production:

```bash
npm run build
```

* **Preview** production build locally:

```bash
npm run preview
```

* **Start** production build on Render or any Node server:

```bash
npm start
```

The frontend will run on `http://localhost:5173` (or the port provided by Vite).

---

## **Project Structure**

```
├── src
│   ├── components      # React components
│   ├── pages           # Application pages
│   ├── routes          # Client-side routing
│   ├── services        # API calls with Axios
│   ├── styles          # Tailwind or custom CSS
│   └── main.tsx        # Entry point
├── public               # Static assets
├── dist                 # Production build
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## **Environment Variables**

| Variable       | Description                           |
| -------------- | ------------------------------------- |
| `VITE_API_URL` | Backend API base URL for notes & auth |

---

## **Deployment on Render (Free Tier)**

1. Push the project to GitHub.
2. Create a **Web Service** on Render.
3. Set **Build Command**:

```bash
npm install && npm run build
```

4. Set **Start Command**:

```bash
npm start
```

5. Set environment variables on Render (e.g., `VITE_API_URL`).
6. Deploy. The app will be accessible at `https://your-frontend.onrender.com`.

---

