import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { assignRegion, clearRegion } from './regionsSlice'
import { useSelector, useDispatch } from "react-redux"
import HotSpotsForm from "../hotSpots/HotSpotsForm"

const RegionsForm = ({level, countryState }) => {

  // const selectedCountryState = useSelector(( state ) => state.countryState.countryState)
  const selectedRegion = useSelector(( state ) => state.regions.regions)
  console.log(selectedRegion)

  const dispatch = useDispatch()    
  const onRegionCheck = (e) => { 
    console.log(e.target.value)
    dispatch(assignRegion(e.target.value)) 
  }

  const buildConfig = (level, countryState) => { return { method: 'get', maxBodyLength: Infinity,
    url: `https://api.ebird.org/v2/ref/region/list/${level}/${countryState}\n`,
    headers: {'x-ebirdapitoken': 'dd5duaiiro1'}}
  }

  const config = useMemo(() => buildConfig(level, countryState), [level, countryState]);

  const [regions, setRegions] = useState([]);
  const [skipRegions, setSkipRegions] = useState(false);

  useEffect(() => {
    axios(config)
    .then(res => setRegions(res.data))
    .catch(function (error) {
      console.log(error);
    });    
  }, [config]);

  useEffect(() => {setSkipRegions(!(regions.length > 0))}, [regions]);

  const options = regions.map(region => {
    return (
        <React.Fragment key={`region_form-check_${region.code}`}>
        <div className="form-check">
            <input className="form-check-input"
                type="checkbox"
                key={`region_checkbox_${region.code}`}
                id={region.code} 
                name={region.code} 
                value={region.code}
                onClick={onRegionCheck}
            />
            <label key={`region-label_${region.code}`} className="form-check-label">{region.name}</label>
        </div>
        </React.Fragment>
    )}
  )  
    // 
    // Skip Regions if there are no regions loaded.
    // (Some Countries have only hotspots not organized by regions.)
    //

 if (skipRegions) {
  return (
    <React.Fragment>
      <HotSpotsForm region={countryState} />
  </React.Fragment>
  )
 } else if (!selectedRegion) {
    return (
      <Form>
        {selectedRegion}
        <h4>Regions</h4>
        {options}
    </Form>
  )
  } else {
    return (
      <React.Fragment>
        <h3>Selected Region: <span className="datum">{selectedRegion}</span></h3>
        <Button onClick={() => { dispatch(clearRegion())}}>Reset</Button>
        <HotSpotsForm region={selectedRegion} />
    </React.Fragment>
    )
  }
}

export default RegionsForm;
