const express = require('express');
const bodyParser = require('body-parser');
const cors =require('cors')
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


// searching on query
app.get('/search/:index/:type', async (req, res) => {

 // const { phraseSearch } = require('./SearchEngine');
 const { phraseSearch } = require('./search');
 const data = await phraseSearch(req.params.index, req.params.type, req.query.filter, req.query.q);
  res.json(data);
});

// searching on query
app.get('/category/:index/:type', async (req, res) => {

  // const { phraseSearch } = require('./SearchEngine');
  const { categorySearch } = require('./search');
  const data = await categorySearch(req.params.index, req.params.type);
   res.json(data);
 });
 app.get('/load/:table', async (req, res) => {
  // const { phraseSearch } = require('./SearchEngine');
  const { loadSql } = require('./load-sql');
  const data = await loadSql(req.params.table);
   res.json(data);
 });

app.listen(3333, () => console.log('server running at 3333'));