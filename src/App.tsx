import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Developer from './pages/Developer/Developer';
import Experiments from './pages/Experiments/Experiments';
import ExperimentDetails from './pages/Experiments/ExperimentDetails';
import SubjectTopicHub from './pages/common/SubjectTopicHub';
import ADATopicHub from './pages/ADA/ADATopicHub';

// COA Modules
import COAExperiments from './pages/COA/Experiments';
import COAExperimentDetails from './pages/COA/COAExperimentDetails';
import LogicCanvas from './pages/COA/LogicCanvas';

// Dashboards
import OSDashboard from './pages/Dashboard/OSDashboard';
import COADashboard from './pages/Dashboard/COADashboard';
import ADADashboard from './pages/Dashboard/ADADashboard';
import ComplexityHub from './pages/ADA/ComplexityHub';
import ADALabDetails from './pages/ADA/ADALabDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* OS Module Routes — specific paths BEFORE wildcard */}
          <Route path="/os" element={<OSDashboard />} />
          <Route path="/os/experiments" element={<Experiments />} />
          <Route path="/os/experiments/:id" element={<ExperimentDetails />} />
          <Route path="/os/:topicId/:subTopicId" element={<SubjectTopicHub subject="os" />} />
          <Route path="/os/:topicId" element={<SubjectTopicHub subject="os" />} />

          {/* COA Module Routes — specific paths BEFORE wildcard */}
          <Route path="/coa" element={<COADashboard />} />
          <Route path="/coa/experiments" element={<COAExperiments />} />
          <Route path="/coa/experiments/:id" element={<COAExperimentDetails />} />
          <Route path="/coa/circuit-simulator" element={<LogicCanvas expTitle="Circuit Sandbox (Open Workbench)" />} />
          <Route path="/coa/:topicId/:subTopicId" element={<SubjectTopicHub subject="coa" />} />
          <Route path="/coa/:topicId" element={<SubjectTopicHub subject="coa" />} />

           {/* ADA Module Routes */}
          <Route path="/ada" element={<ADADashboard />} />
          <Route path="/ada/experiments" element={<Experiments mode="ada" />} />
          <Route path="/ada/experiments/:id" element={<ADALabDetails />} />
          <Route path="/ada/complexity" element={<ComplexityHub />} />
          <Route path="/ada/:topicId" element={<ADATopicHub />} />
          <Route path="/ada/:topicId/:subTopicId" element={<ADATopicHub />} />

          {/* Global Pages */}
          <Route path="/about" element={<Developer />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
