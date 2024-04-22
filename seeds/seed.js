const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'password456',
  },
];

const postDate = new Date();

const postData = [
  {
    title: 'First Post',
    content: 'This is the first post!',
    user_id: 1,
    date_created: postDate,
  },
  {
    title: 'Second Post',
    content: 'This is the second post!',
    user_id: 2,
    date_created: postDate,
  },
];

const commentData = [
  {
    content: 'Great post!',
    user_id: 2,
    post_id: 1,
    date_created: postDate,
  },
  {
    content: 'Nice job!',
    user_id: 1,
    post_id: 2,
    date_created: postDate,
  },
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postData);
  
  const comments = await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
