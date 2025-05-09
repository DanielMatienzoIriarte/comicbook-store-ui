import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Outlet } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginForm from "./components/users/login/login_form";
import SignupForm from "./components/users/signup/signup_form";
import HomePage from "./components/home/home_page";
import { Logout } from "./components/users/login/user_logout";
import RenderAllBooks from "./components/books/render_all_books";
import Header from './components/home/header';
import TopMenu from './components/home/top_menu';
import LeftContent from "./components/home/left_content";
import Footer from './components/home/footer';
import ComicBooksByCategory from './components/home/books_by_category';
import BookDetail from './components/home/book_details';

const App = () => {
  return (
    <BrowserRouter>
      <Container className="templatemo_container">
        <Row>
          <Col>
            <Header />
            <TopMenu />
          </Col>
        </Row>

        <Row className="templatemo_content">
          <Col>
            <LeftContent />
          </Col>

          <Col xs={8}>
            <Routes>
              <Route path="/">
                <Route index element={<HomePage />} />
                <Route path="*" element={<HomePage />} />
              </Route>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/books" element={<RenderAllBooks />} />
              <Route path="/by-category/:id" element={<ComicBooksByCategory />} />
              <Route path="/book/:id" element={<BookDetail />} />
            </Routes>

            <Outlet />
          </Col>
        </Row>

        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  )
};

export default App;