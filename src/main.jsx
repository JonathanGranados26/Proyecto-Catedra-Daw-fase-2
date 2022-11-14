import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from './App'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./routes/loginView"; //de aqui hasta la linea 10 sirven para moverse entre paginas
import DasboardView from "./routes/DasboardView";
import EditProfileView from "./routes/EditProfileView";
import SignOutView from "./routes/SignOutView";
import PublicProfileView from "./routes/PublicProfileView";
import ChooseUsernameView from "./routes/ChooseUsernameView";

ReactDOM.createRoot(document.getElementById("root")).render(
  //nesesarios para cambiar de paginas se importan //
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<LoginView />} />
      <Route path="dashboard" element={<DasboardView />} />
      <Route path="dashboard/profile" element={<EditProfileView />} />
      <Route path="signout" element={<SignOutView />} />
      <Route path="u/:username" element={<PublicProfileView />} />
      <Route path="choose-username" element={<ChooseUsernameView />} />
    </Routes>
  </BrowserRouter>
);
