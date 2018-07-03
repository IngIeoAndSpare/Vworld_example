
function createOverlay (coordinate) {               
    let overlayDiv = document.createElement('div');     //overlay를 담을 객체를 생성한다.
    overlayDiv.setAttribute('id', 'overlay');           //div 객체의 id를 설정한다.    (생성, 제거를 위해서)
    overlayDiv.setAttribute('class', 'overlay');        //div 객체의 class를 설정한다. (css 적용을 위해서)
    overlayDiv.innerHTML += '오버레이 테스트';            //오버레이에 나타낼 내용을 적는다.
    
    document.body.appendChild(overlayDiv);              //body에 append 한다.

    inputOverlay = new ol.Overlay({                     //overlay 객체를 생성한다.
        position: coordinate,                           //overlay 위치를 설정한다.
        element: overlayDiv                             //overlay 객체를 담을 element를 지정한다.
    });
    vmap.addOverlay(inputOverlay);                      //vworld에 오버레이를 추가한다.
}

function clearOverlay () {
    if(document.getElementById('overlay') != null){     //오버레이가 이미 있는지 확인한다.
        document.getElementById('overlay').remove();    //오버레이를 제거한다.
    }
}