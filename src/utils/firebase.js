import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  get,
  child,
  set,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCDOjDOCpJELva74wmiMSCX7RlSQZhtBHI",
  authDomain: "clearly-classes.firebaseapp.com",
  projectId: "clearly-classes",
  storageBucket: "clearly-classes.appspot.com",
  messagingSenderId: "1036525872935",
  appId: "1:1036525872935:web:c22f32a4da152ef79e6b02",
  measurementId: "G-F50BL2E2K9",
};

initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

provider.setCustomParameters({ prompt: "select_account" });
const auth = getAuth();

export const signInWithGoogle = () => signInWithRedirect(auth, provider);
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = child(dbRef, `users/${userAuth.uid}`);
  const userSnapshot = await get(userDocRef);
  if (!userSnapshot.exists()) {
    try {
      const { displayName } = userAuth;
      await set(userDocRef, { displayName });
    } catch (err) {
      console.error(err);
    }
  }
  return userDocRef;
};

export const getUsersData = async (uid) => {
  const userDocRef = child(dbRef, `users/${uid}`);
  try {
    const usersData = (await get(userDocRef)).val();
    usersData.classesRefs = Object.values(usersData.classesRefs);
    return usersData;
  } catch (err) {
    console.error(err);
  }
};

export const getPeriodsClasses = async (period) => {
  const periodsClasses = child(dbRef, `allClasses/${period}`);
  try {
    return (await get(periodsClasses)).val();
  } catch (err) {
    console.error(err);
  }
  return [];
};

export const getClassByRefID = async (reference) => {
  const class_ = child(dbRef, `allClasses/${reference}`);
  try {
    return (await get(class_)).val();
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const getClassesByPeriod = async (period) => {
  const class_ = query(
    child(dbRef, `allClasses`),
    orderByChild("period"),
    equalTo(period)
  );
  try {
    return Object.entries((await get(class_)).val()).map(
      ([classRef, otherClassData]) => {
        return { classRef, ...otherClassData };
      }
    );
  } catch (err) {
    console.error(err);
  }
  return null;
};
