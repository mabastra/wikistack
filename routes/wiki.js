const express = require("express");
const router = express.Router();
const { Page } = require('../models');
const views = require('../views');

router.get('/', async (req, res, next) => {
    const pages = await Page.findAll();
    res.send(views.main(pages));
});

router.post('/', async (req, res, next) => {
    try {
        const page = await Page.create({
          title: req.body.title,
          content: req.body.content,
        });

        // make sure we only redirect *after* our save is complete! 
        // Don't forget to `await` the previous step. `create` returns a Promise.
        res.redirect(`/wiki/${page.slug}`);
      } catch (error) { next(error) }
});

router.get('/add', async (req, res, next) => {
    res.send(views.addPage());
});

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        });
        res.send(views.wikiPage(page,'Mab'));
    } catch(error) {next(error)}
});


Page.beforeValidate( page => {
    page.slug = (page.title) 
    ? page.title.replace(' ','_').replace(/\W/g, '') 
    : (Math.random() + 1).toString(36).substring(3);
});

module.exports = router;