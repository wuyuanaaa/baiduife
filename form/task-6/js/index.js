/**
 * Created by Administrator on 2018/3/7.
 */
(function () {
    function SetLogin(data) {
        this._init(data);
    }
    SetLogin.prototype = {
        _init : function (data) {
            this.height = data.height || 300;
            this.width = data.width || 400;
            this.doms = {
                login : document.querySelector('#log-in'),
                loginBox : document.querySelector('#login'),
                loginClose : document.querySelector('#login-close'),
                cover : document.querySelector('#cover'),
                top : document.querySelector('#login>.login-top')
            }
        },
        // 设置浮出框的属性
        setLoginBox : function () {
            this.doms.loginBox.style.height = this.height + 'px';
            this.doms.loginBox.style.width = this.width + 'px';
            this.doms.loginBox.style.marginTop = -0.5 * this.height + 'px';
            this.doms.loginBox.style.marginLeft = -0.5 * this.width + 'px';
        },
        // 浮出框显示事件 （点击登录）
        show : function () {
            var that = this;
            this.doms.login.addEventListener('click',function () {
                that.doms.loginBox.style.display = 'block';
                that.doms.cover.style.display = 'block';
            })
        },
        // 浮出框隐藏事件 （点击关闭或者空白区域）
        hide : function () {
            var that = this;
            this.doms.loginClose.addEventListener('click',function () {
                that.doms.loginBox.style.display = 'none';
                that.doms.cover.style.display = 'none';
            });
            this.doms.cover.addEventListener('click',function (event) {
                var event = event || window.event;
                if(event.target != that.doms.loginBox){
                    that.doms.loginBox.style.display = 'none';
                    that.doms.cover.style.display = 'none';
                }
            })
        },
        // 拖拽事件（按住蓝色部分可以拖拽弹出框）
        drag : function () {
            var that = this;
            this.doms.top.onmousedown = function (event) {
                var event = event || window.event;
                // 算出点击位置距离box左上角的距离
                var boxX = event.clientX - that.doms.loginBox.offsetLeft;
                var boxY = event.clientY - that.doms.loginBox.offsetTop;
                document.onmousemove = function (event) {
                    var event = event || window.event;
                    // 当前的top = 鼠标的Y值 - 鼠标按下时离box顶部的距离boxY + margin-top的偏移量
                    that.doms.loginBox.style.top = event.clientY - boxY + 0.5 * that.height + 'px';
                    that.doms.loginBox.style.left = event.clientX - boxX + 0.5 * that.width + 'px';
                    // 清空鼠标选中内容
                    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                }
            };
            // 鼠标弹起是清空移动事件
            document.onmouseup = function () {
                document.onmousemove = null;
            }
        },
        // 绑定事件
        bindLogin : function () {
            this.setLoginBox();
            this.show();
            this.hide();
            this.drag();
        }
    };

    var login = new SetLogin({
        height : 250,
        width : 300
    });

    login.bindLogin();
})();