import { useEffect, useState } from "react";
import axios from "axios";

const Regions = ({level, countryState}) => {

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.ebird.org/v2/ref/region/list/${level}/${countryState}\n`,
    headers: { 
      'x-ebirdapitoken': 'dd5duaiiro1'
    }
  };
  
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    axios(config)
    .then(res => setRegions(res.data))
    .catch(function (error) {
      console.log(error);
    });    
  }, [countryState]);

  return (
    <div>
      Regions
      {regions.map((item, i) => {
        return (
          <div key={i}>
            <p>{item?.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Regions;