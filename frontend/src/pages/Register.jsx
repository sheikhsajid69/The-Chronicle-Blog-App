import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-serif font-bold text-air-force-blue-900 mb-2">Join The Chronicle</h2>
                <p className="text-dusty-taupe-600 font-serif italic">Create your account to start writing.</p>
            </div>

            {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 font-mono text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-sm border border-dusty-taupe-100">
                <div className="mb-6">
                    <label className="block text-air-force-blue-800 text-xs font-bold uppercase tracking-widest mb-2">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-vintage"
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-air-force-blue-800 text-xs font-bold uppercase tracking-widest mb-2">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-vintage"
                        placeholder="reader@example.com"
                        required
                    />
                </div>
                <div className="mb-8">
                    <label className="block text-air-force-blue-800 text-xs font-bold uppercase tracking-widest mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-vintage"
                        placeholder="••••••••"
                        required
                        minLength="6"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full btn-primary py-3"
                >
                    Create Account
                </button>

                <div className="mt-6 text-center">
                    <p className="text-sm text-dusty-taupe-600">
                        Already a member?{' '}
                        <Link to="/login" className="text-light-bronze-600 hover:text-light-bronze-800 font-semibold border-b border-light-bronze-300">
                            Sign in
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
