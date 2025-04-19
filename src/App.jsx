
import React from 'react';


import Footer from './components/Footer';
import './index.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager';

function App() {

  return (
    <>
   <Navbar/>
   
   <div className='min-h-[80vh]'><Manager/></div>
   
   <Footer/>
    </>
  )
}

export default App
