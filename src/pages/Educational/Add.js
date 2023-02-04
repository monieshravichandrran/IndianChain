import React,{useState} from "react";

const EducationalAdd = () => {
    const [studentEmail, setStudentEmail] = useState();
    const [uploadedFile, setUploadedFile] = useState();

    return (<>
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Email of the Student
                </label>
                <input value={studentEmail} onClick={(event) => { setStudentEmail(event.target.value) }} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="eventname" type="text" placeholder="Event Name" />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Upload file
                </label>
                <input value={uploadedFile} onClick={(event) => { setUploadedFile(event.target.value) }} class="shadow h-40 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="EventDescription" type="text" placeholder="Event Description" />
            </div>
        </div>
    </>)
}

export default EducationalAdd;