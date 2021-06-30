const express = require('express');
const router = express.Router();
const Article = require('./../models/article')

router.get('/new', (req,res) => {
    res.render('articles/new', {article: new Article()})
});
router.get('/:slug', async (req,res) => {
    const article = await Article.findOne({slug: req.params.slug})
    if(article == null) res.redirect('/');
    res.render('articles/show', {article: article})
})
router.get('/edit/:slug', async(req,res) => {
    const articleOld = await Article.findOne({slug: req.params.slug})
    await Article.findByIdAndDelete(articleOld._id)
    const articleNew = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    try{
        await articleNew.save();
        res.redirect(`/articles/${articleNew.slug}`)
     } catch(e){
         console.log(e);
         res.render('articles/new', {article: articleNew})
     }
    res.render('articles/edit', {article: articleNew});
})
router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
       article = await article.save();
       res.redirect(`/articles/${article.slug}`)
    } catch(e){
        console.log(e);
        res.render('articles/new', {article: article})
    }
})
router.delete('/:id', async(req,res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/');
})
module.exports = router;