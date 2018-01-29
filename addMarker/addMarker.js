function createPoint() {
    var testPoint = [];                            //변환된 좌표를 저장할 배열
    var inputPoint = [127.8945727, 35.7505553];    //마커가 그려질 포인트
    testPoint.push(ol.proj.transform([inputPoint[0], inputPoint[1]], "EPSG:4326", "EPSG:3857"));

    var vectorSource = new ol.source.Vector();     //벡터소스 정의
    vectorLayer = new ol.layer.Vector({ source: vectorSource }); //벡터 레이어 정의

    createMarker(vectorSource, testPoint);          //마커를 그리기 위한 예제 임의 함수
    vmap.addLayer(vectorLayer);                    //마커가 그려진 벡터레이어를 Vworld에 추가
}

function createMarker(src, testCoorder) {
    var iconFeature = new ol.Feature({                   //마커를 생성하기 위한 Feature 생성
        geometry: new ol.geom.Point(testCoorder[0]),     //좌표 설정
        name: 'startpoint',                              //마커 이름 설정
    });

    var iconStyle = new ol.style.Style({                   //스타일 지정
        image: new ol.style.Icon(({                        //마커 스타일 지정
            anchor: [0.5, 0.9],                            //마커 중간 위치 지정 
            anchroXUnits: 'fraction',                      //anchor 의 x값 지정 단위
            anchroYUnits: 'pixels',                        //anchor 의 y값 지정 단위
            opacity: 1,                                    //마커의 불 투명도 (0~1의 실수 값)
            src: 'http://openlayers.org/en/v3.18.2/examples/data/icon.png' //마커의 이미지 소스
        }))
    });
    iconFeature.setStyle(iconStyle);
    src.addFeature(iconFeature);
}