# FoodieFlex

FoodieFlex is a Node.js/Express web application for online food ordering and table booking.  Built with **Express** and **EJS** templates, it uses **MongoDB** (via Mongoose) for data storage.  The app supports user authentication (signup/login with JSON Web Tokens and Argon2-hashed passwords), browsing a restaurant-style menu by categories (meal, fast food, drink, dessert), and placing or canceling orders.  Admin users can add new menu items through protected routes.  Flash messages (connect-flash) and sessions provide user feedback.  In summary, FoodieFlex offers an end-to-end food-ordering workflow: users sign up or log in, browse the menu, place orders with a delivery address, and track or cancel their orders in “My Orders”.

## Features

* **User Authentication:** Users can **sign up**, **log in**, and **log out**.  Credentials are validated and passwords are hashed with Argon2.  Logged-in users receive a JWT (stored in a cookie) for session management.  Both “customer” and “admin” roles are supported (default role is customer).
* **Menu Browsing:** The app displays a menu of food items categorized as “meal”, “fast food”, “drink”, or “dessert”.  Users can switch categories (the home page defaults to the “meal” category) and view all available items with name, description, price, and availability status.
* **Order Placement & Tracking:** Authenticated users can place orders for one or more items, specifying quantity and delivery address.  Each order is saved with a status (`placed`, `preparing`, `delivered`, or `cancelled`).  Users can cancel pending orders.  Order history is shown on a “My Orders” page, where each order lists its items and status.
* **Admin Controls:** Routes under `/item` are protected by an **admin middleware** that checks the user’s role.  Admins can add new menu items (name, price, description, category, etc.) via a form.  This ensures only administrators can modify the menu.
* **Form Validation:** All input is validated using **Zod** schemas (for signup, login, items, and orders).  Invalid form submissions redirect back with error flash messages.
* **View Templates:** The app uses **EJS** templates for server-side rendering.  Key pages include the home page (`index.ejs`), menu page (`menu.ejs`), login/signup pages, and order history page (`order.ejs`).  Each page includes a common header and footer.

## Tech Stack

* **Language & Runtime:** Node.js (ESM modules)
* **Web Framework:** Express.js
* **Database:** MongoDB (via Mongoose)
* **Templating:** EJS (embedded JavaScript)
* **Styling:** Tailwind CSS (using the Tailwind CLI)
* **Authentication:** JSON Web Tokens (`jsonwebtoken`) and **express-session**/cookies for session management
* **Password Hashing:** Argon2 (`argon2`) for secure password storage
* **Validation:** Zod schemas (`zod`) for request data validation
* **Utilities:** `cookie-parser`, `connect-flash` for handling cookies and flash messages; CORS support available.

## Getting Started

To set up and run FoodieFlex locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/anmol11p/foodieflex_nodejs.git
   cd foodieflex_nodejs
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Build Tailwind CSS (if using):** Tailwind is included via the CLI. You can build the CSS with:

   ```bash
   npm run build:css
   ```

   This watches `public/styles/input.css` and outputs `public/styles/output.css`.
4. **Configure environment:** Create a `.env` file in the project root with the required variables (see below).
5. **Run the app:**

   * For development (auto-reload): `npm run dev`
   * Or to start normally: `npm start`
     The server listens on `http://localhost:3000` by default (or the `PORT` you set).

After starting, open your browser to `http://localhost:3000` to view the app.  You can sign up a new user, log in, browse the menu, and test placing orders.

## Environment Variables

The app uses the following environment variables (stored in `.env`):

* `DBLINK` – MongoDB connection URI (e.g. `"mongodb://<user>:<pass>@host:port/dbname"`).
* `SecretKey` – Secret key for signing JWT tokens.
* `PORT` – (Optional) port to run the server (defaults to 3000).

**Example `.env`:**

```
DBLINK=mongodb+srv://username:password@cluster0.mongodb.net/foodiedb
SecretKey=your_jwt_secret_here
PORT=3000
```

## Usage

1. **Homepage:** The home page shows a banner and categories.  Click a category (Meal, Fast Food, Drink, Dessert) to filter items.  Items display with name, description, price, and availability.
2. **Sign Up / Login:** Use the **Sign Up** page to create a new account (full name, phone, email, password).  After signing up, you’re logged in and redirected home. Use **Log In** to access an existing account.
3. **Placing an Order:** On the **Menu** or category page, click **Order** next to an available item. Enter the quantity and a delivery address in the form, then submit to place the order. A success message appears, and the order is saved with status “placed”.
4. **Viewing Orders:** Go to **My Orders** to see past and current orders. Each order shows the order ID, date, status, delivery address, and items with quantities/subtotals.
5. **Cancel or Track:** If an order is not yet delivered or already cancelled, you can click **Cancel** to cancel it. (Delivered orders cannot be cancelled.) You may also use the **Track Order** button (if implemented) to see real-time status.

## Screenshots (optional)

*No screenshots provided.*

## License

This project is licensed under the **ISC License** (see `package.json`).

## Contributing

Contributions are welcome! If you’d like to contribute to FoodieFlex, please:

1. Fork the repository and create a new branch for your feature or bugfix.
2. Make your changes and test thoroughly.
3. Submit a pull request with a clear description of your changes.

Please ensure your code follows the existing style and conventions.  Feel free to open issues for any bugs or feature requests.

## Contact / Author

FoodieFlex was developed by **Anmol Panday** (GitHub user `anmol11p`).  You can reach out via GitHub at [github.com/anmol11p](https://github.com/anmol11p).
