import { Button, Form, Container } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GoogleLogin } from "../GoogleLogin";
import useAuth from "../auth/Auth.js";
import { Link } from "react-router-dom";

function LoginSignUp() {
  const { signIn } = useAuth();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values) => {
    console.log(values);
    signIn(null, values);
  };

  return (
    <div className="d-flex vh-100 bg-light-gray justify-content-center align-items-center">
      <div className="w-50 bg-ash rounded p-3">
        <Container fluid>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>User Name</Form.Label>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter user name"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                <div className="d-flex ">
                  <Button className="" type="submit" variant="primary">
                    Login
                  </Button>
                  <div style={{ marginLeft: "20px" }}>
                    <GoogleLogin />
                  </div>
                </div>
                <div className="text-center mt-3">
                  <p className="font-bold">
                    Not a member? <Link to="/signup">Register</Link>
                  </p>
                  <p className="font-bold">or sign up with:</p>
                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-google"></i>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    </div>
  );
}

export default LoginSignUp;
