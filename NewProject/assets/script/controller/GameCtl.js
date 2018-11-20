const GameModel = require('GameModel');
cc.Class({
    extends: cc.Component,

    properties: {
        gameView: require('GameView'),
        ball: require('Ball'),
        paddle: require('Paddle'),
        brickLayout: require('BrickLayout'),
        roadBlockLayout: require('RoadBlock'),
        overPanel: require('OverPanel'),
        roadblock: {
            default: [],
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        //安卓返回键退出
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            if (event.keyCode === cc.KEY.back) {
                cc.director.end();
            }
        });
        this.physicsManager = cc.director.getPhysicsManager();
        this.gameModel = new GameModel();
        // this.RoadBlock = new roadBlockLayout();
        this.startGame();

    },

    //this.physicsManager.debugDrawFlags =0;
    // cc.PhysicsManager.DrawBits.e_aabbBit |
    // cc.PhysicsManager.DrawBits.e_pairBit |
    // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
    // cc.PhysicsManager.DrawBits.e_jointBit |
    // cc.PhysicsManager.DrawBits.e_shapeBit
    // ; 

    init() {
        this.physicsManager.enabled = true;
        this.gameModel.init();
        this.gameView.init(this, this.gameModel.score);
        this.ball.init(this);
        this.paddle.init();
        this.overPanel.init(this);
        this.gameModel.gameConfig = [
            {
                block_arr: [
                    
                ],
                gc_num: 0,
                gc_score: 1,
                brick_index: 0
            },
            {
                block_arr: [
                    {
                        x: 140,
                        y: 550,
                        block_index: 0
                    }
                ],
                gc_num: 1,
                gc_score: 1,
                brick_index: 0
            },
            {
                block_arr: [
                    {
                        x: 140,
                        y: 500,
                        block_index: 0
                    },
                    {
                        x: 540,
                        y: 600,
                        block_index: 1
                    }
                ],
                gc_num: 2,
                gc_score: 2,
                brick_index: 1
            },
            {
                block_arr: [
                    {
                        x: 200,
                        y: 500,
                        block_index: 1
                    },
                    {
                        x: 540,
                        y: 450,
                        block_index: 1
                    }
                ],
                gc_num: 3,
                gc_score: 2,
                brick_index: 1
            },
            {
                block_arr: [
                    {
                        x: 200,
                        y: 500,
                        block_index: 1
                    },
                    {
                        x: 540,
                        y: 450,
                        block_index: 1
                    }
                ],
                gc_num: 4,
                gc_score: 3,
                brick_index: 2
            },
            {
                block_arr: [
                    {
                        x: 120,
                        y: 500,
                        block_index: 2
                    },
                    {
                        x: 600,
                        y: 500,
                        block_index: 3
                    }
                ],
                gc_num: 5,
                gc_score: 3,
                brick_index: 2
            },
            {
                block_arr: [
                    {
                        x: 120,
                        y: 500,
                        block_index: 3
                    },
                    {
                        x: 600,
                        y: 500,
                        block_index: 2
                    }
                ],
                gc_num: 6,
                gc_score: 3,
                brick_index: 2
            }
        ]
        console.log(this.gameModel.now_gc_num);
        if (this.gameModel.gameConfig.length > this.gameModel.now_gc_num) {
            let brick_index = this.gameModel.gameConfig[this.gameModel.now_gc_num].brick_index;
            let block_arr = this.gameModel.gameConfig[this.gameModel.now_gc_num].block_arr;
            this.brickLayout.init(this.gameModel.bricksNumber, brick_index);
            this.roadBlockLayout.init(this, this.roadblock, block_arr);
            this.now_game_scrore = this.gameModel.gameConfig[this.gameModel.now_gc_num].gc_score;
        }
    },

    startGame() {
        this.init();
        // wx.login({
        //     success(res) {
        //         console.log(res);

        //     }
        // })
        // wx.getUserInfo({
        //     success: function (res) {
        //         console.log(res);
        //     }
        // })

        // wx.request({
        //     url: 'http://wthrcdn.etouch.cn/weather_mini?citykey=101010100',
        //     data: {
        //     },
        //     success(res) {
        //         console.log(res)
        //     }
        // })
    },

    pauseGame() {
        this.physicsManager.enabled = false;
    },

    resumeGame() {
        this.physicsManager.enabled = true;
    },

    stopGame() {
        this.physicsManager.enabled = false;
        this.gameModel.now_gc_num++;
        let gameOver = false;
        if (this.gameModel.gameConfig.length > this.gameModel.now_gc_num) {
            gameOver = false;
        } else {
            gameOver = true;
        }
        this.overPanel.show(this.gameModel.score, this.gameModel.bricksNumber === 0, gameOver);
    },

    onBallContactBrick(ballNode, brickNode) {
        brickNode.parent = null;
        this.gameModel.addScore(this.now_game_scrore);
        this.gameModel.minusBrick(1);
        this.gameView.updateScore(this.gameModel.score);
        if (this.gameModel.bricksNumber <= 0) {
            this.stopGame();
        }
    },

    onBallContactGround(ballNode, groundNode) {
        this.stopGame();
    },

    onBallContactPaddle(ballNode, paddleNode) {

    },

    onBallContactWall(ballNode, brickNode) {

    },

    onDestroy() {
        this.physicsManager.enabled = false;
    }

});