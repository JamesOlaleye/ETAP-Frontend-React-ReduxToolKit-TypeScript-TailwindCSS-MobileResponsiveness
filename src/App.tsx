// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import LandingPage from './pages/Dashboard';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import Home from './pages/Home';
// import User from './pages/User';
// import Subjects from './pages/Subjects';
// import Topics from './pages/Topics';
// import Progress from './pages/Progress';
// // import UserDetail from './components/UserDetail';

// export default function App() {
//   return (
//     <div className='min-h-screen flex flex-col'>
//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<LandingPage />} />
//           <Route path='/register' element={<Register />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/home' element={<Home />} />
//           <Route path='/users' element={<User />} />
//           {/* <Route path='/users/:id' element={<UserDetail />} /> */}
//           <Route path='/subjects' element={<Subjects />} />
//           <Route path='/topics' element={<Topics />} />
//           <Route path='/progress' element={<Progress />} />
//         </Routes>
//         <ToastContainer position='top-right' />
//       </BrowserRouter>
//     </div>
//   );
// }

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { persistor } from './redux/store';

import LandingPage from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import User from './pages/User';
import Subjects from './pages/Subjects';
import Topics from './pages/Topics';
import Progress from './pages/Progress';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/home' element={<Home />} />
              <Route path='/users' element={<User />} />
              <Route path='/subjects' element={<Subjects />} />
              <Route path='/topics' element={<Topics />} />
              <Route path='/progress' element={<Progress />} />
            </Route>
          </Routes>
          <ToastContainer position='top-right' />
        </PersistGate>
      </BrowserRouter>
    </div>
  );
}
