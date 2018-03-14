/**
 * Created by Administrator on 2018/3/12.
 */
(function () {
    function Color() {

    }

    Color.prototype = {
        numChange: function () {
            var that = this;
            $('.control-rgb>.up').on('click', function () {
                var num = $(this).parent().prev().val();
                if (num < 255) {
                    $(this).parent().prev().val(parseInt(num) + 1);
                    changeRgb();
                }
            });
            $('.control-rgb>.down').on('click', function () {
                var num = $(this).parent().prev().val();
                if (num > 0) {
                    $(this).parent().prev().val(parseInt(num) - 1);
                    changeRgb();
                }
            });
            $('.control-h>.up').on('click', function () {
                var num = $(this).parent().prev().val();
                if (num < 360) {
                    $(this).parent().prev().val(parseInt(num) + 1);
                    changeHsl();
                }
            });
            $('.control-h>.down').on('click', function () {
                var num = $(this).parent().prev().val();
                if (num > 0) {
                    $(this).parent().prev().val(parseInt(num) - 1);
                    changeHsl();
                }
            });
            $('.control-sl>.up').on('click', function () {
                var num = parseFloat($(this).parent().prev().val());
                if (num < 1) {
                    num += 0.01;
                    num = num.toFixed(2);
                    $(this).parent().prev().val(num);
                }
            });
            $('.control-sl>.down').on('click', function () {
                var num = $(this).parent().prev().val();
                if (num > 0) {
                    num -= 0.01;
                    num = num.toFixed(2);
                    $(this).parent().prev().val(num);
                }
            });
            function changeRgb() {
                var r = $('#R').val();
                var g = $('#G').val();
                var b = $('#B').val();

                var hsl = that.rgbChangeIntohsl([r,g,b]);
                var H = hsl[0];
                var top = H / 360 * 400 - 3;
                $('.center-bar').css('top',top );
                var rgb = that.getTRcolor();
                that.setColor(rgb);
                that.getLeftColor();
            }
            function changeHsl() {
                var h = $('#H').val();
                var s = $('#S').val();
                var l = $('#L').val();
                var rgb = that.hslChangeIntorgb([h,s,l]);
                var top = h / 360 * 400 - 3;
                $('.center-bar').css('top',top );
                var colorR = rgb[0], colorG = rgb[1], colorB = rgb[2];
                var color = 'rgb('+ colorR +','+colorG+','+colorB+')';
                // 绘制色板
                that.setCanvas(color);
                var TRrgb = that.getTRcolor();
                that.setColor(TRrgb);
                that.getLeftColor();
            }
        },
        // 控制条点击及拖动
        centerBar: function () {
            console.log('centerBar');
            var $center = $('.center');
            var $centerBar = $('.center-bar');
            var that = this;
            $center.on('click', function (event) {
                // 中间色带被点击时控制条移动到点击位置
                var event = event || window.event;
                var y = event.clientY - this.offsetTop;
                if(y < 2){
                    y = 2;
                }else if(y > 402){
                    y = 402;
                }
                $centerBar.css('top', y - 5 + 'px');
                var rgb = that.getTRcolor();
                var rgbArr = that.getLeftColor();
                that.setColor(rgb);
                that.setLeftColor(rgbArr);
            });
            // 中间色带的控制条拖动事件
            $centerBar.on('mousedown', function (event) {
                var event = event || window.event;
                var y = event.clientY - this.offsetTop - 30;
                document.onmousemove = function (event) {
                    var event = event || window.event;
                    var top = event.clientY - y - $center[0].offsetTop - 2;
                    if (top < -3) {
                        top = -3;
                    } else if (top > 397) {
                        top = 397
                    }
                    var rgb = that.getTRcolor();
                    var rgbArr = that.getLeftColor();
                    that.setColor(rgb);
                    that.setLeftColor(rgbArr);
                    $centerBar.css({'top': top, 'backgroundColor': color});
                    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                }
            });
            document.onmouseup = function () {
                document.onmousemove = null;
                var rgb = that.getTRcolor();
                var rgbArr = that.getLeftColor();
                that.setColor(rgb);
                that.setLeftColor(rgbArr);
            };
        },
        hslChangeIntorgb: function (hsl) {
            var h = hsl[0] - 0,
                s = hsl[1] - 0,
                l = hsl[2] - 0;

            var r, g, b;
            if (s == 0) {
                r = g = b = l;
            }
            else {
                var p, q, k;
                if (l < 0.5) {
                    q = l * (1 + s);
                }
                else if (l >= 0.5) {
                    q = l + s - (l * s);
                }
                p = 2 * l - q;
                k = h / 360;

                r = singleColorCalculation(k + 1 / 3);
                g = singleColorCalculation(k);
                b = singleColorCalculation(k - 1 / 3);
            }
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];

            function singleColorCalculation(k) {

                var color;

                if (k < 0) {
                    k += 1;
                }
                if (k > 1) {
                    k -= 1;
                }

                if (k * 6 < 1) {
                    color = p + ((q - p) * 6 * k);
                }
                else if (k * 6 >= 1 && k < 0.5) {
                    color = q;
                }
                else if (k >= 0.5 && 3 * k < 2) {
                    color = p + ((q - p) * 6 * (2 / 3 - k));
                }
                else {
                    color = p;
                }
                return color;
            }
        },
        rgbChangeIntohsl : function (rgb) {
            var r = rgb[0] / 255,
                g = rgb[1] / 255,
                b = rgb[2] / 255;
            var min = Math.min.apply(Array, [r, g, b]),
                max = Math.max.apply(Array, [r, g, b]);
            var h, s, l;
            if (max == min) {
                h = 0;
            }
            else if (max == r && g >= b) {
                h = 60 * (g - b) / (max - min);
            }
            else if (max == r && g < b) {
                h = 60 * (g - b) / (max - min) + 360;
            }
            else if (max == g) {
                h = 60 * (b - r) / (max - min) + 120;
            }
            else if (max == b) {
                h = 60 * (r - g) / (max - min) + 240;
            }
            l = (max + min) / 2;
            if (l == 0 || max == min) {
                s = 0;
            }
            else if (l > 0 && l <= 0.5) {
                s = (max - min) / (2 * l);
            }
            else if (l > 0.5) {
                s = (max - min) / (2 - 2 * l);
            }

            return [Math.round(h), Math.round(s * 100) / 100, Math.round(l * 100) / 100];

        },
        getTRcolor: function () {
            console.log('getTRcolor');
            // H = top值和色带高度的比例 * 360
            var H = parseInt((parseInt($('.center-bar').css('top')) + 3) / 400 * 360);
            var hsl = [H,1,0.5];
            var rgb = this.hslChangeIntorgb(hsl);
            return rgb;
        },
        setColor : function (rgb) {
            console.log('setColor');
            var colorR = rgb[0], colorG = rgb[1], colorB = rgb[2];
            var color = 'rgb('+ colorR +','+colorG+','+colorB+')';
            // 绘制色板
            this.setCanvas(color);
            // 设置控制条颜色
            $('.center-bar').css('backgroundColor', color);
        },
        setCanvas : function (rgb) {
            console.log('setCanvas');
            var canvas = document.querySelector('#palette');
            canvas.width = '400';
            canvas.height = '400';
            var ctx = canvas.getContext("2d");
            var gardientBase = ctx.createLinearGradient(400, 0, 0, 0);
            gardientBase.addColorStop(0,rgb);
            gardientBase.addColorStop(1,'rgb(255,255,255)');
            ctx.fillStyle = gardientBase;
            ctx.fillRect(0,0,400,400);

            var gardientBlack = ctx.createLinearGradient(0, 400, 0, 0);
            gardientBlack.addColorStop(0,'rgba(0,0,0,1)');
            gardientBlack.addColorStop(1,'rgba(0,0,0,0)');
            ctx.fillStyle = gardientBlack;
            ctx.fillRect(0,0,400,400);
        },
        // 取色点点击及拖动
        leftBar : function () {
            console.log('leftBar');
            var $left = $('.left');
            var $leftBar = $('.left-bar');
            var that = this;

            // 色板被点击时
            $left.on('click',function (event) {
                var event = event || window.event;
                var x = event.clientX - 32;
                var y = event.clientY - 32;
                if(x < 0){
                    x = 0;
                }else if (x>400){
                    x = 400;
                }
                if(y < 0){
                    y = 0;
                }else if (y>400){
                    y = 400;
                }
                $leftBar.css({"top" : y-10 , "left" : x-10});
                var rgbArr = that.getLeftColor();
                that.setLeftColor(rgbArr);
            });
            // 取色点被拖动时
            $leftBar.on('mousedown', function (event) {
                var event = event || window.event;
                var x = event.clientX - $(this).offset().left;
                var y = event.clientY - $(this).offset().top;

                document.onmousemove = function (event) {
                    var event = event || window.event;
                    var left = event.clientX - x - 32;
                    var top = event.clientY - y - 32;
                    if(left < -10){
                        left = -10
                    }else if(left > 389){
                        left = 389
                    }
                    if(top < -10){
                        top = -10
                    }else if(top > 389){
                        top = 389
                    }

                    $leftBar.css({"top" : top, "left" : left});
                    var rgbArr = that.getLeftColor();
                    that.setLeftColor(rgbArr);
                    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                }
            });
            document.onmouseup = function () {
                document.onmousemove = null;
            }
        },
        // 获取取色点颜色
        getLeftColor : function () {
            console.log('getLeftColor');
            var $leftBar = $('.left-bar');
            var rgb = this.getTRcolor();
            var r0 = rgb[0], g0 = rgb[1], b0 = rgb[2];
            var colorR,colorG,colorB;
            var x = parseInt($leftBar.css('left')) + 10;
            var y = parseInt($leftBar.css('top')) + 10;

            function getColor(n) {
                var aX,bX,cX; //(255,0,n)
                var a,b,c;
                // x轴上的颜色值
                aX = 255;
                bX = 255 - x / 400 * 255;
                cX = parseInt(255 - (255 - n) / 400 * x);
                // 取色点上的颜色值
                a = parseInt(255 - aX/400 * y);
                b = parseInt(bX - bX/400 * y);
                c = parseInt(cX - cX/400 * y);
                return [a,b,c];
            }

            if(r0 == 0){
                if(g0 >= b0){
                    var arr = getColor(b0);
                    colorR = arr[1];
                    colorG = arr[0];
                    colorB = arr[2];
                } else {
                    var arr = getColor(g0);
                    colorR = arr[1];
                    colorG = arr[2];
                    colorB = arr[0];
                }
            }else if(g0 == 0){
                if(r0 >= b0){
                    var arr = getColor(b0);
                    colorR = arr[0];
                    colorG = arr[1];
                    colorB = arr[2];
                }else {
                    var arr = getColor(r0);
                    colorR = arr[2];
                    colorG = arr[1];
                    colorB = arr[0];
                }
            }else {
                if(r0 >= g0){
                    var arr = getColor(g0);
                    colorR = arr[0];
                    colorG = arr[2];
                    colorB = arr[1];
                }else {
                    var arr = getColor(r0);
                    colorR = arr[2];
                    colorG = arr[0];
                    colorB = arr[1];
                }
            }
            var rgb2 = [colorR,colorG,colorB];
            $leftBar.css("backgroundColor",'rgb('+rgb2[0]+','+rgb2[1]+','+rgb2[2]+')');
            return rgb2;
        },
        setLeftColor : function (rgbArr) {
            console.log('setLeftColor');
            var hslArr = this.rgbChangeIntohsl(rgbArr);
            var $R = $('#R'), $G = $('#G'), $B = $('#B'), $H = $('#H') ,$S = $('#S') ,$L = $('#L');
            var $leftBar = $('.left-bar');
            $R.val(rgbArr[0]);
            $G.val(rgbArr[1]);
            $B.val(rgbArr[2]);
            $H.val(hslArr[0]);
            $S.val(hslArr[1]);
            $L.val(hslArr[2]);
        },
        bind: function () {
            this.numChange();
            this.centerBar();
            var rgb = this.getTRcolor();
            this.setColor(rgb);
            var rgbArr = this.getLeftColor();
            this.setLeftColor(rgbArr);


            this.leftBar();
        }
    };

    var color = new Color();
    color.bind();

})();