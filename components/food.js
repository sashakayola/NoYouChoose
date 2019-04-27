const yelp = require('yelp-fusion');
// const axios = require('axios')

const apiKey = 'fmAW0diM5L5-44HUuua0b-fpqdCl7nb24nwic9nO54zMM4FE-kb3inLE2ToZ9HENk1LEbXEvghTqIijaQ4Mch8sA6NfRbBBMRr_Skmhs9P_KGjmN9DTOETqNTyDDXHYx';

const searchRequest = {
  term: 'restaurants',
  latitude:40.8009124,
  longitude:-73.9677041,
  limit: 2
  // sort_by: 'rating'
  // radius:2000
};


const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const allResults = response.jsonBody.businesses;
  const prettyJson = JSON.stringify(allResults, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});


