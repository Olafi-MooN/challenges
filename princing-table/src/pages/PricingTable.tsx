import React from 'react';
import './PricingTable.css';
import { Card } from '../components/card/Card';

const PricingTable = () => {
	return (
		<>
			<div className={'container-pricing-table'}>
				<div className={'card-group'}>
					<Card
						buttonText="Assinar Agora"
						info="Para você começar"
						kind="Essentials"
						pricing="19,97"
						type="NORMAL"
						items={[
							{ text: 'Até 3 usuários', info: '-' },
							{ text: 'Autoatendimento', info: '-' },
						]}
					/>
					<Card
						buttonText="Assinar Agora"
						info="Para você decolar"
						kind="Ultimate"
						pricing="29,97"
						type="BEST"
						items={[
							{ text: 'Usuários ilimitados', info: '-' },
							{ text: 'Suporte 24/7', info: '-' },
							{ text: 'CSM Dedicado', info: '-' },
							{ text: 'Treinamentos', info: '-' },
						]}
					/>
					<Card
						buttonText="Fale com a gente"
						info="Para sua empresa"
						kind="Enterprise"
						type="NORMAL"
						items={[{ text: 'Plano customizado especialmente para a necessidade de seu negocio' }]}
					/>
				</div>
			</div>
		</>
	);
};

export { PricingTable };
