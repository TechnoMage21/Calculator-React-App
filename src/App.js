import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Calculator from "./components/Calculator";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="cal-body">
          <h4 className="heading">Calculator App</h4>
          <Calculator />
        </div>
      </div>
    </div>
  );
}

export default App;
