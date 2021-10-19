import React from "react";
import moment from "moment";

const category_0 = "#ff000000";
const category_1 = "#b32f4a";
const category_2 = `#d7313e`;
const category_3 = `#f97041`;
const category_4 = `#faa247`;
const category_5 = `#acd6a9`;

function paramsColors(num) {
  if (num >= 0 && num <= 50) {
    return category_5;
  }

  if (num >= 51 && num <= 70) {
    return category_4;
  }

  if (num >= 71 && num <= 90) {
    return category_3;
  }

  if (num >= 91 && num <= 120) {
    return category_2;
  }

  if (num >= 121) {
    return category_1;
  }
}
function paramsName(num) {
  if (num >= 0 && num <= 50) {
    return "Хороший уровень";
  }

  if (num >= 51 && num <= 70) {
    return "Умеренный уровень";
  }

  if (num >= 71 && num <= 90) {
    return "Вредный уровень для чувствительных групп";
  }

  if (num >= 91 && num <= 120) {
    return "Вредный уровень";
  }

  if (num >= 121) {
    return "Очень вредный уровень";
  }
}
export const Popup = ({ info }) => {
  let value;
  let date;
  let place;
  if (info) {
    const help = JSON.parse(info);
    value = help.pollutants[help.pollutants.length - 1].value;
    const newDate = moment(help.pollutants[help.pollutants.length - 1].time);
    date = newDate.format("DD-MM-YYYY, hh:mm");
    place = help.cityName;
  }

  return (
    <>
      {info ? (
        <div className="popup">
          <div className="marker_header">
            <div className="marker" style={{ background: paramsColors(value) }}>
              {value}
              <div className="marker_aqi">AQI PM2.5</div>
            </div>
            <div className="marker_header__title">
              <div className="">{paramsName(value)}</div>
              <div className="marker_header_time">Дата измерения</div>
              <div className="marker_header_time">{date}</div>
            </div>
          </div>
          <div className="popup_body">
            <div>Место, где произведено измерение - {place}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};
