import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { addHotSpots, clearHotSpots} from './hotSpotsSlice'
import { useSelector,  useDispatch } from "react-redux"


const HotSpotsForm = ({region}) => {

  // const selectedCountryState = useSelector(( state ) => state.countryState.countryState)
  const hotSpots = useSelector(( state ) => state.hotSpots)
  console.log(hotSpots)

  const [availableHotSpots, setAvailableHotSpots] = useState([]);

  const dispatch = useDispatch()    
  const onHotSpotCheck = (e) => {
    dispatch(addHotSpots(availableHotSpots[e.target.value]))
  }

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.ebird.org/v2/ref/hotspot/${region}?fmt=json\n`,
    headers: { 
      'x-ebirdapitoken': 'dd5duaiiro1'
    }
  };

  const submitHotSpotsForm = () => {

    console.log(hotSpots)

    let document = {"documentName": "Birding Hotspots"}
    document.locations = hotSpots

    const data = JSON.stringify(document)

    const postConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/receive',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(postConfig)
      .then( (res) => {
        console.log(JSON.stringify(res.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  
  // const [hotSpotData, setHotSpotData] = useState({})
  
  // const extractHotSpotData = () => {
  //   const data = useSelector((state) => state.availableHotSpots.find((m) => {
  //       return m.id == '92'
  //   }), shallowEqual)
  // }

  useEffect(() => {
    axios(config)
    .then(res => setAvailableHotSpots(res.data))
    .catch(function (error) {
      console.log(error);
    });    
  }, []);

  const options = availableHotSpots.map(( spot, i) => {
    return (
        <React.Fragment key={`spot_form-check_${spot.locId}`}>
        <div className="form-check">
            <input className="form-check-input"
                type="checkbox"
                key={`spot_checkbox_${spot.locId}`}
                id={spot.locId} 
                name={spot.locId} 
                value={i}
                onClick={onHotSpotCheck}
            />
            <label key={`spot-label_${spot.locId}`} className="form-check-label">{spot.locName} ... ({spot.numSpeciesAllTime})</label>
        </div>
        </React.Fragment>
    )}
  )
  
  let contentSelected = <ul></ul>

  if ( hotSpots.length ) {
    let uniqueHotSpots = [...new Set(hotSpots)]
    contentSelected = <ul>{uniqueHotSpots.map((item) => (<li className="datum" key={item.locId}>{item.locName}</li>))}</ul>
  }

  return (
    <div>
      <Form name="avaiable-hotspots" onSubmit={ (e) => {e.preventDefault()}}>
        {options}
      </Form>
      <Form name="chosen-hotspots">
        <h3>Selected Hostpots</h3>
      <div> 
        {contentSelected}
      </div> 
      <Button onClick={() => { dispatch(clearHotSpots())}}>Reset</Button>
      <Button onClick={ submitHotSpotsForm }>Submit</Button>
      </Form>
    </div>
  )
}


export default HotSpotsForm;
