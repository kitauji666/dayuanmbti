import axios from "axios";
import { useEffect, useState } from "react";
import PageViews from "./PageViews";
import Loader from "./Loader";
function Bangumi(props) {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUserName] = useState("");

  const FetchBestCollection = (id) => {
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
                for (const item of response.data.data) {
                  console.log(item);
                  const date = new Date(item.updated_at);
                  const options = {
                    timeZone: "Asia/Shanghai",
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    weekday: "long",
                    hour: "numeric",
                    minute: "numeric",
                  };
                  let timeString = new Intl.DateTimeFormat(
                    "zh-CN",
                    options
                  ).format(date);
                  

                  const rate = item.rate;
                  if (rate >= 8) {
                    data.push({
                      comment: item.comment,
                      subject_id: item.subject_id,
                      rate: item.rate,
                      commentTime: timeString,
                    });
                  }
                }
              })
              .catch((error) => {
                console.log("error fetching user collection");
              })
          );
          offset += limit;
        }
        setLoading(false);
        return Promise.all(requests).then(() => {
          data = data.sort((a, b) => b.rate - a.rate);
          setFetchedData(data);
        });
      })
      .catch((error) => {
        console.log("error fetching total number");
      });
  };

  useEffect(() => {
    FetchBestCollection(props.id);
    axios.get(`https://api.bgm.tv/v0/users/${props.id}`).then((response) => {
      setUserName(response.data.nickname);
    });
  }, []);
  if (loading) {
    return <Loader prompt="正在访问Bangumi，请稍候" />;
  }
  return <PageViews items={fetchedData} name={username} id={props.id} />;
}

export default Bangumi;
