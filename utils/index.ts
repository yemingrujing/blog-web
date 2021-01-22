export function throttle(func, wait, ...options: any) {
  let timeout;
  let context;
  let args;
  let previous = 0;
  if (!options) {
    options = {};
  }

  const later = function () {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) {
      context = null;
      args = null;
    }
  };

  const throttled = function () {
    const now = new Date().getTime();
    if (!previous && options.leading === false) {
      previous = now;
    }
    const remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timeout) {
        context = null;
        args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };

  return throttled;
}

export function CopyCode() {
  const btn = document.createElement('button');
  btn.className = 'copy-code';
  btn.title = '点击复制代码';
  btn.innerText = '';
  const preList = document.getElementsByTagName('pre');

  for (let i = 0; i < preList.length; i += 1) {
    const codeDom = preList[i];
    codeDom.appendChild(btn.cloneNode(true));
    codeDom.addEventListener('click', copy, false);
  }
}

function copy(e) {
  if (e.target.className === 'copy-code') {
    const emailLink = e.target.parentNode.firstElementChild;
    const range = document.createRange();
    range.selectNode(emailLink);
    window.getSelection()
      .addRange(range);
    let msgBox = document.createElement('span');
    msgBox.className = 'msgBox';

    try {
      const successful = document.execCommand('copy');
      msgBox.innerText = successful ? '复制成功' : '复制失败';
      e.target.appendChild(msgBox);
    } catch (err) {
      msgBox.innerText = '复制失败';
      e.target.appendChild(msgBox);
    }
    setTimeout(() => {
      msgBox.remove();
      msgBox = null;
    }, 950);
    window.getSelection()
      .removeAllRanges();
  }
}

declare const window: any;
export function AddFavorite(sURL, sTitle) {
  const ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') !== -1 ? 'Command/Cmd' : 'Ctrl';
  const srURL = encodeURI(sURL);
  try {
    window.external.addFavorite(srURL, sTitle);
  } catch (e) {
    try {
      window.sidebar.addPanel(sTitle, srURL, '');
    } catch (el) {
      alert(`加入收藏失败，请使用${ctrl}+D进行添加,或手动在浏览器里进行设置.`);
    }
  }
}

export function distanceTime(time) {
  const EndTime = new Date(time);
  const NowTime = new Date();
  const t = EndTime.getTime() - NowTime.getTime();
  const d = Math.floor(t / 1000 / 60 / 60 / 24);
  if (d !== -1) {
    return `${Math.abs(d)}天前`;
  }
  const h = Math.floor(t / 1000 / 60 / 60 % 24);
  if (h !== -1) {
    return `${Math.abs(h)}小时前`;
  }
  const m = Math.floor(t / 1000 / 60 % 60);
  if (m !== -1) {
    return `${Math.abs(m)}分钟前`;
  }
  const s = Math.floor(t / 1000 % 60);
  return `${Math.abs(s)}秒前`;
}

function canvasDataURL(path, options, callback) {
  const img = new Image();
  img.src = path;
  const self = this;
  img.onload = function () {
    let w = self.width;
    let h = self.height;
    const scale = w / h;
    w = options.width || w;
    h = options.height || (w / scale);
    let quality = 0.7;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const anw = document.createAttribute('width');
    anw.nodeValue = w;
    const anh = document.createAttribute('height');
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    ctx.drawImage(self, 0, 0, w, h);
    if (options.quality && options.quality <= 1 && options.quality > 0) {
      quality = options.quality;
    }
    const base64 = canvas.toDataURL(options.type === 'image/png' ? 'image/png' : 'image/jpeg', quality);
    callback(base64);
  };
}

export function photoCompress(file, options, callback) {
  const ready = new FileReader();
  ready.readAsDataURL(file);
  ready.onload = function () {
    const path = this.result;
    canvasDataURL(path, options, callback);
  };
}

export function base64ToBlob(data) {
  const arr = data.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    n -= 1;
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
