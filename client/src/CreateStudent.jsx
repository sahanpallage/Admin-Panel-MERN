import { useState } from "react";
import axios from "axios";
import customerToast from "./components/common/CustomToast.js";
import { convertToBase64 } from "./utils/util.js";
import { useNavigate } from "react-router-dom";

export default function CreateStudent() {
  const [_id, setId] = useState();
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState();

  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/student/add", {
        _id,
        name,
        age,
        status,
        image,
      })
      .then((result) => {
        console.log(result.data);
        customerToast("Student Added Successfully!", "success");
        navigate("/students");
      })
      .catch((err) => {
        console.log(err);
        customerToast("Failed to Add Student!", "error");
      });
  };

  const avatarImageStyle = {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    objectFit: "cover",
  };

  return (
    <div className="d-flex vh-100 bg-light-gray justify-content-center align-items-center">
      <div className="w-50 bg-ash rounded p-3">
        <form action="" onSubmit={Submit}>
          <h2>Add Student</h2>
          <div className="mb-2">
            <label htmlFor="">ID</label>
            <input
              type="number"
              placeholder="Enter ID"
              className="form-control"
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Student Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="number"
              placeholder="Enter Student Age"
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              accept="image/*"
              type="file"
              className="form-control cursor-pointer mt-2 "
              onChange={(e) => convertToBase64(e, setImage)}
            />
            {image === "" || image === null ? (
              ""
            ) : (
              <div className="mt-2">
                <img style={avatarImageStyle} src={image} alt="Preview" />
              </div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="" className="block text-sm font-medium">
              Status
            </label>
            <select
              type="text"
              placeholder="Enter Student Status"
              className="form-select mt-1 block w-full"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="mb-4">
            <button className="btn bg-success font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
