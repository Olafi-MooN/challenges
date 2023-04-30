import React, { useEffect, useState } from 'react';
import './ContentMonthYear.css';
import { HeaderCalendar, IHeaderCalendarProps } from '../header-calendar/HeaderCalendar';
import { IMonth, months } from '../Calendar.mock';

type SelectedMonthYearType = { month: IMonth & { index: number }; year: number };

interface IContentMonthYearProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSelectedMonthYear?: (selectedMonthYear: SelectedMonthYearType) => void;
	selectedYear: number;
	actualYear: number;
	setActualYear: React.Dispatch<React.SetStateAction<number>>;
	selectedYearMonth: SelectedMonthYearType;
	setSelectedYearMonth: React.Dispatch<React.SetStateAction<SelectedMonthYearType>>;
}

const ContentMonthYear = (props: IContentMonthYearProps) => {
	const { onSelectedMonthYear, isOpen, setIsOpen, selectedYear, actualYear, setActualYear, selectedYearMonth, setSelectedYearMonth } = props;

	useEffect(() => {
		if (selectedYear!) setActualYear(selectedYear);
	}, [selectedYear]);

	return (
		<>
			{isOpen && (
				<div className="container-select-month-year">
					<HeaderCalendar
						year={actualYear}
						hideMoth={true}
						month={selectedYearMonth?.month?.month ?? ' '}
						onClickArrowLeft={() => {
							setActualYear((prev) => prev - 1);
						}}
						onClickSelectMothYear={() => {
							setSelectedYearMonth((prev) => ({ ...prev, year: actualYear }));
							setIsOpen(false);
						}}
						onClickArrowRight={() => {
							setActualYear((prev) => prev + 1);
						}}
					/>
					<div className="content-select-month-year">
						{months.map((month, key) => (
							<div
								key={key}
								className="month"
								onClick={() => {
									onSelectedMonthYear &&
										onSelectedMonthYear({
											month: { ...month, index: month.index as number },
											year: actualYear,
										});
									setIsOpen(false);
								}}
							>
								{month.month.slice(0, 3)}
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export { ContentMonthYear };
export type { SelectedMonthYearType };
