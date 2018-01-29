# Vworld 예제를 제작하자

Vworld 를 이용해서 이것저것 하다가 2.0 API문서와 예제가 너무 부실하기도 하고 나와 같은 _*고-통*_ 을 느끼는 사람이 없기를 바램으로 만든 문서  
기본적으로 [Vworld](http://map.vworld.kr/map/maps.do)는 국가에서 제공하고 있는 공간정보 오픈 플렛폼이다. 쉽게 말해서 웹-지도(네이버 지도 같은)  

Vworld 를 이용해서 이것저것 만들기 위해선 API key 가 필요하다. [Vworld_APIKEY](http://dev.vworld.kr/dev/v4api.do) 에 들어가면 API Key를 발급받을 수 있다.
이 예제는 웹상에서(인터넷 브라우저) Vworld를 띄우고 마커 혹은 다각형, 원 기타 요소(좌표나 그외 정보)를 가져오기 위해 기본적인 파일 2개를 먼저 정의했다.  

* [index.html](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/index.html)
* [createMap.js](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/createMap.js)

index.html을 보면 다음과 같은 부분이 있다.

```{.html}
        <script type="text/javascript" 
        src="http://map.vworld.kr/js/vworldMapInit.js.do?version=2.0&apiKey=<YourAPIKEY>">
        </script>
```

여기에서 _<YourAPIKEY>_ 에 발급받은 API Key 를 넣는다. 예컨대 다음과 같은 Key(0000-0000-0000-00000)를 발급받았다면  
```{.no-highlight}
src="http://map.vworld.kr/js/vworldMapInit.js.do?version=2.0&apiKey=0000-0000-0000-00000"
```
가 될것이다.

