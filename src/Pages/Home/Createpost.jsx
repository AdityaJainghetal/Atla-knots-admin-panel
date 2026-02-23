// import { useState } from "react";
// import { createProductApi } from "./product.api";

// const CreateProduct = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e) => {
//     setImages(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);

//     for (let i = 0; i < images.length; i++) {
//       formData.append("images", images[i]);
//     }

//     try {
//       setLoading(true);
//       await createProductApi(formData);

//       alert("Product created successfully");

//       setName("");
//       setDescription("");
//       setImages([]);
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Create Product
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Product Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Product Name
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter product name"
//               className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter product description"
//               rows="4"
//               className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
//               required
//             />
//           </div>

//           {/* Images */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Product Images
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleImageChange}
//               className="block w-full text-sm text-gray-600
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-lg file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-indigo-50 file:text-indigo-600
//                 hover:file:bg-indigo-100"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full rounded-lg py-2.5 text-white font-semibold transition
//               ${loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-indigo-600 hover:bg-indigo-700"}
//             `}
//           >
//             {loading ? "Creating..." : "Create Product"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateProduct;

import { useState, useEffect } from "react";
import { createProductApi } from "./product.api";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(true);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setFetchingCategories(true);
        const response = await fetch(
          "https://atla-knots-admin.onrender.com/api/blogcategory",
        );

        if (!response.ok) {
          throw new Error("Failed to load categories");
        }

        const result = await response.json();

        if (result.success) {
          setCategories(result.data);
        } else {
          alert("Could not load categories: " + result.message);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        alert("Failed to load categories. Please try again later.");
      } finally {
        setFetchingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      alert("Please select a category");
      return;
    }

    if (images.length === 0) {
      alert("Please select at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("category", category);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      setLoading(true);
      const response = await createProductApi(formData);

      // Assuming createProductApi returns the axios/fetch response
      if (response.data?.success) {
        alert("Product created successfully!");
        // Reset form
        setName("");
        setDescription("");
        setCategory("");
        setImages([]);
      } else {
        alert(response.data?.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Create product error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              rows="4"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            {fetchingCategories ? (
              <div className="text-gray-500">Loading categories...</div>
            ) : categories.length === 0 ? (
              <div className="text-red-600">No categories available</div>
            ) : (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images (multiple allowed)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-600
                hover:file:bg-indigo-100"
              required
            />
            {images.length > 0 && (
              <p className="mt-1 text-sm text-gray-500">
                {images.length} file(s) selected
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || fetchingCategories}
            className={`w-full rounded-lg py-2.5 text-white font-semibold transition
              ${
                loading || fetchingCategories
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
