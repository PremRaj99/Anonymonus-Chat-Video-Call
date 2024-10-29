import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
// import Room from "./pages/Room";
import Landing from "./pages/Landing";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/room" element={<Room />} /> */}
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
