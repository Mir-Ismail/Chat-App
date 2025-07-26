import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Chatpage from "../pages/Chatpage";
import Signup from "../components/Authentication/Signup";
import ChatProvider from "../Context/ChatProvider";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <ChatProvider>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chat" element={<Chatpage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </ChatProvider>
  );
}

export default App;
