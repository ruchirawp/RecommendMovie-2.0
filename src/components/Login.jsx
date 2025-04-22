import { React, useState, useEffect, useContext } from "react";
import loginService from "../services/login.js";
import { UserContext } from "../UserContext";
import { useDispatch } from 'react-redux';
import { setTier } from '../redux/slices/tierSlice'; // adjust the path if needed


import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  // MDBCheckbox,
} from "mdb-react-ui-kit";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  // const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  //effect hook to check if user is already logged in by checking the local storage for a user object
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const userFromStorage = JSON.parse(loggedUserJSON);
      setUser(userFromStorage);
      dispatch(setTier(user.user.tier));
    } else {
      console.log("USER NOT LOGGED IN");
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        email,
        password,
      });
      setUser(user);
      setPassword("");
      setEmail("");
      setMessage("LOGGED IN");

      //save the user to local storage
      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage("Invalid credentials. Please try again.");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <MDBContainer fluid >
      <MDBCard className="text-black LoginContainer" style={{ borderRadius: "25px" }}>
        <MDBCardBody className="FormAlign">
          <MDBRow>
            <MDBCol
              md="12"
              lg="12"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <form onSubmit={handleLogin} className="LoginForm">
                <p className="text-center h1 mb-5 mx-1 mx-md-4 formHeader">
                  Sign In
                </p>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" className="formIcons"/>
                  <MDBInput
                    label="Your Email"
                    name="Email"
                    id="form2"
                    type="email"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" className="formIcons"/>
                  <MDBInput
                    label="Password"
                    id="form3"
                    name="Password"
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </div>

                <MDBBtn className="mb-4 loginbtn" size="lg">
                  Login
                </MDBBtn>
              </form>
                <p>{message}</p>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
