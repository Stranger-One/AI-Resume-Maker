import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./utils/db.js";
dotenv.config(); // Load environment variables from .env file
import "./utils/passport.js";

import authRoute from "./routes/AuthRoute.js";
import session from "express-session";
import passport from "passport";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware to parse JSON and URL-encoded data
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true, // this allows cookies/sessions to be sent
  })
);

// session must come after cors
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true if using https
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoute);
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token } = req.user; // token was passed from passport.use
    res.redirect(`http://localhost:5173/auth/login/success?token=${token}`);
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
