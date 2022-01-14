function Game() {
    this.row = 25; // 行数
    this.col = 25; // 列数
    this.score = 0; //分数
    this.init(); //初始化节点
    this.snake = new Snake(); //实例化蛇类--绑定到Game()中 原型链来找
    this.food = new Food(this); //初始化食物
    // this.last = new Last();
    this.start(); //执行定时器任务
    this.bindEvent(); //键盘的事件监听
    this.d = 'R';
}
//创建对象Game 里面写上它的属性（特征）↑
 
Game.prototype.init = function() {
        this.dom = document.createElement('table');
        // 创建表格--父元素为document（页面中创建表格）
        var tr, td;
        // 遍历行和列
        for (var i = 0; i < this.row; i++) {
            tr = document.createElement('tr'); // 创建行
            for (var j = 0; j < this.col; j++) {
                td = document.createElement('td'); // 创建列
                tr.appendChild(td); // 把列追加到行
            }
            this.dom.appendChild(tr); // 把行追加到表格
        }
        document.querySelector('#app').appendChild(this.dom); //把表格追加到div里
    }
    // 遍历表格，清除表格上的颜色(画布上不停的渲染)
Game.prototype.clear = function() {
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.col; j++) {
                this.dom.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].style.background = '';
                this.dom.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].innerHTML = '';
            }
        }
    }
    // 设置颜色的方法 让表格的第几行，第几列设置什么颜色
Game.prototype.setColor = function(row, col, color) {
        this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].style.background = color;
    }
    // 设置蛇头
Game.prototype.setColorHead = function(row, col) {
        var img = document.createElement('img');
        img.src = './images/head.jpg';
        img.className = 'snake';
        this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].appendChild(img);
        // this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].style.backgroundColor='transparent'
        switch (this.d) {
            case 'R': //右
                break;
            case 'D': //下
                img.style.transform = 'rotate(90deg)';
                break;
            case 'L': //左
                img.style.transform = 'rotate(180deg)';
                break;
            case 'U': //上
                img.style.transform = 'rotate(-90deg)';
                break;
        }
    }
    // 渲染食物
Game.prototype.setHTML = function(row, col) {
        this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].style.backgroundImage = 'url(./images/food.jpg)';
    }
    // 设置键盘的事件监听
Game.prototype.bindEvent = function() {
    var self = this;
    document.addEventListener('keydown', function(e) {
        // 用ASCII码值判断键盘方向
        switch (e.keyCode) {
            case 37: //左
                if (self.snake.direction == 'R') return; // 先进行判断，如果当前的方向是向右移动，此时我们不能按左键
                self.snake.changeDirection('L');
                self.d = 'L';
                break;
            case 38: //上
                if (self.snake.direction == 'D') return; // 先进行判断，如果当前的方向是向下移动，此时我们不能按上键
                self.snake.changeDirection('U');
                self.d = 'U';
                break;
            case 39: //右
                if (self.snake.direction == 'L') return; // 先进行判断，如果当前的方向是向左移动，此时我们不能按右键
                self.snake.changeDirection('R');
                self.d = 'R';
                break;
            case 40: //下
                if (self.snake.direction == 'U') return; // 先进行判断，如果当前的方向是向上移动，此时我们不能按下键
                self.snake.changeDirection('D');
                self.d = 'D';
                break;
        }
    })
}
Game.prototype.start = function() {
    // 帧编号
    this.f = 0;
    // 定时器里面的核心就是游戏的渲染本质：清屏-更新-渲染
    this.timer = setInterval(function() {
        game.f++;
        // document.getElementById('f').innerHTML = '帧编号：' + game.f;
        // document.getElementById('score').innerHTML = '分数：' + game.score;
        // 清屏
        game.clear();
        // 蛇的运动（更新）
        // 蛇的更新速度，当蛇变长的时候，速度要加快
        var during = game.snake.body.length < 30 ? 30 - game.snake.body.length : 1;
        game.f % during == 0 && game.snake.update();
        // game.snake.update();
        // 渲染蛇
        game.snake.render();
        // 渲染食物
        game.food.render();
    }, 10)
}