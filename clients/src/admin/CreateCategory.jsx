import { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [errors, setError] = useState("");
  const [description, setDescription] = useState("");


  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    try {
      const capitalizedCategoryName =
        newCategoryName.charAt(0).toUpperCase() + newCategoryName.slice(1);

      const response = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: capitalizedCategoryName, // Capitalize the first letter
          color: selectedColor,
          description: description
        }),
      });

      if (response.ok) {
        // Category successfully added
        const newCategory = await response.json();

        // Clear input fields
        setCategories([...categories, newCategory]);
        setNewCategoryName("");
        setSelectedColor("");
        setDescription("");
        setShowAddCategory(false);// Hide the inputs after adding
      } else {
        const errorResponse = await response.json();
        alert(errorResponse);

        setError(errorResponse.message || "An error occurred");
        throw new Error(errorResponse.message, errorResponse);
      }
    } catch (error) {
      setError(error.message || "An error occurred");
      console.error("Cant add:", error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
        method: "DELETE",
      });
      const updatedCategories = categories.filter(
        (category) => category._id !== categoryId
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

 
  // editing category function
  const startEditing = (category) => {
    setEditingCategory(category._id);
    setNewCategoryName(category.name); // Set the current category name for editing
  };

  const saveEditedCategory = async (category) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${category._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newCategoryName, // Use the new category name from state
            color: category.color,
          }),
        }
      );

      if (response.ok) {
        const updatedCategory = await response.json();
        const updatedCategories = categories.map((cat) =>
          cat._id === updatedCategory._id ? updatedCategory : cat
        );
        setCategories(updatedCategories);
        setEditingCategory(null);
        setNewCategoryName(""); // Reset the new category name state
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const cancelEditing = () => {
    setEditingCategory(null);
    setNewCategoryName(""); // Reset the new category name state
  };

  return (
    <>
      <AdminHeader />
      <div className="container">
        <h1>Categories</h1>
        {errors && <div className="text-danger">{errors}</div>}
        {showAddCategory ? (
          <form>
            <div className="row">
              <div className="form-floating mb-3 col-md-6">
                <input
                  type="text"
                  className="form-control rounded"
                  id="categoryName"
                  placeholder="Category Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <label htmlFor="categoryName" className="form-label ms-2">
                  Category Name
                </label>
              </div>
              <div className="form-floating col-md-6 mb-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="floatingSelect"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  
                  <option value="primary" className="bg-primary">
                    Primary
                  </option>
                  <option value="danger" className="bg-danger">
                    Danger
                  </option>
                  <option value="info" className="bg-info">
                    Info
                  </option>
                  <option value="warning" className="bg-warning">
                    Warning
                  </option>
                  <option value="secondary" className="bg-secondary">
                    Secondary
                  </option>
                  <option value="success" className="bg-success">
                    Success
                  </option>
                </select>
                <label htmlFor="floatingSelect" className="ms-2">
                  Select a color
                </label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <textarea
                rows={3}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control rounded"
                placeholder="Enter a description for the category"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <button onClick={addCategory}>Add category</button>
              </div>
              <div className="col-md-6">
                <button onClick={() => setShowAddCategory(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <button onClick={() => setShowAddCategory(true)}>New category</button>
        )}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Color</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>
                  {editingCategory === category._id ? (
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td>
                {category.color}
                </td>
                <td>
                {editingCategory === category._id ? (
                    <div>
                      <button onClick={() => saveEditedCategory(category)}>
                        Save
                      </button>
                      <button onClick={cancelEditing}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => startEditing(category)}>Edit</button>
                  )}
                  </td>
                <td>
                  <button onClick={() => deleteCategory(category._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CreateCategory;
