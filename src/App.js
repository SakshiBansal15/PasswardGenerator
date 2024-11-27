
import { useState,useEffect,useRef} from 'react';
import './App.css';
const generateRandomString = (length, includeNumber, includeSpecial,setRandomString) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&*$@{}";
  const newCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz*$@{}";
  let result = "";
  for (let i = 0; i < length; i++) {
    if (includeNumber && includeSpecial) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    } else if (includeSpecial) {
      result += newCharacters.charAt(
        Math.floor(Math.random() * newCharacters.length)
      );
    } else if (includeNumber) {
      result += characters.charAt(
        Math.floor(Math.random() * (characters.length - 5))
      );
    } else {
      result += characters.charAt(
        Math.floor(Math.random() * (characters.length - 15))
      );
    }
  }
  setRandomString(result);
};



function App() {
  const [randomString, setRandomString] = useState("");
  const [length, setLength] = useState(8);
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeSpecial, setIncludeSpecial] = useState(false); 
  const textRef = useRef(null);
  const [copyStatus, setCopyStatus] = useState("");
  
  
  
  const handleCheckboxChangeNumber = (event) => {
    setIncludeNumber(event.target.checked); // Update state with the checkbox value
  };
   const handleCheckboxChangeSpecial= (event) => {
     setIncludeSpecial(event.target.checked); // Update state with the checkbox value
   };

   const handleCopy = async () => {
     try {
       // Access the text content of the div
       const text = textRef.current.innerText;
       await navigator.clipboard.writeText(text);
       setCopyStatus("Copied!");
       setTimeout(() => setCopyStatus(""), 2000); // Clear status after 2 seconds
     } catch (err) {
       setCopyStatus("Failed to copy");
     }
   };


  useEffect(() => {
    generateRandomString(length, includeNumber, includeSpecial,setRandomString)
  }, [length]); // Runs every time 'count' changes

  return (
    <div className="App">
      <h1 className="main_heading">Random Passward Generator</h1>
      <div className="string_box">
        <div className="string" ref={textRef}>
          {randomString}
        </div>
        <button onClick={handleCopy}> Copy Passward</button>
        <div style={{ marginLeft: "10px" }}>{copyStatus}</div>
      </div>
      <div>
        <div>
          <h4>Length : {length}</h4>
          <input
            type="range"
            min={0}
            max={50}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <button
            className="generate_passward"
            onClick={() =>
              generateRandomString(
                length,
                includeNumber,
                includeSpecial,
                setRandomString
              )
            }
          >
            Generate Passward
          </button>
        </div>
        <button
          className="inc_length"
          onClick={() => setLength((pre) => pre + 1)}
        >
          Increase Length
        </button>
        <button
          className="dec_length"
          onClick={() => setLength((pre) => pre - 1)}
        >
          Decrease Length
        </button>
      </div>
      <div>
        <label class="custom-checkbox">
          <input
            type="checkbox"
            checked={includeNumber}
            onChange={handleCheckboxChangeNumber} // Handle change event
          />
          <span class="checkmark"></span>
          Number
        </label>
        <label class="custom-checkbox">
          <input
            type="checkbox"
            checked={includeSpecial}
            onChange={handleCheckboxChangeSpecial} // Handle change event
          />
          <span class="checkmark"></span>
          Special Characters
        </label>
        
      </div>
    </div>
  );
}

export default App;
