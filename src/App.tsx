import React, { useState } from 'react';
import Button from './components/reusables/button/button';
import TextInput from './components/reusables/text-input/text-input';

function App(): JSX.Element {
  const [input, setInput] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="App">
      <Button name="test" onClick={() => console.log('yo')} />
      <TextInput
        label="test"
        onChange={handleInput}
        name="test"
        value={input}
        width="120px"
      />
    </div>
  );
}

export default App;
