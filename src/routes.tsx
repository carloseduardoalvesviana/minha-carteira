import { BrowserRouter, Routes as Router, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route index element={<Dashboard />} />
      </Router>
    </BrowserRouter>
  )
}

export default Routes;