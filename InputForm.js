import React, { useState, useRef } from "react";
import Map from "./Map";

function InputForm(props) {
  //클릭된 것이 출발지인지 도착지인지 나타냄
  const [whatclicked, setWhatclicked] = useState('');

  //출발지의 위치
  const [departure, setDeparture] = useState(null);

  //도착지의 위치
  const [destination, setDestination] = useState(null); 

  const [inputclicked, setInputclicked] = useState(false);
  //역지오코딩 부분 수정 필요, 이 부분을 지우면 입력창에 위도 경도로 입력받음
  const reverseGeocode = (lonlat, callback) => {
    const appKey = "12"
    const url = "https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version={version}&lat={lat}&lon={lon}&coordType={coordType}&addressType={addressType}&callback={callback}&appKey={appKey}"
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const address = data.addressInfo.fullAddress; 
            callback(address);
        })
        .catch(error => console.error('Error:', error));
  }

  const departureclickhandler = () => {
    setInputclicked(true);
    setWhatclicked("departure");
  }

  const destinationclickhandler = () => {
    setInputclicked(true);
    setWhatclicked("destination")
  }

  const getvalue = (value) => {
    //역지오코딩 사용하는 부분
    reverseGeocode(value, (address) => {
      if(whatclicked == "departure"){
        setDeparture(address);
      }
      else if(whatclicked == "destination"){
        setDestination(address);
      }
    });
  }

  const mapclickhandler = () => {
    setInputclicked(false);
  }

  return (
    inputclicked ? <Map propsfunction = {getvalue} onMapClick = {mapclickhandler}/> : 
    <div>
      <form>
        <div>
          <label>출발지: </label>
          <input
            value={departure ? departure : "입력하세요"}
            readOnly
            onClick={departureclickhandler}
          />
        </div>
        <div>
          <label>도착지: </label>
          <input
            value={destination ? destination : "입력하세요"}
            readOnly
            onClick={destinationclickhandler}
          />
        </div>
      </form>
    </div>
  );
}

export default InputForm;
