var boot = function(game){
  console.log("%cStarting Phage Therapy", "color:white; background:red");
};
  
boot.prototype = {
  init: function () {
    if (this.game.device.desktop) {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.scale.setMinMax(480, 260, 1024, 768);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    } else {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.scale.setMinMax(480, 260, 1024, 768);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(true, false);
        this.scale.setResizeCallback(this.gameResized, this);
        this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
        this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
    }
  },
  preload: function(){
    this.load.image("loading","img/loading.png"); 
  },
  create: function(){
    this.stage.backgroundColor = "#000";
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.setScreenSize();
    this.state.start("Preload");
  }
}
