# FoodieFlex

**FoodieFlex** is a Node.js/Express web application for online food ordering and table booking. Built using **Express**, **EJS templates**, **MongoDB**, and **Tailwind CSS**, the app provides a complete workflow from browsing the restaurant-style menu to placing and tracking orders. The application supports traditional authentication as well as OAuth login via **Google** and **GitHub**.

---

## 🚀 Features

- **User Authentication** (Signup/Login/Logout with JWT & Argon2)
- **OAuth Integration** (Login via Google and GitHub using Arctic OAuth)
- **Menu Browsing** (by categories: Meal, Fast Food, Drink, Dessert)
- **Order Placement & Tracking**
- **Admin Controls** (Add/Edit menu items, protected routes)
- **Form Validation** (via Zod)
- **Flash Messages & Sessions** (connect-flash)
- **404 Page** – Custom error page when route not found
- **Fully Integrated Frontend + Backend OAuth Flow**
- **Sample `.env` Provided**

---

## 🛠️ Tech Stack

| Tech       | Details                                   |
| ---------- | ----------------------------------------- |
| Language   | JavaScript (Node.js - ESM)                |
| Framework  | Express.js                                |
| Templating | EJS (Embedded JavaScript)                 |
| Styling    | Tailwind CSS (via CLI)                    |
| Database   | MongoDB (with Mongoose ODM)               |
| Auth       | JWT, Argon2, Google/GitHub OAuth (Arctic) |
| Validation | Zod                                       |
| Flash Msgs | connect-flash                             |

---

## 📷 Screenshots

> _Coming Soon_

---

## 🌐 OAuth Integration (New!)

FoodieFlex now supports **OAuth login** via:

- **Google**
- **GitHub**

🔐 The backend uses the **Arctic** OAuth library to handle PKCE flows, session security, and ID token decoding.  
✅ Once authenticated, the OAuth account is either linked to an existing user (based on verified email) or a new user is created and logged in automatically.

---

## 🧾 Sample `.env`

```env
# MongoDB URI
DBLINK=mongodb+srv://username:password@cluster0.mongodb.net/foodiedb

# JWT Secret
SecretKey=your_jwt_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Server Port (optional)
PORT=3000
```

---

## ⚙️ Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/anmol11p/foodieflex_nodejs.git
   cd foodieflex_nodejs
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Build Tailwind CSS:**

   ```bash
   npm run build:css
   ```

4. **Create `.env` File:**  
   Use the `.env.sample` as a template and configure your secrets.

5. **Run the App:**

   - Development: `npm run dev`
   - Production: `npm start`

6. **Open in Browser:**

   ```
   http://localhost:3000
   ```

---

## 📄 Application Routes

| Route              | Description                       |
| ------------------ | --------------------------------- |
| `/`                | Homepage (default category: Meal) |
| `/category/:cat`   | Browse items by category          |
| `/login`           | Login (JWT-based)                 |
| `/signup`          | Signup form                       |
| `/menu`            | Full menu                         |
| `/orders`          | My Orders (requires login)        |
| `/item/add`        | Admin-only: Add menu item         |
| `/google`          | Start Google OAuth                |
| `/google/callback` | OAuth callback from Google        |
| `/github`          | Start GitHub OAuth                |
| `/github/callback` | OAuth callback from GitHub        |
| `*`                | **Custom 404 Page**               |

---

## 📌 Usage

- **Signup/Login** with traditional email-password or Google/GitHub OAuth
- **Browse Menu** by category
- **Place Orders** with quantity and delivery address
- **View/Cancel Orders** under "My Orders"
- **Admin Role** can add new items to menu

---

## ❌ 404 Page

When users access a route that doesn't exist, a **custom-designed 404 page** is shown using `views/404.ejs`. This improves user experience and keeps the design consistent.

---

## 🧑‍💻 Contributing

Pull requests are welcome! Follow these steps:

1. Fork the repo and create your feature branch
2. Commit your changes (`git commit -am 'Add new feature'`)
3. Push to the branch (`git push origin feature`)
4. Create a pull request

Please keep your code clean and consistent with project structure.

---

## 📜 License

Licensed under the **ISC License**. See `package.json` for details.

---

## 👨‍💻 Author

Developed by **Anmol Panday**  
GitHub: [@anmol11p](https://github.com/anmol11p)
