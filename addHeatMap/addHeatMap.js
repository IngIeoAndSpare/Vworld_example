
function getData() {
    return fetch('./rows.json')
        .then(res => res.json())
        .then(json => {
            return json.rows;
        })
        .then(rows => {
            rows = rows.map((obj) => ({
                x: obj.wgs_x,
                y: obj.wgs_y,
                amount: obj.subway_on,
            }));
            return rows;
        });
}

function createHeatmap() {
    let vectorSource = new ol.source.Vector({
        projection: 'EPSG:4326',
    });

    let heatMapLayer = new ol.layer.Heatmap({
        source: vectorSource,
        radius: window.RADIUS || 25,
        blur: window.BLUR || 25,
        gradient: ['#0f0', '#0f0', '#ff0', '#f00'],
    });

    drawHeatmapLayer(vectorSource);
    vmap.addLayer(heatMapLayer);
}

async function drawHeatmapLayer(src) {
    let rows = await getData();
    let maxAmount = Math.max(rows.map(row => row.amount));
    for (let row of rows) {
        let coords = ol.proj.transform([parseFloat(row.y), parseFloat(row.x)], "EPSG:4326", "EPSG:3857");
        let geometry = new ol.geom.Point(coords);
        let feature = new ol.Feature({
            geometry: geometry,
            weight: row.amount / maxAmount,
        });
        src.addFeature(feature);
    }
}