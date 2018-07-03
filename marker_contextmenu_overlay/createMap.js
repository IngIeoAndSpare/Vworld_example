window.addEventListener('load', initMap);      

var vmap;         
var div_vmap;     
var vectorSource, vectorLayer;

function initMap() {

    vectorSource = new ol.source.Vector();    
    vectorLayer = new ol.layer.Vector({ source: vectorSource }); 

    div_vmap = document.getElementById('v_map');          
    vw.ol3.MapOptions = {                              
        basemapType: vw.ol3.BasemapType.GRAPHIC         
        , controlDensity: vw.ol3.DensityType.EMPTY     
        , interactionDensity: vw.ol3.DensityType.BASIC  
        , controlsAutoArrange: true                     
        , homePosition: vw.ol3.CameraPosition           
        , initPosition: vw.ol3.CameraPosition           
    };
    vmap = new vw.ol3.Map(div_vmap, vw.ol3.MapOptions);   

    vmap.getView().setCenter(ol.proj.transform([127.8945727, 36.3505553], "EPSG:4326", "EPSG:3857"));   
    vmap.getView().setZoom(8);    

    vmap.on('click', function (evt) {       //맵 클릭 이벤트 등록
        clearContextMenu();
        let feature = getFeature(evt.pixel);
        if(feature){
            let name = feature.get('name');
            console.log(name);
            //TODO : 아이콘 클릭시 할 것들... ex) 새창
        }
    });

    vmap.on('pointermove', function(e){     //맵 상 마우스 이동 이벤트 등록
        var hit = vmap.hasFeatureAtPixel(e.pixel);  //마우스 위치에 feature가 있는지 확인한다. 있으면 true 없으면 false
        vmap.getTargetElement().style.cursor = hit ? 'pointer' : '';    //feature가 있다면 커서 스타일을 바꾼다.
        if(hit) {
            let coordinate = getFeature(e.pixel).values_.geometry.flatCoordinates;  //feature가 존재한다면 해당 feature의 coordinate값을 가져온다.
            if(!document.getElementById('overlay')){    //overlay가 이미 존재한다면 overlay를 생성하지 않느다.
                createOverlay(coordinate);  //overlay가 없다면 생성한다.
            }
        } else {
            clearOverlay(); //오버레이를 지운다.
        }
    });

    // TODO : drag시 메뉴 삭제...
    // vmap.getView()('dragend', function (evt) {
    //     debugger;
    //     clearContextMenu();
    // });
    
    vmap.getViewport().addEventListener('contextmenu', function (e) {   //컨텍스트메뉴에 대한 이벤트를 감지한다. 실상 오른쪽 마우스 클릭 이벤트
        e.preventDefault(); //기존 컨텍스트 메뉴가 안나오도록 기존 이벤트를 중지한다.
        let clickPoint = [e.x, e.y];    //픽셀 x,y를 핸들링 하기 쉽게 배열로 지정한다.
        openContextMenu(clickPoint);    //컨텍스트 메뉴를 만든다.
    });

    createPoint([127.8945727, 35.7505553]);
}
