import React, { useState } from 'react';

const InputField = ({ type, placeholder, icon }) => {
  const [isPasswordDisplayed, setIsPasswordDisplayed] = useState(false);

  return (
    <div className="input-wrapper">
      <input
        type={ isPasswordDisplayed ? 'text' : type }
        className="input-field"
        placeholder={placeholder}
        required
        data-testid="input-field"
      />
      <i className="material-symbols-rounded">{icon}</i>
      {
        type === 'password' && (
          <i 
            data-testid="eye-icon"
            onClick={ () => setIsPasswordDisplayed(prevState => !prevState) }
            className="material-symbols-rounded eye-icon"
          >
            { isPasswordDisplayed ? 'visibility' : 'visibility_off' }
          </i>
        )
      }
    </div>
  );
};

export default InputField;