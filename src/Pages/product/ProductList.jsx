// // import { useEffect, useState, useMemo } from "react";
// // import DataTable from "react-data-table-component";
// // import { getProductsApi,updateHomeApi } from "./product.api";

// // const ProductList = () => {
// //   const [products, setProducts] = useState([]);
// //   const [filteredProducts, setFilteredProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState("");
// //   const [selectedRows, setSelectedRows] = useState([]);

// //   const fetchProducts = async () => {
// //     try {
// //       const res = await getProductsApi();
// //       const data = res.data.data || res.data;
// //       setProducts(data);
// //       setFilteredProducts(data);
// //     } catch (error) {
// //       console.error(error);
// //       alert("Failed to fetch products");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProducts();
// //   }, []);

// //   // 🔎 Search Filter
// //   useEffect(() => {
// //     const result = products.filter((item) =>
// //       item.name.toLowerCase().includes(search.toLowerCase())
// //     );
// //     setFilteredProducts(result);
// //   }, [search, products]);

// //   // 🗑 Delete Single
// //   const handleDelete = (id) => {
// //     const updated = products.filter((item) => item._id !== id);
// //     setProducts(updated);
// //     setFilteredProducts(updated);
// //   };

// //   // 🗑 Delete Selected
// //   const handleDeleteSelected = () => {
// //     const ids = selectedRows.map((row) => row._id);
// //     const updated = products.filter((item) => !ids.includes(item._id));
// //     setProducts(updated);
// //     setFilteredProducts(updated);
// //     setSelectedRows([]);
// //   };

// //   const columns = useMemo(
// //     () => [
// //       {
// //         name: "Image",
// //         cell: (row) =>
// //           row.images?.length > 0 ? (
// //             <img
// //               src={row.images[0]}
// //               alt={row.name}
// //               className="h-12 w-12 object-cover rounded"
// //             />
// //           ) : (
// //             "No Image"
// //           ),
// //         width: "100px",
// //       },
// //       {
// //         name: "Product Name",
// //         selector: (row) => row.name,
// //         sortable: true,
// //       },
// //       {
// //         name: "Description",
// //         selector: (row) => row.description,
// //         sortable: true,
// //         wrap: true,
// //       },
// //       {
// //         name: "Actions",
// //         cell: (row) => (
// //           <div className="flex gap-2">
// //             <button
// //               onClick={() => alert("Edit " + row.name)}
// //               className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
// //             >
// //               Edit
// //             </button>
// //             <button
// //               onClick={() => handleDelete(row._id)}
// //               className="px-3 py-1 text-sm bg-red-500 text-white rounded"
// //             >
// //               Delete
// //             </button>
// //           </div>
// //         ),
// //       },
// //     ],
// //     [products]
// //   );

// //   const customStyles = {
// //     headCells: {
// //       style: {
// //         fontWeight: "bold",
// //         fontSize: "14px",
// //       },
// //     },
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 px-6 py-10">
// //       <h2 className="text-3xl font-bold text-center mb-6">
// //         Product Management
// //       </h2>

// //       <div className="bg-white p-5 rounded-xl shadow-md">

// //         {/* 🔎 Search + Delete Selected */}
// //         <div className="flex justify-between mb-4">
// //           <input
// //             type="text"
// //             placeholder="Search product..."
// //             className="border px-3 py-2 rounded w-64"
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />

// //           {selectedRows.length > 0 && (
// //             <button
// //               onClick={handleDeleteSelected}
// //               className="bg-red-600 text-white px-4 py-2 rounded"
// //             >
// //               Delete Selected ({selectedRows.length})
// //             </button>
// //           )}
// //         </div>

// //         <DataTable
// //           columns={columns}
// //           data={filteredProducts}
// //           progressPending={loading}
// //           pagination
// //           selectableRows
// //           onSelectedRowsChange={({ selectedRows }) =>
// //             setSelectedRows(selectedRows)
// //           }
// //           highlightOnHover
// //           striped
// //           responsive
// //           customStyles={customStyles}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductList;


// import { useEffect, useMemo, useState } from "react";
// import DataTable from "react-data-table-component";
// import { getProductsApi } from "./product.api";
// import { updateHomeApi } from "./product.api";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingProduct, setEditingProduct] = useState(null);

