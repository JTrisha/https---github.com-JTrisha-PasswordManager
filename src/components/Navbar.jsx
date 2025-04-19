import React from "react"
const Navbar=()=>{
return(
    <nav className='bg-slate-800 text-white'>
        <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">
        <div className="logo font-bold text-white text-2xl  ">
          
            Pass
          
            <span className='text-green-500'>
            OP/ 
            </span>
            </div>
    <ul>
        <li className="flex gap-4">
            <a className="hover:font-bold" href='/'>Home</a>
            <a className="hover:font-bold" href='#'>About</a>
            <a className="hover:font-bold" href='#'>Contact</a>
        </li>
    </ul>
    <button className="text-white bg-green-500 my-9 font-bold rounded-md flex gap-4 ring-white ring-1">
      Github
    </button>
    </div>
    </nav>
)
}
export default Navbar