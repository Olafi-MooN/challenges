import React from 'react';
import './Card.css';
import { Button } from '../button/Button';
import { IItemsProps, Items } from './items/Items';

interface ICardProps {
	type: 'BEST' | 'NORMAL';
	kind: string;
	info: string;
	pricing?: string;
	buttonText: string;
	items: IItemsProps[];
}

const Card = (props: ICardProps) => {
	const { type, info, kind, pricing, buttonText, items } = props;
	return (
		<>
			<div className={`container-card ${type}`}>
				{type === 'BEST' && (
					<div className="container-badge">
						<span className={'best-option'}>Mais vantajoso</span>
					</div>
				)}
				<p className="title-info">{info}</p>
				<div className="content-kind-pricing">
					<h1 className="title-kind">{kind}</h1>
					{pricing && (
						<h1 className="title-kind pricing">
							R$&nbsp;
							<strong>{pricing}/mês</strong>
						</h1>
					)}
				</div>

				<div className="button-card">
					<Button className={type === 'BEST' ? 'button-best' : ''}>{buttonText}</Button>
				</div>
				<div className="divider"></div>
				<div className="content-item-list">
					{items.map((_) => (
						<Items text={_.text} info={_.info} />
					))}
				</div>
			</div>
		</>
	);
};

Card.defaultProps = {
	type: 'NORMAL',
};

export { Card };
