import React from 'react';
import './Calendar.css';
import { HeaderCalendar } from './header-calendar/HeaderCalendar';
import { ContentMonthYear } from './content-month-year/ContentMonthYear';
import { ISelectedDay, monthDownUp, useCalendarFunctions } from './UseCalendar.functions';
import { months } from './Calendar.mock';

interface ICalendarProps {
	isRange?: boolean;
	onSelectedDay?: (e: ISelectedDay | Date) => void;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Calendar = (props: ICalendarProps) => {
	const {
		openSelectYearMoth,
		setOpenSelectYearMonth,
		selectedYear,
		setSelectedYearMonth,
		selectedYearMonth,
		selectedDay,
		setSelectedDay,
		listMonth,
		setSelectedYear,
		rangeOfDay,
	} = useCalendarFunctions(props);
	const { isRange, onSelectedDay, isOpen, setIsOpen } = props;

	return (
		<>
			{isOpen && (
				<div className="container-calendar">
					<HeaderCalendar
						year={selectedYear}
						month={selectedYearMonth?.month?.month}
						onClickArrowLeft={() => {
							var monthSelected;
							var newYear;
							var newIndex;
							if (selectedYearMonth.month.index - 1 < 0) {
								monthSelected = months[11];
								newYear = selectedYearMonth.year - 1;
								newIndex = 11;
								setSelectedYear((prev) => prev - 1);
							} else {
								monthSelected = months[monthDownUp(selectedYearMonth?.month?.index - 1)];
								newYear = selectedYearMonth?.year;
								newIndex = monthDownUp(selectedYearMonth?.month?.index - 1);
							}
							setSelectedYearMonth({
								month: { ...monthSelected, index: newIndex },
								year: newYear,
							});
						}}
						onClickArrowRight={() => {
							var monthSelected;
							var newYear;
							var newIndex;
							if (selectedYearMonth.month.index + 1 > 11) {
								monthSelected = months[0];
								newYear = selectedYearMonth.year + 1;
								newIndex = 1;
								setSelectedYear((prev) => prev + 1);
							} else {
								monthSelected = months[monthDownUp(selectedYearMonth.month.index + 1)];
								newYear = selectedYearMonth.year;
								newIndex = monthDownUp(selectedYearMonth.month.index + 1);
							}

							setSelectedYearMonth({
								month: { ...monthSelected, index: newIndex },
								year: newYear,
							});
						}}
						onClickSelectMothYear={() => setOpenSelectYearMonth(true)}
					/>

					<div className="content-calendar">
						<div className="content-calendar-table-thead">
							<div className="content-calendar-table-thead-week">Dom</div>
							<div className="content-calendar-table-thead-week">Seg</div>
							<div className="content-calendar-table-thead-week">Ter</div>
							<div className="content-calendar-table-thead-week">Qua</div>
							<div className="content-calendar-table-thead-week">Qui</div>
							<div className="content-calendar-table-thead-week">Sex</div>
							<div className="content-calendar-table-thead-week">Sab</div>
						</div>
						<div className="content-calendar-table-tbody">
							{listMonth.map((y: any) => {
								const data = new Date().toLocaleDateString('pt-BR', {
									hour12: false,
									timeZone: 'UTC',
								});

								return (
									<div
										onClick={(_e) => {
											if (isRange) {
												setSelectedDay((prev) => {
													if (prev?.start?.month && !prev?.end?.month) {
														return { ...prev, end: { ...y, year: selectedYearMonth.year } };
													}
													if (!prev?.start?.month || (prev?.end?.month && prev?.start?.month)) {
														return { end: {}, start: { ...y, year: selectedYearMonth.year } } as ISelectedDay;
													}
													return prev;
												});
											} else {
												onSelectedDay && onSelectedDay(new Date(selectedYearMonth.year, y.month.index, y.day));
												setIsOpen(false);
											}
										}}
										className={`content-calendar-table-tbody-row ${!(selectedYearMonth.month.index === y?.month?.index) && ' not-is-month-selected '} 
									${
										data ===
											new Date(selectedYearMonth.year, y.month.index, y.day).toLocaleDateString('pt-BR', {
												hour12: false,
												timeZone: 'UTC',
											}) && 'actual-date'
									}
									${
										rangeOfDay.find((rd) => {
											return rd.day === y.day && rd.index === y.month.index;
										})?.day &&
										selectedDay?.end?.day &&
										' selected-date'
									}
									${selectedDay?.start?.day === y?.day && y?.month?.month === selectedDay?.start?.month?.month && ' selected-date selected-date-start '} ${
											selectedDay?.end?.day === y?.day && y?.month?.month === selectedDay?.end?.month?.month && ' selected-date selected-date-end '
										}`}
									>
										<p>{y?.day}</p>
									</div>
								);
							})}
						</div>
					</div>

					<ContentMonthYear
						selectedYearMonth={selectedYearMonth}
						setSelectedYearMonth={setSelectedYearMonth}
						selectedYear={selectedYear}
						actualYear={selectedYear}
						setActualYear={setSelectedYear}
						isOpen={openSelectYearMoth}
						setIsOpen={setOpenSelectYearMonth}
						onSelectedMonthYear={setSelectedYearMonth}
					/>
				</div>
			)}
		</>
	);
};

export { Calendar };
export type { ICalendarProps };
