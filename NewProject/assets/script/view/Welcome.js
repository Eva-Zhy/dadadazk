cc.Class({
    extends: cc.Component,

    properties: {
        startBtn:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene("game");
        this.startBtn.on("touchstart",function(){
            cc.director.loadScene("game");
       });
    },

    start () {

    },

    // update (dt) {},
});
