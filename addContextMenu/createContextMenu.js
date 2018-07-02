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

    vmap.on('click', function (eve) {   //지도를 클릭 시 context 메뉴를 제거한다.
        clearContextMenu ();
    })
    
    vmap.getViewport().addEventListener('contextmenu', function (e) {
        e.preventDefault(); //기존 context 메뉴를 차단한다.
        openContextMenu(e.x, e.y);
    });
}

function openContextMenu(x, y) {

    clearContextMenu ();    // 다른 곳에 오른쪽 마우스 클릭시 기존 context 메뉴를 제거한다.

    let html = '<div class="menuItem" onclick="handleContexMenuEvent(\'zoomIn\', \''+ x +'\', \''+ y +'\');"> Zoom In </div>' +
    '<div class="menuItem" onclick="handleContexMenuEvent(\'zoomOut\', \''+ x +'\', \''+ y +'\');"> Zoom Out </div>' +
    '<div class="menuItem" onclick="handleContexMenuEvent(\'centerMap\', \''+ x +'\', \''+ y +'\');"> Center Map Here </div>' + '<div class="menuSeparator"> </div>' +
    '<div class="menuItem" onclick="handleContexMenuEvent(\'addMarker\', \'' + x + '\', \'' + y + '\');"> Add Marker </div>' +
    '<div class="menuItem" onclick="handleContexMenuEvent(\'addArea\', \'' + x + '\',  \'' + y + '\');"> Add Area </div>';

    appendhtml(html, x, y);
}

function appendhtml (htmlString, x, y) {
    let contextDiv = document.createElement('div');     // div element 생성
    contextDiv.setAttribute('id', 'contextMenu');       // id 속성 설정
    contextDiv.setAttribute('class', 'contextMenu');    // class 속성 설정
    contextDiv.setAttribute('style', 'top: ' + y + 'px; left:' + x + 'px;');    // context 메뉴가 나올 위치를 정한다.
    contextDiv.innerHTML = htmlString;                  // context 메뉴 내용을 채운다.

    document.body.appendChild(contextDiv);              // body 에 context 메뉴 추가.
}

function clearContextMenu () {  // context 메뉴 삭제 function
    if(document.getElementById('contextMenu') != null){
        document.getElementById('contextMenu').remove();
   }
}