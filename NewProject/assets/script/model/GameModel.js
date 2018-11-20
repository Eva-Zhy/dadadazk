cc.Class({
    extends: cc.Component,

    properties: {
        score: 0,
        bricksNumber: 0,
        now_gc_num: 0,
        gameConfig: {
            default: [],
            type: Array
        },
    },

    init() {
        // this.score = 0;
        this.bricksNumber = 50;
    },

    addScore(score) {
        this.score += score;
    },

    minusBrick(n) {
        this.bricksNumber -= n;
    },

});