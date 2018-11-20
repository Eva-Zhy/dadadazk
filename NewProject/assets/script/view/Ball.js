cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    init(gameCtl) {
        this.gameCtl = gameCtl;
        this.node.position = cc.v2(360,150);//初始化位置
        let v_x = Math.floor(Math.random() * (800 - 600+1)) + 600;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(v_x, 800);//初始化速度
    },
    
    onBeginContact(contact, self, other) {
        switch (other.tag) {
            case 1://球碰到砖块
                this.gameCtl.onBallContactBrick(self.node, other.node);
                break;
            case 2://球碰到地面
                this.gameCtl.onBallContactGround(self.node, other.node);
                break;
            case 3://球碰到托盘
                this.gameCtl.onBallContactPaddle(self.node, other.node);
                break;
            case 4://球碰到墙
                this.gameCtl.onBallContactWall(self.node, other.node);
                break;
        }
    },
});