import React from 'react';
import ReactDOM from 'react-dom/client';
import { PricingTable } from './pages/PricingTable';
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<PricingTable />
	</React.StrictMode>
);
