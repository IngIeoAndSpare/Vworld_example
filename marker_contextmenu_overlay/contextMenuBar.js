
function openContextMenu(clickPoint) {

    clearContextMenu(); //기존 메뉴 지우기

    let html;   //메뉴를 담을 변수
    let checkFeature = getFeature(clickPoint);  //클릭한 위치에 feature가 있는지 확인
    if(!checkFeature){  //feature가 없으면 undefined가 된다.
        html = 
        '<div class="menuItem" onclick="handleContexMenuEvent(\'addMarker\', \'' + clickPoint[0] + '\', \'' + clickPoint[1] + '\');"> Add Marker </div>';
    } else {
        html = '<div class="menuItem" onclick="handleContexMenuEvent(\'removeMarker\', \''+ clickPoint[0] +'\', \''+ clickPoint[1] +'\');"> remove Marker </div>';
    }
    appendhtml(html, clickPoint);
}

function appendhtml (htmlString, clickPoint) {  //작성한 html 태그를 가지고 메뉴를 만드는 function
    let contextDiv = document.createElement('div');     //메뉴를 담을 element인 div를 생성한다.
    contextDiv.setAttribute('id', 'contextMenu');       //id를 설정한다. (생성, 삭제를 위해서)
    contextDiv.setAttribute('class', 'contextMenu');    //class를 설정한다. (css 적용을 위해서)
    contextDiv.setAttribute('style', 'top: ' + clickPoint[1] + 'px; left:' + clickPoint[0] + 'px;');    //위치를 조절한다.
    contextDiv.innerHTML = htmlString;  //contextDiv 속성의 innerHTML을 추가한다.

    document.body.appendChild(contextDiv);  //만든 메뉴를 body에 append한다
}

function handleContexMenuEvent(option, x, y) {
    clearContextMenu ();    //메뉴를 선택하면 기존 메뉴를 삭제한다.

    if(option === 'addMarker') {    //각 선택된 메뉴 별 기능을 실행한다.
        let coordinate = vmap.getCoordinateFromPixel([x, y]);
        createMarker(vectorSource, [coordinate]);
    } else if (option === 'removeMarker') {
        let target = getFeature([x,y]);
        /* target 이름 얻기
        let targetName = target.get('name'); //string
        */
        vectorLayer.getSource().removeFeature(target);  //벡터레이어에 있던 feature을 삭제한다.
    }
}

function clearContextMenu () {
    if(document.getElementById('contextMenu') != null){     //기존 메뉴가 있는지 검사한다.
        document.getElementById('contextMenu').remove();    //메뉴를 삭제한다.
   }
}

function getFeature(clickPoint) {
    return vmap.forEachFeatureAtPixel(clickPoint, ft => ft);    //해당 픽셀에 feature가 있으면 feature를 반환한다.
}