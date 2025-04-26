import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/users/login/login_form";
import SignupForm from "./components/users/signup/signup_form";
import HomePage from "./components/home/home_page";
import Layout from "./components/home/layout";
import { Logout } from "./components/users/login/user_logout";
import RenderAllBooks from "./components/books/render_all_books";
import { Outlet, Link } from "react-router-dom";
import TopMenu from './components/home/top_menu';

const App = () => {
  return (
    <BrowserRouter>
      <div className="templatemo_container">
        <TopMenu />

        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/books" element={<RenderAllBooks />} />
        </Routes>

        <Outlet />
      </div>
    </BrowserRouter>
  )
};

export default App;