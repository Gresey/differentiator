import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const validateJSON = (jsonString) => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async () => {
    setError('');
    if (!validateJSON(input)) {
      setError('Invalid JSON format');
      return;
    }

    try {
      const payload = JSON.parse(input);
      const apiResponse = await axios.post('https://bajaj-backend-t6ge.onrender.com/bfhl', payload);
      setResponse(apiResponse.data);
    } catch (err) {
      setError('Error submitting request');
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    return (
      <div className="response-box">
        {selectedOptions.includes('Numbers') && (
          <div className="response-item">
            <h3>Numbers:</h3>
            <p>{response.numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Alphabets') && (
          <div className="response-item">
            <h3>Alphabets:</h3>
            <p>{response.alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div className="response-item">
            <h3>Highest Lowercase Alphabet:</h3>
            <p>{response.highest_lowercase_alphabet.join(', ')}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>0827CI211068 (Gresey Patidar)</h1>
      </header>
      <main>
        <div className="input-section">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter JSON (e.g., { "data": ["A", "C", "z"] })'
            rows={4}
            className="input-box"
          />
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {response && (
          <div className="options-section">
            <h2>Select Display Options:</h2>
            <div className="checkbox-group">
              <label>
                <input 
                  type="checkbox" 
                  value="Numbers"
                  checked={selectedOptions.includes('Numbers')}
                  onChange={(e) => 
                    setSelectedOptions(
                      e.target.checked 
                      ? [...selectedOptions, 'Numbers']
                      : selectedOptions.filter(opt => opt !== 'Numbers')
                    )
                  }
                /> Numbers
              </label>
              <label>
                <input 
                  type="checkbox" 
                  value="Alphabets"
                  checked={selectedOptions.includes('Alphabets')}
                  onChange={(e) => 
                    setSelectedOptions(
                      e.target.checked 
                      ? [...selectedOptions, 'Alphabets']
                      : selectedOptions.filter(opt => opt !== 'Alphabets')
                    )
                  }
                /> Alphabets
              </label>
              <label>
                <input 
                  type="checkbox" 
                  value="Highest lowercase alphabet"
                  checked={selectedOptions.includes('Highest lowercase alphabet')}
                  onChange={(e) => 
                    setSelectedOptions(
                      e.target.checked 
                      ? [...selectedOptions, 'Highest lowercase alphabet']
                      : selectedOptions.filter(opt => opt !== 'Highest lowercase alphabet')
                    )
                  }
                /> Highest Lowercase Alphabet
              </label>
            </div>
            {renderFilteredResponse()}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
