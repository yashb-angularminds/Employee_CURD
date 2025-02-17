import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./component/login/LoginComponent";
import DashboardComponent from "./component/dashboard/DashboardComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/dashboard" element={<DashboardComponent/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
