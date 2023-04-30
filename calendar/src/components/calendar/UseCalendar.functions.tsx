import React, { useEffect, useState } from 'react';
import { SelectedMonthYearType } from './content-month-year/ContentMonthYear';
import { IMonth, months } from './Calendar.mock';
import { IGetDaysBetweenReturn, getDaysBetween } from '../../utils/getDaysBetween';
import { act } from 'react-dom/test-utils';
import { ICalendarProps } from './Calendar';

interface IUseCalendarFunctionsProps extends ICalendarProps {}
type IListMonth = { month: IMonth; day: number; year?: number };
type ISelectedDay = {
	start: IListMonth;
	end: IListMonth;
};

const monthDownUp = (monthLength: number) => (monthLength < 0 ? 11 : monthLength > 11 ? 0 : monthLength);

const useCalendarFunctions = (props: IUseCalendarFunctionsProps) => {
	const {} = props;
	const [openSelectYearMoth, setOpenSelectYearMonth] = useState<boolean>(false);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [selectedYearMonth, setSelectedYearMonth] = useState<SelectedMonthYearType>({} as SelectedMonthYearType);
	const [listMonth, setListMonth] = useState<IListMonth[]>([] as IListMonth[]);
	const [selectedDay, setSelectedDay] = useState<ISelectedDay>({} as ISelectedDay);
	const [rangeOfDay, setRangeOfDays] = useState<IGetDaysBetweenReturn>([] as IGetDaysBetweenReturn);

	useEffect(() => {
		const selectedCalendar = () => {
			const lastMonth = months[monthDownUp(selectedYearMonth.month.index - 1)];
			const actualMonth = months[monthDownUp(selectedYearMonth.month.index)];
			const nextMonth = months[monthDownUp(selectedYearMonth.month.index + 1)];

			const firstDayWeek = new Date(selectedYearMonth.year, actualMonth?.index ?? 1, 1).getDay();
			const lastDayWeek = new Date(selectedYearMonth.year, actualMonth?.index ?? 1, selectedYearMonth?.month?.listDays?.slice(-1)[0] || 1).getDay();

			const getDaysLastMonth = lastMonth?.listDays?.slice(firstDayWeek === 0 ? -7 : -firstDayWeek).map((x) => ({ day: x, month: lastMonth })) as IListMonth[];
			const getDaysActualMonth = actualMonth?.listDays?.map((x) => ({ day: x, month: actualMonth })) as IListMonth[];
			const getDaysNextMonth = lastDayWeek === 6 ? [] : (nextMonth?.listDays?.slice(0, 6 - lastDayWeek).map((x) => ({ day: x, month: nextMonth })) as IListMonth[]);

			var listMonthArray = [...getDaysLastMonth, ...getDaysActualMonth, ...getDaysNextMonth];

			if (listMonthArray?.length < 42) {
				const rest = 42 - listMonthArray?.length;
				console.log('getDaysNextMonth', getDaysNextMonth);
				console.log('lastDayWeek', lastDayWeek);
				const restDaysLastMonth = nextMonth?.listDays?.slice(lastDayWeek, rest === 0 ? 1 : rest + lastDayWeek).map((x) => ({ day: x, month: nextMonth })) as IListMonth[];
				console.log(restDaysLastMonth);
				listMonthArray = [...listMonthArray, ...restDaysLastMonth];
			}

			setListMonth(listMonthArray as any);
		};

		if (Object.keys(selectedYearMonth).length > 0) {
			selectedCalendar();
		} else {
			const actualMonth = new Date().getMonth();
			setSelectedYearMonth({ month: { ...months[actualMonth], index: actualMonth }, year: selectedYear });
		}
	}, [selectedYearMonth]);

	useEffect(() => {
		if (selectedDay?.end?.day! && selectedDay?.start?.day!) {
			setTimeout(() => {
				props?.onSelectedDay && props?.onSelectedDay(selectedDay);
				props.setIsOpen(false);
			}, 2000);
		}
		if (selectedDay?.end?.day!) {
			const getDaysBetwee = getDaysBetween(
				{
					day: selectedDay?.start.day,
					month: selectedDay?.start?.month?.index as number,
					year: selectedYearMonth.year,
				},
				{
					day: selectedDay?.end.day,
					month: selectedDay?.end?.month?.index as number,
					year: selectedYearMonth.year,
				}
			);
			setRangeOfDays(getDaysBetwee);
		}
	}, [selectedDay]);

	return {
		...props,
		openSelectYearMoth,
		setOpenSelectYearMonth,
		selectedYear,
		setSelectedYear,
		selectedYearMonth,
		setSelectedYearMonth,
		listMonth,
		selectedDay,
		setSelectedDay,
		rangeOfDay,
		setRangeOfDays,
	};
};

export { useCalendarFunctions, monthDownUp };
export type { IListMonth, ISelectedDay };
