// Work on CLASSPAGE and make it look neater.

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Page from "./Components/Page/Page";
import About from "./Routes/About/About";
import AllUsers from "./Routes/AllUsers/AllUsers";
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
        <Route path="/all-users" element={<AllUsers/>} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
