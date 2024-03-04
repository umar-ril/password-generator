import { useCallback, useState, useEffect ,useRef } from 'react'
import logo from "./assets/logo.png"

function App() {

  let passwordRef = useRef(null)

  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"
    let num = "0123456789"
    let allchar = "@#$%^&*!~"
    if (numAllowed) str += num
    if (charAllowed) str += allchar

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  const copytoClipboard = useCallback(()=> {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,30)
    window.navigator.clipboard.writeText(password)
  } , [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <div className=' flex flex-wrap  gap-5 p-0'>
      <img className=" flex justify-center p-0 my-3"src={logo} alt="logo" width="30px" height="30px"  />
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      </div>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          className='w-full py-2 px-2 rounded-2xl outline-none'
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          placeholder='Password' />
        <button
          className='outline-none bg-blue-700 px-2 rounded-2xl text-white mx-1'
          onClick={copytoClipboard}
        >Copy</button>
      </div>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 gap-x-2'>
        <input
          type="range"
          min={6}
          max={30}
          name='length'
          value={length}
          onChange={(e) => { setLength(e.target.value) }} /><label htmlFor="length">Length: {length}</label>
        <input 
        type="checkbox" 
        name="number"
          onChange={() => (setNumAllowed(prev => !prev))} />
          <label 
          htmlFor="number">
            Number
            </label>
        <input 
        type="checkbox" 
        name="char"
        onChange={() => (setCharAllowed(prev => !prev))} />
        <label 
        htmlFor="char">
          Character
        </label>
      </div>
    </div>
  )
}

export default App
