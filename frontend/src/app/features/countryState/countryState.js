import { useSelector, useDispatch } from "react-redux"
import React from "react"
import { assignCountryState, clearCountryState } from "./countryStateSlice"
import { Form, Button } from "react-bootstrap"
import { states } from "../../../config/regions/states"
import RegionsForm from "../regions/RegionsForm"

const CountryState = () => {

    const selectedCountryState = useSelector(( state ) => state.countryState.countryState)
    const dispatch = useDispatch()    
    const onStateCheck = (e) => { dispatch(assignCountryState(e.target.value)) }

    const options = states.map(state => {
        return (
            <React.Fragment key={`form-check_${state.code}`}>
            <div className="form-check">
                <input className="form-check-input"
                    type="checkbox"
                    key={`checkbox_${state.code}`}
                    id={state.code} 
                    name={state.code} 
                    value={state.code}
                    onClick={onStateCheck}
                />
                <label key={`label_${state.code}`} className="form-check-label">{state.name}</label>
            </div>
            </React.Fragment>
        )}
    )

    if (!selectedCountryState) { 
        return (
            <Form>
                <h3>Select US State</h3>
                <p>Select the state first ....</p> {options}
            </Form>
        )
    } else {
        return (
            <>
            <Form onSubmit={(e) => e.preventDefault()}>
                <h3>Selected State: <span className="datum">{selectedCountryState}</span></h3>
                <Button onClick={() => { dispatch(clearCountryState())}}>Reset</Button>
            </Form>
            {/* This is probably wrong but... */}

            <RegionsForm level={"subnational2"} countryState={selectedCountryState} />
            
            </>
        )        
    }
}
export default CountryState

