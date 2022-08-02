const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const phraseSearch = async (_index, _type, phrase) => {
  const hits = [];
  // only string values are searchable
  const searchResult = await client
    .search({
      index: _index,
        query: {
          match: { 
            OriginCityName : phrase
      }}
    })
    .catch((e) => console.log('errr', e));
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
      index: _index
    })
    .catch((e) => console.log('errr', e));
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
  categorySearch
};