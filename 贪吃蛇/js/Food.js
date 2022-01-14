function Food(gameSnake) {
    var self = this;
    // 下面的 do-while 循环语句作用是先创建一个 row 和 col 然后判断这个 row 和 col 是否在蛇的身上
    //do...while来创建食物
    do {
        // 食物的位置
        this.row = parseInt(Math.random() * gameSnake.row)
        this.col = parseInt(Math.random() * gameSnake.col)
    } while ((function() {
            // 遍历蛇的 row col 然后和 food 新随机出来的 row col 进行判断，是否重合
            for (var i = 0; i < gameSnake.snake.body.length; i++) {
                if (self.row == gameSnake.snake.body[i].row && self.col == gameSnake.snake.body[i].col) {
                    return true;
                }
            }
            return false;
        })());
}
Food.prototype.render = function() {
    game.setHTML(this.row, this.col);
}