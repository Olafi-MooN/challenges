import './HeaderCalendar.css';

interface IHeaderCalendarProps {
	hideMoth?: boolean;
	year?: string | number;
	onClickSelectMothYear: () => void;
	onClickArrowLeft: () => void;
	onClickArrowRight: () => void;
	month: string;
}

const HeaderCalendar = (props: IHeaderCalendarProps) => {
	const { onClickSelectMothYear, onClickArrowLeft, onClickArrowRight, hideMoth, year, month } = props;

	return (
		<>
			<div className="header-calendar">
				<span className="material-symbols-outlined arrow-calendar" onClick={onClickArrowLeft}>
					chevron_left
				</span>

				<div className="content-month-year" onClick={onClickSelectMothYear}>
					<p className="selected-month-year">
						{!hideMoth && month + '  '}
						{year!}
					</p>
					{!hideMoth && <span className="material-symbols-outlined">arrow_drop_down</span>}
				</div>

				<span className="material-symbols-outlined arrow-calendar" onClick={onClickArrowRight}>
					chevron_right
				</span>
			</div>
		</>
	);
};

export { HeaderCalendar };
export type { IHeaderCalendarProps };
