const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

const phraseSearch = async (_index, _type, filters, searchValue) => {
  const hits = [];
  let object = {};
  console.log(object)
  if (filters) {
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
  console.log(_index);
  // console.log(query);
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

const categorySearch = async (_index, _type) => {
  const hits = [];
  // only string values are searchable
  const searchResult = await client
    .search({
      index: _index,
      size: 6942
    })
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
