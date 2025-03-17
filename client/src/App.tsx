import NavBar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";
import { useWindowSize } from "./hooks/useWindowSize.tsx";
import { useTheme } from "./hooks/useTheme.tsx";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Home from "./components/Home.tsx";
import Missing from "./components/Missing.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import PersistLogin from "./components/PersistLogin.tsx";
import User from "./components/User.tsx";
import Editor from "./components/Editor.tsx";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  const appTitle = "Daniel";
  const appWindowSize = useWindowSize();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <head>
        <title>{appTitle}</title>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <header className="navbar-header">
        <NavBar title={appTitle} toggleTheme={toggleTheme} theme={theme} />
      </header>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />

          {/* we want to protect these routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="home" element={<User />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
              <Route path="editor" element={<Editor />} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      <footer className="footer-content">
        <Footer appWindowSize={appWindowSize} />
      </footer>
    </>
  );
}

export default App;
