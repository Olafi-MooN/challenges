type DaysStartEndType = {
  start: {
    day: number,
    month: number,
    year: number,
  },
  end: {
    day: number,
    month: number,
    year: number,
  },
}

type IGetDaysBetweenReturn = ReturnType<typeof getDaysBetween>;


function getDaysBetween(start: DaysStartEndType['start'], end: DaysStartEndType['end']) {
  const startDate = new Date(start.year, start.month, start.day);
  const endDate = new Date(end.year, end.month, end.day);

  const days = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    days.push({ day: currentDate.getDate(), index: currentDate.getMonth() });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}

export {
  getDaysBetween,
};
export type {
  IGetDaysBetweenReturn
};