# Vworld 예제를 제작하자

Vworld 를 이용해서 이것저것 하다가 2.0 API문서와 예제가 너무 부실하기도 하고 나와 같은 ***고-통*** 을 느끼는 사람이 없기를 바램으로 만든 문서  
기본적으로 [Vworld](http://map.vworld.kr/map/maps.do)는 국가에서 제공하고 있는 공간정보 오픈 플렛폼이다. 쉽게 말해서 웹-지도(네이버 지도 같은)  

Vworld 를 이용해서 이것저것 만들기 위해선 API key 가 필요하다. [Vworld_APIKEY](http://dev.vworld.kr/dev/v4api.do) 에 들어가면 API Key를 발급받을 수 있다.  
이 예제는 웹상에서(인터넷 브라우저) Vworld를 띄우고 마커 혹은 다각형, 원 기타 요소(좌표나 그외 정보)를 가져오는 것을 보여주기 위해 기본적인 파일 2개를 먼저 정의했다.  
(js : javascript ECMA5 이상?)

* [index.html](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/index.html) - 지도를 보여주고 createMap.js을 로드해주는 html 파일
* [createMap.js](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/createMap.js) - 지도를 생성해주는 js 파일

위의 2개 파일은 지도를 웹상에 생성하기 위해 필요한 파일이다.  

[index.html](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/index.html)을 보면 다음과 같은 부분이 있다.

```{.html}
        <script type="text/javascript" 
        src="http://map.vworld.kr/js/vworldMapInit.js.do?version=2.0&apiKey=<YourAPIKEY>">
        </script>
```

여기에서 **<YourAPIKEY>** 에 발급받은 API Key 를 넣는다. 예컨대 다음과 같은 Key(0000-0000-0000-00000)를 발급받았다면  
```{.no-highlight}
src="http://map.vworld.kr/js/vworldMapInit.js.do?version=2.0&apiKey=0000-0000-0000-00000"
```
가 될것이다.

또한 body 내부에 코드를 발견할 수 있을 것이다.
```{.html}
    <div class="vmap" id="v_map"> 
        
    </div>
```
div 태그 내부의 class 값은 추후 html 의 css 에서 사용되고 id의 경우 createMap.js 에서 이 div 장소에 map 을 생성하는데 필요한 표지판이라 생각하면 편하다.  
정리한다면 저 **div에 지도가 붙여진다**고 생각하면 편하다.


다음은 [createMap.js](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/createMap.js)를 보자  
createMap.js 는 앞서 말했듯이 지도를 생성해주는 역활을 한다. 바꿔 말하자면 지도를 **초기화** 시켜주는 정적(static) 파일이다.  
기본적으로 웹 페이지가 load 될 때 load event 를 이용하여 지도를 생성하는 방식으로 예제를 구성하였다. 예컨대 다음을 사용한다.
```{.javascript}
window.addEventListener('load', initMap);  
```
위 문장은 말 그대로 window에 Listener 를 추가하는 구문인데 load 이벤트가 발생할 시 **initMap 이름을 가진 function**을 이용해 핸들링 하라는 의미이다.  

createMap.js는 다음 2개의 변수를 이용한다.
* var vmap;          //Vworld Map 객체 변수 선언
* var div_vmap;      //html div를 가리킬 객체 변수 선언
  
div_vmap 은 html 의 div tag 중 id가 v_map이라는 것을 가리키기 위한 변수이다. 아래와 같이 사용된다.  
```{.javascript}
div_vmap = document.getElementById('v_map');
```
