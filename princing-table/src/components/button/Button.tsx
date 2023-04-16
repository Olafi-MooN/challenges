import React from 'react';
import './Button.css';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: IButtonProps) => {
	const { children } = props;
	return (
		<>
			<button {...props} className={`container-button ${props.className}`}>
				{children}
			</button>
		</>
	);
};

export { Button };
