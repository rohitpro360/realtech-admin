// // import React, { useEffect, useState } from "react";
// // import CrudTable from "./CrudTable";
// // import axios from "axios";

// // function Dashboard() {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Fetch all products from your backend
// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:5000/api/products") // change URL when deployed
// //       .then((res) => setProducts(res.data))
// //       .catch((err) => console.error("❌ Error fetching products:", err))
// //       .finally(() => setLoading(false));
// //   }, []);

// //   return (
// //     <div className="space-y-6">
// //       {/* Stats Section */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {[ 
// //           { title: "Products", value: products.length },
// //           { title: "Orders", value: "89" },
// //           { title: "Users", value: "1245" },
// //           { title: "Revenue", value: "$12,430" },
// //         ].map((item) => (
// //           <div
// //             key={item.title}
// //             className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition"
// //           >
// //             <h2 className="text-gray-500">{item.title}</h2>
// //             <p className="text-2xl font-bold text-gray-800">{item.value}</p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* CRUD Table */}
// //       {loading ? (
// //         <div className="text-center text-gray-500">Loading products...</div>
// //       ) : (
// //         <CrudTable data={products} refreshData={setProducts} />
// //       )}
// //     </div>
// //   );
// // }

// // export default Dashboard;

// import React, { useEffect, useState } from "react";
// import CrudTable from "./CrudTable";
// import axios from "axios";
// import {
//   FaBox,
//   FaShoppingCart,
//   FaUsers,
//   FaDollarSign,
// } from "react-icons/fa";

// function Dashboard() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all products from backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/products") // update on deploy
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("❌ Error fetching products:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   const stats = [
//     {
//       title: "Products",
//       value: products.length,
//       icon: <FaBox />,
//       gradient: "from-indigo-500 to-blue-500",
//     },
//     {
//       title: "Orders",
//       value: "89",
//       icon: <FaShoppingCart />,
//       gradient: "from-pink-500 to-rose-500",
//     },
//     {
//       title: "Users",
//       value: "1,245",
//       icon: <FaUsers />,
//       gradient: "from-green-500 to-emerald-500",
//     },
//     {
//       title: "Revenue",
//       value: "$12,430",
//       icon: <FaDollarSign />,
//       gradient: "from-yellow-400 to-orange-500",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
//       {/* Header */}
//       <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
//         👋 Welcome, Admin
//       </h1>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((item, index) => (
//           <div
//             key={index}
//             className={`bg-gradient-to-br ${item.gradient} text-white p-6 rounded-2xl shadow-lg flex items-center justify-between transform hover:scale-105 transition-all duration-300`}
//           >
//             <div>
//               <h2 className="text-lg opacity-90">{item.title}</h2>
//               <p className="text-3xl font-bold mt-1">{item.value}</p>
//             </div>
//             <div className="text-4xl opacity-80">{item.icon}</div>
//           </div>
//         ))}
//       </div>

//       {/* Divider */}
//       <hr className="my-10 border-gray-300 dark:border-gray-700" />

//       {/* Table Section */}
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
//             Manage Products
//           </h3>
//           <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition">
//             + Add Product
//           </button>
//         </div>

//         {loading ? (
//           <div className="text-center py-10 text-gray-500 dark:text-gray-300">
//             Loading products...
//           </div>
//         ) : products.length > 0 ? (
//           <CrudTable data={products} refreshData={setProducts} />
//         ) : (
//           <div className="text-center py-10 text-gray-400 dark:text-gray-300">
//             No products found. Add one to get started.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;






import React, { useEffect, useState } from "react";
import CrudTable from "./CrudTable";
import axios from "axios";
import { FaBox, FaShoppingCart, FaUsers, FaDollarSign } from "react-icons/fa";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      title: "Products",
      value: products.length,
      icon: <FaBox />,
      gradient: "from-indigo-500 to-blue-500",
    },
    
  ];

  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold mb-8">👋 Welcome, Admin</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${item.gradient} text-white p-6 rounded-2xl shadow-lg flex items-center justify-between transform hover:scale-105 transition-all duration-300`}
          >
            <div>
              <h2 className="text-lg opacity-90">{item.title}</h2>
              <p className="text-3xl font-bold mt-1">{item.value}</p>
            </div>
            <div className="text-4xl opacity-80">{item.icon}</div>
          </div>
        ))}
      </div>

      <hr className="my-10 border-gray-300 dark:border-gray-700" />

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        {loading ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-300">
            Loading products...
          </div>
        ) : products.length > 0 ? (
          <CrudTable data={products} refreshData={setProducts} />
        ) : (
          <div className="text-center py-10 text-gray-400 dark:text-gray-300">
            No products found. Add one to get started.
          </div>
        )}
      </div>
    </div>
  );
}
