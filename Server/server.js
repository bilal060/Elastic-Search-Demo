const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// searching on query
app.get("/search/:index/:type/", async (req, res) => {
  const { index, type } = req.params;
  const { filters, searchValue } = req.query;
  const { phraseSearch } = require("./search");
  const data = await phraseSearch(
    index,
    type,
    JSON.parse(filters),
    JSON.parse(searchValue)
  );
  res.json(data);
});

// searching on query
app.get("/category/:index/:type", async (req, res) => {
  // const { phraseSearch } = require('./SearchEngine');
  console.log(JSON.parse(req.query.searchValue));
  const { categorySearch } = require("./search");
  const data = await categorySearch(req.params.index, req.params.type, JSON.parse(req.query.searchValue));
  res.json(data);
});
app.get("/load/:table", async (req, res) => {
  // const { phraseSearch } = require('./SearchEngine');
  const { loadSql } = require("./load-sql");
  const data = await loadSql(req.params.table);
  res.json(data);
});

app.listen(3333, () => console.log("server running at 3333"));
