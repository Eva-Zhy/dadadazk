cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init(gameCtl, roadblock_pre_arr, block_arr) {
        // 生成一个预资源块 instantiate实例化一个预资源
        // roadblock_pre.contentSize(1000,100);
        console.log("node", this.node);
        this.node.removeAllChildren();
        for (let i = 0; i < block_arr.length; i++) {
            let block_index = block_arr[i].block_index;
            let x = block_arr[i].x;
            let y = block_arr[i].y;
            let roadblock = cc.instantiate(roadblock_pre_arr[block_index]);
            this.node.addChild(roadblock);
            roadblock.setPosition(x, y);
        }

        // 添加到一个node里
        // roadblock.setContentSize(300,24);

        // convertToNodeSpaceAR 获得的坐标相对于参照物的坐标（此时坐标系的原点在参照物的锚点）

    },

    start() {

    },

    // update (dt) {},
});
