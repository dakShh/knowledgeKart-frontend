import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/authentication/login';
import SignUp from './pages/authentication/signup';
import HomePage from './pages/home';
import Dashboard from './pages/dashboard';

// Context & Provider
import AuthProvider from './context/useAuth';

import './App.css';

// Components
import { ProtectedRoute } from './components/routes/ProtectedRoutes';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <Toaster position="bottom-right" />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
