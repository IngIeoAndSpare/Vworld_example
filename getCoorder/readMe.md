# 지도를 클릭해서 정보를 가져오기, 그냥 정보 가져오기

## 기존 틀 파일에서 어떤게 추가되었는지 보기

기존 틀 파일인 [index.html](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/addFeature/index.html)과 [createMap.js](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/addFeature/createMap.js) 는 어떻게 변하였는지 보자.

기존 틀 파일 모두 단순하게 addFeature.js를 사용하기 위해 **단 2줄!** 추가된 것이다!  
index.html 은 변경점이 없다. 그대로 두자!

createMap.js는 맵이 클릭되었을 때 처리할 이벤트 리스너 등록을 했다.
```{.javascript}
    function init() {
        뭔가
        이상한
        코드들

        vmap.addEventListener('click', clickHandler); // <- New!
    }
```
그리고 createMap.js 에 좌표정보를 가져올 수 있는 함수를 만들었다!
```{.javascript}
function clickHandler(event){
    let clickCoorder = event.coordinate;                    //사용자가 클릭한 포인트의 좌표
    let cilckpixel = event.pixel;                           //사용자가 클릭한 지도상 픽셀 좌표
    let clickTarget = event.target;                         //사용자가 클릭한 타겟 정보
    let clickPointEvent = event.pointerEvent;               //사용자가 클릭한 포인트의 이벤트

    let viewCenterCoorder = vmap.getView().getCenter();     //사용자가 보고 있는 지도상 좌표
    let viewZoomLevel = vmap.getView().getZoom();           //사용자가 보고 있는 지도상 줌 level
}
    }
```

## 본격적으로 설명하지!

보통 좌표정보나 객체, 픽셀 정보를 가져오는 행위는 사용자와 상호 작용을 하기 위해 필요한 정보를 얻기 위함일 수도 있고  
혹은 google map 처럼 처리하기 위함일 수도 있다. 물론 보정의 의미도 있지만.  

그럼 이번에 지도상에 클릭을 할 때 가져오게 되는 정보 문서는 [view()](https://openlayers.org/en/latest/apidoc/ol.View.html)를 참고하면 된다.
물론 click 이벤트의 등록으로 가져온 event 의 속성값들은 [click_event](https://openlayers.org/en/latest/apidoc/ol.MapBrowserEvent.html#event:click)를 참고하면 된다.
  
가져온 맵-클릭 이벤트를 가지고 다음과 같은 결과를 가져올 수 있다.
![결과](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/getCoorder/%EA%B2%B0%EA%B3%BC.png)

좌표정보와 픽셀 정보 그리고 발생한 event target 및 event 객체를 볼 수 있다!