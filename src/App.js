import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import MapContainer from "./components/map/Map";



function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MapContainer} />

        </Switch>
      </Router>

    </>
  );
}

export default App;