//   const fetchProducts = async () => {
//     try {
//       const res = await getProductsApi();
//       const data = res.data.data || res.data;
//       setProducts(data);
//       setFilteredProducts(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // ✅ Handle Update Submit
//   const handleUpdate = async () => {
//     try {
//       await updateHomeApi(editingProduct._id, {
//         name: editingProduct.name,
//         description: editingProduct.description,
//       });

//       alert("Updated Successfully");

//       fetchProducts(); // refresh data
//       setEditingProduct(null);
//     } catch (error) {
//       console.error(error);
//       alert("Update Failed");
//     }
//   };

//   const columns = useMemo(
//     () => [
//       {
//         name: "Product",
//         selector: (row) => row.name,
//         sortable: true,
//       },
//       {
//         name: "Description",
//         selector: (row) => row.description,
//         wrap: true,
//       },
//       {
//         name: "Actions",
//         cell: (row) => (
//           <button
//             onClick={() => setEditingProduct(row)}
//             className="px-3 py-1 bg-blue-500 text-white rounded"
//           >
//             Edit
//           </button>
//         ),
//       },
//     ],
//     []
//   );

//   return (
//     <div className="p-10">
//       <DataTable
//         columns={columns}
//         data={filteredProducts}
//         pagination
//         progressPending={loading}
//       />

//       {/* ✅ Edit Modal */}
//       {editingProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-xl w-96">
//             <h3 className="text-lg font-bold mb-4">Edit Product</h3>

//             <input
//               type="text"
//               value={editingProduct.name}
//               onChange={(e) =>
//                 setEditingProduct({
//                   ...editingProduct,
//                   name: e.target.value,
//                 })
//               }
//               className="w-full border px-3 py-2 mb-3 rounded"
//             />

//             <textarea
//               value={editingProduct.description}
//               onChange={(e) =>
//                 setEditingProduct({
//                   ...editingProduct,
//                   description: e.target.value,
//                 })
//               }
//               className="w-full border px-3 py-2 mb-3 rounded"
//             />

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setEditingProduct(null)}
//                 className="px-4 py-2 bg-gray-400 text-white rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleUpdate}
//                 className="px-4 py-2 bg-green-600 text-white rounded"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;


// import { useEffect, useMemo, useState } from "react";
// import DataTable from "react-data-table-component";
// import {
//   getProductsApi,
//   updateHomeApi,
//   deleteHomeApi,
// } from "./product.api";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [clearRows, setClearRows] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);

//   // ================= GET =================
//   const fetchProducts = async () => {
//     try {
//       const res = await getProductsApi();
//       const data = res.data.data || res.data;
//       setProducts(data);
//       setFilteredProducts(data);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // ================= SEARCH =================
//   useEffect(() => {
//     const result = products.filter((item) =>
//       item.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredProducts(result);
//   }, [search, products]);

//   // ================= UPDATE =================
//   const handleUpdate = async () => {
//     try {
//       await updateHomeApi(editingProduct._id, {
//         name: editingProduct.name,
//         description: editingProduct.description,
//       });

//       alert("Updated Successfully");
//       setEditingProduct(null);
//       fetchProducts();
//     } catch (error) {
//       console.error(error);
//       alert("Update Failed");
//     }
//   };

//   // ================= DELETE SINGLE =================
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure to delete?")) return;

//     try {
//       await deleteHomeApi(id);
//       fetchProducts();
//     } catch (error) {
//       console.error(error);
//       alert("Delete Failed");
//     }
//   };

//   // ================= DELETE MULTIPLE =================
//   const handleDeleteSelected = async () => {
//     if (!window.confirm("Delete selected products?")) return;

//     try {
//       for (let row of selectedRows) {
//         await deleteHomeApi(row._id);
//       }

//       setClearRows(!clearRows);
//       fetchProducts();
//     } catch (error) {
//       console.error(error);
//       alert("Bulk Delete Failed");
//     }
//   };

//   // ================= TABLE COLUMNS =================
//   const columns = useMemo(
//     () => [
//       {
//         name: "Product",
//         selector: (row) => row.name,
//         sortable: true,
//       },
//       {
//         name: "Description",
//         selector: (row) => row.description,
//         wrap: true,
//       },
//       {
//         name: "Actions",
//         cell: (row) => (
//           <div className="flex gap-2">
//             <button
//               onClick={() => setEditingProduct(row)}
//               className="px-3 py-1 bg-blue-500 text-white rounded"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleDelete(row._id)}
//               className="px-3 py-1 bg-red-500 text-white rounded"
//             >
//               Delete
//             </button>
//           </div>
//         ),
//       },
//     ],
//     [selectedRows]
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-10">
//       <div className="bg-white p-6 rounded-xl shadow-lg">

