# 지도상 마커 추가하기

## 기존 틀 파일에서 어떤게 추가되었는지 보기

마커를 만들기 위해 [addMarker.js](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/addMarker/addMarker.js) 라는 정적 파일을 제작하였다.  
addMarker.js 파일은 마커를 정의하고 이를 지도상에 추가하는 역활을 한다. 

그럼 기존 틀 파일인 [index.html](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/addMarker/index.html)과 [createMap.js](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/addMarker/createMap.js) 는 어떻게 변하였는지 보자.

기존 틀 파일 모두 단순하게 addMarker를 사용하기 위해 **단 2줄!** 추가된 것이다!  
index.html 은 addMarker.js 파일을 추가하였고
```{.html}
        <script src="addMarker.js"></script>
```
createMap.js는 단순히 addMarker.js 함수를 다음과 같이 추가했을 뿐이다.
```{.javascript}
    function init() {
        뭔가
        이상한
        코드들

        createPoint(); // <- New!
    }

```

## 본격적으로 마커를 만들기

마커를 생성하기 위해선 마커가 표시될 좌표와 지도에 붙일 물체 틀 [ol.Feature](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html) 그리고 물체 틀 중에 마커 틀[ol.style.icon](https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html)이 필요하다.  
붕어빵 틀과 타꼬야끼 틀을 생각하면 편하다.
* ol.Feature 은 붕어빵 틀이건 타꼬야끼 틀이건 구워내는 틀 전부를 뜻한다고 생각하면 된다. (비유가 어려우면 물병이라고 생각하고)
* ol.style.icon 은 저 구워내는 틀중 붕어빵 틀 아니면 타꼬야키 틀이라는 구체적인 틀을 지정한다. (얘는 그 중 콜라병이라고 생각하면 된다.)  

