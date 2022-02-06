import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { getAuth } from "firebase/auth";
import Uploadvideos from "./Uploadvideos";
import { firestore } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Posts from "./Posts";
import Navbar from "./Navbar";


// import firebaseApp from "../firebase";
function Feed() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState('');
  const { currentUser, signout } = useContext(AuthContext);
  // const auth = getAuth(firebaseApp);//////////////////
  const auth = getAuth();
  const handleLogout = async () => {
    try {
      setLoading(true);
      await signout(auth);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

useEffect(() => {
  const unsub = onSnapshot(doc(firestore, "users", currentUser.uid), (doc) => {
    console.log("useEffect feed", doc.data())///////////
    setUserData(doc.data());
  });
  return () => {
    unsub();
  };
}, [currentUser]);
  
  return (
    <>
      <Navbar userData={userData}></Navbar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {console.log("feeeddddddd", currentUser.uid)}
        {/* <div className="comp" style={{ width: "50%" }}>
        <h1>Welcome to feed</h1>
        <button onClick={handleLogout}>Log out</button>
      </div> */}

        <Uploadvideos user={userData}></Uploadvideos>
        <Posts userData={userData}></Posts>
      </div>
    </>
    // <div>
    //     Feed
    // currentUser={currentUser}
    //     <button onClick={handleLogout} disabled={loading}>SignOut</button>
    // </div>
  );
}

export default Feed;
