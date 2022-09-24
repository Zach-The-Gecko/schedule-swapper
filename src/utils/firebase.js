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
  push,
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
      await set(userDocRef, { displayName, ref: userDocRef.key });
    } catch (err) {
      console.error(err);
    }
  }
  return userDocRef;
};

export const getUsersData = async (uid, semester) => {
  const userDocRef = child(dbRef, `users/${uid}`);
  try {
    const usersData = (await get(userDocRef)).val();
    if (semester) {
      usersData.classes = usersData.classes
        ? usersData.classes[`Semester${semester}`]
        : [];
    }
    return usersData;
  } catch (err) {
    console.error(err);
  }
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
  const classes = query(
    child(dbRef, `allClasses`),
    orderByChild("period"),
    equalTo(period)
  );
  try {
    return Object.entries((await get(classes)).val()).map(
      ([classRef, otherClassData]) => {
        return { classRef, ...otherClassData };
      }
    );
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const submitClassToFB = async (class_) => {
  const allClassesRef = child(dbRef, `allClasses`);
  const newClassRef = push(allClassesRef);
  await set(newClassRef, { ...class_, users: [""], ref: newClassRef.key });
  return newClassRef.key;
};

export const classExists = async (class_) => {
  const sameTeachersClassesQuery = query(
    child(dbRef, `allClasses`),
    orderByChild("teacher"),
    equalTo(class_.teacher)
  );
  const sameTeachersClasses = await get(sameTeachersClassesQuery);
  const classExists = sameTeachersClasses.exists();
  if (classExists) {
    const returnVal = Object.keys(sameTeachersClasses.val()).reduce(
      (acc, classID) => {
        const classWithSameTeacher = sameTeachersClasses.val()[classID];
        if (
          classWithSameTeacher.period === class_.period &&
          classWithSameTeacher.semester === class_.semester
        ) {
          return classID;
        }
        return acc;
      },
      false
    );
    return returnVal;
  } else {
    return false;
  }
};

export const changeClass = async (prevClassID, newClassID, userUid) => {
  if (prevClassID === newClassID) {
    return true;
  }
  if (prevClassID) {
    const prevClass = await getClassByRefID(prevClassID);
    const prevClassUsers = prevClass.users;
    prevClassUsers.splice(prevClassUsers.indexOf(userUid));
    const prevClassRef = child(dbRef, `allClasses/${prevClassID}`);
    await set(prevClassRef, prevClass);
  }

  const newClass = await getClassByRefID(newClassID);
  const newClassUsers = newClass.users;
  newClassUsers.push(userUid);
  const newClassRef = child(dbRef, `allClasses/${newClassID}`);
  await set(newClassRef, newClass);

  const usersClassRef = child(
    dbRef,
    `users/${userUid}/classes/${newClass.semester}/${newClass.period}`
  );
  set(usersClassRef, newClassID);

  return newClass;
};

export const deleteAllClasses = async () => {
  const allClassesRef = child(dbRef, `allClasses`);
  const usersRef = child(dbRef, `users`);
  await set(allClassesRef, {});
  await set(usersRef, {});
  console.log("All Deleted!");
};
