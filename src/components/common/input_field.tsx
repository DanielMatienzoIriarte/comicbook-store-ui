import { forwardRef, useState } from 'react';
import { InputFieldProps } from "../../utils/interfaces";

const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  const { label, icon, error, className, type, ...rest } = props;
  const [isPasswordDisplayed, setIsPasswordDisplayed] = useState(false);

  return (
    <div className={`input-group ${className || ""}`}>
      {label && <label className="input-label">{label}</label>}
      
      <div className="input-relative-container input-wrapper" style={{ position: 'relative' }}>
        {icon && (
          <i className="material-symbols-rounded input-icon">
            {icon}
          </i>
        )}

        <input
          ref={ref}
          {...props}
          type={ isPasswordDisplayed ? 'text' : props.type }
          className={`input-field ${error ? "input-error" : ""}`}
          data-testid="input-field"
        />

        {
          props.type === 'password' && (
            <i 
              onClick={ () => setIsPasswordDisplayed(prevState => !prevState) }
              className="material-symbols-rounded eye-icon"
              data-testid="eye-icon"
            >
              { isPasswordDisplayed ? 'visibility' : 'visibility_off' }
            </i>
          )
        }

        {error && (
          <span className="form-error-message">
            {error}
          </span>
        )}
      </div>
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField;
