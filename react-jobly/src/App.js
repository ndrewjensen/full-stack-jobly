import RoutesList from "./RoutesList";
import Nav from "./Nav";
import { BrowserRouter } from "react-router-dom";

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
