// // import { useEffect, useState } from "react";
// // import {
// //   createCategoryApi,
// //   getCategoriesApi,
// //   updateCategoryApi,
// //   deleteCategoryApi,
// // } from "../category/categoryApi.js";

// // const Category= () => {
// //   const [categories, setCategories] = useState([]);
// //   const [name, setName] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [editId, setEditId] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   // FETCH ALL
// //   const fetchCategories = async () => {
// //     try {
// //       const res = await getCategoriesApi();
// //       setCategories(res.data.data || res.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCategories();
// //   }, []);

// //   // SUBMIT (CREATE + UPDATE)
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!name) return alert("Category name required");

// //     try {
// //       setLoading(true);

// //       if (editId) {
// //         await updateCategoryApi(editId, { name, description });
// //         alert("Category Updated");
// //       } else {
// //         await createCategoryApi({ name, description });
// //         alert("Category Created");
// //       }

// //       setName("");
// //       setDescription("");
// //       setEditId(null);
// //       fetchCategories();
// //     } catch (error) {
// //       console.log(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // EDIT
// //   const handleEdit = (cat) => {
// //     setName(cat.name);
// //     setDescription(cat.description || "");
// //     setEditId(cat._id);
// //   };

// //   // DELETE
// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure?")) return;

// //     try {
// //       await deleteCategoryApi(id);
// //       fetchCategories();
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-8">
// //       <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">

// //         <h2 className="text-3xl font-bold mb-6 text-center">
// //           Category CRUD
// //         </h2>

// //         {/* FORM */}
// //         <form onSubmit={handleSubmit} className="space-y-4 mb-8">

// //           <div>
// //             <label className="block font-semibold mb-1">
// //               Category Name
// //             </label>
// //             <input
// //               type="text"
// //               placeholder="Enter category name"
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //               className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
// //             />
// //           </div>

// //           <div>
// //             <label className="block font-semibold mb-1">
// //               Description
// //             </label>
// //             <textarea
// //               placeholder="Enter description"
// //               value={description}
// //               onChange={(e) => setDescription(e.target.value)}
// //               className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className={`w-full py-3 rounded-lg text-white font-semibold ${
// //               editId
// //                 ? "bg-yellow-500 hover:bg-yellow-600"
// //                 : "bg-blue-600 hover:bg-blue-700"
// //             }`}
// //           >
// //             {editId ? "Update Category" : "Create Category"}
// //           </button>
// //         </form>

// //         {/* TABLE */}
// //         <div className="overflow-x-auto">
// //           <table className="w-full border-collapse border border-gray-300">

// //             <thead>
// //               <tr className="bg-gray-200">
// //                 <th className="border p-3">#</th>
// //                 <th className="border p-3">Name</th>
// //                 <th className="border p-3">Description</th>
// //                 <th className="border p-3">Actions</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {categories.length > 0 ? (
// //                 categories.map((cat, index) => (
// //                   <tr key={cat._id} className="text-center">
// //                     <td className="border p-3">{index + 1}</td>
// //                     <td className="border p-3">{cat.name}</td>
// //                     <td className="border p-3">
// //                       {cat.description}
// //                     </td>
// //                     <td className="border p-3 space-x-2">
// //                       <button
// //                         onClick={() => handleEdit(cat)}
// //                         className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
// //                       >
// //                         Edit
// //                       </button>

// //                       <button
// //                         onClick={() => handleDelete(cat._id)}
// //                         className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
// //                       >
// //                         Delete
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td
// //                     colSpan="4"
// //                     className="text-center p-4 text-gray-500"
// //                   >
// //                     No Categories Found
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>

// //           </table>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default Category;

// import { useEffect, useState } from "react";
// import {
//   createCategoryApi,
//   getCategoriesApi,
//   updateCategoryApi,
//   deleteCategoryApi,
// } from "../api/categoryApi";

