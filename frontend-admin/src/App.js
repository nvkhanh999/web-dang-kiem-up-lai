import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, BrowserRouter as Router,
	Switch,
	Redirect,
	Link, } from "react-router-dom";
import ReactDOM from "react-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import AddAccount from "./scenes/addAccount";
import CenterList from "./scenes/centerList";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import CenterDetail from "./scenes/centerDetail";
import RegistryManagement from "./scenes/registryManagement";
import RegistryDetail from "./scenes/registryDetail";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormLogin from "./components/login/formlogin";

import {UserProvider} from "./context/UserContext";
import { Navigate } from 'react-router-dom';

ReactDOM.render(
	<UserProvider>
	</UserProvider>,
	document.getElementById("root")
)

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [display, setDisplay] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login') {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [location]);

  const cookie = localStorage.getItem("theFuckingToken");

  if ((cookie == null || cookie === "undefined") && window.location.pathname != '/login') {
  	return <>{<Navigate to='/login'/>}</>
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {display && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {display && <Topbar setIsSidebar={setIsSidebar} /> }
            <ToastContainer theme='colored' position='top-center'></ToastContainer>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/registryManagement" element={<RegistryManagement />} />
              <Route path="/registryManagement/:registryID" element={<RegistryDetail />} />
              <Route path="/centerList" element={<CenterList  />} />
              <Route path="/centerList/:centerID" element={<CenterDetail/>} />
              <Route path="/addAccount" element={<AddAccount />} />
              <Route path="/line" element={<Line />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/login" element={<FormLogin />} />

            </Routes>
          </main>
          
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
