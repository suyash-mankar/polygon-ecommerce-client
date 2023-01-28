import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../actions/userAction";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import "../styles/loginPage.scss";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const redirectLink = location.search
    ? `/user/${location.search.split("=")[1]}`
    : "/";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirectLink);
    }
  }, [dispatch, error, isAuthenticated, redirectLink, loading]);

  return (
    <div className="signin_page_container">
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleFormSubmit} className="signup_form">
          <h1 style={{ marginBottom: "40px" }}>SignIn</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Email address<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Password<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{ width: "50%" }}>
            LogIn
          </Button>
        </Form>
      )}
    </div>
  );
}

export default LoginPage;
