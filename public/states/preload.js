var preload = function(game) {}

preload.prototype = {
  preload: function() {
    var loadingBar = this.add.sprite(160,240,"loading");
    //loadingBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(loadingBar);

    // Audio
    this.game.load.audio('ambient', ['sound/LD32.mp3', 'sound/LD32.ogg']);
    this.game.load.audio('pop', ['sound/pop.mp3', 'sound/pop.ogg']);
    this.game.load.audio('pop2', ['sound/pop2.mp3', 'sound/pop2.ogg']);
    this.game.load.audio('swoosh', ['sound/swoosh.mp3', 'sound/swoosh.ogg']);
    this.game.load.audio('squish', ['sound/squish.mp3', 'sound/squish.ogg']);

    // Images
    this.game.load.spritesheet('virusR', 'img/virus-sheet-r.png', 20, 20);
    this.game.load.spritesheet('virusY', 'img/virus-sheet-y.png', 20, 20);
    this.game.load.spritesheet('virusB', 'img/virus-sheet-b.png', 20, 20);

    this.game.load.image('title', 'img/title.png');
    this.game.load.image('instructions', 'img/instructions.png');
    this.game.load.image('startbutton', 'img/startbutton.png');
    this.game.load.image('floaters', 'img/floaters.png');
    this.game.load.image('bacteria', 'img/bacteria.png');
    this.game.load.image('injector', 'img/injector.png');
    this.game.load.image('scopefg', 'img/scopefg.png');
    this.game.load.image('slider', 'img/slider.png');
  },
  create: function() {
    this.game.state.start("Title");
  }
}
