import { useState, useEffect } from 'react';
import api from '../api/axios';

const AdminPosts = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('posts');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsRes, usersRes] = await Promise.all([
                    api.get('/posts/admin/all'),
                    api.get('/users')
                ]);
                setPosts(postsRes.data.data);
                setUsers(usersRes.data.data);
            } catch (err) {
                console.error('Failed to fetch admin data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDeletePost = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await api.delete(`/posts/${id}`);
                setPosts(posts.filter(post => post._id !== id));
            } catch (err) {
                alert('Failed to delete post');
            }
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/users/${id}`);
                setUsers(users.filter(user => user._id !== id));
            } catch (err) {
                alert('Failed to delete user');
            }
        }
    };

    if (loading) return <div className="text-center mt-20 font-serif text-dusty-taupe-600 italic">Accessing archives...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-serif font-bold text-air-force-blue-900 mb-8">Administration</h1>

            <div className="mb-8 border-b border-dusty-taupe-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`${activeTab === 'posts' ? 'border-air-force-blue-600 text-air-force-blue-800' : 'border-transparent text-dusty-taupe-500 hover:text-dusty-taupe-700 hover:border-dusty-taupe-300'} whitespace-nowrap py-4 px-1 border-b-2 font-bold uppercase tracking-widest text-sm transition-colors`}
                    >
                        All Manuscripts
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`${activeTab === 'users' ? 'border-air-force-blue-600 text-air-force-blue-800' : 'border-transparent text-dusty-taupe-500 hover:text-dusty-taupe-700 hover:border-dusty-taupe-300'} whitespace-nowrap py-4 px-1 border-b-2 font-bold uppercase tracking-widest text-sm transition-colors`}
                    >
                        Subscribers
                    </button>
                </nav>
            </div>

            {activeTab === 'posts' ? (
                <div className="bg-white shadow-sm border border-dusty-taupe-100">
                    <ul className="divide-y divide-dusty-taupe-100">
                        {posts.map((post) => (
                            <li key={post._id} className="px-6 py-4 hover:bg-vanilla-custard-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg font-serif font-bold text-air-force-blue-900 truncate">{post.title}</p>
                                        <p className="text-sm text-dusty-taupe-600 font-mono">By {post.author.name}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold uppercase tracking-widest border ${post.published ? 'bg-green-50 text-green-800 border-green-200' : 'bg-yellow-50 text-yellow-800 border-yellow-200'}`}>
                                            {post.published ? 'Published' : 'Draft'}
                                        </span>
                                        <button onClick={() => handleDeletePost(post._id)} className="text-red-600 hover:text-red-800 text-xs font-bold uppercase tracking-widest">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="bg-white shadow-sm border border-dusty-taupe-100">
                    <ul className="divide-y divide-dusty-taupe-100">
                        {users.map((user) => (
                            <li key={user._id} className="px-6 py-4 hover:bg-vanilla-custard-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg font-serif font-bold text-air-force-blue-900 truncate">{user.name}</p>
                                        <p className="text-sm text-dusty-taupe-600 font-mono">{user.email}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-bold uppercase tracking-widest bg-dusty-taupe-100 text-dusty-taupe-800">
                                            {user.role}
                                        </span>
                                        <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:text-red-800 text-xs font-bold uppercase tracking-widest">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminPosts;
