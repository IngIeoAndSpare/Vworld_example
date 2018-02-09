window.addEventListener('load', initMap);      //html 문서가 로드되면 호출할 함수 지정

var vmap;          //Vworld Map 객체 변수 선언
var div_vmap;      //html div를 가리킬 객체 변수 선언

function initMap() {

    div_vmap = document.getElementById('v_map');         //html 문서의 div를 div_vmap변수에 연결  
    vw.ol3.MapOptions = {                               //지도 초기화
        basemapType: vw.ol3.BasemapType.GRAPHIC         //지도 타입 지정
        , controlDensity: vw.ol3.DensityType.EMPTY      //지도 툴바 지정
        , interactionDensity: vw.ol3.DensityType.BASIC  //지도 인터액션 지정
        , controlsAutoArrange: true                     //지도 크기별 부가기능 UI의 크기 투시도(투명도 ...eta)자동조절 유무
        , homePosition: vw.ol3.CameraPosition           //지도의 홈 카메라 위치 지정
        , initPosition: vw.ol3.CameraPosition           //지도 생성시 사용자에게 보여질 지도 지점 지정
    };
    vmap = new vw.ol3.Map(div_vmap, vw.ol3.MapOptions); //html div - v_map영역에 Vworld 객체를 지정  

    vmap.getView().setCenter(ol.proj.transform([127.8945727, 36.3505553], "EPSG:4326", "EPSG:3857")); //지도가 html 문서에 초기화 되었을 때 사용자에게 보이는 중심점  
    vmap.getView().setZoom(8);    //지도가 html 문서에 초기화 되었을 때 사용자에게 보이는 줌 레벨

    vmap.addEventListener('click', clickHandler);
}

function clickHandler(event){
    let clickCoorder = event.coordinate;                    //사용자가 클릭한 포인트의 좌표
    let cilckpixel = event.pixel;                           //사용자가 클릭한 지도상 픽셀 좌표
    let clickTarget = event.target;                         //사용자가 클릭한 타겟 정보
    let clickPointEvent = event.pointerEvent;               //사용자가 클릭한 포인트의 이벤트
    
    console.log('클릭 좌표:'+clickCoorder);
    console.log('클릭 픽셀:'+clickpixel);
    console.log('클릭 타겟:'+clickTarget);
    console.log('클릭 포인트 이벤트:'+clickPointEvent);
    
    alert(
    vmap.getView().getCenter(),     //사용자가 보고 있는 지도상 좌표
    vmap.getView().getZoom()        //사용자가 보고 있는 지도상 줌 level
    )

}
