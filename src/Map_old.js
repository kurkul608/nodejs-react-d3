import React, { useEffect } from "react";
import geojson from "./OLD_geojson.json";

import { geoMercator, geoPath, geoCircle } from "d3-geo";
import { select } from "d3-selection";
import dataM from "./demoData.js";

const category_0 = "#ff000000";
const category_1 = "#b32f4a";
const category_2 = `#d7313e`;
const category_3 = `#f97041`;
const category_4 = `#faa247`;
const category_5 = `#acd6a9`;

export default function Map_old({ points }) {
  const geojsonPoints = points.data;

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

  const getColor = (item) => {
    if (item[5]) {
      return paramsColors(item[5].value);
    } else {
      return category_0;
    }
  };

  const width = 1500;
  const height = width * 0.5;
  const projection = geoMercator().fitExtent(
    [
      [0, 0],
      [width * 0.9, height * 0.9],
    ],
    geojson
  );
  const path = geoPath().projection(projection);

  return (
    <div>
      <svg width={width} height={height}>
        <g className="geojson-layer">
          {geojson.features.map((d) => (
            <path
              key={d.properties["iso3166-2"]}
              id={d.properties["iso3166-2"]}
              d={path(d)}
              fill="#2b4392"
              stroke="#fff"
              strokeWidth="2"
              strokeOpacity="0.5"
              onMouseEnter={(e) => {
                // console.log(d.properties.name)   // Название города
                select(e.target).attr("opacity", "0.7");
              }}
              onMouseOut={(e) => {
                select(e.target).attr("opacity", "1");
              }}
            />
          ))}
        </g>

        {geojsonPoints.map((d) => (
          <circle
            className="circle"
            onMouseEnter={(e) => {
              console.log(d); // Название города
            }}
            cx={d.longitude * 58}
            cy={d.latitude * 56}
            r="5px"
            fill={getColor(d.pollutants)}
            set={getColor(d.pollutants)}
          ></circle>
        ))}

        {/* 

    svg.selectAll("circle")
		.data([aa,bb]).enter()
		.append("circle")
		.attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
		.attr("cy", function (d) { return projection(d)[1]; })
		.attr("r", "8px")
		.attr("fill", "red")


      <g className="geojson-layer">
        {
          geojsonPoints.features.map(d => (
            <path
              d={console.log(pathPoint(d))}
              fill={category_5}
              stroke="#fff"
              strokeWidth="2"
              strokeOpacity="0.5"
              onMouseEnter={(e) => {
              console.log(d.properties.name)   // Название города
                select(e.target)
                  .attr('opacity', '0.7')
                  
              }}
              onMouseOut={(e) => {
                select(e.target)
                  .attr('opacity', '1')
              }}
            />
          ))
        }
      </g> */}
      </svg>
    </div>
  );
}
