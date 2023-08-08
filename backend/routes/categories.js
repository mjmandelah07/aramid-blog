const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

// post in the categories section
router.post("/", async (req, res) => {
  const categoryData = req.body;

  try {
    const existingCategory = await Category.findOne({
      name: categoryData.name,
    });

    if (existingCategory) {
      // Category name already exists, send an error response
      return res.status(400).json({ message: "Category name already exists" });
    } else {
      const newCategory = new Category(categoryData);
      const savedCategory = await newCategory.save();

      res.status(201).json({ savedCategory, message: "Category saved" });
    }
  } catch (error) {
    console.error("Error saving category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get categories from database
router.get("/", (req, res) => {
  Category.find({})
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      console.error("Error retrieving categories:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.delete("/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(204).end(); 
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.put("/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;
  const updatedCategory = req.body;

  try {
    const result = await Category.findByIdAndUpdate(
      categoryId,
      { name: updatedCategory.name },
      { new: true } 
    );

    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




module.exports = router;
