import './App.css';
import Signin from './components/Signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Views/HomePage';
import SignUp from './components/SignUp';
import ForgottenPassword from './components/ForgottenPassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path='/home'/>
          <Route element={<Signin />} path='/'/>
          <Route element={<SignUp />} path='/signup' />
          <Route element={<ForgottenPassword />} path='forgot_password'/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
