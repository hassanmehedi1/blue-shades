import { useState } from "react";
import { orderData } from "../utils/fakeOrderData";

const Orders = () => {
  // State variables
  const [selectedTab, setSelectedTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10; // Number of orders to display per page

  // Filter orders based on the selected tab
  const filteredOrders = orderData.filter((order) => {
    if (selectedTab === "All") {
      return true;
    } else {
      return order.deliveryType === selectedTab;
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // Handle tab selection
  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1); // Reset pagination to first page
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl text-white font-bold mb-8 text-center">
          Order Management
        </h1>

        {/* // Tabs  */}
        <div className="flex justify-center mb-4">
          <button
            className={`${
              selectedTab === "All"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } px-4 py-2 rounded-l`}
            onClick={() => handleTabSelect("All")}
          >
            All Orders
          </button>
          <button
            className={`${
              selectedTab === "Regular"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } px-4 py-2`}
            onClick={() => handleTabSelect("Regular")}
          >
            Regular Delivery
          </button>
          <button
            className={`${
              selectedTab === "Express"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } px-4 py-2 rounded-r`}
            onClick={() => handleTabSelect("Express")}
          >
            Express Delivery
          </button>
        </div>

        {/* Table Start  */}
        <table className="w-full border-collapse bg-white shadow-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border text-gray-700">Order ID</th>
              <th className="py-2 px-4 border text-gray-700">Customer Name</th>
              <th className="py-2 px-4 border text-gray-700">Delivery Type</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border">{order.id}</td>
                <td className="py-2 px-4 border">{order.customerName}</td>
                <td className="py-2 px-4 border">{order.deliveryType}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } px-4 py-2 mx-1`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
