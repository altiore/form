// @ts-ignore
import React, {useCallback, useEffect, useState} from 'react';

import _debounce from 'lodash/debounce';

export interface FieldProps {
	name: string;
	component?: any;
	validate?: ((values: unknown) => void);
}

export const Field:React.FC<FieldProps> = ({name, component: Input, validate}) => {
  
  const [meta, setMeta] = useState({
    error: '',
    valid: true,
  })
  
  const handleDebounceFn = (e) => {
    e.preventDefault();
    
    const {value} = e.target;
    const result = validate && validate(value);
    result === undefined ? meta : setMeta({error: result, valid: false});

    return false
  }

  const debounceHandle = useCallback(_debounce(handleDebounceFn, 1500), []);

  const handleKeyUp = (e: any) => {
    debounceHandle(e); 
  }

  useEffect(() => {
    const input = document.querySelector(`input[name=${name}]`)

    if (input) {
      input.addEventListener("keyup", handleKeyUp);
    } else {
      throw new Error(`Input c name=${name} не был найден`);
    }

    return () => {
      if (input) {
        input.removeEventListener("keyup", handleKeyUp);
      }
    };
  }, []);

  return (
    <>
      {Input ? <Input name={name} meta={meta} /> : <input name={name} />}
    </>
  )
};
