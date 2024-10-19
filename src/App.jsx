import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import Body from "./Body";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Feed from "./Feed";

import appStore from "./utils/appStore.js";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
