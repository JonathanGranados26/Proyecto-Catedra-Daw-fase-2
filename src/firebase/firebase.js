import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  setDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyANslGc4nYyKbaKyqjpYs-rcTF0xeBYv-Y",
  authDomain: "proyecto-15e02.firebaseapp.com",
  projectId: "proyecto-15e02",
  storageBucket: "proyecto-15e02.appspot.com",
  messagingSenderId: "301855790332",
  appId: "1:301855790332:web:f686873f342b8dff553379",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export async function userExists(uid) {
  const docRecf = doc(db, "users", uid);
  const res = await getDoc(docRecf);
  console.log(res);
  return res.exists();
}

export async function existsUsername(username) {
  const users = [];
  const docsRef = collection(db, "user");
  const q = query(docsRef, where("username", "==", username));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users.length > 0 ? users[0].uid : null;
}

export async function registerNewUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docsRef = doc(collectionRef, user.uid);
    await setDoc(docsRef, user);
  } catch (error) {}
}

export async function updateUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docRecf = doc(collectionRef, user.uid);
    await setDoc(docRecf, user);
  } catch (error) {}
}

export async function getUserInfo(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {}
}

export async function insertNewLink(link) {
  try {
    const docRef = collection(db, "links");
    const res = await addDoc(docRef, link);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getLinks(uid) {
  const links = [];
  try {
    const collectionRef = collection(udb, "links");
    const q = query(collectionRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const link = { ...doc.data() };
      link.docId = doc.id;
      links.push(link);
    });

    return links;
  } catch (error) {
    console.error();
  }
}

export async function updateLink(docId, link) {
  try {
    const docRef = doc(db, "links", docId);
    const res = await setDoc(docRef, link);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteLink(docId) {
  try {
    const docRef = doc(db, "links", docId);
    const res = await deleteDoc(docRef);
    return res;
  } catch (error) {}
}

export async function setUserProfilePhoto(uid, file) {
  const imageRef = ref(storage, "images/${uid}");
  const resUpload = await uploadBytes(imageRef, file);
  return resUpload;
}

export async function getProfilePhotoUrl(ProfilePhotoUrl) {
  try {
    const imageRef = ref(storage, ProfilePicture);

    const url = await getDownloadUrl(imageRef);
    return url;
  } catch (error) {
    console.error(error);
  }
}
