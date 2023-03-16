import React from "react";
import { ImCross } from "react-icons/im";
import { GiCheckMark } from "react-icons/gi"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
const TableItem = ({ from, type, user }) => {
    const dispatch = useDispatch();
    const { accounts, contract } = useSelector((state) => state);
    const acceptHandler = async () => {
        const fromAddress = await contract.methods.getAddress(from).call({from: accounts[0]});
        console.log(fromAddress,accounts[0])
        if (type == 1) {
            console.log(fromAddress.data.address);
            try {
                await contract.methods.provideReadAccess(fromAddress).send({ from: accounts[0], gas: "6100000" });
            } catch (err) {
                console.log(err);
            }
        }
        else if (type == 2) {
            try {
                await contract.methods.provideWriteAccess(fromAddress).send({ from: accounts[0], gas: "6100000" });
            } catch (err) {

            }
        }
    }

    const rejectHandler = () => {

    }

    return (
        <tr class="border-b bg-gray-800 boder-gray-900">
            <td class="text-sm md:text-md text-white font-sans px-2 md:px-6 py-4 whitespace-nowrap">
                {from}
            </td>
            <td class="text-sm md:text-md text-white font-sans px-2 md:px-6 py-4 whitespace-nowrap">
                {type == 1 ? "Read Access" : "Write Access"}
            </td>
            <td class="text-sm md:text-md text-white font-sans px-2 md:px-6 py-4 whitespace-nowrap">
                <button
                    class="h-7 w-7 rounded-full ring-2 ring-white text-white bg-green-500 p-1 text-xl"
                    onClick={acceptHandler}
                >
                    <GiCheckMark />
                </button>
            </td>
            <td class="text-sm md:text-md text-white font-sans px-2 md:px-6 py-4 whitespace-nowrap">
                <button
                    class="h-7 w-7 rounded-full ring-2 ring-white text-white bg-red-500 p-1 text-xl"
                    onClick={rejectHandler}
                >
                    <ImCross />
                </button>
            </td>
        </tr>
    )
}

export default TableItem;