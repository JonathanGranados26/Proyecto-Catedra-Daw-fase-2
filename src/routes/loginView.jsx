import { async } from "@firebase/util";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { Await } from "react-router-dom";
import { auth, userExists } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Authprovider from "../componentes/authProvider";

export default function LoginView() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  /*
State
0:inicializado
1: loding
2:login completo 
3:login pero sin registro
4: no hay nadie logueado
5: ya existe el username
6: nuevo username, clik para continuar
*/
  const [state, setCurrentState] = useState(0);
  /*
  useEffect(() => {
    setCurrentState(1);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          //TODO: REDIRIGIR A Dashboard
          navigate("/dashboard");
          setCurrentState(2);
        } else {
          //TODO: REDIRIGIR A Choose username
          navigate("/choose-username");
          setCurrentState(3);
        }
      } else {
        setCurrentState(4);

        console.log("no hay nadie auntentificado....");
      }
    });
  }, [navigate]);
*/

  async function handleOnClick() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);
  }
  async function signInWithGoogle(googleProvider) {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }
function handleUserLoggedIn(user){
    navigate("/dashboard");
}
function handleUserNotRegistered(user){
    navigate("/choose-username");
}
function handleUserNotLoggedIn(user){
    setCurrentState(4);
}

  if (state === 2) {
    return <div>Estas Autentificado y Registrado..</div>;
  }

  if (state === 3) {
    return <div>Estas Autentificado Pero no Registrado..</div>;
  }

  if (state === 4) {
    return (
      <div >
        <button onClick={handleOnClick}>Login en Google</button>
      </div>
    );
  }
  if (state === 5) {
    return (
      <div>
        <button onClick={handleOnClick}>Login en Google</button>
      </div>
    );
  }

  return (
    <Authprovider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegisted={handleUserNotRegistered}
      onUserNotLoggedin={handleUserNotLoggedIn}
    ><div>Loading..</div></Authprovider>
  );
}
