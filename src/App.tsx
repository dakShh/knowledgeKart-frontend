import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/authentication/login';
import SignUp from './pages/authentication/signup';
import HomePage from './pages/home';

// Context & Provider
import AuthProvider from './context/useAuth';

import './App.css';

// Components
import { ProtectedRoute } from './components/routes/ProtectedRoutes';
import { Toaster } from 'react-hot-toast';
import CreatorLogin from './pages/authentication/creatorLogin';
import { CreatorProtectedRoute } from './components/routes/CreatorProtectedRoutes';
import DashboardPage from './pages/dashboard';
import CoursePage from './pages/course';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/creator/login" element={<CreatorLogin />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <CreatorProtectedRoute>
                                <DashboardPage />
                            </CreatorProtectedRoute>
                        }
                    />
                    <Route path="/course/:id" element={<CoursePage />} />
                </Routes>
                <Toaster position="bottom-right" />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
