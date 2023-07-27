import "../src/styles/App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "../src/routes/index";

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
