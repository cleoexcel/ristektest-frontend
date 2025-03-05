import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './components/LoginSignUp/SignUp'
import Login from './components/LoginSignUp/Login'
import CreateTryout from './components/Tryout/CreateTryout'
import AllTryout from './components/Tryout/AllTryout'
import EditTryout from './components/Tryout/EditTryout'
import DetailTryout from './components/Tryout/DetailTryout'
import AddQuestion from './components/Question/AddQuestion'

const App = () => {
  return (
    <Router>
      <div className='bg-[#ffffff] grid py-4 min-h-screen'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/tryout/create-tryout" element={<CreateTryout />} />
          <Route path="/tryout/get-all-tryout" element={<AllTryout />} />
          <Route path="/tryout/edit-tryout/:id" element={<EditTryout />} />
          <Route path="/tryout/detail-tryout/:id" element={<DetailTryout />} />
          <Route path="/question/create-question/:id" element={<AddQuestion />} />


          {/* Default ke login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

