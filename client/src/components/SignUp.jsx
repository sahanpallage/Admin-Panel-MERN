import { Button, Form, Container } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAuth from "../auth/Auth.js";

function SignUp() {
  const { signUp } = useAuth();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    email: Yup.string().email().required("email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSignUp = (values) => {
    console.log(values);
    signUp(values);
  };

  return (
    <div className="d-flex vh-100 bg-light-gray justify-content-center align-items-center">
      <div className="w-50 bg-ash rounded p-3">
        <Container fluid>
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter user email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
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

                <div className="d-flex">
                  <Button className="" type="submit" variant="primary">
                    Sign up
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    </div>
  );
}

export default SignUp;
