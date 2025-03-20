import NavBar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";
import { useWindowSize } from "./hooks/useWindowSize.tsx";
import { useTheme } from "./hooks/useTheme.tsx";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Home from "./components/Home.tsx";
import Missing from "./components/Missing.tsx";
import RequireAuth from "./components/auth/RequireAuth.tsx";
import PersistLogin from "./components/auth/PersistLogin.tsx";
import Editor from "./components/Editor.tsx";
import Registration from "./components/minilager/Registration.tsx";
import { useTitle } from "./context/TitleProvider.tsx";
import Gruppenleiter from "./components/gruppenleiter/Gruppenleiter.tsx";
import Overview from "./components/minilager/Overview.tsx";
import CenterContainer from "./components/CenterContainer.tsx";
import User from "./components/User.tsx";
import { GRUPPENLEITER } from "./constants.ts";

function App() {
  const { title } = useTitle();

  const appWindowSize = useWindowSize();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <header className="navbar-header">
        <NavBar
          appWindowSize={appWindowSize}
          toggleTheme={toggleTheme}
          theme={theme}
        />
      </header>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route index element={<Home />} />
            <Route path="lager" element={<CenterContainer />}>
              <Route index element={<Overview />} />
              <Route path="registration" element={<Registration />} />
              <Route path="gruppenleiter" element={<Gruppenleiter />} />
            </Route>

            {/* we want to protect these routes */}
            <Route
              element={
                <RequireAuth
                  allowedRoles={[
                    GRUPPENLEITER.HilfsGruppenleiter,
                    GRUPPENLEITER.Gruppenleiter,
                    GRUPPENLEITER.ElderGruppenleiter,
                  ]}
                />
              }
            >
              <Route path="home" element={<User />} />
              <Route path="gruppenleiter" element={<Gruppenleiter />} />
            </Route>

            <Route
              element={
                <RequireAuth
                  allowedRoles={[
                    GRUPPENLEITER.Gruppenleiter,
                    GRUPPENLEITER.ElderGruppenleiter,
                  ]}
                />
              }
            >
              <Route path="editor" element={<Editor />} />
            </Route>
            <Route
              element={
                <RequireAuth
                  allowedRoles={[GRUPPENLEITER.ElderGruppenleiter]}
                />
              }
            >
              <Route path="editor" element={<Editor />} />
            </Route>

            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Route>
      </Routes>
      <footer className="footer-content">
        <Footer appWindowSize={appWindowSize} />
      </footer>
    </>
  );
}

export default App;
