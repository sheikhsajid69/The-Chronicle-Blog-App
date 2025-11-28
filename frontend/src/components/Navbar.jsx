import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    // Check if user can create posts (admin only)
    const canCreatePost = user && user.role === 'admin';

    return (
        <nav className="bg-vanilla-custard-100 border-b border-dusty-taupe-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-3xl font-serif font-bold text-air-force-blue-800 tracking-tight">
                                The Chronicle
                            </span>
                        </Link>
                        <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className="text-air-force-blue-700 hover:text-air-force-blue-900 inline-flex items-center px-1 pt-1 text-sm font-medium font-serif tracking-wide border-b-2 border-transparent hover:border-light-bronze-400 transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                to="/"
                                className="text-air-force-blue-700 hover:text-air-force-blue-900 inline-flex items-center px-1 pt-1 text-sm font-medium font-serif tracking-wide border-b-2 border-transparent hover:border-light-bronze-400 transition-colors"
                            >
                                Articles
                            </Link>
                            {user && (
                                <Link
                                    to="/dashboard"
                                    className="text-air-force-blue-700 hover:text-air-force-blue-900 inline-flex items-center px-1 pt-1 text-sm font-medium font-serif tracking-wide border-b-2 border-transparent hover:border-light-bronze-400 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            )}
                            {canCreatePost && (
                                <Link
                                    to="/create-post"
                                    className="text-sunlit-clay-600 hover:text-sunlit-clay-800 inline-flex items-center px-1 pt-1 text-sm font-medium font-serif tracking-wide border-b-2 border-transparent hover:border-sunlit-clay-400 transition-colors"
                                >
                                    ✍️ Write Post
                                </Link>
                            )}
                            {user?.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    className="text-light-bronze-600 hover:text-light-bronze-800 inline-flex items-center px-1 pt-1 text-sm font-medium font-serif tracking-wide border-b-2 border-transparent hover:border-light-bronze-400 transition-colors"
                                >
                                    Admin Panel
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center font-serif">
                        {user ? (
                            <div className="flex items-center space-x-6">
                                <span className="text-dusty-taupe-700 italic text-sm">
                                    Welcome, <span className="font-semibold text-air-force-blue-700">{user.name}</span>
                                </span>
                                <span className="text-xs text-dusty-taupe-500 uppercase tracking-wider">
                                    {user.role}
                                </span>
                                <button
                                    onClick={logout}
                                    className="text-air-force-blue-600 hover:text-air-force-blue-800 text-sm font-medium uppercase tracking-wider transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="space-x-6">
                                <Link
                                    to="/login"
                                    className="text-air-force-blue-700 hover:text-air-force-blue-900 text-sm font-medium uppercase tracking-wider transition-colors"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn-primary text-sm"
                                >
                                    Subscribe
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
