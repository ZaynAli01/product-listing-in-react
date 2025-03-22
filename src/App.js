import Dashboard from './pages/Dashboard';
import LoginSingUpForm from './components/LoginRegistrationForm/LoginSingUpForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import 'animate.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSingUpForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
