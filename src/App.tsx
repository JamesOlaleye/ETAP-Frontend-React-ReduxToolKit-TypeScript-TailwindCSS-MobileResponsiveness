import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import Subjects from './pages/Subjects';
import Topics from './pages/Topics';
import Progress from './pages/Progress';
import Register from './pages/Register';
import Login from './pages/Login';
import UserDetail from './components/UserDetail';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

export default function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<User />} />
            <Route path='/subjects' element={<Subjects />} />
            <Route path='/topics' element={<Topics subjectId={''} />} />
            <Route path='/progress' element={<Progress subjectId={''} />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/users/:id' element={<UserDetail />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
