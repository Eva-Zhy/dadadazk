cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel:cc.Label,
    },

    init(gameCtl,score){
        this.gameCtl = gameCtl;
        this.scoreLabel.string = score;
    },

    updateScore(score){
        this.scoreLabel.string = score;
    }
});
