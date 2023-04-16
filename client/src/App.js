import './App.css';

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
    </div>
  );
}

export default App;
