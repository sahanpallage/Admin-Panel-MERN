import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import customerToast from "../components/common/CustomToast";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const signIn = async (token, payload) => {
    try {
      const response = await axios.post("http://localhost:8080/user/signIn", {
        ...(token && { tokenId: token }),
        ...(!token && { ...payload }),
      });
      if (response?.data?.token) {
        setIsAuthenticated(true);
        localStorage.setItem("accessToken", response.data.token);
        window.location.replace("http://localhost:3000/students");
        customerToast("User Successfully logged in !", "success");
      } else {
        customerToast("Invalid credentials", "error");
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      customerToast("Invalid credentials", "error");
    }
  };

  const signUp = async (payload) => {
    try {
      const response = await axios.post("http://localhost:8080/user/signup", {
        ...payload,
      });
      console.log(response);
      if (response?.data?.token) {
        setIsAuthenticated(true);
        localStorage.setItem("accessToken", response.data.token);
        window.location.replace("http://localhost:3000/students");
        customerToast("User Successfully logged in !", "success");
      } else {
        console.log(response);
        customerToast("Invalid credentials", "error");
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      customerToast(error?.response?.data?.error, "error");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return { isAuthenticated, signIn, logout, signUp };
};

export default useAuth;
