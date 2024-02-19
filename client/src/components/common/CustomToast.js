import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customerToast = (message, type) => {
  if (type === "success") {
    toast.success(message, {
      transition: Flip,
      theme: "colored",
    });
  } else if (type === "error") {
    toast.error(message, {
      transition: Flip,
      theme: "colored",
    });
  } else if (type === "info") {
    toast.info(message, {
      transition: Flip,
      theme: "colored",
    });
  }
};

export default customerToast;
