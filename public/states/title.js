var title = function(game){}

title.prototype = {
  create: function(){
    this.game.stage.backgroundColor = "#FFF";
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.scopefg = this.game.add.sprite(0,0, 'scopefg');

    this.swoosh = this.game.add.audio('swoosh');
    var music = this.game.add.audio('ambient', 1, true);
    music.play();

    this.title = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'title');
    this.title.anchor.setTo(0.5, 1);

    instructions = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'instructions');
    instructions.alpha = 0;
    instructions.anchor.setTo(0.5, 1);

    this.startbutton = this.game.add.button(
      this.game.world.centerX - 10, this.game.world.centerY + 180,
      'startbutton',
      this.startClick, this
    );

    this.startbutton.input.useHandCursor = true;
    this.startbutton.alpha = 0.6;
    this.startbutton.anchor.setTo(0.5, 1);
    this.startbutton.onInputOver.add(this.startOver, this);
    this.startbutton.onInputOut.add(this.startOut, this);
  },

  startOut: function() {
    this.game.add.tween(this.startbutton).to({ alpha: 0.60 }, 100, "Linear", true);
    this.game.add.tween(this.title).to({ alpha: 1 }, 100, "Linear", true);
    this.game.add.tween(instructions).to({ alpha: 0 }, 100, "Linear", true);
  },

  startOver: function() {
    this.game.add.tween(this.startbutton).to({ alpha: 1 }, 100, "Linear", true);
    this.game.add.tween(this.title).to({ alpha: 0 }, 100, "Linear", true);
    this.game.add.tween(instructions).to({ alpha: 1 }, 100, "Linear", true);
  },

  startClick: function() {
    this.swoosh.play();
    this.game.add.tween(this.startbutton).to({ alpha: 0 }, 500, "Linear", true);
    this.game.add.tween(this.title).to({ alpha: 0 }, 500, "Linear", true);
    var tween = this.game.add.tween(instructions).to({ alpha: 0 }, 500, "Linear", true);
    tween.onComplete.add(function(that) {
      started = true;
      instructions.destroy();
      this.game.state.start("theGame");
    }, this);
    this.startbutton.destroy();
  }
}
