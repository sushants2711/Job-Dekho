import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AllJobPage } from "./pages/AllJobPage";
import { JobDetailsPage } from "./pages/JobDetailsPage";
import { CreateJob } from "./pages/CreateJob";
import { ErrorPage } from "./pages/ErrorPage";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllJobPage />} />
        <Route path="/details/:id" element={<JobDetailsPage />} />
        <Route path="/add" element={<CreateJob />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
