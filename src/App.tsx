import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArchiMadeLanding from './components/ArchiMadeLanding';
import LegalPage from './components/LegalPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArchiMadeLanding />} />
        <Route path="/mentions-legales" element={<LegalPage type="mentions" />} />
        <Route path="/confidentialite" element={<LegalPage type="privacy" />} />
        <Route path="/cookies" element={<LegalPage type="cookies" />} />
      </Routes>
    </Router>
  );
}
