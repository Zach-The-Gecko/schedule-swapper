import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Routes/About/About";
import SignIn from "./Routes/SignIn/SignIn";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
