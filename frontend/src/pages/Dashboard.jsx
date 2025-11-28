import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const { data } = await api.get('/posts/my-posts');
                setPosts(data.data);
            } catch (err) {
                console.error('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchMyPosts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await api.delete(`/posts/${id}`);
                setPosts(posts.filter(post => post._id !== id));
            } catch (err) {
                alert('Failed to delete post');
            }
        }
    };

    if (loading) return <div className="text-center mt-20 font-serif text-dusty-taupe-600 italic">Loading your desk...</div>;

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-10 border-b border-dusty-taupe-200 pb-6">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-air-force-blue-900 mb-2">My Desk</h1>
                    <p className="text-dusty-taupe-600 font-serif italic">Manage your writings and drafts.</p>
                </div>
                {user.role === 'admin' && (
                    <Link
                        to="/create-post"
                        className="btn-primary"
                    >
                        Compose New
                    </Link>
                )}
            </div>

            <div className="bg-white border border-dusty-taupe-100 shadow-sm">
                <ul className="divide-y divide-dusty-taupe-100">
                    {posts.map((post) => (
                        <li key={post._id} className="hover:bg-vanilla-custard-50 transition-colors">
                            <div className="px-6 py-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-serif font-bold text-air-force-blue-900 truncate pr-4">
                                        <Link to={`/posts/${post._id}`} className="hover:text-light-bronze-600">
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <div className="flex-shrink-0">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold uppercase tracking-widest border ${post.published ? 'bg-green-50 text-green-800 border-green-200' : 'bg-yellow-50 text-yellow-800 border-yellow-200'}`}>
                                            {post.published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center text-sm text-dusty-taupe-600 font-mono">
                                        <span className="mr-4">{post.category}</span>
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm font-bold uppercase tracking-wider">
                                        <Link to={`/edit-post/${post._id}`} className="text-air-force-blue-600 hover:text-air-force-blue-800">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(post._id)} className="text-red-600 hover:text-red-800">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                    {posts.length === 0 && (
                        <li className="px-6 py-12 text-center text-dusty-taupe-500 font-serif italic">
                            Your desk is empty. Start writing your first story.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
