// @ts-ignore
import React, {useEffect} from 'react';

export interface FieldProps {
	name: string;
	component?: any;
	validate?: ((values: unknown) => void);
}

function debounce(func, timeout = 1500){
  let timer;
  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => { 
      func.apply(this, args); 
    }, timeout);
  };
}

export const Field:React.FC<FieldProps> = ({name, component: Input, validate}) => {

  const handleKeyUp = (e: any) => {
    e.preventDefault();
    const {value} = e.target;
    console.log(value)
    
    // Здесь должен быть validate???
    // validate(value)

    // Зачем мы validate прокидываем сюда, почему он не может находится здесь(внутри этого компонента).
    // Т.е. validate будет настраиваться логика
  }

  useEffect(() => {
    const input = document.querySelector(`input[name=${name}]`)

    if (input) {
      input.addEventListener("keyup", debounce(handleKeyUp));
    } else {
      throw new Error;
    }

    return () => {
      if (input) {
        input.removeEventListener("keyup", debounce(handleKeyUp));
      }
    };
  }, []);

  return (
    <>
      {/* значение meta откуда берется из validate? */}
      {Input ? <Input name={name} meta={{valid: true, error: ''}} /> : <input name={name} />}
    </>
  )
};
