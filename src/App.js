import React from "react"
import './App.css'

function App() {

  const [url, setUrl] = React.useState()
  const [response, setResponse] = React.useState("Wellcome to API tester!")
  const loader = <div className="loader"/>

  let run = () => {
    setResponse(undefined)
    let options = document.getElementById("options").innerText
    try {
      if (options.length > 0) options = JSON.parse(options)
    } catch (e) {
      setResponse("Wrong json options")
      return 
    }

    if (options.body) {
      options.body = JSON.stringify(options.body)
    }

    fetch(url, options)
    .then(res => res.json())
    .then(res => setResponse(res))
    .catch((err) => setResponse(`ERROR: ${err.message}`))
  }

  let copy = (e) => {
    setTimeout(() => {
      e.target.style.backgroundColor = "#ABEBC6"
      setTimeout(() => {
        e.target.style.backgroundColor = "#FFFFFF"
        let newResponse
        if (typeof response === "string") newResponse = `${response}`
        else newResponse = {...response}
        setResponse("Copied!")
        setTimeout(() => {
          setResponse(newResponse)
        }, 700);
      }, 100);
    }, 300);
    navigator.clipboard.writeText(JSON.stringify(response))
  }

  return (
    <div className="App">
      <div className='form'>
        <h1>API TEST</h1>
        <h2>Link (url):</h2>
        <input type="text" name="url" placeholder="http://localhost:5000/" onChange={(e) => setUrl(e.target.value)}/>
        <h2>Options (json):</h2>
        <pre onKeyDown={(e) => {if (e.keyCode == 9)  e.preventDefault()}} id="options" contentEditable></pre>
        <button onClick={() => run()}>Submit</button>
      </div>
      <pre className="response" onClick={(e) => copy(e)}>{(response) ? JSON.stringify(response, undefined, 2) : loader}</pre>
    </div>
  )
}

export default App
