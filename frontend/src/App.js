import './styles/main.scss';
import CountryState from './app/features/countryState/countryState'
import { Container } from 'react-bootstrap';

function App() {
  return (
    <main>
      <div className="wrapper">
        <div className="box header">
          <h1>Hotspotter</h1>
        </div>
        <div className="box sidebar">
        </div>
        <div className="box content">
          <Container>
            <CountryState />
          </Container>
        {/* <Regions level={"subnational2"} countryState={"US-AZ"} /> */}
        {/* <HotSpots subregion={'US-NJ-029'}/> */}
        </div>
        <div className="box footer">Hotspotter - Copyright @2023 tacitus.org</div>
      </div>    
  </main>
  );
}

export default App;
