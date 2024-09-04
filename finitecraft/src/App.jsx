import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const [result, setResult] = useState(['hello', 'world'])

  // useEffect(() => {
    
  // }, [result]);
  

  return (
    <>
    <div className="alert alert-warning" role="alert">
  This site uses AI. I'm not responsible for any content generated by AI that is displayed on this site.
</div>
<div className="combine">
  <div class="add">
<select className="form-select" aria-label="Element 1 select">
  <option value="fire">Fire</option>
  <option value="earth">Earth</option>
  <option value="water">Water</option>
  <option value="air">Air</option>
</select>
<p>+</p>
<select className="form-select" aria-label="Element 2 select">
{result.map((x, y) => (
        <option value={x}>{x}</option>
      ))}
</select>
<p>=</p>
<p>{result}</p>
</div>
</div>
    </>
  )
}

export default App
