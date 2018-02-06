# 지도상 오버레이 추가하기
이 예제는 vworld에서 간단한 오버레이를 어떻게 추가하는지 보여주는 예제이다. 오버레이의 자세한 설명은 (여기)[https://www.e-education.psu.edu/natureofgeoinfo/c9_p6.html]를 참고

## 기존 틀 파일에서 어떤게 추가되었는지 보기

마커를 만들기 위해 [addOverlay.js](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/addOverlay/addOverlay.js) 라는 정적 파일을 제작하였다.  
addOverlay.js 파일은 오버레이를 정의하고 이를 지도상에 추가하는 역활을 한다. 

그럼 기존 틀 파일인 [index.html](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/addOverlay/index.html)과 [createMap.js](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/addOverlay/createMap.js) 는 어떻게 변하였는지 보자.

기존 틀 파일 모두 단순하게 addOverlay를 사용하기 위해 추가된 것이다!  
index.html 은 addOverlay.js와 오버레이 스타일을 지정할 overlayStyle.css 파일을 추가하였고
```{.html}
    <script src="addOverlay.js"></script>
    <link rel="stylesheet" type="text/css" href="overlayStyle.css">
```

createMap.js는 단순히 addOverlay.js 함수를 다음과 같이 추가했을 뿐이다.
```{.javascript}
    function init() {
        뭔가
        이상한
        코드들

        createOverlay(); // <- New!
    }
```
또한 이번에 오버레이의 스타일을 주기 위해 [overlayStly.css](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/addOverlay/overlayStyle.css) 파일을 제작하였다.  
물론, css 파일을 만들기 싫다! 하는 사람은 index.html 내부에서 css 스타일을 지정하면 된다. 예컨대 다음과 같다.  

```{.html}
<head>
... 추가될 스크립트
    <style>
      #marker {
        width: 20px;
        height: 20px;
        border: 1px solid #088;
        border-radius: 10px;
        background-color: #0FF;
        opacity: 0.5;
      }
      #test_overlay {
        text-decoration: none;
        color: white;
        font-size: 11pt;
        font-weight: bold;
        text-shadow: black 0.1em 0.1em 0.2em;
      }
    </style>
</head>
```

## 본격적으로 오버레이를 만들기

오버레이를 생성하기 위해선 당연히 오버레이틀 [ol.overlay](https://openlayers.org/en/latest/apidoc/ol.Overlay.html) 그리고 오버레이를 붙일 div tag 혹은 a tag 가 필요하다.  
* 실제 오버레이는 지도상에 추가적으로 정보를 겹쳐서 보이는 레이어라고 생각하면 편하다. 본 예제에선 간단한 텍스트와 마커를 띄우는 예제이다.
* div tag, a tag 는 html 문서에서 생성해도 되고 javascript 에서 createElement 를 이용해 동적으로 생성해도 된다.
  
예컨대, 다음의 코드를 보자
```{.javascript}
    marker = document.getElementById('marker')
    marker2 = document.createElement('div')
    marker2.className = poo
    }
```
  
marker 는 html 에서 생성한 marker 라는 객체를 가져오는 형식이고  
marker2 는 div 객체를 생성하고 poo 라는 이름을 준 경우이다. 어찌되었던 마음에 드는 형식으로 쓰면 된다.

위의 설명을 대충 알아들었다면 이제 오버레이를 붙일 수 있다! 유캔두윗!  

일단 지도상에 오버레이를 추가하기 위해선 오버레이를 표시할 좌표가 필요하다. 이번 예시에선 다음 좌표를 지정했다.
```{.javascript}
    let point = [128.03739, 36.61996];
```
알다시피 [위도, 경도] 좌표이다. 혹시 좌표계를 모른다면 [지도에 쓰이는 좌표계](http://www.osgeo.kr/17)문서를 참고하면 된다.
그리고 이 좌표계는 EPSG:3857 이기에 이를 EPSG:4326로 변환하기 위해 [ol.proj](http://openlayers.org/en/latest/apidoc/ol.proj.html) 기능을 사용해서 변환할 것이다.
```{.javascript}
    ol.proj.transform([point[0], point[1]], "EPSG:4326", "EPSG:3857");
```
좌표 손질이 끝나면 다음은 오버레이들을 정의한다.

```{.javascript}
    let marker = new ol.Overlay({
        position: convertPoint,                         //오버레이가 표시될 지점
        positioning: 'center-center',                   //position 기준으로 나타낼 오버레이 정렬기준 
        element: document.getElementById('marker'),     //오버레이가 지정될 element
        stopEvent: false                                //지도에 이벤트 뷰 포트 전달 여부
    });

    let testOverlay = new ol.Overlay({
        position: convertPoint,
        element: document.getElementById('test_overlay')
    });
```
각각 marker 와 overlay label을 정의한 것이다. 여기서 오버레이들은 각 지정된 css의 style 형식을 따라 나타낸다. 즉, 예제중 도형그리기의 strke, fill 은 전부 css에서 담당한다고 생각하면 편하다.  

이제 오버레이를 정의했다면 다음은 map에 붙이는 일만 남았다.
```{.javascript}
    vmap.addOverlay(marker);
    vmap.addOverlay(testOverlay);
```
각각 marker 와 testOverlay 라는 오버레이들을 vworld 에 붙여주는 코드이다. 

자 overlay 를 지정했다면, 이제 이 오버레이를 가지고 어떤 형태로 나타낼 것인지 지정해줘야 한다. 하지만, 이는 css 디자인이므로 이번 예제에선 다루지 않는다. 다만 [css기초](http://webdir.tistory.com/338) 를 참고해서 자기만의 스타일을 지정하도록 하자  

![결과](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/addOverlay/%EA%B2%B0%EA%B3%BC.png)


 만약 클릭하는 지점에 오버레이를 넣고 싶다면 createMap init 함수에 다음 아래 코드를 사용해도 된다.
 ```{.javascript}
    //createMap.js
    vmap.on('click', function(event) {
        let coordinate = event.coordinate;
        createOverlay(coordinate);
    }

    //addOverlay.js
    function createOverlay(coordinate){
        ... 각 오버레이의 position의 값을 coordinate 로 변경
    }
```
