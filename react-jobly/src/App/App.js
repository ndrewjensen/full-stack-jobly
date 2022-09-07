
import "./App.css";
import RoutesList from "../RoutesList/RoutesList";
import Nav from "../Nav/Nav";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";


/** App Component
 *
 * App -> Companies -> { Nav, RoutesList}
 */

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
         <RoutesList />
      </BrowserRouter>
    </div>
  );
}

export default App;