//         {/* Header */}
//         <div className="flex justify-between mb-4">
//           <h2 className="text-xl font-bold">Product Management</h2>

//           {selectedRows.length > 0 && (
//             <button
//               onClick={handleDeleteSelected}
//               className="bg-red-600 text-white px-4 py-2 rounded"
//             >
//               Delete Selected ({selectedRows.length})
//             </button>
//           )}
//         </div>

//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border px-3 py-2 rounded mb-4 w-64"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <DataTable
//           columns={columns}
//           data={filteredProducts}
//           progressPending={loading}
//           pagination
//           selectableRows
//           highlightOnHover
//           striped
//           responsive
//           clearSelectedRows={clearRows}
//           onSelectedRowsChange={({ selectedRows }) =>
//             setSelectedRows(selectedRows)
//           }
//         />
//       </div>

//       {/* ================= EDIT MODAL ================= */}
//       {editingProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-xl w-96">
//             <h3 className="text-lg font-bold mb-4">Edit Product</h3>

//             <input
//               type="text"
//               value={editingProduct.name}
//               onChange={(e) =>
//                 setEditingProduct({
//                   ...editingProduct,
//                   name: e.target.value,
//                 })
//               }
//               className="w-full border px-3 py-2 mb-3 rounded"
//             />

//             <textarea
//               value={editingProduct.description}
//               onChange={(e) =>
//                 setEditingProduct({
//                   ...editingProduct,
//                   description: e.target.value,
//                 })
//               }
//               className="w-full border px-3 py-2 mb-3 rounded"
//             />

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setEditingProduct(null)}
//                 className="px-4 py-2 bg-gray-400 text-white rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleUpdate}
//                 className="px-4 py-2 bg-green-600 text-white rounded"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;


import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import {
  getProductsApi,
  updateHomeApi,
  deleteHomeApi,
} from "./product.api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [clearRows, setClearRows] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // ================= GET =================
  const fetchProducts = async () => {
    try {
      const res = await getProductsApi();
      const data = res.data.data || res.data;
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= SEARCH =================
  useEffect(() => {
    const result = products.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(result);
  }, [search, products]);

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editingProduct.name);
      formData.append("description", editingProduct.description);

      // if new image selected
      if (editingProduct.newImage) {
        formData.append("image", editingProduct.newImage);
      }

      await updateHomeApi(editingProduct._id, formData);

      alert("Updated Successfully");
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await deleteHomeApi(id);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm("Delete selected products?")) return;
    try {
      for (let row of selectedRows) {
        await deleteHomeApi(row._id);
      }
      setClearRows(!clearRows);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Bulk Delete Failed");
    }
  };

  // ================= TABLE COLUMNS =================
  const columns = useMemo(
    () => [
      {
        name: "Image",
        cell: (row) => (
          <img
            src={row.images?.[0]}
            alt="product"
            className="w-16 h-16 object-cover rounded"
          />
        ),
      },
      {
        name: "Product",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Description",
        selector: (row) => row.description,
        wrap: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex gap-2">
            <button
              onClick={() => setEditingProduct(row)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row._id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [selectedRows]
  );

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white p-6 rounded-xl shadow-lg">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Product Management</h2>

          {selectedRows.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete Selected ({selectedRows.length})
            </button>
          )}
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded mb-4 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <DataTable
          columns={columns}
          data={filteredProducts}
          progressPending={loading}
          pagination
          selectableRows
          highlightOnHover
          striped
          responsive
          clearSelectedRows={clearRows}
          onSelectedRowsChange={({ selectedRows }) =>
            setSelectedRows(selectedRows)
          }
        />
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-lg font-bold mb-4">Edit Product</h3>

            {/* Current Image */}
            <img
              src={editingProduct.images?.[0]}
              alt="preview"
              className="w-24 h-24 object-cover mb-3 rounded"
            />

            <input
              type="file"
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  newImage: e.target.files[0],
                })
              }
              className="mb-3"
            />

            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  name: e.target.value,
                })
              }
              className="w-full border px-3 py-2 mb-3 rounded"
            />

            <textarea
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
              className="w-full border px-3 py-2 mb-3 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
