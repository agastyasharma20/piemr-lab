import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Unit1 from './pages/Unit1/Unit1';
import FunctionsTypes from './pages/Unit1/FunctionsTypes';
import StrategyPlan from './pages/Unit1/StrategyPlan';
import Unit2 from './pages/Unit2/Unit2';
import AlgorithmPage from './pages/Unit2/AlgorithmPage';
import CPUHub from './pages/Unit3/CPUHub';
import CPUAlgorithmPage from './pages/Unit3/CPUAlgorithmPage';
import MemoryHub from './pages/Unit3/MemoryHub';
import MemoryAlgorithmPage from './pages/Unit3/MemoryAlgorithmPage';
import Unit4 from './pages/Unit4/Unit4';
import Unit5 from './pages/Unit5/Unit5';
import Developer from './pages/Developer/Developer';
import Experiments from './pages/Experiments/Experiments';
import ExperimentDetails from './pages/Experiments/ExperimentDetails';

// COA Modules
import COAUnit1 from './pages/COA/Unit1';
import COAUnit2 from './pages/COA/Unit2';
import COAUnit3 from './pages/COA/Unit3';
import COAUnit4 from './pages/COA/Unit4';
import COAUnit5 from './pages/COA/Unit5';
import COAExperiments from './pages/COA/Experiments';
import COAExperimentDetails from './pages/COA/COAExperimentDetails';

// Dashboards
import OSDashboard from './pages/Dashboard/OSDashboard';
import COADashboard from './pages/Dashboard/COADashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* OS Module Routes */}
          <Route path="/os" element={<OSDashboard />} />
          <Route path="/os/intro" element={<Unit1 />} />
          <Route path="/os/intro/functions-types" element={<FunctionsTypes />} />
          <Route path="/os/intro/strategy" element={<StrategyPlan />} />
          <Route path="/os/disk-scheduling" element={<Unit2 />} />
          <Route path="/os/disk-scheduling/:algorithm" element={<AlgorithmPage />} />
          <Route path="/os/cpu-scheduling" element={<CPUHub />} />
          <Route path="/os/cpu-scheduling/:algorithm" element={<CPUAlgorithmPage />} />
          <Route path="/os/memory-management" element={<MemoryHub />} />
          <Route path="/os/memory-management/:algorithm" element={<MemoryAlgorithmPage />} />
          <Route path="/os/concurrency" element={<Unit4 />} />
          <Route path="/os/advanced-os" element={<Unit5 />} />
          <Route path="/os/experiments/:id" element={<ExperimentDetails />} />
          <Route path="/os/experiments" element={<Experiments />} />

          {/* COA Module Routes */}
          <Route path="/coa" element={<COADashboard />} />
          <Route path="/coa/basic-structure" element={<COAUnit1 />} />
          <Route path="/coa/computer-arithmetic" element={<COAUnit2 />} />
          <Route path="/coa/io-organization" element={<COAUnit3 />} />
          <Route path="/coa/memory-organization" element={<COAUnit4 />} />
          <Route path="/coa/multiprocessors" element={<COAUnit5 />} />
          <Route path="/coa/experiments" element={<COAExperiments />} />
          <Route path="/coa/experiments/:id" element={<COAExperimentDetails />} />

          <Route path="/os/developer" element={<Developer />} />
          <Route path="/coa/developer" element={<Developer />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
