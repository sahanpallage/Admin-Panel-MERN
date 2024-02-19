import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllStudents();
  }, []);

  function getAllStudents() {
    fetch("http://localhost:8080/student/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data.students);
      });
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Student List</h2>
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
                    src={`http://localhost:8080/${user?.image}`}
                    alt={user.name}
                    width="50"
                  />
                </td>
                <td>{user.status}</td>
                <td>
                  <span>
                    <Link to="/create" className="btn btn-success">
                      Add
                    </Link>
                  </span>
                  <Link to="/update" className="btn btn-primary">
                    Edit
                  </Link>
                  <Link to="/delete" className="btn btn-danger">
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
