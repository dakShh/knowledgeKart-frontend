import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/authentication/login';
import SignUp from './pages/authentication/signup';
import HomePage from './pages/home';
import Dashboard from './pages/dashboard';

// Utils
import { cn } from './utils/cn';

// Context & Provider
import AuthProvider from './context/useAuth';

import './App.css';

// Components
import { ProtectedRoute } from './components/routes/ProtectedRoutes';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
