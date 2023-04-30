import { useState } from 'react';
import './App.css';
import { DatePicker } from './components/datePicker/DatePicker';

const App = () => {
	const [multiSelect, setMultiSelect] = useState<boolean>(false);
	return (
		<>
			<DatePicker isRange={multiSelect} />
			<div className="range-input">
				<input type="checkbox" name="range" onClick={() => setMultiSelect((prev) => !prev)} id="range" />
				<label htmlFor="range">Por período</label>
			</div>
		</>
	);
};

export { App };
