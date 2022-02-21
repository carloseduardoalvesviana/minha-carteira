import { BrowserRouter, Routes as Router, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function Routes() {
  return (
    <BrowserRouter>
      <Router>
        <Route index element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Router>
    </BrowserRouter>
  )
}

export default Routes;