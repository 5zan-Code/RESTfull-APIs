const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejs = require('ejs')

const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

mongoose.connect('mongodb+srv://f97aizan:Faizan@cluster0.zhj3z.mongodb.net/wikiDB', {useNewUrlParser: true},()=>{
    console.log('Database is connected!')
})

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model('Article', articleSchema);


const article1 = new Article({
    title: "MongoDB",
    content: "MongoDb is a NO-SQL database that stored the data as JSON format"
})


app.route('/articles')

.get((req, res)=> {
    Article.find({}, (err, responce)=>{
        if(err){
            console.log()
        }else{
            
            res.send(responce)
            
        }
    })
   
})

.post((req, res)=> {
   
    const article = new Article({
        title:req.body.title ,
        content: req.body.content
    })
    article.save((err)=>{
        if(err){
            console.log(err)
        }else{
            res.json(article)
        }
    });
})

.delete((req,res)=> {
    Article.deleteMany({title: req.body.title}, (err)=>{
        if(err){
            console.log(err)
        }else{
            console.log('Item deleted successfully')
            res.send('Item deleted successfully')
        }
    })
})

// *********************************************************************** SPECIFIC ROUTE ********************************************************

app.route('/articles/:name')

.get((req,res)=>{
    Article.findOne({title: req.params.name}, (err, responce)=>{
        if(err){
            console.log(err)
        
        } else if (responce == null){
            console.log('No route found')
            res.send('no route found 404',).status(404)
        }
        else{
            res.send(responce)
            console.log(responce)
        }
    })
})

.post((req,res)=>{
    const article = new Article({
        title: req.params.name,
        content:  req.body.content
    })
    article.save();
    res.send(article)
    console.log(article)
})

.put((req,res)=>{
    Article.updateOne({title: req.params.name}, {title: req.body.title, content: req.body.content}, (err, responce)=>{
        if(err){
            console.log(err)
        }else{
            console.log(responce)
            res.send(responce)
        }
    })
})


.patch((req,res)=>{
    Article.updateOne({title: req.params.name}, {$set: {title: req.body.title}}, (err, responce)=>{
        if(err){
            console.log(err)
        }else{
            console.log(responce)
            res.send(responce)
        }
    })
})


.delete((req,res)=>{
    Article.deleteOne({title: req.params.name}, (err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Item deleted successfully")
            res.send('Item deleted successfully')
        }
    })
})



//  *************************************************** APP START UP *****************************************************************************
app.listen('3000', ()=> {
    console.log('server is listening port 3000')
})