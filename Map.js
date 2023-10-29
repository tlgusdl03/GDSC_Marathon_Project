import React, { useEffect, useRef, useState } from "react";
//import InputForm from "./InputForm";
function Map(props) {
  const mapRef = useRef(null);
  var map, marker;
  var lonlat;
  var markers = [];
  const [clickedpositions, setClickedpositions] = useState(null);

  function makerset(e) {
    // 클릭한 위치에 새로 마커를 찍기 위해 이전에 있던 마커들을 제거
    removeMarkers();

    //Marker 객체 생성.
    marker = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(lonlat.lat(), lonlat.lng()), //Marker의 중심좌표 설정.
      map: map, //Marker가 표시될 Map 설정.
    });
    markers.push(marker);
  }

  // 클릭 이벤트 핸들러 사용자가 지도에서 클릭한 위치에 마커를 표시하고 위도 경도를 입력받음
  const onclickhandler = (e) => {
    lonlat = e.latLng;
    setClickedpositions(lonlat);
    makerset(e);
    props.propsfunction(lonlat);
    props.onMapClick();
  };

  // 마커를 입력받기에 앞서 기존에 존재하던 마커 삭제
  function removeMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  useEffect(() => {
    if (!map && window.Tmapv2 && mapRef.current) {
      map = new window.Tmapv2.Map(mapRef.current, {
        // 지도가 생성될 div
        center: new window.Tmapv2.LatLng(37.5652045, 126.98702028),
        width: "100%", // 지도의 넓이
        height: "800px", // 지도의 높이
        zoom: 18,
      });
    }
    // 클릭 리스너 등록
    map.addListener("click", onclickhandler);
  }, []);

  return <div id="tmap" ref={mapRef}/>;
}

export default Map;
