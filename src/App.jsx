import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Outlet } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RegisterForm from "./components/users/signup/register_form";
import HomePage from "./components/home/home_page";
import { Logout } from "./components/users/login/user_logout";
import RenderAllBooks from "./components/books/render_all_books";
import Header from './components/home/header';
import TopMenu from './components/home/top_menu';
import LeftContent from "./components/home/left_content";
import Footer from './components/home/footer';
import ComicBooksByCategory from './components/home/books_by_category';
import BookDetail from './components/books/book_details';
import { LoginModule } from "./components/users/login/login_module";
import { ProtectedRoute } from "./components/auth/protected_route";
import { PublicRoute } from "./components/auth/public_route";
import { AuthProvider } from "./context/auth/auth_context";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
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
                {/* 1. COMPLETELY OPEN ROUTES */}
                <Route path="/" element={<HomePage />} />
                
                {/* 2. GUEST ONLY ROUTES (Redirect if logged in) */}
                <Route element={<PublicRoute />}>
                  <Route path="/login" element={<LoginModule />} />
                  <Route path="/signup" element={<RegisterForm />} />
                </Route>

                {/* 3. SHARED PUBLIC ROUTES (Available to everyone) */}
                <Route path="/books" element={<RenderAllBooks />} />
                <Route path="/by-category/:id" element={<ComicBooksByCategory />} />
                <Route path="/book/:id" element={<BookDetail />} />

                {/* 4. PROTECTED ROUTES (Members only) */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/logout" element={<Logout />} />
                  {/* Add your Dashboard or Profile here later */}
                </Route>

                {/* 5. CATCH-ALL (Move this to the very bottom) */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Col>
          </Row>

          <Row>
            <Col><Footer /></Col>
          </Row>
        </Container>
      </AuthProvider>
    </BrowserRouter>
  )
};

export default App;