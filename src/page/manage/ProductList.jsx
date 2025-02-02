import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);
  console.log({ productData });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Calculate the current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="font-semibold text-2xl">Product List</h1>
      <div className="flex justify-end">
        <Link to="/manage/newproduct">
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md ">
            Add new Product
          </button>
        </Link>
      </div>
      <div className="flex justify-center my-10">
        <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text text-black uppercase bg-gray-50 dark:bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SN
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product, index) => (
                <tr key={index} className={`bg-white border-b`}>
                  <td className="px-6 py-4">{indexOfFirstItem + index + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    {product.name}
                  </th>
                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                    Rs {product.price}
                  </td>
                  <td className="px-6 py-8 flex h-28 gap-6 items-center">
                    <a href={`/manage/editproduct/${product._id}`}>
                      <FiEdit className="w-4 h-4" />
                    </a>
                    <RiDeleteBin6Line
                      className="w-4 h-4"
                      onClick={() => dispatch(deleteProductById(product._id))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-amber-500 text-white px-4 py-2 rounded-md disabled:bg-amber-200 disabled:text-gray-400"
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= productData.length}
          className="bg-amber-500 text-white px-4 py-2 rounded-md disabled:bg-amber-200 disabled:text-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
