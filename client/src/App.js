import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import Student from "./Student";
import CreateStudent from "./CreateStudent";
import UpdateStudent from "./UpdateStudent";
import { GoogleLogin } from "./GoogleLogin";
import LoginSignUp from "./components/LoginSignup";
import ProtectedRoute from "./components/common/ProtectedRoute";
import useAuth from "./auth/Auth.js";
import SignUp from "./components/SignUp.jsx";
import NewComponent from "./components/new.jsx";

function App() {
  const isAuthenticated = localStorage.getItem("accessToken");
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoute auth={isAuthenticated} />}>
            <Route path="/students" element={<Student />} />
            <Route path="/create" element={<CreateStudent />} />
            <Route path="/update" element={<UpdateStudent />} />
          </Route>
        </Routes>
        <ToastContainer position="top-center" autoClose={2000} />
        <NewComponent />
      </Router>
    </div>
  );
}

export default App;
