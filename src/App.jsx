import { BrowserRouter, Route, Routes } from "react-router-dom";

import Body from "./Body";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Feed from "./Feed";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
