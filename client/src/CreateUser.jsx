import { useState } from "react";
import axios from "axios";

export default function CreateUser() {
  const [_id, setId] = useState();
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [status, setStatus] = useState("");
  const [image, setImage] = useState();

  function convertToBase64(e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const avatarImageStyle = {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    objectFit: "cover",
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
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
            <label htmlFor="">Image</label>
            <input
              accept="image/*"
              type="file"
              className="form-control cursor-pointer mt-2"
              onChange={convertToBase64}
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
            <label htmlFor="">Status</label>
            <input
              type="text"
              placeholder="Enter Student Status"
              className="form-control"
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <button className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
