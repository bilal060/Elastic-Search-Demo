const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

const phraseSearch = async (_index, _type, filters, searchValue) => {
  const hits = [];
  let object = {};
  if (filters.Category !== '') {
    console.log("Category:", filters.Category);
    object = {
      bool: {
        filter: [
          {
            terms: filters,
          },
          {
            match: searchValue,
          },
        ],
      },
    };
  } else {
    object = {
      match: searchValue,
    };
  }

  let query = {
    index: _index,
    query: object,
  };
  const searchResult = await client
    .search(query)
    .catch((e) => console.log("errr", e));
  if (
    searchResult &&
    searchResult.hits &&
    searchResult.hits.hits &&
    searchResult.hits.hits.length > 0
  ) {
    hits.push(...searchResult.hits.hits);
  }

  return {
    hitsCount: hits.length,
    hits,
  };
};

const categorySearch = async (_index, _type,searchValue) => {
  const hits = [];  
  let query = {
    index: _index,
    query: {
      match: searchValue,
    },
    size:20
  };
  const searchResult = await client
    .search(query)
    .catch((e) => console.log("errr", e));
  if (
    searchResult &&
    searchResult.hits &&
    searchResult.hits.hits &&
    searchResult.hits.hits.length > 0
  ) {
    hits.push(...searchResult.hits.hits);
  }

  return {
    hitsCount: hits.length,
    hits,
  };
};

module.exports = {
  phraseSearch,
  categorySearch,
};
