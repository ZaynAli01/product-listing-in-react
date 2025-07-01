import LoginSingUpForm from './components/LoginRegistrationForm/LoginSingUpForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from './components/ProductPageDetail/ProductDetail';
import DashboardProductPage from './components/Card/Card';
import './App.css';
import 'animate.css/animate.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google'



function App() {

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSingUpForm />} />
          <Route path="/dashboard" element={<DashboardProductPage />} />
          <Route path='/productDetail/:id' element={<ProductDetail />} />
        </Routes>
      </Router >
    </GoogleOAuthProvider>

  );
}

export default App;
