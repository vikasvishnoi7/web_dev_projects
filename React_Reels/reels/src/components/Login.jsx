import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
// import auth from "../firebase"; //////////////////
import firebaseApp from "../firebase";
import { getAuth } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom"; //////
// const auth = getAuth(firebaseApp);//////////////

//----------------------- Material UI--------------------------------------------------
// import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import { makeStyles } from "@mui/styles";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./Login.css";
import insta from "../Assets/Instagram.JPG";
import bg from "../Assets/insta.png";
import img1 from "../Assets/img1.jpg";
import img2 from "../Assets/img2.jpg";
import img3 from "../Assets/img3.jpg";
import img4 from "../Assets/img4.jpg";
import img5 from "../Assets/img5.jpg";
//----------------------- Material UI--------------------------------------------------

const auth = getAuth(); //////////////
function Login() {
  //---------------------ui style------------------

  const useStyles = makeStyles({
    text1: {
      color: "gray",
      textAlign: "center",
    },
    text2: {
      textAlign: "center",
    },
    card2: {
      height: "5vh",
      marginTop: "2%",
    },
  });

  const classes = useStyles();
  //---------------------ui------------------
  //  let { currentUser } = useContext(AuthContext);
  let navigate = useNavigate();
  let { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       setError("");
      setLoader(true);
      // check authentication

      console.log("logging processssssssssssss");
      let res = await login(auth, email, password);
      // console.log(res.user);
      //   setUser(res.user);
      console.log("login............");
      setLoader(false);
      // props.history.push("/")
      navigate("/");
    } catch (err) {
      setError("Authentication failed. Incorrect email or password");
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoader(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="loginWrapper">
      <div
        className="imgcar"
        style={{ backgroundImage: "url(" + bg + ")", backgroundSize: "cover" }}
      >
        <div className="car">
          <CarouselProvider
            visibleSlides={1}
            totalSlides={5}
            naturalSlideWidth={238}
            naturalSlideHeight={423}
            hasMasterSpinner
            isPlaying={true}
            infinite={true}
            dragEnabled={false}
            touchEnabled={false}
          >
            <Slider>
              <Slide index={0}>
                <Image src={img1} />
              </Slide>
              <Slide index={1}>
                <Image src={img2} />
              </Slide>
              <Slide index={2}>
                <Image src={img3} />
              </Slide>
              <Slide index={3}>
                <Image src={img4} />
              </Slide>
              <Slide index={4}>
                <Image src={img5} />
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>

      <div className="loginCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={insta} alt="" />
          </div>
          <CardContent>
            {error != "" && <Alert severity="error">{error}</Alert>}
            <TextField
              id="outlined-basic"
              label="Email"
              // type='email'
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Typography
              className={classes.text2}
              color="primary"
              variant="subtitle1"
            >
              Forget Password ?
            </Typography>
          </CardContent>

          <CardActions>
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              onClick={handleSubmit}
              disabled={loader}
            >
              Log in
            </Button>
          </CardActions>
        </Card>
        <Card variant="outlined" className={classes.card2}>
          <Typography className={classes.text1} variant="subtitle1">
            Don't have an account ?
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Signup
            </Link>
          </Typography>
        </Card>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label htmlFor="">Email</label>
  //         <input
  //           type="email"
  //           value={email}
  //           onChange={(e) => {
  //             setEmail(e.target.value);
  //           }}
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="">Password</label>
  //         <input
  //           type="password"
  //           value={password}
  //           onChange={(e) => {
  //             setPassword(e.target.value);
  //           }}
  //         />
  //       </div>
  //       <button type="submit" disabled={loader}>
  //         Login
  //       </button>
  //     </form>
  //   </div>
  // );
}
export default Login;

/**
 * working code
 * 
 * import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
// import auth from "../firebase"; //////////////////
import firebaseApp from "../firebase";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom"; //////
// const auth = getAuth(firebaseApp);//////////////
const auth = getAuth(); //////////////
function Login() {
  //  let { currentUser } = useContext(AuthContext);
  let navigate = useNavigate();
  let { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      // check authentication

      console.log("logging processssssssssssss");
      let res = await login(auth, email, password);
      // console.log(res.user);
      //   setUser(res.user);
      console.log("login............");
      setLoader(false);
      // props.history.push("/")
      navigate("/");
    } catch (err) {
      setLoader(false);
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" disabled={loader}>
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;
 */

/**
 * import Feed from "./Feed";
 * let { login, currentUser } = useContext(AuthContext);
 * return (
    <div>
      {currentUser != null ? (<>
        <h1>logimmmm</h1>
        <Feed></Feed>
        </>
      ) : (
        <>
          <h1>FireBase Login</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <input type="button" value="submit" onClick={handleSubmit}></input>
        </>
      )}
    </div>
  );
 */
