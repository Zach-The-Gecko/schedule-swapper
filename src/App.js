import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Page from "./Components/Page/Page";
import About from "./Routes/About/About";
import SignIn from "./Routes/SignIn/SignIn";
import UsersClasses from "./Routes/UsersClasses/UsersClasses";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/users-classes/:uid" element={<UsersClasses />} />
        <Route path="/" element={<Page>Root Path</Page>} />
      </Routes>
    </div>
  );
}

export default App;
