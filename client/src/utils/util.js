import { jwtDecode } from 'jwt-decode'
export const convertToBase64 = (e, setImage) => {
  let reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = () => {
    setImage(reader.result);
  };
  reader.onerror = (error) => {
    console.log("Error: ", error);
  };
};


export const decodeJwt = (token) => {
  return jwtDecode(token)
}