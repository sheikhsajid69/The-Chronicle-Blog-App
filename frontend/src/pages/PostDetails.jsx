import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await api.get(`/posts/${id}`);
                setPost(data.data);
            } catch (err) {
                setError('Failed to fetch post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <div className="text-center mt-20 font-serif text-dusty-taupe-600 italic">Retrieving article...</div>;
    if (error) return <div className="text-center mt-20 font-mono text-red-700">{error}</div>;
    if (!post) return <div className="text-center mt-20 font-serif text-dusty-taupe-600">Article not found in the archives.</div>;

    return (
        <article className="max-w-3xl mx-auto bg-white shadow-sm border border-dusty-taupe-100 p-8 md:p-12 my-8">
            <div className="text-center mb-10">
                <div className="flex items-center justify-center space-x-2 text-xs font-bold tracking-widest uppercase text-light-bronze-600 mb-4">
                    <span>{post.category}</span>
                    <span className="text-dusty-taupe-300">•</span>
                    <span className="text-dusty-taupe-500">{new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-air-force-blue-900 mb-6 leading-tight">{post.title}</h1>
                <div className="flex items-center justify-center border-t border-b border-dusty-taupe-100 py-4">
                    <div className="text-center">
                        <p className="text-sm font-bold uppercase tracking-widest text-air-force-blue-800">Written by {post.author.name}</p>
                    </div>
                </div>
            </div>

            {post.featuredImage && (
                <div className="mb-10 p-2 bg-white border border-dusty-taupe-100 shadow-sm transform -rotate-1">
                    <img src={post.featuredImage} alt={post.title} className="w-full h-auto filter sepia-[.15]" />
                </div>
            )}

            <div className="prose prose-lg max-w-none font-serif text-air-force-blue-900 leading-loose">
                {post.content.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-light-bronze-600 first-letter:mr-3 first-letter:float-left">
                        {paragraph}
                    </p>
                ))}
            </div>

            <div className="mt-12 pt-8 border-t border-dusty-taupe-200">
                <h3 className="text-sm font-bold uppercase tracking-widest text-dusty-taupe-500 mb-4">Filed Under:</h3>
                <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag, index) => (
                        <span key={index} className="bg-vanilla-custard-200 text-air-force-blue-800 px-3 py-1 text-sm font-mono border border-vanilla-custard-400">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-12 text-center">
                <Link to="/" className="text-light-bronze-600 hover:text-light-bronze-800 font-serif italic border-b border-light-bronze-300 pb-1">
                    ← Back to Journal
                </Link>
            </div>
        </article>
    );
};

export default PostDetails;
