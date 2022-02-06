import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { doc, updateDoc } from "firebase/firestore"; 
import { firestore } from "../firebase"; 

function Like2({userData,postData}) {
  const [like, setLike] = useState(null);
  console.log("setLike", like);
  useEffect(() => {
    console.log("useEffect");
    let check = postData.likes.includes(userData.userId) ? true : false;
    console.log("checkLike 111", check);
    setLike(check);
    console.log("checkLike 222", check);
  }, [postData]);
  /**
     * useEffect(()=>{
        console.log("useEffect")
        let check = postData.likes.includes(userData.userId) ? true : false;
        console.log("checkLike 111", check)
        setLike(check);
        console.log("checkLike 222", check);
    },[postData,userData])
     */
  const handleLike = () => {
    if (like == true) {
      console.log("like == true");
      let narr = postData.likes.filter((el) => el != userData.userId);
      const postsDoc = doc(firestore, "posts", postData.postId);
      updateDoc(postsDoc, {
        likes: narr,
      });
    } else {
      console.log("like == false");
      let narr = [...postData.likes, userData.userId];
      const postsDoc = doc(firestore, "posts", postData.postId);
      updateDoc(postsDoc, {
        likes: narr,
      });
    }
  };
  return (
    <div>
      {console.log("inside like render")}
      {like != null ? (
        <>
          {like == true ? (
            <FavoriteIcon
              style={{ padding: "1rem", paddingTop: "0.5rem" }}
              className={`like`}
              onClick={handleLike}
            />
          ) : (
            <FavoriteIcon
              style={{ padding: "1rem", paddingTop: "0.5rem" }}
              className={`unlike2`}
              onClick={handleLike}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Like2
