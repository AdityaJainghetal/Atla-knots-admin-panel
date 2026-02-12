
// import { useEffect, useState } from "react";
// import {
//   createTechApi,
//   getTechApi,
//   updateTechApi,
//   deleteTechApi,
//   getCategoriesApi,
// } from "./techApi"; // adjust path if needed

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const TechNews = () => {
//   const [techItems, setTechItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   // Form states
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [selectedFiles, setSelectedFiles] = useState([]);     // new files to upload
//   const [existingImages, setExistingImages] = useState([]);   // images from DB (edit mode)
//   const [editId, setEditId] = useState(null);

//   // Fetch all tech items
//   const fetchTech = async () => {
//     try {
//       setFetching(true);
//       const res = await getTechApi();
//       setTechItems(res.data?.data || res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch tech items:", err);
//       toast.error("Could not load tech items");
//     } finally {
//       setFetching(false);
//     }
//   };

//   // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const res = await getCategoriesApi();
//       setCategories(res.data?.data || res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch categories:", err);
//       toast.error("Could not load categories");
//     }
//   };

//   useEffect(() => {
//     fetchTech();
//     fetchCategories();
//   }, []);

//   const resetForm = () => {
//     setTitle("");
//     setDescription("");
//     setCategory("");
//     setSelectedFiles([]);
//     setExistingImages([]);
//     setEditId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title.trim() || !description.trim() || !category) {
//       toast.warn("Please fill title, description and category");
//       return;
//     }

//     // Create requires at least one file
//     if (!editId && selectedFiles.length === 0) {
//       toast.error("Please select at least one image");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title.trim());
//     formData.append("description", description.trim());
//     formData.append("category", category);

//     selectedFiles.forEach((file) => {
//       formData.append("images", file);
//     });

//     try {
//       setLoading(true);

//       if (editId) {
//         await updateTechApi(editId, formData);
//         toast.success("Tech item updated successfully");
//       } else {
//         await createTechApi(formData);
//         toast.success("Tech item created successfully");
//       }

//       resetForm();
//       await fetchTech();
//     } catch (err) {
//       console.error("Submit error:", err);
//       toast.error(
//         editId ? "Failed to update tech item" : "Failed to create tech item"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setTitle(item.title || "");
//     setDescription(item.description || "");
//     setCategory(item.category?._id || item.category || "");
//     setExistingImages(item.images || []);
//     setSelectedFiles([]); // new files start empty
//     setEditId(item._id);
//     toast.info(`Now editing: ${item.title}`);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this tech item?")) return;

//     try {
//       await deleteTechApi(id);
//       toast.success("Deleted successfully");
//       fetchTech();
//     } catch (err) {
//       console.error("Delete error:", err);
//       toast.error("Failed to delete item");
//     }
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files || []);
//     if (files.length === 0) return;

//     // Basic client-side validation (matches backend)
//     const validFiles = files.filter((file) => {
//       const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
//       const maxSize = 5 * 1024 * 1024; // 5MB

//       if (!validTypes.includes(file.type)) {
//         toast.warn(`File ${file.name} has unsupported format`);
//         return false;
//       }
//       if (file.size > maxSize) {
//         toast.warn(`File ${file.name} is too large (max 5MB)`);
//         return false;
//       }
//       return true;
//     });

//     setSelectedFiles(validFiles);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
//           Manage Tech News
//         </h1>

//         {/* FORM */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-gray-100">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Title *
//                 </label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   placeholder="Enter title"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Category *
//                 </label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
//                   required
//                 >
//                   <option value="">Select a category</option>
//                   {categories.map((cat) => (
//                     <option key={cat._id} value={cat._id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description *
//               </label>
//               <textarea
//                 rows={4}
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Enter detailed description..."
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
//                 required
//               />
//             </div>

//             {/* Images section */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Images {!editId && <span className="text-red-600">*</span>}
//               </label>

//               {/* Show existing images in edit mode */}
//               {editId && existingImages.length > 0 && (
//                 <div className="mb-4">
//                   <p className="text-sm text-gray-600 mb-2">Current images:</p>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                     {existingImages.map((url, idx) => (
//                       <div key={idx} className="relative rounded overflow-hidden shadow-sm">
//                         <img
//                           src={url}
//                           alt={`Existing ${idx + 1}`}
//                           className="w-full h-28 object-cover"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <input
//                 type="file"
//                 accept="image/jpeg,image/png,image/webp,image/gif"
//                 multiple
//                 onChange={handleFileChange}
//                 className="block w-full text-sm text-gray-500
//                   file:mr-4 file:py-2.5 file:px-5
//                   file:rounded-lg file:border-0
//                   file:text-sm file:font-semibold
//                   file:bg-indigo-50 file:text-indigo-700
//                   hover:file:bg-indigo-100 cursor-pointer"
//               />

//               <p className="mt-2 text-sm text-gray-600">
//                 {selectedFiles.length > 0
//                   ? `${selectedFiles.length} new file${selectedFiles.length > 1 ? "s" : ""} selected: ${selectedFiles
//                       .map((f) => f.name)
//                       .join(", ")}`
//                   : editId
//                   ? "No new files selected — existing images will be kept"
//                   : "Select at least one image"}
//               </p>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`
//                 w-full py-3 px-6 rounded-lg font-semibold text-white transition-all
//                 ${editId ? "bg-amber-600 hover:bg-amber-700" : "bg-indigo-600 hover:bg-indigo-700"}
//                 disabled:opacity-60 disabled:cursor-not-allowed
//                 flex items-center justify-center gap-2 shadow-md
//               `}
//             >
//               {loading && (
//                 <svg
//                   className="animate-spin h-5 w-5 text-white"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v8z"
//                   />
//                 </svg>
//               )}
//               {loading
//                 ? "Processing..."
//                 : editId
//                 ? "Update Tech Item"
//                 : "Create Tech Item"}
//             </button>
//           </form>
//         </div>

