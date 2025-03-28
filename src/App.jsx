import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/users/login/login_form";
import SignupForm from "./components/users/signup/signup_form";
import HomePage from "./components/home/home_page";
import Layout from "./components/home/layout";
import { Logout } from "./components/users/login/user_logout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;