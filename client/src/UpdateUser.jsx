export default function UpdateUser() {
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form action="">
          <h2>Update Student</h2>
          <div className="mb-2">
            <label htmlFor="">ID</label>
            <input
              type="number"
              placeholder="Enter ID"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Student Name"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="number"
              placeholder="Enter Student Age"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Status</label>
            <input
              type="text"
              placeholder="Enter Student Status"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <button className="btn btn-success">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
