import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import "./style.css";
import geojson from "./geo.json";
import regionsRussia from "./russiansCities.json";
import { select } from "d3-selection";

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

const Map = (props) => {
  const zoomHandler = (newZoom) => {
    return 4 - newZoom / 2 < 0.5 ? 0.5 : 4 - newZoom / 2;
  };
  const data = geojson;
  const svgRef = useRef();
  const projRef = useRef(
    d3.geoMercator().center([45.9530257, 51.530376]).scale(3000)
  );

  useEffect(() => {
    const height = svgRef.current.clientHeight;
    const width = svgRef.current.clientWidth;
    projRef.current.translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projRef.current);
    if (data) {
      renderChart(data.features, path);
    }
  }, [data]);

  useEffect(() => {
    renderCties(regionsRussia);
  }, []);

  const renderChart = (data, path) => {
    let g = d3
      .select(svgRef.current)
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("class", (d) => {
        return d.properties.NAME_1 + "," + d.properties.TYPE_1;
      })
      .attr("d", path)
      .attr("stroke", "black")

      .style("fill", (d) => "#f5f5dc")
      .style("cursor", "pointer")
      .attr("title", (d) => d.properties.NAME_1 + ", " + d.properties.TYPE_1)
      .on("mouseout", (e) => {
        props.titleHandler({ show: false, text: "" });
        select(e.target).attr("opacity", "1");
      })
      .on("mouseenter", (e) => {
        props.titleHandler({
          show: true,
          text: e.target.getAttribute("title"),
        });
        select(e.target).attr("opacity", "0.7");
      });
  };

  const renderCties = (cities) => {
    const circles = d3
      .select(svgRef.current)
      .selectAll(".cities")
      .data(cities, (d) => d.name);
    circles
      .enter()
      .append("g")
      .append("circle")
      .attr(
        "transform",
        (d) =>
          "translate(" + projRef.current([+d["Долгота"], +d["Широта"]]) + ")"
      )
      .attr("r", 4)
      .on("mouseout", (e) => {
        props.titleHandler({ show: false, text: "" });
      })
      .on("mouseenter", (e) => {
        props.titleHandler({
          show: true,
          air: e.target.getAttribute("data-air"),
          text: e.target.getAttribute("title"),
        });
      })
      .attr("class", (d, i) => `parks park-${d.name} city`)
      .attr("title", (d) => {
        return d["Тип города"] + ". " + d["Город"];
      })
      .attr("data-lat", (d) => {
        return d["Широта"];
      })
      .attr("data-lan", (d) => {
        return d["Долгота"];
      })
      .attr("data-city", (d) => {
        return d["Тип города"] + ". " + d["Город"];
      })
      .on("click", (e) => {
        props.handleFetch({
          lat: e.target.dataset.lat,
          lan: e.target.dataset.lan,
          city: e.target.dataset.city,
        });
      })
      .style("fill", (d) => "#00000")
      .style("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", 1)
      .style("cursor", "pointer");

    const texts = d3
      .select(svgRef.current)
      .selectAll(".texts")
      .data(cities, (d) => d["Тип города"] + ". " + d["Город"]);
    texts
      .enter()
      .append("g")
      .append("text")
      .attr(
        "transform",
        (d) =>
          "translate(" + projRef.current([+d["Долгота"], +d["Широта"]]) + ")"
      )
      .text((d) => "- " + d["Тип города"] + ". " + d["Город"])
      .transition()

      .attr("title", (d) => {
        return d["Тип города"] + ". " + d["Город"];
      })
      .attr("font-size", 10)
      .style("fill", (d) => "#00000")
      .style("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", 1)
      .style("margin-left", "15px");
  };

  function zoomed({ transform }) {
    d3.select(svgRef.current).selectAll("path").attr("transform", transform);
    d3.select(svgRef.current).selectAll("g").attr("transform", transform);
    d3.select(svgRef.current)
      .selectAll("circle")
      .attr("r", zoomHandler(transform.k));
    d3.select(svgRef.current)
      .selectAll("text")
      .attr("font-size", zoomHandler(transform.k) * 3)
      .style("margin-left", "25px");
  }
  const xg = d3.select(svgRef.current).call(
    d3
      .zoom()
      .extent([
        [0, 0],
        [10000000, 1000000],
      ])
      .on("zoom", zoomed)
  );

  return (
    <svg
      style={{ transition: " 0.8s" }}
      width={10}
      height={10}
      id="boroughs-map"
      ref={svgRef}
    ></svg>
  );
};

export default Map;
