cc.Class({
    extends: cc.Component,

    properties: {
        resultLabel: cc.Label,
        scoreLabel: cc.Label,
        btn_start:cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },
    init(gameCtl) {
        this.gameCtl = gameCtl;
        this.node.active = false;
    },

    show(score, isWin, gameOver) {
        this.node.active = true;
        if (!gameOver) {
            if (isWin) {
                this.resultLabel.string = '下一关!';
                console.log();
            } else {
                this.resultLabel.string = '失败了!';
                this.gameCtl.gameModel.now_gc_num = 0;
                this.gameCtl.gameModel.score = 0;
            }
        } else {
            if (isWin) {
                this.resultLabel.string = '通关了!';
                this.gameCtl.overPanel.btn_start.node.active = false;
            } else {
                this.resultLabel.string = '失败了!';
                console.log(this.gameCtl);
                this.gameCtl.gameModel.now_gc_num = 0;
                this.gameCtl.gameModel.score = 0;
            }
        }

        this.scoreLabel.string = score + '';
    },

    onBtnRestart() {
        this.gameCtl.startGame();
    },

    start() {

    },

    // update (dt) {},
});
