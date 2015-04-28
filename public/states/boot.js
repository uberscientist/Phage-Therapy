var boot = function(game){
  console.log("%cStarting Phage Therapy", "color:white; background:red");
};
  
boot.prototype = {
  preload: function(){
    this.load.image("loading","loading.png"); 
  },
  create: function(){
    this.stage.backgroundColor = "#000";
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.setScreenSize();
    this.state.start("Preload");
  }
}
