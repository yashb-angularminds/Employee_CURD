import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./component/login/LoginComponent";
import DashboardComponent from "./component/dashboard/DashboardComponent";
import Protected from "./guards/Protected";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route
          path={`Dashboard`}
          element={
            <Protected>
              <DashboardComponent />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
