// @ts-ignore
import React, {useEffect, useRef} from 'react';

export interface FieldProps {
	name: string;
	component?: any;
	validate?: ((values: unknown) => void);
}

export const Field:React.FC<FieldProps> = ({name, component, validate}) => {
  const elementRef = useRef<HTMLInputElement>(null);

  const handleKeyUp = (e: any) => {
    e.preventDefault();
    console.dir(e.target.validity)
    console.dir(e.target.checkValidity())

    const {value} = e.target;
    validate && validate(value)
  }

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.onkeyup = handleKeyUp;
    }

    return () => {
      if (elementRef.current) {
        elementRef.current.onkeyup = null;
      }
    };
  }, []);

  return (
    <>
      {component ? component(name, elementRef) : <input name={name} ref={elementRef} />}
    </>
  )
};
