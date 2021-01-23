// ==UserScript==
// @name         鼠标点击冒泡
// @namespace    https://djzhao.js.org
// @version      0.3.2
// @description  一个用JS写的鼠标左击特效
// @description  一些Emoji 😀😃😄😁😆😅😂🤣☺😊😚😙😗😘😍😌😉🙃🙂😇😋😜😝😛🤑🤗🤓😎🤡🤠😖😣☹🙁😕😟😔😞😒😏😫😩😤😠😡😶😐😑😯😦😥😢😨😱😳😵😲😮😧🤤😭😪😴🙄🤔😬🤥🤐💩👺👹👿😈🤕🤒😷🤧🤢👻💀☠👽👾🤖🎃😺😸😹🙏👏🙌👐😾😿🙀😽😼😻
// @author       一碗单炒饭
// @include      /[a-zA-z]+://[^\s]*/
// @run-at       document_start
// ==/UserScript==
onload = function () {
  let clickCnt = 0;
  const $html = document.getElementsByTagName('html')[0];
  const $body = document.getElementsByTagName('body')[0];
  $html.onclick = function (e) {
    let anim = 0;
    const $elem = document.createElement('b');
    $elem.style.color = '#b5c427';
    $elem.style.zIndex = 9999;
    $elem.style.position = 'absolute';
    $elem.style.select = 'none';
    const x = e.pageX;
    const y = e.pageY;
    $elem.style.left = x - 10 + 'px';
    $elem.style.top = y - 20 + 'px';
    clearInterval(anim);
    switch (clickCnt += 1) {
      case 5:
        $elem.innerText = 'OωO';
        break;
      case 10:
        $elem.innerText = '(๑•́ ∀ •̀๑)';
        break;
      case 15:
        $elem.innerText = '(๑•́ ₃ •̀๑)';
        break;
      case 20:
        $elem.innerText = '(๑•̀_•́๑)';
        break;
      case 25:
        $elem.innerText = '（￣へ￣）';
        break;
      case 30:
        $elem.innerText = '(╯°口°)╯(┴—┴';
        break;
      case 35:
        $elem.innerText = '૮( ᵒ̌皿ᵒ̌ )ა';
        break;
      case 40:
        $elem.innerText = '╮(｡>口<｡)╭';
        break;
      case 45:
        $elem.innerText = '( ง ᵒ̌皿ᵒ̌)ง⁼³₌₃';
        break;
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
        $elem.innerText = '(ꐦ°᷄д°᷅)';
        break;
      case 60:
        clickCnt = 0;
        break;
      default:
        // 手动更换下面这行双引号里面的内容 如"😀"
        $elem.innerText = '😎';
        break;
    }
    $elem.style.fontSize = (Math.random() * 10) + 8 + 'px';
    let increase = 0;
    setTimeout(function() {
      anim = setInterval(function() {
        increase += 1;
        if (increase === 150) {
          clearInterval(anim);
          $body.removeChild($elem);
        }
        $elem.style.top = y - 20 - increase + 'px';
        $elem.style.opacity = ((150 - increase) / 120).toString();
      }, 8);
    }, 70);
    $body.appendChild($elem);
  };
};
