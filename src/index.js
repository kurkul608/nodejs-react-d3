import React, { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
// import Map_old from "./Map_old";
import Map from "./Map";
import { Popup } from "./Popup";
import "./style.css";
import Loader from "./Loader";

function App() {
  const [pointsLists, pointsTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [title, setTitle] = useState({
    show: false,
    text: "",
    air: "",
  });
  const [info, setInfo] = useState();
  const [selectedCity, setSelectedCity] = useState("");
  const infoHandler = (data) => {
    setInfo(data);
  };
  const titleHandler = (title) => {
    setTitle(title);
  };

  const mapRef = useRef();

  const handleFetch = ({ lat, lan, city }) => {
    const params = new URLSearchParams([
      ["lan", lan],
      ["lat", lat],
    ]);
    setSelectedCity(city);
    fetch("http://84.201.170.215:3001/getJson?" + params, { method: "GET" })
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => {
          setLoading(false);
          setInfo(json);
        }, 0);
      });
  };
  // console.log(info);
  // useEffect(() => {
  //   const params = new URLSearchParams([
  //     ["lan", "222"],
  //     ["lat", "222"],
  //   ]);
  //   fetch("http://localhost:3001/getJson?" + params, { method: "GET" })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setTimeout(() => {
  //         setLoading(false);
  //         pointsTodos(json);
  //       }, 2000);
  //     });
  // }, []);

  return (
    <>
      {title.show ? <div className="title">{title.text}</div> : null}

      <Popup info={info} selectedCity={selectedCity} />
      <div id="map" ref={mapRef}>
        <Map
          data={pointsLists}
          titleHandler={titleHandler}
          infoHandler={infoHandler}
          handleFetch={handleFetch}
        />
      </div>
      {/*<div className="window">*/}
      {/*  <div className="category_1">AQI: от 100 до макс</div>*/}
      {/*  <div className="category_2">AQI: от 90 до 120</div>*/}
      {/*  <div className="category_3">AQI: от 70 до 90</div>*/}
      {/*  <div className="category_4">AQI: от 50 до 70</div>*/}
      {/*  <div className="category_5">AQI: от 0 до 50</div>*/}
      {/*</div>*/}

      {/*{loading && <Loader />}*/}
      {/*{pointsLists.length ? null : ( loading? null : <Map_old points={pointsLists} />) }  */}
      {/*{pointsLists.length ? <Map_old data={pointsLists}/> : null}*/}
      {/*{!loading ? (*/}
      {/*  <div id="map" ref={mapRef}>*/}
      {/*    <Map*/}
      {/*      data={pointsLists}*/}
      {/*      titleHandler={titleHandler}*/}
      {/*      infoHandler={infoHandler}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*) : null}*/}
    </>
  );
}
render(<App />, document.getElementById("root"));
