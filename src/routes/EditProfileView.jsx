import AuthProvider from "../componentes/authProvider";
import DashboardWrapper from "../componentes/dashboardWrapper";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { async } from "@firebase/util";
import { getProfilePhotoUrl, setUserProfilePhoto, updateUser } from "../firebase/firebase";

export default function EditProfileView() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);
  const [profileUrl, setProfileUrl] = useState(null);
  const fileRef = useRef();

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setState(2);
  }
  function handleUserNotRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoggedIn(user) {
    navigate("/login");
  }
  function handleOpenFilePicker() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }
  function handleChanseFile(e) {
    const files = e.target.files;
    const fileReader = new FileReader();

    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;

        const res = await setUserProfilePhoto(currentUser.uid, imageData);
        if (res) {
          const tmpUser = { ...currentUser };
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser);
          setCurrentUser({...tmpUser})
          const url = await getProfilePhotoUrl(currentUser.profilePicture);
          setProfileUrl(url)
        }
      };
    }
  }
  if (state !== 2) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        onNotRegistered={handleUserNotRegistered}
      ></AuthProvider>
    );
  }
  return (
    <DashboardWrapper>
      <div>
        <h2>editar perfil</h2>
        <div>
          <div>
            <img src={profileUrl} alt="" width={100} />
          </div>
          <div>
            <button onClick={handleOpenFilePicker}>
              Nueva imagen de perfil
            </button>
            <input
              ref={fileRef}
              type="file"
              style={{ display: "none" }}
              onChange={handleChanseFile}
            />
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}
