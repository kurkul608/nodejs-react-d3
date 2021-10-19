import React from "react";
import moment from "moment";

export const Popup = ({ info, selectedCity }) => {
  const events = {
    otherDang: "Прочие опасности",
    wind: "Ветер",
    fireDang: "Пожарная опасность",
  };

  const getDateFromUnix = ({ un }) => {
    const date = moment.unix(un);
    return date.format("DD.MM.yyyy");
  };
  const getTimeFromUnix = ({ un }) => {
    const date = moment.unix(un);
    return date.format("HH:mm:ss");
  };
  const getAlerts = (arr) => {
    return arr.map((al) => {
      if (al.event === events.otherDang) {
        return { name: "Прочие опасности", description: al.description };
      } else if (al.event === events.wind) {
        return { name: "Ветер", description: al.description };
      } else if (al.event === events.fireDang) {
        return { name: "Пожарная опасность", description: al.description };
      }
    });
  };

  return (
    <>
      {info ? (
        <div className="popup">
          <div className="marker_header">
            <p className={"title_city"}>
              Место измерения:{" "}
              <span className={"title_city_name"}>{selectedCity}</span>
            </p>
            <div className="marker">
              Температура: {info.data.current.temp} &#xb0;С
              <div className="marker_aqi">
                Ощущается как: {info.data.current.feels_like} &#xb0;С
              </div>
            </div>
            <div className="marker_header__title">
              <div className=""></div>
              <div className="marker_header_time">
                Дата измерения: {getDateFromUnix({ un: info.data.current.dt })}
              </div>
              <div className="marker_header_time">
                Рассвет: {getTimeFromUnix({ un: info.data.current.sunrise })}
              </div>
              <div className="marker_header_time">
                Закат: {getTimeFromUnix({ un: info.data.current.sunset })}
              </div>
              <div className="marker">Предупрждения:</div>
              {info.data.alerts
                ? getAlerts(info.data.alerts).map((el, index) =>
                    el ? (
                      <div key={index} className={"alerts_row"}>
                        <div className={"marker_header_time"}>
                          Тип предупреждения:{" "}
                          <span style={{ fontWeight: "bold" }}>{el.name}</span>
                          <div className={"marker_header_time"}>
                            Описание:{" "}
                            <span style={{ fontWeight: "bold" }}>
                              {el.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : null
                  )
                : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
