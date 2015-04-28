var preload = function(game) {}

preload.prototype = {
  preload: function() {
    var loadingBar = this.add.sprite(160,240,"loading");
    //loadingBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(loadingBar);

    // Audio
    this.game.load.audio('ambient', ['LD32.mp3', 'LD32.ogg']);
    this.game.load.audio('pop', ['pop.mp3', 'pop.ogg']);
    this.game.load.audio('pop2', ['pop2.mp3', 'pop2.ogg']);
    this.game.load.audio('swoosh', ['swoosh.mp3', 'swoosh.ogg']);
    this.game.load.audio('squish', ['squish.mp3', 'squish.ogg']);

    // Images
    this.game.load.spritesheet('virus', 'virus-sheet.png', 20, 20);
    this.game.load.image('title', 'title.png');
    this.game.load.image('instructions', 'instructions.png');
    this.game.load.image('startbutton', 'startbutton.png');
    this.game.load.image('floaters', 'floaters.png');
    this.game.load.image('bacteria', 'bacteria.png');
    this.game.load.image('injector', 'injector.png');
    this.game.load.image('scopefg', 'scopefg.png');
  },
  create: function() {
    this.game.state.start("Title");
  }
}
