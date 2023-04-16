import React from 'react';
import './Items.css';
import IconInfo from '../../../../public/Info.svg';
import IconCheck from '../../../../public/Check.svg';

interface IItemsProps {
	text: string;
	info?: string;
}

const Items = (props: IItemsProps) => {
	const { text, info } = props;
	return (
		<>
			<div className={'container-items'}>
				<img src={IconCheck} alt="IconCheck" />
				<p className="items-text">{text}</p>

				{info && <img src={IconInfo} alt="IconInfo" />}
			</div>
		</>
	);
};

export { Items };
export type { IItemsProps };