이 위에 말고 또 필요한게 있다! 바로 [vectorLayer](https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html) 와 [vectorSource]((https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html)이다. 각각 설명은 다음과 같다
* vectorLayer 는 지도 위에 겹쳐지는 투우명한 레이어이다. 
* vectorSource 는 그 투명한 레이어에 그림을 그릴 수 있는 도구라 생각하면 된다.

혹시 이해하기 어렵다면 플레쉬나 포토샵에서 사용되는 레이어 개념을 생각해보면 된다.

저 4개를 대충 알아들었다면 이제 마커를 만들 수 있다! 유캔두윗!  

일단 지도상에 마커를 추가하기 위해선 마커를 표시할 좌표가 필요하다. 이번 예시에선 다음 좌표를 지정했다.
```{.javascript}
var inputPoint = [127.8945727, 35.7505553];
```
알다시피 [x, y] 좌표이다. 혹시 좌표계를 모른다면 [지도에 쓰이는 좌표계](http://www.osgeo.kr/17)문서를 참고하면 된다.
그리고 이 좌표계는 EPSG:3857 이기에 이를 EPSG:4326로 변환하기 위해 [ol.proj](https://openlayers.org/en/latest/apidoc/module-ol_proj.html) 기능을 사용해서 변환할 것이다.
```{.javascript}
    ol.proj.transform([inputPoint[0], inputPoint[1]], "EPSG:4326", "EPSG:3857");
```
좌표 손질이 끝나면 다음은 Layer들을 정의한다.

```{.javascript}
    var vectorSource = new ol.source.Vector();     
    var vectorLayer = new ol.layer.Vector({ source: vectorSource }); 
```
각각 vectorSource 와 vectorLayer 를 정의한 것이다. 여기서 vectorLayer 내부의 source : vectorSource 는 vectorLayer위에 그릴 도구로 vectorSource 를 사용한다고 생각하면 된다.  
이제 기초적인 틀이 완성되었다면 본격적으로 마커를 제작해보자!
```{.javascript}
    var iconFeature = new ol.Feature({                   //마커를 생성하기 위한 Feature 생성
        geometry: new ol.geom.Point(testCoorder[0]),     //좌표 설정
        name: 'startpoint',                              //마커 이름 설정
    });
```
createMarker function 내부에 보면 위와 같은 코드가 있다. 여기서 ol.Feature 은 굽는 판때기라고 설명했으니 패스!  
* geometry는 이 feature가 지도상에 어디에 위치하고 있는지를 지정한다. 형식은 EPSG:4326 좌표계 [x, y] 형식이다.
* name 은 이 feature의 이름이다. 

자 feature를 지정했다면 우린 마커를 만들 준비를 거의 다 한것이다! 비유를 하자면 무언가 굽기 위한 판을 준비했다! 하지만 우린 구체적으로 이 판이 무슨 판인지 정해줘야 한다.  
예컨대 구울 판을 준비했는데, 이게 붕어빵 판인지 타꼬야끼 판인지 아니면 삼겹살 구울 판인지 지정을 해야 사용할 수 있을 것 아닌가!  

지정하기 위해 다음과 같은 코드를 사용한다.
```{.javascript}
    var iconStyle = new ol.style.Style({                   //스타일 지정
        image: new ol.style.Icon(({                        //마커 스타일 지정
            anchor: [0.5, 0.9],                            //마커 중간 위치 지정 
            anchroXUnits: 'fraction',                      //anchor 의 x값 지정 단위
            anchroYUnits: 'pixels',                        //anchor 의 y값 지정 단위
            opacity: 1,                                    //마커의 불 투명도 (0~1의 실수 값)
            src: 'http://openlayers.org/en/v3.18.2/examples/data/icon.png' //마커의 이미지 소스 
        }))
    });
    iconFeature.setStyle(iconStyle); //feature 에 iconStyle을 지정.
```
바로 스타일을 지정해준다. 여기서 스타일은 feature 의 모양을 지정해준다. 자세히 보면 **image** 라는 속성에 new ol.style.Icon 을 지정한 것을 볼 수 있다.  
image 에서 style.Icon 뿐만 아니라 다각형을 그리고 싶다면 다각형을 점을 찍고 싶으면 point 를 마음대로 지정하면 된다. 자세한 것은 [openLayers API doc](https://openlayers.org/en/latest/apidoc/)에서 ol.style을 검색해보시라.  
또한 [ol.style.Icon](https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html) 의 경우 내부에 여러 속성을 지정해 줄 수 있는데 src는 마커의 이미지를 뜻한다. 로컬 파일에서 지정해도 되고 예시처럼 url 을 이용해 지정해도 무방하다.  
마찬가지로 src 속성은 base64 string도 인식하고 혹은 위 예제처럼 url 아니면 filePath 등 여러가지를 지원한다.

이렇게 만든 스타일은 feature.setStlye() 을 통해 지정할 수 있다. (예시에선 iconFeature.setStyle(iconStyle))

자! 이제 우리는 feature 를 생성해고 세부적으로 style 까지 지정해주었으면 이제 뭘 해야될까?
바로 vectorLayer 에 그려줘야 한다! 예제의 끝 부분에 다음과 같은 코드를 발견할 수 있다.
```{.javascript}
    src.addFeature(iconFeature);
```

src는 vectorSource 를 말한다. (function createMarker 의 매개변수인 src 이다.) 그런데 의문점이 있을 것이다.
아까 vectorLayer가 그리는 투우명한 도화지라고 했는데 왜 src에(vectorSource) 집어넣는거죠?  

걱정말게나! 우린 벡터 레이어를 지정했을 때 source 를 이미 지정했다!
```{.javascript}
    var vectorSource = new ol.source.Vector();     
    var vectorLayer = new ol.layer.Vector({ source: vectorSource }); 
```
vectorLayer 를 지정했을 때 **source: vectorSource** 가 보이는가! 라는 이유도 있지만
실제 vectorSource 가 Feature의 지정된 스타일, 속성을 보고 그리게 되고 이를 vectorLayer 에 넘겨주는 형태라고 보면 된다.  
그럼 이제 vectorLayer 에 도형이 그러졌으면 이제 이 투명한 캔버스를 지도 위에 붙여주면 마커가 짜잔 하며 나타난다. 어떻게 하는지는 다음을 보자.  

```{.javascript}
    vmap.addLayer(vectorLayer);  //마커가 그려진 벡터레이어를 Vworld에 추가
```
아까 vmap 은 creatMap에서 지도 객체를 지정하는 변수였었다. 이 지도에 addLayer() 함수를 이용해 vectorLayer 를 붙여주면 아래 그림과 같이 지도에 마커를 붙일 수 있다!  
![결과](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/addMarker/%EB%A7%88%EC%BB%A4.png)
