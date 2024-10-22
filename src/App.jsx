import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import appStore from "./utils/appStore.js";

import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Requests from "./components/Requests.jsx";
import Connections from "./components/Connections.jsx";
import SocketConnection from "./components/SocketConnection.jsx";
import PageNotFound from "./components/PageNotFound.jsx";

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
            <Route path="/requests" element={<Requests />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/socket-connection" element={<SocketConnection />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
