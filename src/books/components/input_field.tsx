import React, { useState } from 'react';
import { preview } from 'vite';

const InputField = ({ type, placeholder, icon }) => {
  const [isPasswordDisplayed, setIsPasswordDisplayed] = useState(false);

  return (
    <div className="input-wrapper">
      <input
        type={ isPasswordDisplayed ? 'text' : type }
        className="input-field"
        placeholder={placeholder}
        required
      />
      <i className="material-symbols-rounded">{icon}</i>
      {
        type === 'password' && (
          <i 
            onClick={ () => setIsPasswordDisplayed(!isPasswordDisplayed) }
            className="material-symbols-rounded eye-icon"
          >
            { isPasswordDisplayed ? 'visibility' : 'visibility_off' }
          </i>
        )
      }
    </div>
  );
}

export default InputField;