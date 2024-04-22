const router = require('express').Router();
const { Post } = require('../../models');

// GET all posts
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll();
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // GET a single post by ID
  router.get('/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id);
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // CREATE a new post
  router.post('/', async (req, res) => {
    try {
      const newPost = await Post.create(req.body);
      res.status(201).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // UPDATE a post by ID
  router.put('/:id', async (req, res) => {
    try {
      const postData = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!postData[0]) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.status(200).json({ message: 'Post updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // DELETE a post by ID
  router.delete('/:id', async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;
