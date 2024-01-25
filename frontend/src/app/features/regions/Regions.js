import React, { useEffect, useState, useMemo } from "react";
import { Form, Button, FormSelect } from "react-bootstrap";
import { assignRegion, clearRegion } from './regionsSlice'
import { useSelector, useDispatch } from "react-redux"
import HotSpotsForm from "../hotSpots/HotSpotsForm"
import RegionsForm from "./RegionsForm";


const Regions = () => {
  return (
    <RegionsForm />
  )
}

export default Regions