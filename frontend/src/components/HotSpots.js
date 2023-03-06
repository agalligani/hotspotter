import { useState, useEffect } from "react"
import axios from "axios"

const HotSpots = ({subregion}) => {

    const [hotSpots, setHotSpots] = useState([])


    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.ebird.org/v2/ref/hotspot/${subregion}?fmt=json`,
        headers: { 'x-ebirdapitoken': '8fnk6ibqe8h1'}
        };

        useEffect(() => {
            console.log("???");
            axios(config)
            .then(res => setHotSpots(res.data))
            .catch(function (error) {
              console.log(error);
            });    
          },
          []);

    return (
        <div>
        Hotspots
        {hotSpots.map((item, i) => {
            return (<div key={i}><p>{item?.locName}</p></div>);
        })}
    </div>
    )

}
export default HotSpots
