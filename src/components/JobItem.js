import React from "react";
import { ImCross } from "react-icons/im";
import { GiCheckMark } from "react-icons/gi"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
const JobItem = ({ organization, description, title, _id}) => {
  const dispatch = useDispatch();
  const { accounts, contract } = useSelector((state) => state);
  const user = useSelector((state) => state.auth);

  const jobApply = async() => {
    const data = await axios.post(process.env.REACT_APP_BACKEND_API_BASE_URL+"/apply-job",{jobId: _id, email: user.user})
  }
  return (
    <tr class="border-b bg-gray-800 boder-gray-900">
      <td class="text-sm md:text-md text-white font-sans px-2 md:px-6 py-4 whitespace-nowrap">
        {organization}
      </td>
      <td class="text-sm md:text-md text-white font-sans px-2 md:px-6 py-4 whitespace-nowrap">
        {title}
      </td>
      <td class="text-sm md:text-md text-white font-sans px-2 md:px-6 py-4 whitespace-nowrap">
        {description}
      </td>
      <td class="text-sm md:text-md text-white font-sans px-2 md:px-6 py-4 whitespace-nowrap">
        <button
          class="h-7 w-7 rounded-full ring-2 ring-white text-white bg-green-500 p-1 text-xl"
          onClick={jobApply}
        >
          <GiCheckMark />
        </button>
      </td>
    </tr>
  )
}

export default JobItem;