import React, {useCallback, useState} from 'react';

export interface ParentProps {
	children?: any;
}

export const Parent: React.FC<ParentProps> = ({children}) => {
	const [c, setC] = useState(0);
	const onClick = useCallback(() => {
		setC((s) => s + 1);
	}, [setC]);
	return (
		<div>
			Parent {c}
			<button type="button" onClick={onClick}>
				+
			</button>
			{children}
		</div>
	);
};
