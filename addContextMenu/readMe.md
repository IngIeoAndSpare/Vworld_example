# Vworld 컨텍스트 메뉴를 제작하자

Vworld 컨텍스트 메뉴! 사실 간단하게 말하자면 오른쪽 클릭할 때 나오는 메뉴를 말한다.
네이버나 다음 같은 경우엔 오른쪽 클릭 이벤트나 여러가지 있긴 한데... 오픈레이어스에선 찾아봐도 없어서 직접 사용자 커스텀 메뉴까지 붙여서 예시를 만들었다.

기본적으로 vworld 나 openlayers 에서 오른쪽 마우스 클릭 이벤트는 없다. 잘 찾아보지 않아서 그런건진 모르겠지만... 대부분 Viewport에 이벤트를 등록한다.

다음은 보자

```{.js}
    vmap.getViewport().addEventListener('contextmenu', function (e) {
        e.preventDefault(); //기존 context 메뉴를 차단한다.
        openContextMenu(e.x, e.y);
    });
```

이번 예시로 된 코드의 일부분인데, vmap 에 getViewport 에 이벤트를 등록시켜 오른쪽 마우스 클릭 이벤트를 돌려서 등록한 경우이다.

contextmenu는 말 그대로 기존 윈도우상 오른쪽 마우스 클릭 시 나오는 메뉴이며 이를 커스텀하게 바꾸기 위해 e.preventDefault() 를 이용하여 기존 메뉴는 안나오도록 수정하였다.

그럼 오른쪽 마우스 클릭 이벤트는 해결했는데 컨텍스트 메뉴를 만드는건 어떻게 하는지 따라해보자.

[createContextMenu.js](https://github.com/IngIeoAndSpare/Vworld_example/blob/master/addContextMenu/createContextMenu.js) 의 32번째 라인부터 생성을 하기 위한 function이 있다.

html 변수는 contextmenu 내부에 어떤 메뉴를 설정할 것인지 html 언어로 기술한 것을 저장하는 변수다.

이를 가지고 body에 append를 해주게 되는데... 다음을 보자.
```{.js}
function appendhtml (htmlString, x, y) {
    let contextDiv = document.createElement('div');     // div element 생성
    contextDiv.setAttribute('id', 'contextMenu');       // id 속성 설정
    contextDiv.setAttribute('class', 'contextMenu');    // class 속성 설정
    contextDiv.setAttribute('style', 'top: ' + y + 'px; left:' + x + 'px;');    // context 메뉴가 나올 위치를 정한다.
    contextDiv.innerHTML = htmlString;                  // context 메뉴 내용을 채운다.

    document.body.appendChild(contextDiv);              // body 에 context 메뉴 추가.
}
    });
```

메뉴를 표출하기 위해서 element div를 만든 후 contextmenu를 쉽게 컨드롤 하기 위해 id와 class 를 지정해준다. 이 떄 class와 id는 각 스타일, 핸들링을 위하여 지정한 것이다.

style attribute를 지정한 것을 볼 수 있는데, 이는 클릭된 픽셀 아래에 contextmenu를 표출하기 위한 것이다. 

innerHTML의 경우 생성된 contextmenu에 내용을 채워주는 역활을 하며 결과적으로 body.appendChild를 하여 직접 contextmenu가 화면에 보여진다.