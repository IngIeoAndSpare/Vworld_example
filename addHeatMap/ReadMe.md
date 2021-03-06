# HeatMap 제작하기

Heatmap = 열지도라고 지칭하며 보통 밀접한 점 데이터를 효과적으로 표현하기 위해 사용된다.  
예컨데, 지진이 일어난 장소 분포 혹은 누수, 인구 밀집과 같은 데이터를 표현한다면 효과적으로 보여질 수 있다.  
자세한 설명은 [위키피디아:히트맵](https://en.wikipedia.org/wiki/Heat_map)를 참고하자  
물론 친숙한 예시로 기상청의 레이더 영상이 있겠다. [기상청:황사](http://www.weather.go.kr/weather/asiandust/image01.jsp)를 보면 히트맵이 어떤 역활을 하는지 알 수 있을것이다.  
  
## HeatMap을 제작하기 위해선?
히트맵을 제작하기 위해선 히트맵을 나타낼 기반 지도 그리고 히트맵을 그릴 데이터가 필요하다. 여기서 데이터라 함은 데이터 가중치와 가중치에 해당되는 위치정보를 말한다.  
예컨데 다음 데이터를 보자.  
```{.json}
{"wgs_x":"36.916076","wgs_y":"127.126964","subway_on":3073},
{"wgs_x":"36.870593","wgs_y":"127.143904","subway_on":753},
{"wgs_x":"36.833705","wgs_y":"127.14896","subway_on":4654},
{"wgs_x":"36.810005","wgs_y":"127.146826","subway_on":7724},
{"wgs_x":"37.344285","wgs_y":"126.948345","subway_on":4098},
{"wgs_x":"37.195504","wgs_y":"127.051672","subway_on":1129},
{"wgs_x":"37.416182","wgs_y":"126.884466","subway_on":568},
{"wgs_x":"37.522272","wgs_y":"126.974345","subway_on":4154},
{"wgs_x":"37.519594","wgs_y":"126.988537","subway_on":2428}
```
json 형태의 데이터들을 보면 _**wgs_x**_ 는 x좌표 _**wgs_y**_ 는 y좌표를 뜻한다.  그리고 데이터 가중치인 _**subway_on**_을 볼 수 있다. (본 예제에선 승하차 데이터를 이용함)  
  
여기서 우린 좌표정보와 가중치 값(subway_on)을 이용하여 히트맵을 vworld 상에 보여줄 예제를 제작할 것이다!  
  
일단, 우린 이 json 데이터를 읽어야 될 필요가 있기에 가상의 로컬 서버를 이용하여 json 파일을 로드할 것이다. 물론 코드상에 json 형식의 변수를 선언하고 그곳에 집어 넣어도 된다!  
  
가상의 서버를 위해 우린 python 기능의 http.server 기능을 사용할 것이다. 예컨데 다음과 같이 사용한다. 자세한 설명은 [python-server](http://www.hanbit.co.kr/channel/category/category_view.html?cms_code=CMS6163871474)를 참고하자

```{.cmd}
example_path> python3 -m http.server {portNumber}
```
실행환경은 각 os 마다 다르겠지만 window 의 경우 bash를 이용해 사용한다. portNumber 는 말 그대로 포트 번호를 말한다. 8080을 하건 아무런 숫자를 넣건!   
서버를 간단하게 만들었다면 이 데이터를 가져오는 fetch 를 제작해야 한다. 겁먹지 말고 다음 코드를 그대로 사용하자!  
  
```{.javascript}
function getData() {
    return fetch('./rows.json')
        .then(res => res.json())
        .then(json => {
            return json.rows;
        })
        .then(rows => {
            rows = rows.map((obj) => ({
                x: obj.wgs_x,
                y: obj.wgs_y,
                amount: obj.subway_on,
            }));
            return rows;
        });
}
```
이 코드는 json 파일을 읽어 정보를 반환해주는 코드이다. fetch 의 경우 브라우저별로 사용을 할 수 없는 경우도 있으니 주의하자! (가급적 크롬이나 파이어폭스 환경에서 사용하자)  
여기서 fetch 는 말 그대로 파일을 읽고 결과를 then 형식에 맞추어 바꿔즈는 경우다. 최종적으로 row 라는 객체를 반환하는데 이 row 객체는 x,y,amount 로 이루어져 있다.  
