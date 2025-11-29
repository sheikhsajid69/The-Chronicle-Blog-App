const mongoose = require('mongoose');
require('dotenv').config();
const Post = require('./models/Post');
const User = require('./models/User');

const samplePosts = [
  {
    title: "Getting Started with Modern Web Development",
    content: `
# Getting Started with Modern Web Development

Welcome to the world of modern web development! This comprehensive guide will walk you through the essential concepts and technologies you need to know to build amazing web applications.

## What You'll Learn

In this article, we'll cover:
- Modern JavaScript frameworks and libraries
- CSS frameworks and preprocessors
- Build tools and package managers
- Best practices for code organization
- Performance optimization techniques

## JavaScript Frameworks

The landscape of JavaScript frameworks has evolved significantly. Today, we have several mature options:

**React** - Developed by Facebook, React is a library for building user interfaces with a component-based architecture.

**Vue.js** - Known for its gentle learning curve and progressive adoption approach.

**Angular** - A full-featured framework by Google with TypeScript support and dependency injection.

## CSS Frameworks

Modern CSS frameworks have revolutionized the way we style our applications:

- **Tailwind CSS** - A utility-first framework for rapid UI development
- **Bootstrap** - The most popular CSS framework with pre-built components
- **Material-UI** - Google's Material Design components for React

## Build Tools

Modern development relies heavily on build tools:
- **Webpack** - Module bundler for JavaScript applications
- **Vite** - Next-generation frontend build tool
- **Parcel** - Zero-configuration build tool

## Getting Started

1. Choose your framework based on project requirements
2. Set up your development environment
3. Create your first component
4. Learn about state management
5. Practice with real projects

## Conclusion

Modern web development is exciting and constantly evolving. Stay curious, keep learning, and don't be afraid to experiment with new technologies.

Happy coding!
    `,
    excerpt: "A comprehensive introduction to modern web development technologies and best practices.",
    tags: ["web-development", "javascript", "react", "css", "frontend"],
    category: "Technology",
    published: true
  },
  {
    title: "The Art of Writing Clean Code",
    content: `
# The Art of Writing Clean Code

Clean code is not written by following a set of rules. You don't become a software craftsman by learning a list of heuristics. Professionalism and craftsmanship come from values that drive disciplines. - Robert C. Martin

## What is Clean Code?

Clean code is code that is easy to read and understand. It's code that tells a story clearly and concisely. Here are some characteristics of clean code:

### 1. Meaningful Names

Choose descriptive and unambiguous names for variables, functions, and classes.

\`\`\`javascript
// Bad
const d = new Date();

// Good
const currentDate = new Date();
\`\`\`

### 2. Functions Should Do One Thing

Functions should do one thing well. If a function does multiple things, it becomes harder to understand and test.

\`\`\`javascript
// Bad
function processUser(user) {
  validateUser(user);
  saveToDatabase(user);
  sendEmail(user);
  logActivity(user);
}

// Good
function processUser(user) {
  validateUser(user);
  saveToDatabase(user);
  sendWelcomeEmail(user);
  logUserRegistration(user);
}
\`\`\`

### 3. Keep Functions Small

Small functions are easier to read, understand, and test.

### 4. Use Meaningful Comments

Comments should explain why something is done, not what is done (the code should explain that).

## The Boy Scout Rule

> Leave the campground cleaner than you found it.

Apply this rule to your code. If you see messy code, clean it up a bit.

## Conclusion

Writing clean code is an art that takes practice. It requires continuous learning and improvement. Start with small changes and gradually build your skills.

Remember: Code is read far more often than it is written, so make it easy to read.
    `,
    excerpt: "Learn the principles and practices of writing clean, maintainable code that stands the test of time.",
    tags: ["programming", "clean-code", "best-practices", "software-engineering"],
    category: "Programming",
    published: true
  },
  {
    title: "Understanding RESTful API Design",
    content: `
# Understanding RESTful API Design

REST (Representational State Transfer) is an architectural style for designing web services. It has become the de facto standard for API design due to its simplicity and scalability.

## Core Principles of REST

### 1. Resource-Based URLs

REST APIs should be designed around resources, not actions.

\`\`\`
# Bad
GET /getUsers
POST /createUser
PUT /updateUser
DELETE /deleteUser

# Good
GET /users
POST /users
PUT /users/{id}
DELETE /users/{id}
\`\`\`

### 2. Use HTTP Methods Appropriately

- **GET** - Retrieve resources
- **POST** - Create new resources
- **PUT** - Update entire resources
- **PATCH** - Update partial resources
- **DELETE** - Remove resources

### 3. Stateless Communication

Each request should contain all the information needed to process it. The server should not store client state between requests.

### 4. Use HTTP Status Codes

Proper HTTP status codes help communicate the result of API calls:

- **200 OK** - Successful GET, PUT, PATCH
- **201 Created** - Successful POST
- **204 No Content** - Successful DELETE
- **400 Bad Request** - Invalid request
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

### 5. JSON Response Format

JSON has become the standard format for API responses due to its readability and wide support.

## API Versioning

Version your APIs to maintain backward compatibility:

\`\`\`
GET /api/v1/users
GET /api/v2/users
\`\`\`

## Error Handling

Provide meaningful error messages:

\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The provided email address is invalid",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}
\`\`\`

## Best Practices

1. Use plural nouns for resource names
2. Implement proper authentication and authorization
3. Use pagination for large datasets
4. Implement rate limiting
5. Document your API thoroughly
6. Use consistent naming conventions
7. Implement proper error handling and logging

## Conclusion

RESTful API design is about creating simple, scalable, and maintainable web services. Follow these principles and best practices to build APIs that developers will love to use.

Remember: A well-designed API is as important as a well-designed user interface.
    `,
    excerpt: "Master the principles and best practices of RESTful API design for building scalable web services.",
    tags: ["api", "rest", "backend", "web-development", "architecture"],
    category: "Backend",
    published: true
  },
  {
    title: "CSS Grid vs Flexbox: When to Use Which",
    content: `
# CSS Grid vs Flexbox: When to Use Which

CSS Grid and Flexbox are two powerful layout systems in CSS. Understanding when to use each can significantly improve your web development workflow.

## What is Flexbox?

Flexbox (Flexible Box Layout) is designed for one-dimensional layouts - either as a row or a column.

### Best Use Cases for Flexbox:
- Navigation bars
- Card layouts in a row
- Centering content
- Equal height columns
- Vertical centering

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card {
  flex: 1;
  margin: 10px;
}
\`\`\`

## What is CSS Grid?

CSS Grid is designed for two-dimensional layouts - both rows and columns simultaneously.

### Best Use Cases for CSS Grid:
- Complex page layouts
- Gallery grids
- Magazine-style layouts
- Dashboard layouts
- Any layout that requires precise control over both rows and columns

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
}

.header {
  grid-column: 1 / -1;
}

.sidebar {
  grid-row: 2;
  grid-column: 1;
}

.main {
  grid-row: 2;
  grid-column: 2;
}

.sidebar-right {
  grid-row: 2;
  grid-column: 3;
}
\`\`\`

## When to Use Flexbox

1. **Linear Layouts**: Use when content flows in one direction
2. **Component-Level Layout**: Perfect for individual components
3. **Alignment Tasks**: When you need to center or align items
4. **Dynamic Content**: When you don't know the exact size of content

## When to Use CSS Grid

1. **Complex Layouts**: When you need both rows and columns
2. **Page-Level Layout**: Ideal for overall page structure
3. **Overlapping Elements**: When elements need to overlap
4. **Gap Control**: When you need precise control over spacing

## Can They Work Together?

Absolutely! Many modern layouts use both:

\`\`\`css
.page-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
\`\`\`

## Browser Support

Both CSS Grid and Flexbox have excellent browser support:
- Flexbox: Supported in all modern browsers
- CSS Grid: Supported in all modern browsers (IE11 has partial support)

## Conclusion

Remember the golden rule:
- **Flexbox for one-dimensional layouts**
- **CSS Grid for two-dimensional layouts**

Don't be afraid to use both in the same project - they complement each other perfectly!

Start with the layout system that feels most natural for your specific use case, and don't overthink it. Both are powerful tools in your CSS toolkit.
    `,
    excerpt: "Learn when to use CSS Grid vs Flexbox for optimal layouts in modern web development.",
    tags: ["css", "layout", "flexbox", "grid", "web-development"],
    category: "Frontend",
    published: true
  },
  {
    title: "Introduction to Machine Learning with Python",
    content: `
# Introduction to Machine Learning with Python

Machine Learning has become one of the most exciting fields in technology. Python, with its rich ecosystem of libraries, is the perfect language to get started with ML.

## What is Machine Learning?

Machine Learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every task.

## Types of Machine Learning

### 1. Supervised Learning
Learn from labeled data to make predictions
- **Classification**: Predict categories (spam vs not spam)
- **Regression**: Predict continuous values (house prices)

### 2. Unsupervised Learning
Find patterns in data without labels
- **Clustering**: Group similar data points
- **Dimensionality Reduction**: Reduce complexity of data

### 3. Reinforcement Learning
Learn through interaction with environment
- **Game AI**: Teaching computers to play games
- **Robotics**: Learning to navigate and perform tasks

## Essential Python Libraries

### 1. NumPy
Fundamental package for numerical computing
\`\`\`python
import numpy as np

# Create arrays
arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2], [3, 4]])

# Mathematical operations
print(arr.mean())  # 3.0
print(matrix.dot(matrix))  # Matrix multiplication
\`\`\`

### 2. Pandas
Data manipulation and analysis
\`\`\`python
import pandas as pd

# Load data
df = pd.read_csv('data.csv')

# Explore data
print(df.head())
print(df.describe())
print(df.info())
\`\`\`

### 3. Scikit-learn
Machine learning algorithms
\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print(f'Accuracy: {accuracy:.2f}')
\`\`\`

### 4. Matplotlib/Seaborn
Data visualization
\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns

# Create plots
plt.figure(figsize=(10, 6))
sns.scatterplot(data=df, x='feature1', y='feature2', hue='target')
plt.title('Feature Relationship')
plt.show()
\`\`\`

## Your First Machine Learning Project

Let's create a simple classification project:

\`\`\`python
# 1. Import libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix

# 2. Load and explore data
data = pd.read_csv('iris.csv')
print(data.head())
print(data['species'].value_counts())

# 3. Prepare data
X = data.drop('species', axis=1)
y = data['species']

# 4. Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 5. Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# 6. Evaluate model
predictions = model.predict(X_test)
print(classification_report(y_test, predictions))
\`\`\`

## Common Machine Learning Workflow

1. **Define Problem**: What question are you trying to answer?
2. **Collect Data**: Gather relevant data for your problem
3. **Explore Data**: Understand patterns and relationships
4. **Prepare Data**: Clean, transform, and engineer features
5. **Choose Model**: Select appropriate algorithm(s)
6. **Train Model**: Fit the model to your data
7. **Evaluate Model**: Assess performance using metrics
8. **Optimize**: Improve model through tuning
9. **Deploy**: Put model into production

## Getting Started Tips

1. Start with simple projects
2. Focus on understanding concepts, not just code
3. Practice with real datasets
4. Learn from others' work
5. Join ML communities
6. Read research papers and blogs
7. Don't be afraid to experiment

## Conclusion

Machine Learning with Python opens up incredible possibilities. Start with simple projects, understand the fundamentals, and gradually work your way up to more complex problems.

The key is consistent practice and continuous learning. The ML field evolves rapidly, so stay curious and keep experimenting!

Remember: Every expert was once a beginner. Start your ML journey today!
    `,
    excerpt: "A beginner-friendly introduction to machine learning concepts and Python implementation.",
    tags: ["machine-learning", "python", "ai", "data-science", "programming"],
    category: "Data Science",
    published: true
  }
];

async function seedPosts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get first user as author
    const author = await User.findOne();
    if (!author) {
      console.log('No users found. Please create a user first.');
      process.exit(1);
    }

    console.log(`Using author: ${author.name} (${author.email})`);

    // Clear existing posts and drop collection to remove old indexes
    await Post.deleteMany({});
    await Post.collection.drop().catch(() => {
      // Collection might not exist, ignore error
    });
    console.log('Cleared existing posts and indexes');

    // Create sample posts
    const postsWithAuthor = samplePosts.map(post => ({
      ...post,
      author: author._id
    }));

    const createdPosts = await Post.insertMany(postsWithAuthor);
    console.log(`Created ${createdPosts.length} sample posts`);

    console.log('\\n=== Sample Posts Created Successfully ===');
    console.log('Titles:');
    createdPosts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} (${post.category})`);
    });

    await mongoose.connection.close();
    console.log('\\nDatabase connection closed');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding posts:', error);
    process.exit(1);
  }
}

seedPosts();