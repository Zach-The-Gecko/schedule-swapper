// Work on CLASSPAGE and make it look neater.

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Page from "./Components/Page/Page";
import About from "./Routes/About/About";
import AllClasses from "./Routes/AllClasses/AllClasses";
import AllUsers from "./Routes/AllUsers/AllUsers";
import ClassByPeriod from "./Routes/ClassByPeriod/ClassByPeriod";
import ClassPage from "./Routes/ClassPage/ClassPage";
import EditClasses from "./Routes/EditClasses/EditClasses";
import SignIn from "./Routes/SignIn/SignIn";
import UsersClasses from "./Routes/UsersClasses/UsersClasses";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/class/:classId" element={<ClassPage />} />
        <Route path="/user/:uid" element={<UsersClasses />} />
        <Route path="/edit-classes" element={<EditClasses />} />
        <Route path="/" element={<Page>Root Path</Page>} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/classes" element={<AllClasses />} />
        <Route path="/classes/:period" element={<ClassByPeriod />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
