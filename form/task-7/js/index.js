/**
 * Created by Administrator on 2018/3/9.
 */
(function () {
    function Table(data,dataType,dom) {
        this._init(data,dataType,dom);
    }

    Table.prototype = {
        _init : function (data,dataType,dom) {
            this.data = data;
            this.dataType = dataType;
            this.dom = dom;
        },
        // 绑定数据并创建表格内容
        // 添加标题栏
        addTh : function (table,dataType) {
            var tr = document.createElement('tr');
            var str = '';
            // 标题内容
            for(var i=0, len=dataType.length; i<len; i++){
                str +=    '<th class="type'+i+'" data-click="0">'+dataType[i]+'</th>';
            }
            tr.innerHTML = str;
            table.appendChild(tr);
        },
        // 添加内容栏
        addTd : function (table,data) {
            for(var key in data){
                var tr = document.createElement('tr');
                var str = '';
                str +=      '<td>'+key+'</td>';
                for(var j=0, lenj = data[key].length; j<lenj; j++){
                    str +=      '<td>'+data[key][j]+'</td>';
                }
                tr.innerHTML = str;
                table.appendChild(tr);
            }
        },

        // 创建表格
        setTable : function () {
            var table = document.createElement('table');
            table.classList.add('table');
            return table;
        },
        // 监听点击事件
        watchClick : function (table) {
            var that = this;
            var type,clickCount;
            table.addEventListener('click',function (event) {
                var event = event || window.event;
                var targetDom = event.target;
                // 判断点击的是否是标题
                if(targetDom.tagName == 'TH' && targetDom.innerHTML != that.dataType[0]){
                    // 点击的类名
                    type = targetDom.innerHTML;
                    targetDom.dataset.click = parseInt(targetDom.dataset.click) + 1;
                    clickCount = parseInt(targetDom.dataset.click);
                    if(clickCount % 2 == 1){
                        // 判断点击的次数是奇数还是偶数，奇偶数排序方式不一样
                        that.sortData(table,type,true);
                    }else {
                        that.sortData(table,type,false);
                    }
                }
            })
        },
        // 排序
        sortData : function (table,type,how) {
            var num;
            var keyArr = [];
            for(var i=0, len=this.dataType.length; i<len; i++){
                if(this.dataType[i] == type)
                    num = i;
            }
            // 取出data中的key 和要排序的数字 组成的数组 然后将数组加入keyArr
            for(var key in data){
                var arr = [];
                arr.push(key);
                arr.push(data[key][num-1]);
                keyArr.push(arr);
            }

            // 排序keyArr
            keyArr.sort(function (a,b) {
                if(how){
                    return a[1] - b[1];
                }else {
                    return b[1] - a[1];
                }

            });
            // 根据排序的keyArr 重新生成表格内容栏
            for(var j=0, lenj=keyArr.length; j<lenj; j++){
                var tr = document.createElement('tr');
                var str = '';
                str +=      '<td>'+keyArr[j][0]+'</td>';
                for(var x=0, lenx = this.data[key].length; x<lenx; x++){
                    str +=      '<td>'+data[keyArr[j][0]][x]+'</td>';
                }
                tr.innerHTML = str;
                table.appendChild(tr);
                table.removeChild(table.children[1]);
            }

        },

        // 在DOM中生成表格
        bind : function () {
            var table = this.setTable();
            this.addTh(table,this.dataType);
            this.addTd(table,this.data);
            this.dom.appendChild(table);
            this.watchClick(table);
        }

    };


    function randomNum() {
        var arr = [];
        var sum = 0;
        for(var i=0; i<3; i++){
            arr[i] = Math.floor(Math.random()*101);
            sum += arr[i];
        }
        arr.push(sum);
        return arr;
    }
    var dataType = ['姓名','语文','数学','英语','总分'];
    var data = {
        "小红" : randomNum(),
        "小黄" : randomNum(),
        "小蓝" : randomNum(),
        "小绿" : randomNum(),
        "小青" : randomNum(),
        "小橙" : randomNum(),
        "小紫" : randomNum(),
        "小白" : randomNum()
    };


    var box = document.querySelector('.box');

    var table = new Table(data,dataType,box);
    table.bind();
    var table1 = new Table(data,dataType,box);
    table1.bind();


})();