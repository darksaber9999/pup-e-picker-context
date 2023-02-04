import React from "react";
import "./App.css";
import "./fonts/RubikBubbles-Regular.ttf";
import { DogsView } from "./Components/DogsView";
import { DogProvider } from "./providers/DogProvider";

function App() {
  return (
    <DogProvider>
      <div className="App">
        <header>
          <h1>pup-e-picker</h1>
        </header>
        <DogsView />
      </div>
    </DogProvider>
  );
}

export default App;
