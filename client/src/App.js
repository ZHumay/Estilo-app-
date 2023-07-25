import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { Verify } from "./pages/Auth/Verify";
import { io } from "socket.io-client";
import Home from "./pages/Home/Home";
import Woman from "./pages/Woman/Woman";
import Man from "./pages/Man/Man";
import Shop from "./pages/Shop/Shop";
import Fav from "./pages/Fav/Fav";
import Basket from "./pages/Basket/Basket";
import Contact from "./pages/Contact/Contact";
// import ProtectedRoute from "./pages/Auth/ProtectedRoute";
export const socket = io("http://localhost:8000");
function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />

      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/verify" element={<Verify />}></Route>
      <Route path="/woman" element={<Woman />} />
      <Route path="/man" element={<Man />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/favourites" element={<Fav />} />
      <Route path="/basket" element={<Basket />} />
    </Routes>
  );
}

export default App;
