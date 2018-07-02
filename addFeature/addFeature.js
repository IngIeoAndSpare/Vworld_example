function createPoint() {
    //[[X0, Y0], [X1, Y1], [X2, Y2]...]
    var inputPath = [
                     [35.1358724, 127.8750216], [35.3858724, 127.8750216],
                     [35.3858724, 129.1250216], [35.1358724, 129.1250216]
                    ]; //도형이 그려질 좌표

    var drawLinePathPoint = []; // "EPSG:3857"형식의 좌표를 "EPSG:4326"로 바꾼 후 저장할 배열

    for (let item of inputPath) {
        drawLinePathPoint.push(ol.proj.transform([Number(item[1]), Number(item[0])],
            "EPSG:4326", "EPSG:3857"));
    }

    var vectorSource = new ol.source.Vector();                          //벡터소스 객체 생성
    var vectorLayer = new ol.layer.Vector({ source: vectorSource });    //벡터레이어 객체 생성

    draw(drawLinePathPoint, vectorSource, '#3399CC', '#ffffff');
    vmap.addLayer(vectorLayer);
}

function draw(coorSet, src, stColor, flColor) {

    var polygonGeom = new ol.geom.Polygon([coorSet]);            //polygonGeom 객체 생성
    var feature = new ol.Feature({ geometry: polygonGeom });     //feature 객체 생성
    var style = new ol.style.Style({                             //style 객체 생성
        stroke: new ol.style.Stroke({                            //테두리 속성 객체 생성
            color: stColor
        }),
        fill: new ol.style.Fill({                                //채우기 속성 객체 생성
            color: flColor
        })
    });

    feature.setStyle(style);                                   //도형객체에 style 지정
    src.addFeature(feature);                                   //VectorSource에 feature 등록
}