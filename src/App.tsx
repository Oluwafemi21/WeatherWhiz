// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

import Navbar from './components/Navbar';
import Forecast from './components/Forecast';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-white flex place-items-center">
        <div className='max-w-[768px] min-h-screen mx-auto px-6 w-full'>
          <Navbar />
          <Forecast />
        </div>
      </div>
    </>
  )
}

export default App