//         {/* TABLE */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//           <div className="p-6 md:p-8">
//             <h2 className="text-xl font-semibold text-gray-800 mb-6">
//               All Tech Items
//             </h2>

//             {fetching ? (
//               <div className="text-center py-12 text-gray-500">Loading...</div>
//             ) : techItems.length === 0 ? (
//               <div className="text-center py-12 text-gray-500">
//                 No tech items found
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         #
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Title
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Category
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Images
//                       </th>
//                       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {techItems.map((item, idx) => (
//                       <tr key={item._id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {idx + 1}
//                         </td>
//                         <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                           {item.title}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-600">
//                           {item.category?.name || "—"}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-600">
//                           {item.images?.length || 0} image
//                           {item.images?.length !== 1 ? "s" : ""}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <button
//                             onClick={() => handleEdit(item)}
//                             className="text-indigo-600 hover:text-indigo-900 mr-4"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(item._id)}
//                             className="text-red-600 hover:text-red-900"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-right" autoClose={4000} theme="light" />
//     </div>
//   );
// };

// export default TechNews;



// import { use, useEffect, useMemo, useState } from "react";
// import DataTable from "react-data-table-component";
// import {
//   createTechApi,
//   getTechApi,
//   updateTechApi,
//   deleteTechApi,
//   getCategoriesApi,
// } from "./techApi";
// const TechNews = () => {

//    const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);

//  const handleImageChange = (e) => {
//     setImages(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("category", category);

//     for (let i = 0; i < images.length; i++) {
//       formData.append("images", images[i]);
//     }

//     try {
//       setLoading(true);
//       await createTechApi(formData);

//       alert("Tech item created successfully");

//       setTitle("");
//       setDescription("");
//       setCategory("");
//       setImages([]);
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await getCategoriesApi();
//         setCategories(res.data?.data || res.data || []);
//       }
//         catch (err) {
//         console.error("Failed to fetch categories:", err);
//         alert("Could not load categories");
//       }
//     };

//     fetchCategories();
//   }
//   , []);
//   return (
//    <>
//    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
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
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter product name"
//               className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>
// {/* //cattegory */}
//           <div className="">

//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Category
//             </label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             >
//               <option value="">Select a category</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
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
   
//    </>
//       )
// }  
// export default TechNews;

import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createTechApi,
  getTechApi,
  updateTechApi,
  deleteTechApi,
  getCategoriesApi,
} from "./techApi";

const TechNews = () => {
  const [techs, setTechs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  // Loading states
  const [loading, setLoading] = useState(false);           // for form submit
  const [tableLoading, setTableLoading] = useState(true);  // for initial fetch
  const [deleteLoading, setDeleteLoading] = useState({});  // per row delete

  // Fetch Tech Data
  const fetchTech = async () => {
    try {
      setTableLoading(true);
      const res = await getTechApi();
      setTechs(res.data?.data || []);
    } catch (error) {
      toast.error("Failed to load tech news");
    } finally {
      setTableLoading(false);
    }
  };

  // Fetch Categories + Tech on mount
  useEffect(() => {
    fetchTech();

    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        setCategories(res.data?.data || []);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Already submitting → prevent multiple calls
    if (loading) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      if (editId) {
        await updateTechApi(editId, formData);
        toast.success("Tech news updated successfully!");
        setEditId(null);
      } else {
        await createTechApi(formData);
        toast.success("Tech news created successfully!");
      }

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setImages([]);

      fetchTech();
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    setEditId(row._id);
    setTitle(row.title);
    setDescription(row.description);
    setCategory(row.category?._id || row.category);
    toast.info("Now editing: " + row.title);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    if (deleteLoading[id]) return; // prevent multiple clicks

    setDeleteLoading((prev) => ({ ...prev, [id]: true }));

    try {
      await deleteTechApi(id);
      toast.success("Deleted successfully");
      fetchTech();
    } catch (error) {
      toast.error("Failed to delete");
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  // DataTable Columns
  const columns = useMemo(
    () => [
      {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
      },
      {
        name: "Category",
        selector: (row) => row.category?.name || "No Category",
      },
      {
        name: "Images",
        cell: (row) => (
          <div className="flex gap-2 flex-wrap">
            {row.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="tech"
                className="w-12 h-12 object-cover rounded shadow-sm"
              />
            ))}
          </div>
        ),
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(row)}
              disabled={loading || deleteLoading[row._id]}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row._id)}
              disabled={loading || deleteLoading[row._id]}
              className={`px-3 py-1 rounded text-white transition flex items-center gap-2 ${
                deleteLoading[row._id]
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {deleteLoading[row._id] ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        ),
      },
    ],
    [loading, deleteLoading]
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg mb-10 space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {editId ? "Update Tech News" : "Add New Tech News"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          disabled={loading}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          disabled={loading}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
          required
          disabled={loading}
        />

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Upload Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full md:w-auto px-6 py-3 rounded-lg font-medium text-white transition duration-200 flex items-center justify-center gap-2 ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              {editId ? "Updating..." : "Creating..."}
            </>
          ) : editId ? (
            "Update News"
          ) : (
            "Create News"
          )}
        </button>
      </form>

      {/* DATA TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {tableLoading ? (
          <div className="p-10 flex justify-center items-center min-h-[300px]">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
              <p className="text-gray-600">Loading tech news...</p>
            </div>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={techs}
            pagination
            highlightOnHover
            pointerOnHover
            responsive
            noDataComponent="No tech news found"
          />
        )}
      </div>
    </div>
  );
};

export default TechNews;