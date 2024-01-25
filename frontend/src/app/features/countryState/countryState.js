import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import React from "react"
import { assignCountryState, clearCountryState } from "./countryStateSlice"
import { Form, Button } from "react-bootstrap"
import { usstates, mxstates, countries } from "../../../config/regions/states"
// import RegionsForm from "../regions/RegionsForm"

const CountryState = () => {

    const selectedCountryState = useSelector(( state ) => state.countryState.countryState)
    const dispatch = useDispatch()

    const [baseNode, setBaseNode] = useState("US")
    const [stateOptions, setStateOptions] = useState(<ul className="form-check" ></ul>)

    const onStateCheck = (e) => {
        dispatch(assignCountryState(e.target.value))
    }

    // let options

    const onBaseNodeChange =  (e) => { 
        setBaseNode(e.target.value)
        dispatch(clearCountryState())
    } 

    useEffect(() => {
        if ( ["US", "MX"].includes(baseNode)) {
            const states = baseNode === "US" ? usstates : mxstates
            setStateOptions(
                <ul className="form-check" > 
                    {states.map(state => {
                        return (
                        <React.Fragment key={`form-check_${state.code}`}>
                            <li>
                                <input className="form-check-input"
                                    type="checkbox"
                                    key={`checkbox_${state.code}`}
                                    id={state.code} 
                                    name={state.code} 
                                    value={state.code}
                                    onClick={onStateCheck}
                                />
                                <label htmlFor={state.code} key={`label_${state.code}`} className="form-check-label">{state.name}</label>
                            </li>
                        </React.Fragment>)})
                    }
                </ul>
            )
        } else {
            setStateOptions('')
        }
    }, [baseNode]);

    return (
        <Form>
            <select onChange={onBaseNodeChange} defaultValue={'US'}>
                <optgroup>
                    <option value="US">United States</option>
                    <option value="MX">Mexico</option>
                    <option value="--">Other</option>                   
                </optgroup>
            </select>
            {stateOptions}
        </Form>
    )


//     if (!selectedCountryState) { 
//         return (
//             <Form>
//                 <h3>Select US State</h3>
//                 <p>Select the state first ....</p> {options}
//             </Form>
//         )
//     } else {
//         return (
//             <>
//             <Form onSubmit={(e) => e.preventDefault()}>
//                 <h3>Selected State: <span className="datum">{selectedCountryState}</span></h3>
//                 <Button onClick={() => { dispatch(clearCountryState())}}>Reset</Button>
//             </Form>
//             {/* This is probably wrong but... */}

//             <RegionsForm level={"subnational2"} countryState={selectedCountryState} />
            
//             </>
//         )        
//     }
}

export default CountryState

