import { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../components/AdminHeader";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";

const CreateArticle = () => {
  const [formData, setFormData] = useState({
    title: "",
    mainImage: "",
    description: "",
    author: "",
    categories: [],
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [banner, setBanner] = useState(null);
  const apiKey = import.meta.env.VITE_API_TINY_KEY;
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  useEffect(() => {
    fetchCategories();
  }, []);

  // fetch categories from the database
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://aramid-blog.onrender.com/api/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    const selectedCategoryIds = selectedOptions.map((option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      categories: selectedCategoryIds,
    }));
  };

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  //get description contents and set
  const handleEditorChange = (content) => {
    setEditorContent(content);
  };
  const handleImageUpload = (blobInfo, success) => {
    const reader = new FileReader();
    reader.onload = function () {
      const base64data = reader.result.split(",")[1]; // Get the base64 encoded image data
      success(`data:${blobInfo.blob().type};base64,${base64data}`);
    };
    reader.readAsDataURL(blobInfo.blob());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle the banner image file
    const handleMainImageChange = async () => {
      console.log(banner);

      const file = banner;
      console.log(file);
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await response.json();
          setFormData((prevData) => ({
            ...prevData,
            mainImage: data.secure_url,
          }));
          setError("");
        } catch (error) {
          setError("Image upload failed");
        }
      } else {
        setError("Please choose a valid image file (JPEG or PNG)");
      }
    };
    handleMainImageChange();
    if (
      formData.title.trim() === "" ||
      !editorContent ||
      !formData.mainImage ||
      formData.author.trim() === ""
    ) {
      setError("Please fill in all fields and select a main image");
      return;
    }

    try {
      const requestData = {
        title: formData.title,
        description: editorContent,
        mainImage: formData.mainImage,
        author: formData.author,
        categories: formData.categories,
      };

      const response = await axios.post(
        "http://localhost:5000/api/articles",
        requestData
      );
      console.log("Article posted:", response.data);
      // Reset form data and editor content
      setFormData({
        title: "",
        mainImage: "",
        description: "",
        author: "",
        categories: [],
      });
      setEditorContent("");
      setError("");
    } catch (error) {
      console.error("Error posting article:", error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="container bg-light py-3 my-3">
        <div className="container">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            noValidate
          >
            {error && <div className="error">{error}</div>}
            <div className="row mb-3">
              <div className="col-md-8">
                <label className="text-dark h5 form-label" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Title"
                  className="form-control form-control-lg rounded form"
                  aria-label=".form-control-lg example"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="text-dark h5 form-label" htmlFor="categories">
                  Select categories
                </label>
                <Select
                  isMulti
                  id="categories"
                  name="categories"
                  options={categoryOptions}
                  value={categoryOptions.filter((option) =>
                    formData.categories.includes(option.value)
                  )}
                  onChange={handleCategoryChange}
                  className=""
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="text-dark h5 form-label" htmlFor="title">
                  Author Name
                </label>
                <input
                  type="text"
                  id="title"
                  name="author"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      author: e.target.value,
                    }))
                  }
                  placeholder="Author Name"
                  className="form-control form-control-lg rounded form mb-3"
                  aria-label=".form-control-lg example"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="banner" className="text-dark h5 form-label">
                  Banner Image
                </label>
                <input
                  className="form-control form-control-lg rounded"
                  id="banner"
                  type="file"
                  name="mainImage"
                  accept="image/jpeg, image/png"
                  onChange={(e) => setBanner(e.target.files[0])}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-12">
                <label
                  htmlFor="description"
                  className="form-label text-dark h5"
                >
                  Description
                </label>
                <Editor
                  apiKey={apiKey}
                  value={editorContent}
                  name="description"
                  onEditorChange={handleEditorChange}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | image | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    automatic_uploads: false,
                    file_picker_types: "image",
                    images_upload_handler: handleImageUpload,
                  }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary h3 px-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateArticle;
