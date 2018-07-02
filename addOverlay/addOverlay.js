function createOverlay() {

    let point = [128.03739, 36.61996];
    let convertPoint = ol.proj.transform([point[0], point[1]], "EPSG:4326", "EPSG:3857");

    let marker = new ol.Overlay({
        position: convertPoint,
        positioning: 'center-center',
        element: document.getElementById('marker'),
        stopEvent: false
    });
    vmap.addOverlay(marker);

    let testOverlay = new ol.Overlay({
        position: convertPoint,
        element: document.getElementById('test_overlay')
    });
    vmap.addOverlay(testOverlay);
}


