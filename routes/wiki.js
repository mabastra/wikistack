const express = require("express");
const router = express.Router();
const { Page } = require('../models');
const views = require('../views');

router.get('/', async (req, res, next) => {
    res.send('<h1>Hi</h1>');
    // res.send(views.wikiPage());
});
router.post('/', async (req, res, next) => {
    try {
        const page = await Page.create({
          title: req.body.title,
          content: req.body.content,
//          slug: req.body.title
        });

        // make sure we only redirect *after* our save is complete! 
        // Don't forget to `await` the previous step. `create` returns a Promise.
        res.redirect('/');
      } catch (error) { next(error) }
});
router.get('/add', async (req, res, next) => {
    res.send(views.addPage());
});

Page.beforeValidate( page => {
    page.slug = (page.title) 
    ? page.title.replace(' ','_').replace(/\W/g, '') 
    : (Math.random() + 1).toString(36).substring(3);
});

module.exports = router;

// const slugify = (title) => {
//     return (title) ? title.replace('/\s+/g','_').replace(/\W/g, '') : (Math.random() + 1).toString(36).substring(3);
// }
