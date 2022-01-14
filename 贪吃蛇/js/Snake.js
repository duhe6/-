function Snake() {
    // 蛇的初始化身体
    this.body = [
        { 'row': 3, 'col': 5 },
        { 'row': 3, 'col': 4 },
        { 'row': 3, 'col': 3 },
        { 'row': 3, 'col': 2 }
    ];
    this.direction = 'R'; //信号量，设置运动方向
    this.willDirection = 'R'; //即将改变的方向，目的就是为了方向出现原地调头的情况
}
Snake.prototype.render = function() {
        // 蛇头的渲染
        game.setColorHead(this.body[0].row, this.body[0].col,'blue');
        // 蛇身的渲染
        for (var i = 1; i < this.body.length; i++) {
            game.setColor(this.body[i].row, this.body[i].col, '#649c49')
        }
    }
    // 蛇的运动
Snake.prototype.update = function() {
        this.direction = this.willDirection;
        switch (this.direction) {
            case 'R': //右
                this.body.unshift({ 'row': this.body[0].row, 'col': this.body[0].col + 1 });
                break;
            case 'D': //下
                this.body.unshift({ 'row': this.body[0].row + 1, 'col': this.body[0].col });
                break;
            case 'L': //左
                this.body.unshift({ 'row': this.body[0].row, 'col': this.body[0].col - 1 });
                break;
            case 'U': //上
                this.body.unshift({ 'row': this.body[0].row - 1, 'col': this.body[0].col });
                break;
        }
        // 死亡的判断,超出了表格边缘的部分
        if (this.body[0].col > game.col - 1 || this.body[0].col < 0 || this.body[0].row > game.row - 1 || this.body[0].row < 0) {
            alert('撞到墙了哦，一共吃掉了' + game.score + '颗草莓');
            this.body.shift();
            // 删除时因为当前的头增时不合法的，因此游戏已经结束了
            clearInterval(game.timer);
            location.reload();
        }
        // 自己撞到自己的时候会判定死亡
        for (var i = 1; i < this.body.length; i++) {
            // 如果当前蛇的头部和身体的某一个部位的 row 和 col 完全重合的时候
            if (this.body[0].row == this.body[i].row && this.body[0].col == this.body[i].col) {
                alert('撞到自己了,吃掉了' + game.score + '颗草莓');
                this.body.shift();
                clearInterval(game.timer);
                location.reload();
            }
        }
        // 蛇吃食物
        // 判断如果当前的蛇的头部没有和食物进行重合，就代表此时没有吃到食物，此时就进行尾部删除，如果重合了就代表迟到了，此时我们不进行删除尾部
        // 判断蛇身体的长度=食物的长度
        if (this.body[0].row == game.food.row && this.body[0].col == game.food.col) {
            // 此时情况是只有头部增加了，尾部没有删除
            game.food = new Food(game); //创建新的食物
            game.score++;
            game.f = 0;
        } else {
            this.body.pop(); //删除数组最后一个元素
        }
    }
    // 蛇的方向改变，防止的是在一次渲染之前会出现调头的情况
Snake.prototype.changeDirection = function(d) {
    this.willDirection = d;
}