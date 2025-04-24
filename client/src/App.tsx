import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./layout/Navbar";
import { MenuPage } from "./pages/MenuPage";
import { MainPage } from "./pages/MainPage";
import { LocationPage } from "./pages/LocationPage";
import { CartPages } from "./pages/CartPages";
import { UserPage } from "./pages/UserPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AlertDisplay } from "./layout/AlertDisplay";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center p-5">
        <div className="bg-white w-full max-w-[90wh] min-h-[100vh] h-full rounded-4xl  overflow-y px-5">
          <div className="sticky top-0 z-10">
            <Navbar />
            <AlertDisplay />
          </div>
          <div className="border-2 rounded-4xl p-5  mb-5 h-full ">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/location" element={<LocationPage />} />
              <Route path="/cart" element={<CartPages />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
