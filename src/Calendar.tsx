import { useState } from "react";

import * as images from "./images";

const days = ["日", "月", "火", "水", "木", "金", "土"];

const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const year = date.getFullYear();
  const month = date.getMonth();

  // 月の最初の日と最後の日を取得
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // カレンダーの日付を生成
  const dates = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: lastDate }, (_, i) => i + 1),
    ...Array((7 - ((lastDate + firstDay) % 7)) % 7).fill(null),
  ].map((day, i) => {
    const date = new Date(year, month, day);
    const weekday = date.getDay();
    return (
      <div
        className={`date ${
          year === today.getFullYear() &&
          month === today.getMonth() &&
          day === today.getDate()
            ? "today"
            : ""
        } ${weekday === 0 ? "sunday" : ""} ${weekday === 6 ? "saturday" : ""}`}
        key={i}
      >
        {day || ""}
      </div>
    );
  });

  const prevMonth = () => {
    setDate(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setDate(new Date(year, month + 1));
  };

  return (
    <div className="calenderPage page SpContentsMargin SpContentsMargin--calenderPage">
      <div className="calenderPage__container">
        <div className="calenderPage__headingWrap page__headingWrap">
          <h2 className="calenderPage__heading page__heading">
            <img alt="" src={images.img_arrowLeft} onClick={prevMonth} />
            {`${year}年${month + 1}月`}
            <img alt="" src={images.img_arrowRight} onClick={nextMonth} />
          </h2>
        </div>
        <div className="weekdays">
          {days.map((day, i) => (
            <div
              className={`weekday ${i === 0 ? "sunday" : ""} ${
                i === 6 ? "saturday" : ""
              }`}
              key={i}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="dates">{dates}</div>
      </div>
    </div>
  );
};

export default Calendar;
