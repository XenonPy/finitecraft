import { useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import './App.css'

function App() {

  // const inference = new HfInference("");
  const [result, setResult] = useState('hello')
  const [choices, setChoices] = useState(['Fire', 'Earth', 'Water', 'Air'])
  const [selectedChoice1, setSelectedChoice1] = useState('Fire');
  const [selectedChoice2, setSelectedChoice2] = useState('Fire');

  // useEffect(() => {
  // }, [result]);
  function addtochoices(string){
    setChoices(oldArray => [string,...oldArray] );
  }

  function extractWord(text) {
    const regex = /_(\w+)_/g; // Regex to match words between underscores
    let matches = [];
    let match;
  
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]); // Push the matched word (without underscores)
    }
    console.log(matches)
    return matches;
  }

  function handleCombine(){
    // need to extract key word lava from this string: " A possible combination of the words "fire" and "earth" could be "lava," as lava is molten rock that is formed beneath the Earth's surface and is brought to the surface during volcanic eruptions. Lava is extremely hot and can flow like a liquid, making it a fiery and earthy combination."
    fetch("https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [
          {
            role: "user",
            content: `Combine two words into a **single word relating to both**. For example, combine 'fire' and 'earth' to form _lava_, and 'water' and 'air' to create _mist_. Now, combine the following two words: ${selectedChoice1} + ${selectedChoice2} into a single word only, denoted by underscores like this: _word_`
          }
        ],
        max_tokens: 2000,
        stream: false
      })
    })
    .then(response => {
      // Check if response is ok and convert to JSON
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(data => {
      console.log("API Response:", data);
      var answer = extractWord(data.choices[0].message.content)
      setResult(answer)
      if (answer != ""){
        addtochoices(answer);
      }
      else {
        toast.error('Nice job. The AI is scratching its head')
      }
      
    })
  }

  return (
    <>
        <Toaster />
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
