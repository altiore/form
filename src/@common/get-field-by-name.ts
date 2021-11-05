export const getFieldByName = (name: string): any =>
	document.querySelector(`input[name=${name}]`);
