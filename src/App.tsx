import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar/Navbar.components";
import { Routes, Route } from "react-router-dom";
import CustomLinearProgress from "./components/custom-linear-progress/CustomLinearProgress.component";


// Imports with Lazy loading
const Home = lazy(() => import("./pages/home/Home.page"));
const Employees = lazy(() => import("./pages/employees/Employees.page"));
const AddEmployee = lazy(() => import("./pages/employees/AddEmployee.page"));
const HardwareInfos = lazy(
  () => import("./pages/hardwareinfos/HardwareInfos.page")
);
const AddEmployeeHardwareInfo = lazy(() => import("./pages/employeehardwareinfos/AddEmployeeHardwareInfo.page"));
const EmployeeHardwareInfos = lazy(
  () => import("./pages/employeehardwareinfos/EmployeeHardwareInfos.page")
);
const AddHardwareInfo = lazy(() => import("./pages/hardwareinfos/AddHardwareInfo.page"));

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyles = darkMode ? "app dark" : "app";

  return (
    <div className={appStyles}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees">
              <Route index element={<Employees />} />
              <Route path="add" element={<AddEmployee />} />
            </Route>
            <Route path="/hardwareinfos">
              <Route index element={<HardwareInfos />} />
              <Route path="add" element={<AddHardwareInfo />} />
            </Route>
            <Route path="/employeehardwareinfos">
              <Route index element={<EmployeeHardwareInfos />} />
              <Route path="add" element={<AddEmployeeHardwareInfo />} />
              </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
