import { useState, useEffect } from "react";
import customerToast from "./components/common/CustomToast";
import { Link } from "react-router-dom";

export default function Student() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllStudents();
  }, []);

  function getAllStudents() {
    fetch("http://localhost:8080/student/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data.students);
      });
  }

  function deleteStudent(id) {
    fetch(`http://localhost:8080/student/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getAllStudents();
        customerToast("Student Deleted Successfully!", "error");
      })
      .catch((err) => {
        console.log(err);
        customerToast("Failed to Delete Student!", "error");
      });
  }

  return (
    <div className="d-flex vh-100 bg-ash justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Student List</h2>
          <div className="ml-auto">
            <Link to="/create" className="btn btn-success">
              <i class="fa fa-plus" aria-hidden="true"></i>
              Add
            </Link>
          </div>
        </div>
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Image</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user?._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>
                  <img
                    src={`${user?.image}`}
                    alt={user.name}
                    width="60"
                    height="60"
                  />
                </td>
                <td>{user.status}</td>
                <td>
                  <Link
                    to={`/update?${user?._id}`}
                    className="btn btn-primary"
                    style={{ marginRight: "12px" }}
                  >
                    <i className="fas fa-edit mr-2"></i>
                    Edit
                  </Link>
                  <Link
                    onClick={() => deleteStudent(user._id)}
                    className="btn btn-danger"
                  >
                    <i className="fas fa-trash mr-2"></i>
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
