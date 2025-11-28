import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await api.get('/posts');
                setPosts(data.data);
            } catch (err) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div className="text-center mt-20 font-serif text-dusty-taupe-600 italic">Loading the archives...</div>;
    if (error) return <div className="text-center mt-20 font-mono text-red-700">{error}</div>;

    return (
        <div className="space-y-12 pb-12">
            <div className="text-center border-b-2 border-dusty-taupe-200 pb-8">
                <h1 className="text-5xl font-serif font-bold text-air-force-blue-900 mb-4 tracking-tight">Latest Stories</h1>
                <p className="text-lg text-dusty-taupe-600 font-serif italic">Curated thoughts and chronicles.</p>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <article key={post._id} className="card-vintage flex flex-col h-full">
                        {post.featuredImage && (
                            <div className="mb-6 overflow-hidden border border-dusty-taupe-100 p-1 bg-white">
                                <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover filter sepia-[.2] hover:sepia-0 transition-all duration-500" />
                            </div>
                        )}
                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center mb-3 text-xs font-bold tracking-widest uppercase text-light-bronze-600">
                                <span>{post.category}</span>
                                <span className="mx-2 text-dusty-taupe-300">•</span>
                                <span className="text-dusty-taupe-500">{new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <h2 className="text-2xl font-serif font-bold mb-3 leading-tight text-air-force-blue-900">
                                <Link to={`/posts/${post._id}`} className="hover:text-light-bronze-600 transition-colors">
                                    {post.title}
                                </Link>
                            </h2>
                            <p className="text-dusty-taupe-700 mb-6 font-serif leading-relaxed flex-1">
                                {post.excerpt}
                            </p>
                            <div className="mt-auto pt-4 border-t border-dusty-taupe-100 flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-widest text-air-force-blue-800">By {post.author.name}</span>
                                <Link to={`/posts/${post._id}`} className="text-light-bronze-600 hover:text-light-bronze-800 text-sm font-serif italic font-semibold hover:underline">
                                    Read Article →
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
            {posts.length === 0 && (
                <div className="text-center text-dusty-taupe-500 mt-20 font-serif italic text-xl">The archives are currently empty.</div>
            )}
        </div>
    );
};

export default PostList;
