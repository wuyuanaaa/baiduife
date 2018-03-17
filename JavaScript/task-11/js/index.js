/**
 * 标签云
 * 1、随机生成span元素，span元素默认样式水平垂直居中
 * 2、给span元素添加x,y,的随机旋转；.
 * 3、向Z轴偏移 r 
 * 4、
 * 
 */

(function () {
    function TabCloud(data) {
        this._init(data);
    }
    TabCloud.prototype = {
        _init: function (data) {
            this.R = data.R || 200;
            this.num = data.num || 100;
            this.tabs = data.tabs || ['PS','HTML','CSS','JavaScript','Less','jQuery','BootStrap','nvm','gulp','git','GitHub'];
            this.speed = data.speed;
        },
        addSpan: function () {
            var main = document.querySelector('.main');
            for(var i=0; i<this.num; i++){
                var div = document.createElement('div');
                // 获取随机内容
                var x = Math.random() * 360;
                var y = Math.random() * 360;
                div.style.transform = 'rotateX('+x+'deg) rotateY('+y+'deg) translateZ('+this.R+'px)';
                var span = document.createElement('span');
                span.innerHTML = this.tabs[Math.round(Math.random() * this.tabs.length)];
                span.style.transform = 'rotateX(-'+x+'deg) rotateY(-'+y+'deg)';
                div.appendChild(span);
                main.appendChild(div);
            }
        }


    };

    var data = {};
    var tabCloud = new TabCloud(data);
    tabCloud.addSpan();
    
})();