# 지도상 도형 그리기

## 기존 틀 파일에서 어떤게 추가되었는지 보기

도형을 그릭리 위해 [addFeature.js](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/addFeature/addFeature.js) 라는 정적 파일을 제작하였다.  
addFeature.js 파일은 도형과 도형 꼭지점(포인트)을 정의하고 이를 지도상에 추가하는 역활을 한다. 

그럼 기존 틀 파일인 [index.html](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/addFeature/index.html)과 [createMap.js](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/addFeature/createMap.js) 는 어떻게 변하였는지 보자.

기존 틀 파일 모두 단순하게 addFeature.js를 사용하기 위해 **단 2줄!** 추가된 것이다!  
index.html 은 addFeature.js 파일을 추가하였고
```{.html}
        <script src="addFeature.js"></script>
```
createMap.js는 단순히 addFeature.js 에 있는 함수를 다음과 같이 추가했을 뿐이다.
```{.javascript}
    function init() {
        뭔가
        이상한
        코드들

        createPoint(); // <- New!
    }

```

## 본격적으로 도형을 그리기

도형을 생성하기 위해선 도형이 표시될 좌표와 지도에 도형을 정의할 틀 [ol.Feature](https://openlayers.org/en/latest/apidoc/ol.Feature.html) 그리고 물체 틀 중에 도형을 그릴 틀[ol.style.Stroke](https://openlayers.org/en/latest/apidoc/ol.style.Stroke.html), [ol.style.Fill](https://openlayers.org/en/latest/apidoc/ol.style.Fill.html)이 필요하다.  

* ol.Feature 은 이 물체에 도형을 그릴 것이다! 라고 정의하는 것이다. 정확히 말하자면 물체이지만!
* ol.style.Stroke 는 도형을 그리기 위한 꼭지점들을 연결해주는 선이다! 
* ol.style.Fill 은 그 내부를 색칠해주는 객체이다! 

이 위에 말고 또 필요한게 있다! 바로 [vectorLayer](https://openlayers.org/en/latest/apidoc/ol.layer.Vector.html) 와 [vectorSource](http://openlayers.org/en/v3.6.0/apidoc/ol.source.Vector.html)이다. 각각 설명은 다음과 같다
* vectorLayer 는 지도 위에 겹쳐지는 투우명한 레이어이다. 
* vectorSource 는 그 투명한 레이어에 그림을 그릴 수 있는 도구라 생각하면 된다.

혹시 이해하기 어렵다면 플레쉬나 포토샵에서 사용되는 레이어 개념을 생각해보면 된다.

저 5개를 대충 알아들었다면 이제 도형을 지도에 그릴 수 있다! 눈누난나!  

일단 지도상에 도형을 그리기 위해선 도형 꼭지점들을 표시할 좌표가 필요하다. 이번 예시에선 사각형을 그릴 것이기에 좌표 4개를 지정했다.
```{.javascript}
    var inputPath = [
                     [36.1358724, 130.8750216], [36.3858724, 130.8750216],
                     [36.3858724, 131.1250216], [36.1358724, 131.1250216]
                    ]; //도형이 그려질 좌표
```
알다시피 [x, y] 좌표이다. 혹시 좌표계를 모른다면 [지도에 쓰이는 좌표계](http://www.osgeo.kr/17)문서를 참고하면 된다.
그리고 이 좌표계는 EPSG:3857 이기에 이를 EPSG:4326로 변환하기 위해 [ol.proj](http://openlayers.org/en/latest/apidoc/ol.proj.html) 기능을 사용해서 변환할 것이다.
```{.javascript}
    ol.proj.transform([item[1], item[0]], "EPSG:4326", "EPSG:3857");
```
좌표 손질이 끝나면 다음은 Layer들을 정의한다.

```{.javascript}
    var vectorSource = new ol.source.Vector();     
    var vectorLayer = new ol.layer.Vector({ source: vectorSource }); 
```
각각 vectorSource 와 vectorLayer 를 정의한 것이다. 여기서 vectorLayer 내부의 source : vectorSource 는 vectorLayer위에 그릴 도구로 vectorSource 를 사용한다고 생각하면 된다.  
이제 기초적인 틀이 완성되었다면 본격적으로 마커를 제작해보자!
```{.javascript}
    var polygonGeom = new ol.geom.Polygon([coorSet]);            //polygonGeom 객체 생성
    });
```
addFeature.js 파일의 **draw function** 내부에 보면 위와 같은 코드가 있다. 여기서 ol.geom.Polygon은 꼭지점이 있는 도형을 그리기 위한 객체로 본 예제에선 좌표 4개를 받는다.  
***왜 4개냐고 물으신다면 대답해드리는게 인지상정!***  
당연히 사각형을 그리기 위해서이다! 물론 5각형을 그리고 싶어요! 라는 착한 어른이는 좌표 5개를 추가하면 되겠다!
그리고 **[coorSet]** 이 뭔가요! 라고 묻는 착한 어른이! coorSet 은 아까 proj.transform 을 이용해 좌표계를 변환한 좌표인 거시다!

하나 더 보자. 보통 지도상 좌표의 x, y값을 본다면 다음을 따를 것이다.
```{.javascript}
     + ----------- max
     |             |
     |             |
   min ------------+
```
min 은 최소를 뜻하고 max는 최대를 뜻한다. 즉, x값은 오른쪽으로 갈 수록 증가하고 y값은 위로 갈 수록 증가한다.  
물론 이는 좌표계에 따라 다를 수 있다! 지금 쓰는 사람도 좌표계를 많이 다룬 사람이 아니기에 어디까지나 이 예제에 관해서만 알면 된다.  

그럼 우린 min, max 라는 방향을 알았으면 사각형의 꼭지점을 찍는 순서도 알 수 있다. 갑자기 왜 찍는 순서냐고?
**컴퓨터는 배열을 읽고 그대로 선을 그어버리니 꼭지점(포인트) 순서를 배열에 알맞게 넣지 않으면 사각형이 아니라 모래시계나 이상한 모형이 나오기 때문이다!**  
아, 물론 직사각형 같은거 말고 다른 특별한걸 그리고 싶으면 그래도 되공!
  
이 예시는 순서대로 min -> 오른쪽 아래 + -> max -> 왼쪽 위 + 순서대로 포인트를 찍었다.
그럼 다음 라인으로 넘어가서 feature로 보자.
```{.javascript}
    var feature = new ol.Feature({ geometry: polygonGeom });     //feature 객체 생성
```
* ol.Feature 은 이제 도형을 정의할 것이라는 의미이다.
* geometry라는 속성 값은 기하 요소를 뜻한다. 예컨데 원을 그리고 싶으면 여기에 원이라는 기하 속성을 가진 객체를 추가하면 되고, 지금은 도형이기에 아까 정의한 polygonGeom를 넣는다.

자 feature를 지정했다면 우린 도형을 만들 준비를 거의 다 한것이다! 하지만 우린 구체적으로 이 도형이 어떤 색을 가지고 또 어떤 윤곽선을 가지는지 정해줘야 한다.  

지정하기 위해 다음과 같은 코드를 사용한다.
```{.javascript}
    var style = new ol.style.Style({                             //style 객체 생성
        stroke: new ol.style.Stroke({                            //테두리 속성 객체 생성
            color: stColor
        }),
        fill: new ol.style.Fill({                                //채우기 속성 객체 생성
            color: flColor
        })
    });
```

바로 스타일을 지정해준다. 여기서 스타일은 feature 의 색, 윤곽선을 지정해준다. 자세히 보면 **stroke** 라는 속성에 new ol.style.Stroke와 fill에 new ol.style.Fill을 지정한 것을 볼 수 있다.  
물론 단순하게 색을 칠하는게 아니라 이미지를 넣고 싶다! 라고 하신다면 fill 의 속성이나 style 속성을 참고하자 자세한 것은 [ol.style](https://openlayers.org/en/latest/apidoc/ol.style.html)을 참고.    
이렇게 만든 스타일은 feature.setStlye() 을 통해 지정할 수 있다. (예시에선 feature.setStyle(style);)

자! 이제 우리는 feature 를 생성해고 세부적으로 style 까지 지정해주었으면 이제 뭘 해야될까?
바로 vectorLayer 에 그려줘야 한다! 예제의 끝 부분에 다음과 같은 코드를 발견할 수 있다.
```{.javascript}
    src.addFeature(feature);
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
그럼 이제 vectorLayer 에 도형이 그러졌으면 이제 이 투명한 캔버스를 지도 위에 붙여주면 사각형이 짜잔 하며 나타난다. 어떻게 하는지는 다음을 보자.  

```{.javascript}
    vmap.addLayer(vectorLayer);  //마커가 그려진 벡터레이어를 Vworld에 추가
```
아까 vmap 은 creatMap에서 지도 객체를 지정하는 변수였었다. 이 지도에 addLayer() 함수를 이용해 vectorLayer 를 붙여주면 아래 그림과 같이 지도에 사각형을 그릴 수 있다!  
![결과](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/addFeature/%EA%B2%B0%EA%B3%BC.png)