import './App.css';
import Home from './Home';

function App() {
  console.log(process.env.REACT_APP_NAME)
  console.log(process.env.REACT_APP_NAME1)
  return (
    <div className="App">
        Hello from Saravnan Again
        <h2>Sara Pharma 1</h2>
        <p>
          Hi {process.env.REACT_APP_NAME}
        </p>
        <Home/>
    </div>
  );
}

export default App;
