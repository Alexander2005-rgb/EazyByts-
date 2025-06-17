import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import CMSPage from './pages/CMS';
import PrivateRoute from './components/PrivateRoute';
import { ThemeProvider } from './context/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import Skill from './pages/Skill';

const defaultMuiTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider>
      <MuiThemeProvider theme={defaultMuiTheme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <ThemeSwitcher />
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/skill" element={<Skill />} />
                <Route path="/cms" element={
                  <PrivateRoute>
                    <CMSPage />
                  </PrivateRoute>
                } />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;
