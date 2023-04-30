import { useState } from 'react';
import './DatePicker.css';
import { Calendar } from '../calendar/Calendar';
import { ISelectedDay } from '../calendar/UseCalendar.functions';

interface IDatePickerProps {
	isRange?: boolean;
}

const DatePicker = (props: IDatePickerProps) => {
	const { isRange } = props;
	const [isOpenDatePicker, setIsOpenDatePicker] = useState<boolean>(false);
	const [value, setValue] = useState<ISelectedDay | Date>({} as Date);

	return (
		<>
			<div className="container-input-date-picker">
				<label htmlFor="input-date-picker">Selecione uma data</label>
				<input
					type="text"
					name={'input-date-picker'}
					className="input-date-picker"
					onClick={() => setIsOpenDatePicker(true)}
					placeholder="dd/mm/yyyy"
					value={
						(value as ISelectedDay)?.start
							? new Date(
									(value as ISelectedDay).start.year ?? 1,
									(value as ISelectedDay).start.month.index ?? 1,
									(value as ISelectedDay).start.day
							  )?.toLocaleDateString('pt-BR')
							: (value as Date)?.toLocaleDateString('pt-BR')!
							? (value as Date)?.toLocaleDateString('pt-BR')
							: ''
					}
				/>
				{isRange && (
					<input
						type="text"
						name={'input-date-picker'}
						className="input-date-picker"
						onClick={() => setIsOpenDatePicker(true)}
						placeholder="dd/mm/yyyy"
						disabled
						value={
							(value as ISelectedDay)?.end?.day &&
							new Date((value as ISelectedDay).end.year ?? 1, (value as ISelectedDay).end.month.index ?? 1, (value as ISelectedDay).end.day)?.toLocaleDateString(
								'pt-BR'
							)
						}
					/>
				)}
				<div className="container-input-date-picker-calendar">
					<Calendar isRange={isRange} isOpen={isOpenDatePicker} setIsOpen={setIsOpenDatePicker} onSelectedDay={(e) => setValue(e)} />
				</div>
			</div>
		</>
	);
};

export { DatePicker };
