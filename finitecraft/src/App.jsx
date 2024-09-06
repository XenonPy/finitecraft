import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const [result, setResult] = useState('hello')
  const [choices, setChoices] = useState(['Fire', 'Earth', 'Water', 'Air'])
  const [selectedChoice1, setSelectedChoice1] = useState('Fire');
  const [selectedChoice2, setSelectedChoice2] = useState('Fire');

  // useEffect(() => {
    
  // }, [result]);
  function addtochoices(string){
    setChoices(oldArray => [string,...oldArray] );
  }
  
  function handleCombine(){

  }

  return (
    <>
    <div className="alert alert-warning" role="alert">
  This site uses AI. I'm not responsible for any content generated by AI that is displayed on this site.
</div>
<div className="combine">
  <div className="add">
<select className="form-select" aria-label="Element 1 select"  value={selectedChoice1}
            onChange={(e) => setSelectedChoice1(e.target.value)}>
{choices.map((x, y) => (
        <option value={x}>{x}</option>
      ))}
</select>
<p>+</p>
<select className="form-select" aria-label="Element 2 select"  value={selectedChoice2}
            onChange={(e) => setSelectedChoice2(e.target.value)}>
{choices.map((x, y) => (
        <option value={x}>{x}</option>
      ))}
</select>
<p>=</p>
<p>{result}</p>
</div>
<button onClick={handleCombine} className="combinebtn">Combine!</button>
</div>
    </>
  )
}

export default App
