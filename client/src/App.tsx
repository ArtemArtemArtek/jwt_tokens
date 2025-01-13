import React from 'react';
import './App.css';
import { useAppSelector } from './hooks/hooks.ts';

function App() {

  const data = useAppSelector(state => state.auth.isAuth)

  console.log(data)
  return (
    <div className="App">
      hello world!
    </div>
  );
}

export default App;
