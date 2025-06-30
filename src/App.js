import LoginSingUpForm from './components/LoginRegistrationForm/LoginSingUpForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from './components/ProductPageDetail/ProductDetail';
import DashboardProductPage from './components/Card/Card';
import './App.css';
import 'animate.css/animate.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google'



function App() {

  return (
    <GoogleOAuthProvider clientId="1036375601206-rnbf1196t2c61ekebrafmmmr66np37v3.apps.googleusercontent.com">
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
