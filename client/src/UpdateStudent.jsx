import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import customerToast from "./components/common/CustomToast";
import axios from "axios";

export default function UpdateStudent() {
  const [studentDetails, setStudentDetails] = useState({});
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    const id = location.search.split("?")[1];
    console.log(id);
    axios
      .get(`http://localhost:8080/student/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((result) => {
        console.log(result.data);
        setStudentDetails(result.data.student);
      });
  }, [location.search]);

  const navigate = useNavigate();

  const avatarImageStyle = {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    objectFit: "cover",
  };

  const convertToBase64 = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setStudentDetails({ ...studentDetails, image: reader.result });
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const updateStudentDetails = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8080/student/update/${studentDetails._id}`,
        {
          _id: studentDetails._id,
          name: studentDetails.name,
          age: studentDetails.age,
          image: studentDetails.image,
          status: studentDetails.status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data);
        customerToast("Student Updated Successfully!", "info");
        navigate("/students");
      })
      .catch((err) => {
        console.log(err);
        customerToast("Failed to Update Student!", "error");
      });
  };

  return (
    <div className="d-flex vh-100 bg-ash justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form action="" onSubmit={updateStudentDetails}>
          <h2>Update Student</h2>
          <div className="mb-2">
            <label htmlFor="">ID</label>
            <input
              type="number"
              placeholder="Enter ID"
              className="form-control"
              onChange={(e) =>
                setStudentDetails({ ...studentDetails, _id: e.target.value })
              }
              value={studentDetails?._id}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Student Name"
              className="form-control"
              value={studentDetails?.name}
              onChange={(e) =>
                setStudentDetails({ ...studentDetails, name: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="number"
              placeholder="Enter Student Age"
              className="form-control"
              value={studentDetails?.age}
              onChange={(e) =>
                setStudentDetails({ ...studentDetails, age: e.target.value })
              }
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
              onChange={(e) => convertToBase64(e)}
              // value={studentDetails?.image}
            />
            {studentDetails?.image === "" || studentDetails?.image === null ? (
              ""
            ) : (
              <div className="mt-2">
                <img
                  style={avatarImageStyle}
                  src={studentDetails?.image}
                  alt="Preview"
                />
              </div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="">Status</label>
            <select
              type="text"
              placeholder="Enter Student Status"
              className="form-select mt-1 block w-full"
              value={studentDetails?.status}
              onChange={(e) =>
                setStudentDetails({ ...studentDetails, status: e.target.value })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="mb-2">
            <button className="btn btn-success">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
