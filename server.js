const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const methodOverride = require('method-override')
dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//connect to db
mongoose
.connect(process.env.DB_CONNECT,
    {   useNewUrlParser: true, useUnifiedTopology: true, usecreateIndex:true },
    (err)=>console.log('DB connection successful'));
    
    app.get('/', async(req,res) => {
        const articles = await Article.find().sort({
            createdAt: 'desc'
        })
        res.render('articles/index',{articles: articles});
    })
    app.use('/articles', articleRouter);
    
    app.listen(3000, () => console.log('Listening on port 3000'));