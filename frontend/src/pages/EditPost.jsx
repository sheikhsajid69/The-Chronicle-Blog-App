import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

const EditPost = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        tags: '',
        published: false,
        featuredImage: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await api.get(`/posts/${id}`);
                const post = data.data;
                setFormData({
                    title: post.title,
                    content: post.content,
                    category: post.category,
                    tags: post.tags.join(', '),
                    published: post.published,
                    featuredImage: post.featuredImage || '',
                });
            } catch (err) {
                setError('Failed to fetch post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            };
            await api.put(`/posts/${id}`, payload);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update post');
        }
    };

    if (loading) return <div className="text-center mt-20 font-serif text-dusty-taupe-600 italic">Retrieving manuscript...</div>;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8 border-b border-dusty-taupe-200 pb-4">
                <h1 className="text-4xl font-serif font-bold text-air-force-blue-900">Edit Manuscript</h1>
            </div>

            {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 font-mono text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-sm border border-dusty-taupe-100 space-y-6">
                <div>
                    <label className="block text-air-force-blue-800 text-xs font-bold uppercase tracking-widest mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="input-vintage text-xl font-serif"
                        required
                    />
                </div>

                <div>
                    <label className="block text-air-force-blue-800 text-xs font-bold uppercase tracking-widest mb-2">Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="input-vintage h-96 font-serif leading-relaxed"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-air-force-blue-800 text-xs font-bold uppercase tracking-widest mb-2">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="input-vintage"
                        />
                    </div>
                    <div>
                        <label className="block text-air-force-blue-800 text-xs font-bold uppercase tracking-widest mb-2">Tags</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="input-vintage"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-air-force-blue-800 text-xs font-bold uppercase tracking-widest mb-2">Featured Image URL</label>
                    <input
                        type="text"
                        name="featuredImage"
                        value={formData.featuredImage}
                        onChange={handleChange}
                        className="input-vintage"
                    />
                </div>

                <div className="flex items-center py-4">
                    <input
                        type="checkbox"
                        name="published"
                        checked={formData.published}
                        onChange={handleChange}
                        className="h-4 w-4 text-air-force-blue-600 focus:ring-air-force-blue-500 border-dusty-taupe-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-air-force-blue-900 font-serif">
                        Published
                    </label>
                </div>

                <div className="pt-6 border-t border-dusty-taupe-100 flex justify-end">
                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        Update Manuscript
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPost;
