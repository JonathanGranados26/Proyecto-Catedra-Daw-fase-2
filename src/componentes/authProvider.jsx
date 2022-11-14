import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { Await } from "react-router-dom";
import {
  auth,
  getUserInfo,
  registerNewUser,
  userExists,
} from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function ({
  children,
  onUserLoggedIn,
  onUserNotLoggedin,
  onUserNotRegisted,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          const userInfo = await getUserInfo(user.uid);
          if(userInfo.processCompleted){
            onUserLoggedIn(userInfo);

          } else {
            onUserNotRegisted(userInfo);
          }
        } else {
          await registerNewUser({
            uid: user.uid,
            displayName: user.displayName,
            profilePicture: "",
            username: "",
            processCompleted: false,
          });
          onUserNotRegisted(user);
        }
      } else {
        onUserNotLoggedin();
      }
    });
  }, [navigate]);

  return <div>{children}</div>;
}
