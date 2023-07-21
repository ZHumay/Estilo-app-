import {Routes, Route } from "react-router-dom";
import {Login} from './pages/Auth/Login';
import {Register} from './pages/Auth/Register';
import {Verify} from './pages/Auth/Verify';
import { io } from 'socket.io-client';
import Home from './pages/Home';
import { Layout } from './components/Layout';
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
export const socket = io("http://localhost:8080");
function App() {
 
  return (
    <Routes>
    <Route index element={
       <Home/>
   }/>
    <Route path="/signup" element={<Register />} />
    <Route path="/signin" element={<Login/>} />
    <Route path='/verify' element={<Verify/>}></Route>
  </Routes>
  );
}

export default App;