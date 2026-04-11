import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Unit1 from './pages/Unit1/Unit1';
import Unit2 from './pages/Unit2/Unit2';
import Unit3 from './pages/Unit3/Unit3';
import Unit4 from './pages/Unit4/Unit4';
import Unit5 from './pages/Unit5/Unit5';
import Developer from './pages/Developer/Developer';
import Experiments from './pages/Experiments/Experiments';
import ExperimentDetails from './pages/Experiments/ExperimentDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/unit-1" element={<Unit1 />} />
          <Route path="/unit-2" element={<Unit2 />} />
          <Route path="/unit-3" element={<Unit3 />} />
          <Route path="/unit-4" element={<Unit4 />} />
          <Route path="/unit-5" element={<Unit5 />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/experiments/:id" element={<ExperimentDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
