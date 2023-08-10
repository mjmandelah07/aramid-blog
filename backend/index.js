const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

//router routes
const categoriesRouter = require("./routes/categories");
const authRouter = require("./routes/auth");
const articlesRouter = require("./routes/articles");
const commentsRouter = require("./routes/comments");
const adminProfile = require("./routes/adminProfile");
const clickCountRouter = require("./routes/clickCount");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: "https://aramid-client-blog.onrender.com/",
};
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());

//connect to database
connectDB();

// endpoint for login page
app.use("/api/auth", authRouter);

// Import the new route
app.use("/api/click-count", clickCountRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/admin", adminProfile);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
