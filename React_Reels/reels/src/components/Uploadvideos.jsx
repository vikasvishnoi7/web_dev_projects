import React, { useState, useContext } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import MovieIcon from "@mui/icons-material/Movie";
import LinearProgress from "@mui/material/LinearProgress";

import { firestore, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  doc,
  serverTimestamp,
  collection,
  addDoc,
  updateDoc 
} from "firebase/firestore";
// import { getAuth } from "firebase/auth";

import { AuthContext } from "../contexts/AuthContext";

// import { async } from "@firebase/util";
//npm install uuid
import {v4 as uuidv4} from 'uuid'

function Uploadvideos(props) {
  // const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
console.log(props.user);////////////
  const handleChange = async (e) => {
    let file = e?.target?.files[0];
    console.log(file)
    if (file == null) {
      setError("Please select a file first");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    if (file.size / (1024 * 1024) > 40) {
      setError("This video is very big");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    try{
        let uid = uuidv4(); //post uid
    setLoading(true);
    const uploadTaskListener = ref(storage,`/posts/${uid}/${file.name}`);
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
      setLoading(false);
      return;
    }
    async function fn3() {
      // link get
      console.log("async in");
      let url = await getDownloadURL(uploadTask.snapshot.ref);
      console.log("downoad completed ", url);
      let docRef = await addDoc(collection(firestore, "posts"), {
        likes: [],
        comments: [],
        pId: uid,
        pUrl: url,
        userName: props.user.username,
        userPrfile: props.user.profileUrl,
        userId: props.user.userId,
        createdAt: serverTimestamp(),
      });
        
      console.log("hiiii", props.user);
      const userRef = doc(firestore, "users", props.user.userId);
      console.log("2222222", userRef)
      let res = await updateDoc(userRef,{
            postIds : props.user.postIds!=null ? [...props.user.postIds,docRef.id] : [docRef.id]
      })
      console.log("uploadTask on");
      setLoading(false);
          
    }
    }catch(err){
          setError(err);
          setTimeout(() => {
            setError("");
          }, 2000);
          setLoading(false);
        }
     
  }
    

  return (
    <div style={{marginTop:'4.7rem', marginBottom:'0.7rem'}}>
      {
      error != "" ?<Alert severity="error">{error}</Alert>:
     
        <>
          <input
            type="file"
            accept="video/*"
            onChange={(e)=>{handleChange(e)}}
            id="upload-input"
            style={{ display: "none" }}
          />
          <label htmlFor="upload-input">
            <Button
              variant="outlined"
              color="secondary"
              disabled={loading}
              component="span"
            >
             <MovieIcon />&nbsp;Upload Video
            </Button>
          </label>
          {loading && <LinearProgress color="secondary" style={{marginTop:'3%'}}/>}
        </>
      }
    </div>
  );
}

export default Uploadvideos;

/**
 * import React, { useState, useContext } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import MovieIcon from "@mui/icons-material/Movie";
import LinearProgress from "@mui/material/LinearProgress";

import { firestore, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  doc,
  serverTimestamp,
  collection,
  addDoc,
  updateDoc 
} from "firebase/firestore";
// import { getAuth } from "firebase/auth";

import { AuthContext } from "../contexts/AuthContext";

// import { async } from "@firebase/util";
//npm install uuid
import {v4 as uuidv4} from 'uuid'

function Uploadvideos() {
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
console.log(currentUser.uid)
  const handleChange = async (e) => {
    let file = e?.target?.files[0];
    console.log(file)
    if (file == null) {
      setError("Please select a file first");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    if (file.size / (1024 * 1024) > 40) {
      setError("This video is very big");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    let uid = uuidv4(); //post uid
    setLoading(true);
    const uploadTaskListener = ref(storage,`/posts/${uid}/${file.name}`);
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
      setLoading(false);
      return;
    }
    function fn3() {
      // link get
      console.log("async in");
      let url = getDownloadURL(uploadTask.snapshot.ref);
      console.log("downoad completed ", url);
      url.then((url) => {
        const docRef = addDoc(collection(firestore, "posts"), {
          likes: [],
          comments: [],
          pId: uid,
          pUrl: url,
          userName: currentUser.username,
          userPrfile: currentUser.profileUrl,
          userId: currentUser.userId,
          createdAt: serverTimestamp(),
        });
        docRef.then(async(docRef) =>{
          const userRef = doc(firestore, "users", currentUser.userId);
          let res = await updateDoc(userRef,{
            postIds : currentUser.postIds!=null ? [...currentUser.postIds,docRef.id] : [docRef.id]
          })
        })
        .then(()=>{
          setLoading(false);
        })
        .catch((err)=>{
          setError(err);
          setTimeout(() => {
            setError("");
          }, 2000);
          setLoading(false);
        })
      });
      console.log("uploadTask on");
      setLoading(false);
      // navigate("/");
    }
    // async function fn3() {
    //   // link get
    //   console.log("async in");
    //   let url = await getDownloadURL(uploadTask.snapshot.ref);
    //   console.log("downoad completed ");
    //   await setDoc(doc(firestore, "users", uid), {
    //     email: email,
    //     userId: uid,
    //     username,
    //     profileUrl: url,
    //     timestamp: serverTimestamp(),
    //   });
    //   console.log("uploadTask on");
    //   setLoader(false);
    //   navigate("/");
    // }
  };

  return (
    <div>
      {
      error != "" ?<Alert severity="error">{error}</Alert>:
     
        <>
          <input
            type="file"
            accept="video/*"
            onChange={(e)=>{handleChange(e)}}
            id="upload-input"
            style={{ display: "none" }}
          />
          <label htmlFor="upload-input">
            <Button
              variant="outlined"
              color="secondary"
              disabled={loading}
              component="span"
            >
             <MovieIcon />&nbsp;Upload Video
            </Button>
          </label>
          {loading && <LinearProgress color="secondary" style={{marginTop:'3%'}}/>}
        </>
      }
    </div>
  );
}

export default Uploadvideos;

 */