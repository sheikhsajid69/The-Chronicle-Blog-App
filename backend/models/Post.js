const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      trim: true,
      default: 'Uncategorized',
    },
    published: {
      type: Boolean,
      default: false,
    },
    excerpt: {
      type: String,
      maxlength: [500, 'Excerpt cannot be more than 500 characters'],
    },
    featuredImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Create index for search and filtering
postSchema.index({ title: 'text', content: 'text', tags: 1, category: 1 });

// Generate excerpt from content if not provided
postSchema.pre('save', function (next) {
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 200) + (this.content.length > 200 ? '...' : '');
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);