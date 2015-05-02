var theGame = function(game) {
  this.val = 0;
  this.bulletTime = 0;
  this.score = 0;
}

theGame.prototype = {
  create: function() {
    this.view_ring = new Phaser.Circle(this.game.world.centerX, this.game.world.centerY, this.game.stage.height);
    this.floaters = this.game.add.tileSprite(0,0,800,600, 'floaters');

    // TODO: make scopefg persist between title and game states
    this.scopefg = this.game.add.sprite(0,0, 'scopefg');

    // Audio
    this.swoosh = this.game.add.audio('swoosh');
    this.squish = this.game.add.audio('squish');
    this.pop = this.game.add.audio('pop');
    this.pop2 = this.game.add.audio('pop2');

    this.injector = this.game.add.sprite(0,0, 'injector');
    this.injector.anchor.setTo(0.0, 0.7);
    //this.injector.enableBody = true;
    //this.game.physics.enable(this.injector, Phaser.Physics.ARCADE);

    this.vir_emitter = this.game.add.emitter();
    this.vir_emitter.gravity = 2 - Math.random() * 3;

    this.virii = this.game.add.group();
    this.virii.setAll('enableBody', true);
    this.virii.setAll('physicsBodyType', Phaser.Physics.ARCADE);
    this.virii.createMultiple(30, 'virus');
    this.virii.setAll('outOfBoundsKill', true);
    this.virii.setAll('checkWorldBounds', true);
    this.virii.setAll('life', true);
    this.virii.setAll('name', 'virus');
    this.virii.callAll('animations.add', 'animations', 'inject', [1,2,3,4,5], 10, false);

    this.bacterias = this.game.add.group();
    this.bacterias.createMultiple(2, 'bacteria');
    this.bacterias.setAll('outOfBoundsKill', true);
    this.bacterias.setAll('checkWorldBounds', true);
    this.bacterias.setAll('life', true);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.scoretext = this.game.add.text(370,40, "0", {
      font: "24px Arial",
      fill: "#111",
      align: "center"
    });

  },

  fireVirus: function() {
    if (this.game.time.now > this.bulletTime) {
      var virus = this.virii.getFirstExists(false);
      if (virus) {
        this.givePoints(-1);
        this.pop.play();
        virus.reset(this.injector.x - 10, this.injector.y);
        virus.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(virus, Phaser.Physics.ARCADE);

        virus.body.velocity.setTo(
          this.game.world.centerX - this.injector.x,
          this.game.world.centerY - this.injector.y
        );

        virus.body.bounce.set(0.9);
        virus.rotation = this.injector.rotation - 3;
        virus.body.mass = 0.1;
        virus.lifespan = 3000;
        this.bulletTime = this.game.time.now + 300;
      }
      // bring stuff to top
      this.scopefg.bringToTop();
    }
  },

  givePoints: function(amount) {
    this.score += amount; //TODO: attach score variable to game? global?
    this.scoretext.setText(this.score);
  },

  update: function() {

    if(this.virii.length > 250) {
      this.swoosh.play();
      this.virii.removeAll();
      this.virii.createMultiple(30, 'virus');
      this.givePoints(250);
    }

    // Floating out of focus debris movement
    this.floaters.tilePosition.x -= 0.25;
    this.floaters.tilePosition.y += 0.15;

    // injector swing right
    if(this.cursors.right.isDown) {
      this.val += 0.05; 
    }

    // injector swing left
    if(this.cursors.left.isDown) {
      this.val -= 0.05; 
    }

    // Shoot a viruses out
    if(this.fireButton.isDown) {
      this.fireVirus();
    }

    var point = Phaser.Circle.circumferencePoint(this.view_ring, this.val);
    this.injector.x = point.x;
    this.injector.y = point.y;
    this.injector.rotation = this.game.physics.arcade.angleBetween(this.injector, this.view_ring) + 1.5;

    // Collision detection
    this.game.physics.arcade.overlap(this.virii, this.bacterias, this.virusContact, null, this);

    // Spawn more bacteria if there's less than 2
    if (this.bacterias.total < 2) {
      if (this.bacterias.length <= 0) {
        this.bacterias.createMultiple(2, 'bacteria');
      }
      newbact = this.bacterias.getFirstExists(false);
      if (newbact) {
        newbact.alpha = 0;
        var tween = this.game.add.tween(newbact).to({ alpha: 1 }, 100, "Linear", true);
        this.game.physics.enable(newbact, Phaser.Physics.ARCADE);
        newbact.scale.set(.25, .25);
        newbact.body.width = newbact.width; 
        newbact.body.height = newbact.height;
        newbact.enableBody = true;
        newbact.body.collideWorldBounds = true;
        newbact.reset(240 + Math.random() * 220, 50 + Math.random() * 350);
        newbact.anchor.setTo(0.5, 0.5);
        newbact.body.velocity.setTo(-5 + Math.random() * 15, -5 + Math.random() * 15);
        //var rot = 3 - Math.random() * 6;
        //newbact.rotation = rot; // no rotation w/arcade physics
        newbact.body.mass = 2;
        newbact.health = 100;
        bulletTime = this.game.time.now + 300;
      }
      // bring stuff to top
      this.scopefg.bringToTop();
    }
  },

  render: function() {
    //this.game.debug.spriteInfo(this.injector, 20, 100);
    //this.game.debug.spriteInfo(newbact, 20, 100);
    //this.game.debug.body(this.bacterias);
    //this.game.debug.body(newbact);
  },

  virusCollect: function(i, v) {
    this.game.virus_count = 0; //TODO: maybe actually collect viruses?
    this.game.virus_count++;
    console.log(this.game.virus_count);
    v.destroy();
  },

  virusContact: function(v, b) {
    if (b.name === 'virus') {
      var temp = v;
      v = b;
      b = temp;
    }
    v.alpha = 1;

    if(v.alive === true) {
      this.squish.play();
      this.givePoints(1);
      b.health -= 20;
      //this.game.add.tween(b).to({ height: b.height * 1.13, width: b.width * 1.13}, 500, "Linear", true);
      b.scale.set(b.scale.x += 0.07, b.scale.y += 0.07);
      b.body.rotation = b.rotation;
      if(v.body.velocity.y > 0) {
        v.body.angularVelocity = 0;
        v.rotation = 0;
      } else {
        v.body.angularVelocity = 0;
        v.rotation = Math.PI;
      }
    }

    v.alive = false;

    v.body.velocity.setTo(b.body.velocity.x, b.body.velocity.y);
    v.animations.play('inject');

    if(b.health <= 0) {
      // dead bacteria
      this.pop2.play();
      this.vir_emitter.x = b.x;
      this.vir_emitter.y = b.y;
      this.vir_emitter.makeParticles('virus', 0, 20, true, false);
      this.vir_emitter.setAlpha(1, 0.2, 3000);
      this.vir_emitter.start(true, 5000, null, 20);
      this.vir_emitter.callAll('animations.add', 'animations', 'inject', [1,2,3,4,5], 10, false);
      this.virii.addMultiple(this.vir_emitter.children);
      b.destroy();
      this.givePoints(10);
    }
  }
}
