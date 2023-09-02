import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllPupils from "./pages/AllPupils";
import Error404Page from "./pages/Error404Page";
import ExamsView from "./pages/ExamsView";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/home" element={<ExamsView />}></Route>
          <Route path="/pupils" element={<AllPupils />}></Route>
          <Route path="/results/:id" element={<ResultsPage />}></Route>
          <Route path="/*" element={<Error404Page />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
