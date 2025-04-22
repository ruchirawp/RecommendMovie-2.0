import { React, useState, useEffect, useContext } from "react";
import registerService from "../services/register";
import { UserContext } from "../UserContext";
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
} from "mdb-react-ui-kit";
import { useDispatch } from 'react-redux';
import { setTier } from '../redux/slices/tierSlice'; // adjust the path if needed


const Register = () => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  //effect hook to check if user is already logged in by checking the local storage for a user object
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      dispatch(setTier(user.user.tier));
    }
  }, []);

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const user = await registerService.register({
        name,
        email,
        password,
      });
      setUser(user);
      dispatch(setTier(user.user.tier));
      setName("");
      setPassword("");
      setEmail("");
      setMessage("Registered!");

      //save the user to local storage
      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {

      if(!name)
      {
        setMessage("Please Enter a Name.")
      }
      else if(!email){
        setMessage("Please Enter an Email.")
      }
      else{
        setMessage("Email Exists Already. Try Again.")
      }
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard
        className="text-black LoginContainer"
        style={{ borderRadius: "25px" }}
      >
        <MDBCardBody className="FormAlign">
          <MDBRow>
            <MDBCol
              md="12"
              lg="12"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <form onSubmit={handleRegister} className="LoginForm">
                
                <p className="text-center h1 mb-5 mx-1 mx-md-4 formHeader">
                  Sign up
                </p>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon
                    fas
                    icon="user me-3"
                    size="lg"
                    className="formIcons"
                  />
                  <MDBInput
                    label="Your Name"
                    id="form1"
                    type="text"
                    className="w-100"
                    name="Username"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon
                    fas
                    icon="envelope me-3"
                    size="lg"
                    className="formIcons"
                  />
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
                  <MDBIcon
                    fas
                    icon="lock me-3"
                    size="lg"
                    className="formIcons"
                  />
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
                  Register
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
export default Register;
