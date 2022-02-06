import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
// import firebaseApp from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { firestore, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
//----------------------- Material UI--------------------------------------------------
// import * as React from "react";
//npm i pure-react-carousel
//npm install @material-ui/styles
//npm install @mui/material @mui/icons-material @mui/styles
// npm install @emotion/react npm install @emotion/styled
//npm i @material-ui/core  
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./Signup.css";
import insta from "../Assets/Instagram.JPG";
//----------------------- Material UI--------------------------------------------------
const auth = getAuth();
function Signup() {
  //---------------------ui style------------------

  const useStyles = makeStyles({
    text1: {
      color: "gray",
      textAlign: "center",
    },
    card2: {
      height: "5vh",
      marginTop: "2%",
    },
  });

  const classes = useStyles();
  //---------------------ui------------------

  const [error, setError] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState();
  let { signup } = useContext(AuthContext);
  let navigate = useNavigate();
  function handleFileSubmit(e) {
    let file = e?.target?.files[0];
    if (file != null) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (file == null) {
      setError("Please upload profile image first");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    try {
       setError("");
      setLoader(true);
      console.log("signupstaring..");
      let res = await signup(auth, email, password);
      let uid = res.user.uid;
      console.log(uid);

      const uploadTaskListener = ref(storage, `/user/${uid}/profileImage`);
      const uploadTask = uploadBytesResumable(uploadTaskListener, file);

      console.log("uploadTask");

      uploadTask.on("state_changed", fn1, fn2, fn3);
      function fn1(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      }
      function fn2(error) {
        setError(error);
        setTimeout(() => {
          setError("");
        }, 2000);
        setLoader(false);
        return;
      }
      async function fn3() {
        // link get
        console.log("async in");
        let url = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("downoad completed ");
        await setDoc(doc(firestore, "users", uid), {
          email: email,
          userId: uid,
          username,
          profileUrl: url,
          timestamp: serverTimestamp(),
        });
        console.log("uploadTask on");
        setLoader(false);
        navigate("/");
      }
    } catch (err) {
      setError("Please Enter correct data");
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoader(false);
    }
  }

  return (
    <div className="signupWrapper">
      <div className="signupCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={insta} alt="" />
          </div>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              signup to see photos and videos from your friends
            </Typography>
            {error != "" && <Alert severity="error">{error}</Alert>}
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
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

            <Button
              size="small"
              color="secondary"
              fullWidth={true}
              variant="outlined"
              margin="dense"
              startIcon={<CloudUploadIcon />}
              component="label"
              onChange={(e) => {
                handleFileSubmit(e);
              }}
            >
              Upload Profile Image
              <input type="file" accept="image/*" hidden />
            </Button>
          </CardContent>

          <CardActions>
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              onClick={handleSignup}
              disabled={loader}
            >
              Sign up
            </Button>
          </CardActions>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              By signing up, you agree to our Terms, Conditions and Cookies
              policy.
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className={classes.card2}>
          <Typography className={classes.text1} variant="subtitle1">
            Having an account ?
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
}

export default Signup;

/**
 * new working code
 * import React, {  useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
// import firebaseApp from "../firebase";
import { useNavigate } from "react-router-dom";
import { firestore, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const auth = getAuth();
function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState();
  let { signup } = useContext(AuthContext);
  let navigate = useNavigate();
  function handleFileSubmit(e) {
    let file = e?.target?.files[0];
    if (file != null) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    try {
      setLoader(true);
      console.log("signupstaring..");
      let res = await signup(auth, email, password);
      let uid = res.user.uid;
      console.log(uid);

      const uploadTaskListener = ref(storage, `/user/${uid}/profileImage`);
      const uploadTask = uploadBytesResumable(uploadTaskListener, file);

      console.log("uploadTask");

      uploadTask.on("state_changed", fn1, fn2, fn3);
      function fn1(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      }
      function fn2(error) {
        setError(error);
        setLoader(false);
      }
      async function fn3() {
        // link get
        console.log("async in");
        let url = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("downoad completed ");
        await setDoc(doc(firestore, "users", uid), {
          email: email,
          userId: uid,
          username,
          profileUrl: url,
          timestamp: serverTimestamp(),
        });
        console.log("uploadTask on");
        setLoader(false);
        navigate("/");
      }
    } catch (err) {
      setError("");
      setLoader(false);
    }
  }
  return (
    <div>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="">UserName</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
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
        <div>
          <label htmlFor="">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleFileSubmit(e);
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

export default Signup;
 */

/**
 * 
 * completed working coode
 * import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import firebaseApp from "../firebase";
import { useNavigate } from "react-router-dom";
import { storage, firestore, database } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
  serverTimestamp,
} from "firebase/storage";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { async } from "@firebase/util";
// import { async } from 'firebase/util';
const auth = getAuth();
function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState();
  let { signup } = useContext(AuthContext);
  let navigate = useNavigate();
  function handleFileSubmit(e) {
    let file = e?.target?.files[0];
    if (file != null) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    try {
      setLoader(true);
      console.log("signupstaring..");
      let res = await signup(auth, email, password);
      let uid = res.user.uid;
      console.log(uid);
      // const storage = getStorage();////////////////////////////////////////////////
      // const uploadTaskListener = storage.ref(`/user/${uid}`).put(file);
      const uploadTaskListener = ref(storage, `/user/${uid}/profileImage`);
      const uploadTask = uploadBytesResumable(uploadTaskListener, file);

      // const url = await getDownloadURL(uploadTask.ref);
      // const url = await getDownloadURL(uploadTask.ref);

      console.log("uploadTask");

      // await setDoc(doc(firestore, "posts", uid), {
      //   email: email,
      //   userId: uid,
      //   username,
      //   profileUrl: url,
      //   timestamp: database.serverTimestamp(),
      // });
      uploadTask.on("state_changed", fn1, fn2, fn3);
      function fn1(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      }
      function fn2(error) {
        setError(error);
        setLoader(false);
      }
      async function fn3() {
        // link get
        console.log("async in")
        // let downloadurl = await getDownloadURL(uploadTask.ref);
        let url = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("downoad completed ");
        await setDoc(doc(firestore, "post", uid), {
          email: email,
          userId: uid,
          username,
          profileUrl: url,
          // timestamp: database.serverTimestamp(),
        });
        console.log("uploadTask on");
        setLoader(false);
        navigate("/");
      }
      // uploadTask.on("firebase.storage.TaskEvent.STATE_CHANGED", f1, f2, f3);
      // function f1 (snapshot) {
      //   const progress =
      //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //   console.log("Upload is " + progress + "% done");
      //   switch (snapshot.state) {
      //     case "paused":
      //       console.log("Upload is paused");
      //       break;
      //     case "running":
      //       console.log("Upload is running");
      //       break;
      //   }
      // };
      //  function f2 (error){
      //   console.log("errrr", error);
      //   setError(error);
      //   setLoader(false);
      // };
      // async function f3() {
      //   let url = await getDownloadURL(uploadTask.snapshot.ref);
      //   await setDoc(doc(firestore, "user", uid), {
      //     email: email,
      //     userId: uid,
      //     username,
      //     profileUrl: url,
      //     // timestamp: serverTimestamp(),
      //   });
      // };

      // await setDoc(doc(firestore, "posts", uid), {
      //   email: email,
      //   userId: uid,
      //   username,
      //   profileUrl: url,
      //   // timestamp: serverTimestamp(),
      // });
      // uploadTask.on("state_changed", f1, f2, f3);

      //  uploadTask.on('state_changed',f1)
      //   const f1 = async () =>{
      //     console.log("hiiiiiiiiii")
      //    let cc = doc(firestore,"users",uid)
      //    let pay = { email: email, userId: uid };
      //             // let downloadur1 = await getDownloadURL(uploadTask.snapshot.ref)
      //             await setDoc(
      //               cc,pay
      //             );
      //           }

      // const ref = doc(firestore, "users", uid);
      //  await setDoc(ref, {
      //   email: email,
      //    userId: uid,
      // });
      // uploadTask.on("state_changed", null,
      //           (error) => {
      //             alert(error);
      //           },
      //  f1)
      //  async function f1(){

      //             let downloadur1 = await getDownloadURL(uploadTask.snapshot.ref)
      //             await setDoc(doc(firestore, "cities", "LA"), {
      //               name: "Los Angeles",
      //               state: "CA",
      //               country: "USA",
      //             });
      //           }

      // console.log("uploadTask on");
      // function fn1(snapshot) {
      //   // var progress = (snapshort.byteTransferred / snapshort.totalBytes) * 100;
      //   var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //   console.log(percent);
      // }
      // function fn2(error) {
      //   setError(error);
      //   setLoader(false);
      // }
      // async function fn3() {
      //   // let downloadur1 = await uploadTask.snapshort.ref.getDownloadURL();
      //   let downloadur1 = await getDownloadURL(uploadTask.snapshot.ref);
      //   //    setDoc(doc(storage,storage.users, uid)
      //   await setDoc(doc(firestore, "users", uid), {
      //     email: email,
      //     userId: uid,
      //     username,
      //     //   createdAt: serverTimestamp(),
      //     profileUrl: downloadur1,
      //   });
      // setLoader(false);
      // navigate("/");
    } catch (err) {
      setError("");
      setLoader(false);
    }
  }
  return (
    <div>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="">UserName</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
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
        <div>
          <label htmlFor="">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleFileSubmit(e);
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

export default Signup;

 */

/**
 * 
 * import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import firebaseApp from "../firebase";
import { useNavigate } from "react-router-dom";
import { storage, firestore, database } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  serverTimestamp,
} from "firebase/storage";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { async } from "@firebase/util";
// import { async } from 'firebase/util';
const auth = getAuth();
function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState();
  let { signup } = useContext(AuthContext);
  let navigate = useNavigate();
  function handleFileSubmit(e) {
    let file = e?.target?.files[0];
    if (file != null) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    try {
      setLoader(true);
      console.log("signupstaring..");
      let res = await signup(auth, email, password);
      let uid = res.user.uid;
      console.log(uid);
      const storage = getStorage();
      // const uploadTaskListener = storage.ref(`/user/${uid}`).put(file);
      const uploadTaskListener = ref(storage, `/user/${uid}`);
      const uploadTask = await uploadBytes(uploadTaskListener, file);
      const url = await getDownloadURL(uploadTask.ref);
      
      console.log("uploadTask");
      await setDoc(doc(firestore, "posts", uid), {
        email: email,
        userId: uid,
        username,
        profileUrl: url,
        // timestamp: serverTimestamp(),
      });
      // uploadTask.on("state_changed", f1, f2, f3);
      function f1(snapshot) {
        var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percent);
      }
      function f2() {
        setError(error);
        setLoader(false);
      }
      async function f3() {
        let downloadur1 = await getDownloadURL(uploadTask.snapshot.ref);
        await setDoc(doc(database.users, uid), {
          email: email,
          userId: uid,
          useurl: downloadur1,
        });
      }
      //  uploadTask.on('state_changed',f1)
      //   const f1 = async () =>{
      //     console.log("hiiiiiiiiii")
      //    let cc = doc(firestore,"users",uid)
      //    let pay = { email: email, userId: uid };
      //             // let downloadur1 = await getDownloadURL(uploadTask.snapshot.ref)
      //             await setDoc(
      //               cc,pay
      //             );
      //           }

      // const ref = doc(firestore, "users", uid);
      //  await setDoc(ref, {
      //   email: email,
      //    userId: uid,
      // });
      // uploadTask.on("state_changed", null,
      //           (error) => {
      //             alert(error);
      //           },
      //  f1)
      //  async function f1(){

      //             let downloadur1 = await getDownloadURL(uploadTask.snapshot.ref)
      //             await setDoc(doc(firestore, "cities", "LA"), {
      //               name: "Los Angeles",
      //               state: "CA",
      //               country: "USA",
      //             });
      //           }

      console.log("uploadTask on");
      // function fn1(snapshot) {
      //   // var progress = (snapshort.byteTransferred / snapshort.totalBytes) * 100;
      //   var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //   console.log(percent);
      // }
      // function fn2(error) {
      //   setError(error);
      //   setLoader(false);
      // }
      // async function fn3() {
      //   // let downloadur1 = await uploadTask.snapshort.ref.getDownloadURL();
      //   let downloadur1 = await getDownloadURL(uploadTask.snapshot.ref);
      //   //    setDoc(doc(storage,storage.users, uid)
      //   await setDoc(doc(firestore, "users", uid), {
      //     email: email,
      //     userId: uid,
      //     username,
      //     //   createdAt: serverTimestamp(),
      //     profileUrl: downloadur1,
      //   });
      setLoader(false);
      navigate("/");
    } catch (err) {
      setError("");
      setLoader(false);
    }
  }
  return (
    <div>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="">UserName</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
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
        <div>
          <label htmlFor="">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleFileSubmit(e);
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

export default Signup;
 */
/**
 * import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import firebaseApp from "../firebase";
import { useNavigate } from "react-router-dom";
import { storage, firestore, database } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { async } from 'firebase/util';
const auth = getAuth();
function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState();
  let { signup } = useContext(AuthContext);
  let navigate = useNavigate();
  function handleFileSubmit(e) {
    let file = e?.target?.files[0];
    if (file != null) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  }

  async function handleSignup(e) {
      e.preventDefault();
    try {
      setLoader(true);
      console.log("signupstaring..")
      let res = await signup(auth, email, password);
      let uid = res.user.uid;
      console.log(uid);
      // const uploadTaskListener = storage.ref(`/user/${uid}`).put(file);
      const uploadTaskListener = ref(storage, `/user/${uid}`);
      const uploadTask = uploadBytes(uploadTaskListener, file);
      console.log("uploadTask")
      uploadTask.on("state_changed", fn1, fn2, fn3);
      console.log("uploadTask on")
      function fn1(snapshort) {
        var progress = (snapshort.byteTransferred / snapshort.totalBytes) * 100;
        console.log(progress);
      }
      function fn2(error) {
        setError(error);
        setLoader(false);
      }
      async function fn3() {
        // let downloadur1 = await uploadTask.snapshort.ref.getDownloadURL();
        let downloadur1 = await getDownloadURL(uploadTask.snapshot.ref);
        //    setDoc(doc(storage,storage.users, uid)
        await setDoc(doc(database.users, uid), {
          email: email,
          userId: uid,
          username,
          createdAt: database.serverTimestamp(),
          profileUrl: downloadur1,
        });
        setLoader(false);
        navigate("/");
      }
    } catch (err) {
      setError("");
      setLoader(false);
    }
  }
  return (
    <div>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="">UserName</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
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
        <div>
          <label htmlFor="">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleFileSubmit(e);
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

export default Signup;

 */
