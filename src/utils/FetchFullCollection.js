import axios from "axios";

function FetchFullCollection(id) {
  let data = [];
  let limit = 50;
  let offset = 0;

  axios
    .get(
      `https://api.bgm.tv/v0/users/${id}/collections?subject_type=2&type=2&limit=50&offset=0`
    )
    .then((response) => {
      let total = response.data.total;
      const requests = [];
      while (offset < total) {
        requests.push(
          axios
            .get(
              `https://api.bgm.tv/v0/users/${id}/collections?subject_type=2&type=2&limit=50&offset=${offset}`
            )
            .then((response) => {
              data = data.concat(
                response.data.data.map(item => ({
                  comment: item.comment,
                  subject_id: item.subject_id,
                  rate: item.rate
                }))
              )
            })
            .catch((error) => {
              console.log("error fetching user collection");
            })
        );
        offset += limit;
      }
      return Promise.all(requests).then(() => {
        console.log(requests);
        return data;
      });
    })
    .catch((error) => {
      console.log("error fetching total number");
    });

  
}

export default FetchFullCollection;
