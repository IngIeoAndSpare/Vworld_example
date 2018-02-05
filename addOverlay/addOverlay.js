function createOverlay() {
    var testPoint = [];                            //변환된 좌표를 저장할 배열
    var inputPoint = [127.8945727, 35.7505553];    //마커가 그려질 포인트
    testPoint.push(ol.proj.transform([inputPoint[1], inputPoint[0]], "EPSG:4326", "EPSG:3857"));

    let marker = new ol.Overlay({
        position: testPoint,
        positioning: 'center-center',
        element: document.getElementById('marker'),
        stopEvent: false
    });
    vmap.addOverlay(marker);

    let overLay = new ol.Overlay({
        position: testPoint,
        element: document.getElementById('test_overlay')
    });
    vmap.addOverlay(overLay);

    let popup = new ol.Overlay({
        element: document.getElementById('popup')
    });
    vmap.addOverlay(popup);
}


