// import { useState, useCallback , useEffect } from 'react'



// function App() {
  
//   const [length,setLength] = useState(8)
//   const [number,setNumber] = useState(false)
//   const [charcter,setCharacter] = useState(false)
//   const [password,setPassword] = useState("")

//   const geneartePass = ()=> useCallback( ()=>{

//     let pass = ""
//     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

//     if (number)  str += "0123456789"
//     if (charcter) str += "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
//     for (let i = 0; i < length; i++) {
//       let char = Math.floor(Math.random()*str.length +1)
//       pass += str.charAt(pass)    
//     }
//     setPassword(pass)

//   },[length,number,charcter,setPassword])

//   useEffect(()=>{
//     geneartePass()},[length,number,charcter,geneartePass])

//   return (
//     <>

//     <div className=' justify-center mx-auto w-full max-w-3xl px-4 py-5 p-4 my-8 shadow-md rounded-lg bg-gray-600 text-orange-500'>
//      <h1 className="text-3xl text-center font-bold underline py-5 ">
//       Password Generator
//     </h1>
//     <div className='flex rounded-lg shadow-md text-center overflow-hidden'>
//     <input type="text" 
//     value={password}
//     placeholder='password'
//     className=' outline-none px-3 py-1 w-full  text-2xl rounded-lg '
//     readOnly
//     />
//     <button className=' outline-none px-3 py-1 ml-1  text-2xl rounded-lg bg-blue-600  font-bold '
//     >Copy</button>
//     </div>

//     <div className='flex text-2xl gap-x-6 m-3 '>
//       <div className='flex items-center gap-x-2 '> 
//         <input type="range" className=' py-3 px-2 max-w-xl accent-blue-600 range-slider cursor-pointer p-4'
//         min={8}
//         max={100}
//         value={length} 
//         onChange={(e)=>{setLength(e.target.value)}}
//          />
//          <label htmlFor="">Length : {length} </label>

//       </div>
//       <div className='flex items-center gap-x-2 '> 
//         <input type="checkbox" className='w-6 h-6 py-3 px-2 cursor-pointer accent-blue-600 p-4'
//         defaultChecked ={number} 
//         id='Number'
//         onChange= {()=> {setNumber ((prev) => !prev)} }
//          />
//          <label htmlFor="Number">Number </label>

//       </div>
//       <div className='flex items-center gap-x-2 '> 
//         <input type="checkbox" className='w-6 h-6 py-3 px-2 accent-blue-600 cursor-pointer p-4'
//         id='charcter'
//         defaultChecked ={number} 
//         onChange= {()=> {setCharacter ((prev) => !prev)} }
//          />
//          <label htmlFor="charcter">Character </label>

//       </div>
//     </div>
    
    

//     </div>
//     </>

//   )
// }

// export default App

import { useState, useCallback, useEffect,useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [charcter, setCharacter] = useState(false);
  const [password, setPassword] = useState('');

  // Correct use of useCallback hook
  const generatePass = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (number) str += '0123456789';
    if (charcter) str += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, charcter]);

  // Correct use of useEffect hook
  useEffect(() => {
    generatePass();
  }, [generatePass]);

  const passwordref =useRef(null)

  function copyclipboard(){
    window.navigator.clipboard.writeText(password)
    passwordref.current?.select()
    // passwordref.current?.setSelectionRange(0,3)
  }

  // const copyToClipboard = () => {
  //   navigator.clipboard.writeText(password)
  //     .then(() => alert('Password copied to clipboard!'))
  //     .catch(err => console.error('Failed to copy: ', err));
  // };

  return (
    <>
      <div className='justify-center mx-auto w-full max-w-3xl px-4 py-5 my-8 shadow-md rounded-lg bg-gray-600 text-orange-500'>
        <h1 className="text-3xl text-center font-bold underline py-5">
          Password Generator
        </h1>
        <div className='flex rounded-lg shadow-md text-center overflow-hidden'>
          <input
            type="text"
            value={password}
            placeholder='password'
            className='outline-none px-3 py-1 w-full text-2xl rounded-lg'
            readOnly
            ref={passwordref}
          />
          <button onClick={copyclipboard}
          className='outline-none px-3 py-1 ml-1 text-2xl rounded-lg bg-blue-600 font-bold'>
            Copy
          </button>
        </div>

        <div className='flex text-2xl gap-x-6 m-3'>
          <div className='flex items-center gap-x-2'>
            <input
              type="range"
              className='py-3 px-2 flex-grow max-w-xl accent-blue-600 range-slider cursor-pointer'
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))} // Ensure value is a number
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input
              type="checkbox"
              className='w-6 h-6 py-3 px-2 cursor-pointer accent-blue-600'
              defaultChecked={number}
              id='Number'
              onChange={() => setNumber((prev) => !prev)}
            />
            <label htmlFor="Number">Number</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input
              type="checkbox"
              className='w-6 h-6 py-3 px-2 accent-blue-600 cursor-pointer'
              id='charcter'
              defaultChecked={charcter}
              onChange={() => setCharacter((prev) => !prev)}
            />
            <label htmlFor="charcter">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
