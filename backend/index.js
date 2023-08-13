const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const path = require("path");

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
// const corsOptions = {
//   origin: "https://aramid-client-blog.onrender.com/",
// };
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Endpoint for login page
app.use("/api/auth", authRouter);

// Import the new routes
app.use("/api/click-count", clickCountRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/admin", adminProfile);

// // Serve static files (React app) from the 'client' folder
// app.use(express.static(path.join(__dirname, '../clients/dist')));

// // Handle React app routing
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../clients/dist/index.html'));
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
