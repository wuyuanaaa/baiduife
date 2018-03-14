/**
 * Created by Administrator on 2018/3/13.
 */
(function () {
    var canvas = document.querySelector('#palette');
    canvas.width = '400';
    canvas.height = '400';

    var centerBar = document.querySelector('.center-bar');
    var center = document.querySelector('.center');
    var leftBar = document.querySelector('.left-bar');
    var R = document.querySelector('#R');
    var G = document.querySelector('#G');
    var B = document.querySelector('#B');
    var H = document.querySelector('#H');
    var S = document.querySelector('#S');
    var L = document.querySelector('#L');
    var up = document.querySelectorAll('.up');
    var down = document.querySelectorAll('.down');
    var rgbR = document.querySelector('.rgb-r');
    var rgbG = document.querySelector('.rgb-g');
    var rgbB = document.querySelector('.rgb-b');

    var showBox = document.querySelector('.showBox');

    var hslH = document.querySelector('.hsl-h');
    var hslS = document.querySelector('.hsl-s');
    var hslL = document.querySelector('.hsl-l');

    var hsvH = document.querySelector('.hsv-h');
    var hsvS = document.querySelector('.hsv-s');
    var hsvV = document.querySelector('.hsv-v');

    var cssR = document.querySelector('.css-r');
    var cssG = document.querySelector('.css-g');
    var cssB = document.querySelector('.css-b');


    // 绘制取色板
    function setCanvas(r, g, b) {
        var ctx = canvas.getContext("2d");

        var gardientBase = ctx.createLinearGradient(400, 0, 0, 0);
        gardientBase.addColorStop(0,'rgb('+r+','+g+','+b+')');
        gardientBase.addColorStop(1,'rgb(255,255,255)');
        ctx.fillStyle = gardientBase;
        ctx.fillRect(0,0,400,400);

        var gardientBlack = ctx.createLinearGradient(0, 400, 0, 0);
        gardientBlack.addColorStop(0,'rgba(0,0,0,1)');
        gardientBlack.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle = gardientBlack;
        ctx.fillRect(0,0,400,400);
    }


    // 取色条点击事件
    center.onclick = function (e) {
        if(e.clientY > 0){
            // clientY  随机无故跳0一次 暂时无解 只能这样
            var y = e.clientY - this.offsetTop - 2;
            centerBar.style.top = y - 3 + 'px';
            setNum();
        }
    };
    
    // 取色条拖动事件
    centerBar.onmousedown = function (e) {
        document.onmousemove = function (e) {
            var y = e.clientY - center.offsetTop - 2;
            if(y < 0){
                centerBar.style.top = '-3px';
            }else if(y > 400){
                centerBar.style.top = '397px'
            }else {
                centerBar.style.top = y - 3 + 'px';
            }

            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            setNum();
        }
    };
    document.onmouseup = function () {
        document.onmousemove = null;
    };
    
    // 刷新取色条颜色 绘制取色条颜色 及canvas
    function getCenterColor() {
        var top = centerBar.style.top || window.getComputedStyle(centerBar,null).top;
        // window.getComputedStyle(element,null) 获取属性
        var h = (parseFloat(top) + 3) / 400 * 360;
        h = Math.round(h);
        var rgb = HSVtoRGB(h, 1, 1);
        centerBar.style.backgroundColor = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';
        setCanvas(rgb[0],rgb[1],rgb[2]);
        return h;
    }
    getCenterColor();

    // 色板点击事件
    canvas.onclick = function (e) {
        if(e.clientX > 0 && e.clientY >0){
            var x = e.clientX - this.parentNode.offsetLeft - 2 ;
            // 2像素边框
            var y = e.clientY - this.parentNode.offsetTop - 2;

            leftBar.style.left = x - leftBar.offsetWidth / 2 + 'px';
            leftBar.style.top = y - leftBar.offsetHeight / 2 + 'px';

            setNum();
        }

    };
    //  取色点拖动事件
    leftBar.onmousedown = function () {
        document.onmousemove = function (e) {
            var x = e.clientX - leftBar.parentNode.offsetLeft - 2;
            var y = e.clientY - leftBar.parentNode.offsetTop - 2;
            if (x < 0) {
                x = 0;
            } else if (x > 400) {
                x = 400
            }
            if (y < 0) {
                y = 0;
            } else if (y > 400) {
                y = 400
            }
            leftBar.style.left = x - leftBar.offsetWidth / 2 + 'px';
            leftBar.style.top = y - leftBar.offsetHeight / 2 + 'px';

            setNum();
        }
    };
    // 获得取色点的颜色
    function getLeftColor() {
        var h = getCenterColor();
        var s,v;
        var left = leftBar.style.left || window.getComputedStyle(leftBar,null).left;
        var top = leftBar.style.top || window.getComputedStyle(leftBar,null).top;

        s = (parseFloat(left) + 10) / 400;
        s = s.toFixed(2);
        v = 1 - (parseFloat(top) + 10) / 400;
        v = v.toFixed(2);

        return [h,s,v]
    }

    // 设置颜色
    function setLeftColor(h,s,v) {
        var rgb = HSVtoRGB(h,s,v);
        leftBar.style.backgroundColor = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';
    }
    function setLeftColorRgb(r,g,b) {
        var rgb = HSVtoRGB(h,s,v);
        leftBar.style.backgroundColor = 'rgb('+r+','+g+','+b+')';
    }
    function setNum() {
        var hsv = getLeftColor();
        var rgb = HSVtoRGB(hsv[0],hsv[1],hsv[2]);
        var hsl = RGBtoHSL(rgb[0],rgb[1],rgb[2]);

        hsvH.innerHTML = parseFloat(hsv[0]);
        hsvS.innerHTML = parseFloat(hsv[1]);
        hsvV.innerHTML = parseFloat(hsv[2]);

        R.value = rgb[0];
        G.value = rgb[1];
        B.value = rgb[2];

        R.value = rgb[0];
        G.value = rgb[1];
        B.value = rgb[2];

        rgbR.innerHTML = rgb[0];
        rgbG.innerHTML = rgb[1];
        rgbB.innerHTML = rgb[2];

        cssR.innerHTML = add0(rgb[0].toString(16),2);
        cssG.innerHTML = add0(rgb[1].toString(16),2);
        cssB.innerHTML = add0(rgb[2].toString(16),2);

        leftBar.style.backgroundColor = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';
        showBox.style.backgroundColor = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';

        H.value = hsl[0];
        S.value = hsl[1];
        L.value = hsl[2];

        hslH.innerHTML = hsl[0];
        hslS.innerHTML = hsl[1];
        hslL.innerHTML = hsl[2];

    }

    setNum();

    // HSV数字变化
    function HSVchange(h,s,v) {
        var top = h / 360 * 400 - 3;
        centerBar.style.top = top + 'px';
        leftBar.style.left = 400 * s - 10 + 'px';
        leftBar.style.top = 400 * (1 - v) - 10 + 'px';
    }
    // RGB数字变化
    function numChange() {
        for(var i = 0,len = up.length; i<len; i++){
            if(up[i].parentNode.classList.contains('control-rgb')){
                up[i].onclick = function () {
                    var value = this.parentNode.parentNode.children[1].value;
                    value = parseInt(value);
                    if(value < 255){
                        this.parentNode.parentNode.children[1].value = value + 1;
                        rgbChange();
                    }
                };
                up[i].nextElementSibling.onclick = function () {
                    var value = this.parentNode.parentNode.children[1].value;
                    value = parseInt(value);
                    if(value > 0) {
                        this.parentNode.parentNode.children[1].value = value - 1;
                        rgbChange();
                    }
                };
            }
            if(up[i].parentNode.classList.contains('control-h')){
                up[i].onclick = function () {
                    var value = this.parentNode.parentNode.children[1].value;
                    value = parseInt(value);
                    if(value < 360){
                        this.parentNode.parentNode.children[1].value = value + 1;
                        hslChange();
                    }
                };
                up[i].nextElementSibling.onclick = function () {
                    var value = this.parentNode.parentNode.children[1].value;
                    value = parseInt(value);
                    if(value > 0) {
                        this.parentNode.parentNode.children[1].value = value - 1;
                        hslChange();
                    }
                };
            }
            if(up[i].parentNode.classList.contains('control-sl')){
                up[i].onclick = function () {
                    var value = this.parentNode.parentNode.children[1].value;
                    value = parseFloat(value);
                    console.log(value);
                    if(value < 1){
                        this.parentNode.parentNode.children[1].value = fixed((value + 0.01),2);
                        hslChange();
                    }
                };
                up[i].nextElementSibling.onclick = function () {
                    var value = this.parentNode.parentNode.children[1].value;
                    value = fixed(parseFloat(value),2);

                    if(value > 0) {
                        this.parentNode.parentNode.children[1].value = fixed((value - 0.01),2);
                        hslChange();
                    }
                };
            }
        }
        R.onchange = function () {
            rgbChange();
        };
        G.onchange = function () {
            rgbChange();
        };
        B.onchange = function () {
            rgbChange();
        };
        H.onchange = function () {
            hslChange();
        };
        S.onchange = function () {
            hslChange();
        };
        L.onchange = function () {
            hslChange();
        };
    }
    numChange();

    function rgbChange() {
        var r = parseInt(R.value);
        var g = parseInt(G.value);
        var b = parseInt(B.value);
        leftBar.style.backgroundColor = 'rgb('+r+','+g+','+b+')';
        showBox.style.backgroundColor = 'rgb('+r+','+g+','+b+')';
        rgbR.innerHTML = r;
        rgbG.innerHTML = g;
        rgbB.innerHTML = b;

        cssR.innerHTML = add0(r.toString(16),2);
        cssG.innerHTML = add0(g.toString(16),2);
        cssB.innerHTML = add0(b.toString(16),2);

        var hsv = RGBtoHSV(r,g,b);
        HSVchange(hsv[0],hsv[1],hsv[2]);
        getCenterColor();
        hsvH.innerHTML = hsv[0];
        hsvS.innerHTML = hsv[1];
        hsvV.innerHTML = hsv[2];

        var hsl = RGBtoHSL(r,g,b);
        H.value = hsl[0];
        S.value = hsl[1];
        L.value = hsl[2];

        hslH.innerHTML = hsl[0];
        hslS.innerHTML = hsl[1];
        hslL.innerHTML = hsl[2];

    }
    function hslChange() {
        var h = parseFloat(H.value);
        var s = parseFloat(S.value);
        var l = parseFloat(L.value);

        hslH.innerHTML = h;
        hslS.innerHTML = s;
        hslL.innerHTML = l;

        var hsv = HSLtoHSV(h,s,l);
        HSVchange(hsv[0],hsv[1],hsv[2]);
        getCenterColor();

        hsvH.innerHTML = hsv[0];
        hsvS.innerHTML = hsv[1];
        hsvV.innerHTML = hsv[2];

        var rgb = HSLtoRGB(h,s,l);
        leftBar.style.backgroundColor = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';
        showBox.style.backgroundColor = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';
        R.value = rgb[0];
        G.value = rgb[1];
        B.value = rgb[2];

        rgbR.innerHTML = rgb[0];
        rgbG.innerHTML = rgb[1];
        rgbB.innerHTML = rgb[2];

        cssR.innerHTML = add0(rgb[0].toString(16),2);
        cssG.innerHTML = add0(rgb[1].toString(16),2);
        cssB.innerHTML = add0(rgb[2].toString(16),2);
    }


    var copyRGB = document.querySelector('#copyRGB');
    var copyHSL = document.querySelector('#copyHSL');
    var copyHSV = document.querySelector('#copyHSV');
    var copyCSS = document.querySelector('#copyCSS');

    copy(copyRGB);
    copy(copyHSL);
    copy(copyHSV);
    copy(copyCSS);

    function copy(dom) {
        dom.addEventListener('click',function () {
            if(dom == copyRGB){
                str = 'rgb('+rgbR.innerHTML+','+rgbG.innerHTML+','+rgbB.innerHTML+')';
            } else if(dom == copyHSL){
                str = 'hsl('+hslH.innerHTML+','+hslS.innerHTML+','+hslL.innerHTML+')';
            } else if(dom == copyHSV){
                str = 'hsl('+hsvH.innerHTML+','+hsvS.innerHTML+','+hsvV.innerHTML+')';
            } else if(dom == copyCSS){
                str = '#'+cssR.innerHTML+cssG.innerHTML+cssB.innerHTML;
            }
            copyTxt(str);
        });

        function copyTxt(str) {
            var input = document.createElement('input');
            document.body.appendChild(input);
            input.setAttribute('value',str);
            input.select();
            if(document.execCommand('copy')){
                document.execCommand('copy');
                alert('复制成功')
            }
            document.body.removeChild(input);
        }
    }

    // 16进制补0
    function add0(num, n) {
        var len = num.toString().length;
        while(len < n) {
            num = "0" + num;
            len++;
        }
        return num;
    }





    function HSVtoRGB (h, s, v) {
        let r, g, b;

        let i = Math.floor(h / 60);
        let f = h / 60 - i;
        let p = v * (1 - s);
        let q = v * (1 - f * s);
        let t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }

        return [fixed(r * 255), fixed(g * 255), fixed(b * 255)];
    }

    function RGBtoHSV (r, g, b) {
        r /= 255, g /= 255, b /= 255;

        let max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        let h, s, v;
        v = max;

        let d = max - min;
        s = max == 0 ? 0 : d / max;

        if (max == min) {
            h = 0;
        } else {
            switch (max) {
                case r:
                    h = 60 * ((g - b) / d + (g < b ? 6 : 0));
                    break;
                case g:
                    h = 60 * ((b - r) / d + 2);
                    break;
                case b:
                    h = 60 * ((r - g) / d + 4);
                    break;
            }
        }

        return [fixed(h), fixed(s, 2), fixed(v, 2)];
    }

    function HSLtoRGB (h, s, l) {
        h /= 360;

        let r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;

            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return [fixed(r * 255), fixed(g * 255), fixed(b * 255)];
    }

    function RGBtoHSL (r, g, b) {
        r /= 255, g /= 255, b /= 255;

        let max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = 60 * ((g - b) / d + (g < b ? 6 : 0));
                    break;
                case g:
                    h = 60 * ((b - r) / d + 2);
                    break;
                case b:
                    h = 60 * ((r - g) / d + 4);
                    break;
            }
        }

        return [fixed(h), fixed(s, 2), fixed(l, 2)];
    }

    function HSVtoHSL(h, s, v) {
        let rgbArr = HSVtoRGB(h, s, v);
        return rgb2hsl(rgbArr[0], rgbArr[1], rgbArr[2]);
    }

    function HSLtoHSV(h, s, l) {
        let rgbArr = HSLtoRGB(h, s, l);
        return RGBtoHSV(rgbArr[0], rgbArr[1], rgbArr[2]);
    }
    function fixed (num, decimalPlaces) {
        decimalPlaces = decimalPlaces || 0;
        return parseFloat(num.toFixed(decimalPlaces));
    }

})();