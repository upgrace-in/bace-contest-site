import React, { useState } from "react";

type DataItem = {
  id: string;
  fullName: string;
  email: string;
  emailLinkedName: string;
  contactNumber: string;
  institutionName: string;
  category: string;
  enrollmentID: string;
  [key: string]: any; // To handle dynamic keys like QZ-1734779069569-orc4kp
};

type Props = {
  data?: DataItem[] | null; // Data can be undefined or null
};

const DataDisplayComponent: React.FC<Props> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle cases where data is null, undefined, or empty
  if (!data || data.length === 0) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500 text-center">
          No data available to display.
        </h1>
      </div>
    );
  }

  // Filter data based on the search term
  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">
        User Data Table
      </h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="text-black w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-black">
                Full Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-black">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-black">
                Contact Number
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-black">
                Institution Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-black">
                Category
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-black">
                Enrollment ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-black">
                Result (Out of 100)
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-300`}
                >
                  
                  <td className="border border-gray-300 px-4 py-2 text-black">
                    {item.fullName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-black">
                    {item.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-black">
                    {item.contactNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-black">
                    {item.institutionName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-black">
                    {item.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-black">
                    {item.enrollmentID}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-black">
                    {Object.keys(item)
                      .filter((key) => key.startsWith("QZ-"))
                      .map((key) => {
                        const quizData = item[key];
                        return (
                          <div key={key}>
                            {quizData.results.correctAnswers}
                          </div>
                        );
                      })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="text-center text-gray-500 py-4 text-black"
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataDisplayComponent;