// // Toastify
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   // FETCH ALL CATEGORIES
//   const fetchCategories = async () => {
//     try {
//       setFetching(true);
//       const res = await getCategoriesApi();
//       setCategories(res.data.data || res.data || []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       toast.error("Failed to load categories");
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // CREATE or UPDATE
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name.trim()) {
//       toast.warn("Please enter category name");
//       return;
//     }

//     try {
//       setLoading(true);

//       if (editId) {
//         await updateCategoryApi(editId, { name: name.trim() });
//         toast.success("Category updated successfully!");
//       } else {
//         await createCategoryApi({ name: name.trim() });
//         toast.success("Category created successfully!");
//       }

//       setName("");
//       setEditId(null);
//       fetchCategories();
//     } catch (error) {
//       console.error(error);
//       toast.error(
//         editId ? "Failed to update category" : "Failed to create category"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // EDIT
//   const handleEdit = (cat) => {
//     setName(cat.name);
//     setEditId(cat._id);
//     toast.info("Now editing: " + cat.name);
//   };

//   // DELETE
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this category?")) {
//       return;
//     }

//     try {
//       await deleteCategoryApi(id);
//       toast.success("Category deleted successfully");
//       fetchCategories();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete category");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
//           Manage Categories
//         </h1>

//         {/* FORM CARD */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-10 border border-gray-100">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label
//                 htmlFor="categoryName"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Category Name
//               </label>
//               <input
//                 id="categoryName"
//                 type="text"
//                 placeholder="Enter category name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`
//                 w-full py-3 px-6 rounded-lg font-semibold text-white transition-all
//                 ${
//                   editId
//                     ? "bg-amber-600 hover:bg-amber-700"
//                     : "bg-indigo-600 hover:bg-indigo-700"
//                 }
//                 disabled:opacity-50 disabled:cursor-not-allowed
//                 shadow-md hover:shadow-lg transform hover:-translate-y-0.5
//               `}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <svg
//                     className="animate-spin h-5 w-5 mr-2 text-white"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8v8z"
//                     />
//                   </svg>
//                   Processing...
//                 </span>
//               ) : editId ? (
//                 "Update Category"
//               ) : (
//                 "Create Category"
//               )}
//             </button>
//           </form>
//         </div>

//         {/* TABLE CARD */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//           <div className="p-6 md:p-8">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               All Categories
//             </h2>

//             {fetching ? (
//               <div className="text-center py-10 text-gray-500">
//                 Loading categories...
//               </div>
//             ) : categories.length === 0 ? (
//               <div className="text-center py-10 text-gray-500">
//                 No categories found
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
//                         Name
//                       </th>
//                       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {categories.map((cat, index) => (
//                       <tr key={cat._id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {index + 1}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                           {cat.name}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <button
//                             onClick={() => handleEdit(cat)}
//                             className="text-amber-600 hover:text-amber-900 mr-4 font-medium"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(cat._id)}
//                             className="text-red-600 hover:text-red-900 font-medium"
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

//       {/* Toast Container */}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </div>
//   );
// };

// export default Category;

import { useEffect, useState } from "react";
import {
  createCategoryApi,
  getCategoriesApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "./categoryApi";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // FETCH ALL CATEGORIES
  const fetchCategories = async () => {
    try {
      setFetching(true);
      const res = await getCategoriesApi();
      setCategories(res.data.data || res.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // CREATE or UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.warn("Please enter category name");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await updateCategoryApi(editId, { name: name.trim() });
        toast.success("Category updated successfully!");
      } else {
        await createCategoryApi({ name: name.trim() });
        toast.success("Category created successfully!");
      }

      setName("");
      setEditId(null);
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error(
        editId ? "Failed to update category" : "Failed to create category"
      );
    } finally {
      setLoading(false);
    }
  };

  // EDIT
  const handleEdit = (cat) => {
    setName(cat.name);
    setEditId(cat._id);
    toast.info("Now editing: " + cat.name);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      await deleteCategoryApi(id);
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
          Manage Categories
        </h1>

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-10 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="categoryName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category Name
              </label>
              <input
                id="categoryName"
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-3 px-6 rounded-lg font-semibold text-white transition-all
                ${
                  editId
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }
                disabled:opacity-50 disabled:cursor-not-allowed
                shadow-md hover:shadow-lg transform hover:-translate-y-0.5
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : editId ? (
                "Update Category"
              ) : (
                "Create Category"
              )}
            </button>
          </form>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              All Categories
            </h2>

            {fetching ? (
              <div className="text-center py-10 text-gray-500">
                Loading categories...
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No categories found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((cat, index) => (
                      <tr key={cat._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {cat.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(cat)}
                            className="text-amber-600 hover:text-amber-900 mr-4 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(cat._id)}
                            className="text-red-600 hover:text-red-900 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Category;