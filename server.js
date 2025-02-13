const express = require('express');
const app = express();
const PORT = 3000;
const YTS = require('./scraper/YTS');

const yts=new YTS()



app.get('/', async (req, res) => {
    res.json("Welcome ,Check the API with different endpoints")

});


app.get('/popular', async (req, res) => {
    const data=await yts.getPopular()

    res.json(data)


});


app.get('/disover/:page?', async (req, res) => {
    const page=req.params.page
    const data=await yts.getDiscover(page)

    res.json(data)


});


app.get('/search/:query?', async (req, res) => {

    if (!query){

        res.json('Pls enter a query to search')
        return
    }


    const query=req.params.query
    const data=await yts.search(query)

    res.json(data)


});

app.get('/movieDetails/:movie_id?', async (req, res) => {
    
    
    const movie_id=req.params.movie_id
    const data=await yts.getMovieDetails(movie_id)
    res.json(data)


});








app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

});
