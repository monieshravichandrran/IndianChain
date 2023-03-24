import React from "react";
const RecommendApply = ({ index, email }) => {

  return (
    <tr class="border-b bg-gray-800 boder-gray-900">
      <td class="text-sm md:text-md text-white font-sans px-2 md:px-6 py-4 whitespace-nowrap">
        {index}
      </td>
      <td class="text-sm md:text-md text-white font-sans px-2 md:px-6 py-4 whitespace-nowrap">
        {email}
      </td>
    </tr>
  )
}

export default RecommendApply;