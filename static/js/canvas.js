/**
 * Ribbons Class File.
 * Creates low-poly ribbons background effect inside a target container.
 */
(function (name, factory) {
  if (typeof window === 'object') {
    window[name] = factory();
  }
}('Ribbons', () => {
  const _w = window;
  const _b = document.body; // 返回html dom中的body节点 即<body>
  const _d = document.documentElement;// 返回html dom中的root 节点 即<html>

  // random helper
  const random = function (...args) {
    if (arguments.length === 1) {
      if (Array.isArray(args[0])) {
        const index = Math.round(random(0, args[0].length - 1));
        return args[0][index];
      }
      return random(0, args[0]);
    }
    if (arguments.length === 2) {
      return (Math.random() * (args[1] - args[0])) + args[0];
    }
    return 0; // default
  };

  // screen helper
  const screenInfo = function (e) {
    const width = Math.max(0, _w.innerWidth || _d.clientWidth || _b.clientWidth || 0);
    const height = Math.max(0, _w.innerHeight || _d.clientHeight || _b.clientHeight || 0);
    const scrollx = Math.max(0, _w.pageXOffset || _d.scrollLeft || _b.scrollLeft || 0) - (_d.clientLeft || 0);
    const scrolly = Math.max(0, _w.pageYOffset || _d.scrollTop || _b.scrollTop || 0) - (_d.clientTop || 0);

    return {
      width,
      height,
      ratio: width / height,
      centerx: width / 2,
      centery: height / 2,
      scrollx,
      scrolly,
    };
  };

  // mouse/input helper
  const mouseInfo = function (e) {
    const screen = screenInfo(e);
    const mousex = e ? Math.max(0, e.pageX || e.clientX || 0) : 0;
    const mousey = e ? Math.max(0, e.pageY || e.clientY || 0) : 0;

    return {
      mousex,
      mousey,
      centerx: mousex - (screen.width / 2),
      centery: mousey - (screen.height / 2),
    };
  };

  // point object
  const Point = function (x, y) {
    this.x = 0;
    this.y = 0;
    this.set(x, y);
  };
  Point.prototype = {
    constructor: Point,

    set(x, y) {
      this.x = x || 0;
      this.y = y || 0;
    },
    copy(point) {
      this.x = point.x || 0;
      this.y = point.y || 0;
      return this;
    },
    multiply(x, y) {
      this.x *= x || 1;
      this.y *= y || 1;
      return this;
    },
    divide(x, y) {
      this.x /= x || 1;
      this.y /= y || 1;
      return this;
    },
    add(x, y) {
      this.x += x || 0;
      this.y += y || 0;
      return this;
    },
    subtract(x, y) {
      this.x -= x || 0;
      this.y -= y || 0;
      return this;
    },
    clampX(min, max) {
      this.x = Math.max(min, Math.min(this.x, max));
      return this;
    },
    clampY(min, max) {
      this.y = Math.max(min, Math.min(this.y, max));
      return this;
    },
    flipX() {
      this.x *= -1;
      return this;
    },
    flipY() {
      this.y *= -1;
      return this;
    },
  };

  // class constructor
  const Factory = function (options) {
    this._canvas = null;
    this._context = null;
    this._sto = null;
    this._width = 0;
    this._height = 0;
    this._scroll = 0;
    this._ribbons = [];
    this._options = {
      // ribbon color HSL saturation amount
      colorSaturation: '80%',
      // ribbon color HSL brightness amount
      colorBrightness: '60%',
      // ribbon color opacity amount
      colorAlpha: 0.65,
      // how fast to cycle through colors in the HSL color space
      colorCycleSpeed: 6,
      // where to start from on the Y axis on each side (top|min, middle|center, bottom|max, random)
      verticalPosition: 'center',
      // how fast to get to the other side of the screen
      horizontalSpeed: 200,
      // how many ribbons to keep on screen at any given time
      ribbonCount: 3,
      // add stroke along with ribbon fill colors
      strokeSize: 0,
      // move ribbons vertically by a factor on page scroll
      parallaxAmount: -0.5,
      // add animation effect to each ribbon section over time
      animateSections: true,
    };

    this._onDraw = this._onDraw.bind(this);
    this._onResize = this._onResize.bind(this);
    // this._onScroll = this._onScroll.bind(this);
    this.setOptions(options);
    this.init();
  };

  // class prototype
  Factory.prototype = {
    constructor: Factory,

    // Set and merge local options
    setOptions(options) {
      if (typeof options === 'object') {
        Object.keys(options)
          .forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(key)) {
              this._options[key] = options[key];
            }
          });
      }
    },

    // Initialize the ribbons effect
    init() {
      try {
        this._canvas = document.createElement('canvas');
        this._canvas.style.display = 'block';
        this._canvas.style.position = 'fixed';
        this._canvas.style.margin = '0';
        this._canvas.style.padding = '0';
        this._canvas.style.border = '0';
        this._canvas.style.outline = '0';
        this._canvas.style.left = '0';
        this._canvas.style.top = '0';
        this._canvas.style.width = '100%';
        this._canvas.style.height = '100%';
        this._canvas.style['z-index'] = '-1';
        this._canvas.style['background-color'] = '#fff';
        this._canvas.id = 'bgCanvas';
        this._onResize();

        this._context = this._canvas.getContext('2d');
        this._context.clearRect(0, 0, this._width, this._height);
        this._context.globalAlpha = this._options.colorAlpha;

        window.addEventListener('resize', this._onResize);
        window.addEventListener('scroll', this._onScroll);
        document.body.appendChild(this._canvas);
      } catch (e) {
        console.warn(`Canvas Context Error: ${e.toString()}`);
        return;
      }
      this._onDraw();
    },

    // Create a new random ribbon and to the list
    addRibbon() {
      // movement data
      const dir = Math.round(random(1, 9)) > 5 ? 'right' : 'left';
      const stop = 1000;
      const hide = 200;
      const min = 0 - hide;
      const max = this._width + hide;
      let movex = 0;
      let movey = 0;
      const startx = dir === 'right' ? min : max;
      let starty = Math.round(random(0, this._height));

      // asjust starty based on options
      if (/^(top|min)$/i.test(this._options.verticalPosition)) {
        starty = 0 + hide;
      } else if (/^(middle|center)$/i.test(this._options.verticalPosition)) {
        starty = this._height / 2;
      } else if (/^(bottom|max)$/i.test(this._options.verticalPosition)) {
        starty = this._height - hide;
      }

      // ribbon sections data
      const ribbon = [];
      const point1 = new Point(startx, starty);
      const point2 = new Point(startx, starty);
      let point3 = null;
      let color = Math.round(random(0, 360));
      let delay = 0;

      // buils ribbon sections
      for (let i = stop; ; i -= 1) {
        if (i <= 0) {
          break;
        }

        movex = Math.round(((Math.random() * 1) - 0.2) * this._options.horizontalSpeed);
        movey = Math.round(((Math.random() * 1) - 0.5) * (this._height * 0.25));

        point3 = new Point();
        point3.copy(point2);

        if (dir === 'right') {
          point3.add(movex, movey);
          if (point2.x >= max) {
            break;
          }
        } else if (dir === 'left') {
          point3.subtract(movex, movey);
          if (point2.x <= min) {
            break;
          }
        }
        // point3.clampY( 0, this._height );

        ribbon.push({ // single ribbon section
          point1: new Point(point1.x, point1.y),
          point2: new Point(point2.x, point2.y),
          point3,
          color,
          delay,
          dir,
          alpha: 0,
          phase: 0,
        });

        point1.copy(point2);
        point2.copy(point3);

        delay += 4;
        color += this._options.colorCycleSpeed;
      }
      this._ribbons.push(ribbon);
    },

    // Draw single section
    _drawRibbonSection(section) {
      if (section) {
        if (section.phase >= 1 && section.alpha <= 0) {
          return true; // done
        }
        if (section.delay <= 0) {
          section.phase += 0.02;
          section.alpha = Math.sin(section.phase) * 1;
          section.alpha = section.alpha <= 0 ? 0 : section.alpha;
          section.alpha = section.alpha >= 1 ? 1 : section.alpha;

          if (this._options.animateSections) {
            const mod = Math.sin(1 + (section.phase * Math.PI / 2)) * 0.1;

            if (section.dir === 'right') {
              section.point1.add(mod, 0);
              section.point2.add(mod, 0);
              section.point3.add(mod, 0);
            } else {
              section.point1.subtract(mod, 0);
              section.point2.subtract(mod, 0);
              section.point3.subtract(mod, 0);
            }
            section.point1.add(0, mod);
            section.point2.add(0, mod);
            section.point3.add(0, mod);
          }
        } else {
          section.delay -= 0.5;
        }

        const s = this._options.colorSaturation;
        const l = this._options.colorBrightness;
        const c = `hsla(${section.color}, ${s}, ${l}, ${section.alpha} )`;

        this._context.save();

        if (this._options.parallaxAmount !== 0) {
          this._context.translate(0, this._scroll * this._options.parallaxAmount);
        }
        this._context.beginPath();
        this._context.moveTo(section.point1.x, section.point1.y);
        this._context.lineTo(section.point2.x, section.point2.y);
        this._context.lineTo(section.point3.x, section.point3.y);
        this._context.fillStyle = c;
        this._context.fill();

        if (this._options.strokeSize > 0) {
          this._context.lineWidth = this._options.strokeSize;
          this._context.strokeStyle = c;
          this._context.lineCap = 'round';
          this._context.stroke();
        }
        this._context.restore();
      }
      return false; // not done yet
    },

    // Draw ribbons
    _onDraw() {
      // cleanup on ribbons list to rtemoved finished ribbons
      for (let i = 0, t = this._ribbons.length; i < t; i += 1) {
        if (!this._ribbons[i]) {
          this._ribbons.splice(i, 1);
        }
      }

      // draw new ribbons
      this._context.clearRect(0, 0, this._width, this._height);

      for (let a = 0; a < this._ribbons.length; a += 1) {
        const ribbon = this._ribbons[a];
        const numSections = ribbon.length;
        let numDone = 0;

        for (let b = 0; b < numSections; b += 1) {
          if (this._drawRibbonSection(ribbon[b])) {
            numDone += 1; // section done
          }
        }
        if (numDone >= numSections) {
          this._ribbons[a] = null;
        }
      }
      // maintain optional number of ribbons on canvas
      if (this._ribbons.length < this._options.ribbonCount) {
        this.addRibbon();
      }
      requestAnimationFrame(this._onDraw);
    },

    // Update container size info
    _onResize(e) {
      const screen = screenInfo(e);
      this._width = screen.width;
      this._height = screen.height;

      if (this._canvas) {
        this._canvas.width = this._width;
        this._canvas.height = this._height;

        if (this._context) {
          this._context.globalAlpha = this._options.colorAlpha;
        }
      }
    },

    // Update container size info
    _onScroll(e) {
      const screen = screenInfo(e);
      this._scroll = screen.scrolly;
    },
  };
  // export
  const factory = new Factory();
  return factory;
}));
