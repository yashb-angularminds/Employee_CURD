import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./component/login/LoginComponent";
import DashboardComponent from "./component/dashboard/DashboardComponent";
import Protected from "./guards/Protected";
import SignupForm from "./component/signup/SignUpForm";

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
        <Route path="/signup" element={<SignupForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
