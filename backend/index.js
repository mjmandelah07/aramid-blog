const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const bcrypt = require("bcrypt");

//router routes
const categoriesRouter = require("./routes/categories");
const authRouter = require("./routes/auth");
const articlesRouter = require("./routes/articles");


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//connect to database
connectDB();

// endpoint for login page
app.use('/api/auth', authRouter)



app.use('/api/categories', categoriesRouter);
app.use('/api/articles', articlesRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
