/**************************************************/
/*update log								

1.0.0: リリース	
1.0.1: tweet関数の条件指定バグ修正
1.0.2: 同上
1.0.3: アスペの出現タイミングにランダム要素を追加
1.1.0: 時間帯によってバックグラウンドを変化

*/

enchant();

window.onload = function() {

	//---------- variables ----------//
	var FPS = 20;

	var WIDTH = 640;
	var HEIGHT = 480;

	var SCROLLSPEED = 30;
	var HORIZON = 330;

	var VERSION = "1.1.0";

	var SCOREPOINT = 0;
	var TIME = 0;

	var DATE = new Date();
	var HOUR = DATE.getHours();

	var testvariable = 0;
	var game = new Game(WIDTH, HEIGHT);

	//---------- properties ----------//
	game.fps = FPS;
	game.keybind(32, 'a');
	game.preload('./assets/images/cli_matcho.png');
	game.preload('./assets/images/breathframe.png');
	game.preload('./assets/images/enemyiru.png');
	game.preload('./assets/images/enemyryusk.png');
	game.preload('./assets/images/enemysy4in.png');

	game.preload('./assets/images/town.png');
	game.preload('./assets/images/townbg.png');
	game.preload('./assets/images/town2.png');
	game.preload('./assets/images/town2bg.png');
	game.preload('./assets/images/title.png');
	
	game.preload('./assets/sounds/rayfami.mp3');
	game.preload('./assets/sounds/jump.mp3');

	//---------- centering ----------//
	var scl = Math.min(window.innerWidth / game.width, window.innerHeight / game.height);
	game.scale = scl / 1.3;
	var left = (window.innerWidth - (game.width * game.scale)) / 2;
	var top = (window.innerHeight - (game.height * game.scale)) / 2;
	
	$('#enchant-stage').css({
		"position": "absolute",
		"left": left + "px",
		"top": (top + 100) + "px",
	});

	game.onload = function() {
	
		/**************************************************/
		// start main process
		var bgm = game.assets['./assets/sounds/rayfami.mp3'];
		var jumpse = game.assets['./assets/sounds/jump.mp3'];

		var jumpTheme = {
			normal: {
				color: '#FFF',
				background: {
					type: 'linear-gradient',
					start: '#988aff',
					end: '#988aff '
				},
				border: {
					color: '#66d0ff',
					width: 1,
					type: 'solid'
				},
				textShadow: {
					offsetX: 0.5,
					offsetY: 0.5,
					blur: '3px',
					color: '#F00'
				},
				boxShadow: {
					offsetX: 2,
					offsetY: 2,
					blur: '5px',
					color: 'rgba(0, 0, 0, 0.3)'
				}
			},
			active: {
				color: 'rgb(255, 255, 169)',
				background: {
					type: 'linear-gradient',
					start: '#FFF',
					end: '#FFF'
				},
				border: {
					color: '#ff66b8',
					width: 1,
					type: 'solid'
				},
				textShadow: {
					offsetX: 0.5,
					offsetY: 0.5,
					blur: '3px',
					color: '#F00'
				},
				boxShadow: {
					offsetX: 2,
					offsetY: 2,
					blur: '5px',
					color: 'rgba(0, 0, 0, 0.3)'
				}
			}
		}

		var tweet = function() {
			//alert
			tweetyn = confirm("スコアをツイートしますか？");
			if (tweetyn == true) {
				var s; //message
				var EUC = encodeURIComponent;
				var twitter_url = "http://twitter.com/?status=";

				var Rank = "クリ";
				var Comment = "今年もよろしくお願いします";

				if (SCOREPOINT < 500) {
					Rank = "凶オン";
					Comment = "イキり過ぎには注意！";
				}
				if (SCOREPOINT > 1000) {
					Rank = "クリ";
					Comment = "今年もよろしくお願いします";
				}
				if (SCOREPOINT > 1500) {
					Rank = "末クリ";
					Comment = "あけましておめでとうございます";
				}
				if (SCOREPOINT > 2500) {
					Rank = "中クリ";
					Comment = "ほどよくイキろう！";
				}
				if (SCOREPOINT > 2000) {
					Rank = "小クリ";
					Comment = "今年もよろしくお願いします";
				}
				if (SCOREPOINT > 3000) {
					Rank = "大クリ";
					Comment = "今年も楽しくイキれそう！";
				}
				if (SCOREPOINT > 5000) {
					Rank = "超特大クリ";
					Comment = "今年もジャンジャンイキろう！";
				}

				var array = [
					'モォ～娘',
					'Mojito',
					'エロ同人誌',
					'イクちゃん',
					'Sylenth1',
					'授乳手コキCG',
					'iru1919',
					'クリオンのクリ',
					'チンポ',
					'おっぱいマウスパッド',
					'Clion - Ray',
					'貧乳',
					'バトルガールハイスクール',
					'シャインレコーズ',
					'S4R10 - Rapid & Loud',
					'う-21b',
					'今年もよろしくお願いします',
					'5%の確率で性器を露出するクリオン',
					'5000兆円',
					'オナホ'
				];

				//message
				s = "Score: " + SCOREPOINT + "\n2017年の運勢は" + Rank + " " + Comment + " \nラッキーアイテムは\"" + array[Math.floor(Math.random() * array.length)] + "\"\n\nクリみくじ sometrouble.net/omikuji/\n#Cli_Omikuji";

				if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
					location.href = 'https://twitter.com/intent/tweet?text=' + EUC(s);
				} else {
					window.open(twitter_url + EUC(s), "_blank", "top=50,left=50,width=500,height=500,scrollbars=1,location=0,menubar=0,toolbar=0,status=1,directories=0,resizable=1");
				}
			}
		}

		var createTitleScene = function() {
			var scene = new Scene();

			var titlebg = new Sprite(WIDTH, HEIGHT);
			titlebg.image = game.assets['./assets/images/title.png'];
			titlebg.x = 0;
			titlebg.y = 0;
			scene.addChild(titlebg);

			var versionlabel = new Label("ver." + VERSION)
			versionlabel.x = 550;
			versionlabel.y = 450;
			versionlabel.font = "normal normal 15px/1.0 monospace";
			scene.addChild(versionlabel);

			var startmsg = new Label("touch to start")
			startmsg.x = WIDTH / 2 - 50;
			startmsg.y = 400;
			startmsg.font = "normal normal 15px/1.0 monospace";
			scene.addChild(startmsg);

			scene.backgroundColor = 'rgba(255, 230, 0, 1)';

			scene.addEventListener(Event.TOUCH_START, function(e) {
				game.replaceScene(createGameScene());

				bgm.play();
				bgm.src.loop = true;

			});

			return scene;
		};

		/**************************************************/
		// start functions

		/*
		function replay(game){
			game.replaceScene(createGameScene());
		}
		
		function popenemy(){
			//if(game.frame % 20 == 0){
				//var x = Math.random()*(320-32);
				var enemy = new Enemyclass(WIDTH-60,HORIZON);
				enemy.key = game.frame;
				enemies[game.frame] = enemy;
			//}
			
			
		}
		
		
		var Enemyclass = enchant.Class.create(enchant.Sprite, {
			initialize: function(x,y){
				
				Sprite.call(this, 32, 32);
				this.image = game.assets['../assets/images/breathframe.png'];
				this.x = x;
				this.y = y;
				
				this.addEventListener('enterframe', function(){
					
					this.x -= 30;


					testvariable++;

					if(this.x > 0){
						this.remove();
					}
					
					//if(player.within(this, 16)){}
				});
				
				game.rootScene.addChild(this);
			},
			
			remove: function(){
				game.rootScene.removeChild(this);
				delete enemies[this.key]; delete this;
			}
			
		});
		
		*/

		// end functions
		/**************************************************/

		var createGameScene = function() {

			var scene = new Scene();

			var rand1 = Math.floor(Math.random() * 11);
			var rand2 = Math.floor(Math.random() * 11);
			var rand3 = Math.floor(Math.random() * 11);

			//---------- background ----------//
			var bg = new Sprite(WIDTH, HEIGHT - 110);

			if (HOUR >= 12) {
				bg.image = game.assets['./assets/images/townbg.png'];
			} else {
				bg.image = game.assets['./assets/images/town2bg.png'];
			}

			bg.x = 0;
			bg.y = 0;
			scene.addChild(bg);

			var bg1 = new Sprite(WIDTH + 20, HEIGHT - 110);

			if (HOUR >= 12) {
				bg1.image = game.assets['./assets/images/town.png'];
			} else {
				bg1.image = game.assets['./assets/images/town2.png'];
			}

			bg1.x = 0;
			bg1.y = 0;
			scene.addChild(bg1);

			var bg2 = new Sprite(WIDTH + 20, HEIGHT - 110);

			if (HOUR >= 12) {
				bg2.image = game.assets['./assets/images/town.png'];
			} else {
				bg2.image = game.assets['./assets/images/town2.png'];
			}

			bg2.x = WIDTH;
			bg2.y = 0;
			scene.addChild(bg2);

			//---------- foreground ----------//
			var score = new Label(0);
			score.color = "#000000";
			score.x = 10;
			score.y = 5;
			score.font = "normal normal 15px/1.0 monospace";
			scene.addChild(score);

			var player = new Sprite(32, 32);
			player.image = game.assets['./assets/images/breathframe.png'];
			player.x = 80;
			player.y = HORIZON;
			scene.addChild(player);

			//---------- enemy ----------//
			var ryusk = new Sprite(32, 32);
			ryusk.image = game.assets['./assets/images/enemyryusk.png'];
			ryusk.x = -ryusk.width;
			ryusk.y = HORIZON - 32;
			scene.addChild(ryusk);

			var iru = new Sprite(32, 32);
			iru.image = game.assets['./assets/images/enemyiru.png'];
			iru.x = -iru.width;
			iru.y = HORIZON;
			scene.addChild(iru);

			var sy4in = new Sprite(64, 32);
			sy4in.image = game.assets['./assets/images/enemysy4in.png'];
			sy4in.x = -sy4in.width;
			sy4in.y = HORIZON - 32;
			scene.addChild(sy4in);


			//---------- ui ----------//
			var button = new Button("Jump!", jumpTheme, 50, 300);
			button.moveTo(WIDTH / 2 - 150, 400);
			scene.addChild(button);
			button.ontouchstart = function() {

				if (player.y == HORIZON) {
					player.frame = 0;
					player.tl.moveBy(0, -60, 6, enchant.Easing.CUBIC_EASEOUT)
						.moveBy(0, 60, 6, enchant.Easing.CUBIC_EASEIN);

					jumpse.play();
				}

			}

			var escbutton = new Button("Restart", jumpTheme, 50, 100);
			escbutton.moveTo(10, 400);
			scene.addChild(escbutton);
			escbutton.ontouchstart = function() {

				location.reload();


			}

			/*
			var testlabel = new Label(0);
			testlabel.x = 300;
			testlabel.y = 5;
			scene.addChild(testlabel);
			*/

			//---------- main event ----------//
			scene.addEventListener(Event.ENTER_FRAME, function() {

				//---------- initialize ----------//
				SCOREPOINT = game.frame * 2;

				score.text = "score: " + SCOREPOINT;
				TIME++;
				enemies = [];

				player.frame++;
				if (player.frane >= 2) {
					player.frame = 0;
				}

				bg1.x -= SCROLLSPEED;
				bg2.x -= SCROLLSPEED;

				if (bg1.x <= -WIDTH) {
					bg1.x = WIDTH;
				}

				if (bg2.x <= -WIDTH) {
					bg2.x = WIDTH;
				}

				//---------- game ----------//
				if (game.frame > 50) {

					if (game.frame % (30 + rand1) == 0) {
						iru.x = WIDTH;
					}
					if (game.frame % (40 + rand2) == 0) {
						ryusk.x = WIDTH;
					}
					if (SCOREPOINT > 2000 && game.frame % (182 + rand3) == 0) {
						sy4in.x = WIDTH;
					}
				}

				if (iru.x > -iru.width) {
					iru.x -= SCROLLSPEED;
				}
				if (ryusk.x > -ryusk.width) {
					ryusk.x -= SCROLLSPEED;
				}
				if (sy4in.x > -sy4in.width) {
					sy4in.x -= SCROLLSPEED * 1.2;
				}

				/*
				if (game.frame > (FPS*4) && SCOREPOINT < 10000){
					
					popenemy();
					
				}
				*/

				if (player.within(ryusk, 28) || player.within(iru, 30) || player.within(sy4in, 30)) {
					game.pushScene(createGameoverScene());
				}


				//---------- randomize ----------//

				if (game.frame % 200 == 0 && iru.x < -iru.width) {
					rand1 = Math.floor(Math.random() * 11);
				}

				if (game.frame % 200 == 0 && ryusk.x < -ryusk.width) {
					rand2 = Math.floor(Math.random() * 11);
				}

				rand3 = Math.floor(Math.random() * 11);



				//testlabel.text = testvariable;

			});

			scene.addEventListener(Event.TOUCH_END, function(e) {

				//game.pushScene(createGameoverScene());

			});

			return scene;
		}



		var createGameoverScene = function() {
			var scene = new Scene();
			/*
			var label = new Label("gameoverscene");
			label.x = 0; label.y = 20;

			scene.addChild(label);
			*/
			scene.backgroundColor = 'rgba(0, 0, 255, 0.5)';
			scene.addEventListener(Event.ENTER_FRAME, function(e) {

				var retrybutton = new Button("Retry", jumpTheme, 50, 300);
				retrybutton.moveTo(WIDTH / 2 - 150, HEIGHT / 1.5);
				scene.addChild(retrybutton);

				retrybutton.ontouchstart = function() {
					location.reload();
				}

				var Tweetbutton = new Button("Tweet", jumpTheme, 50, 300);
				Tweetbutton.moveTo(WIDTH / 2 - 150, HEIGHT / 3);
				scene.addChild(Tweetbutton);

				Tweetbutton.ontouchstart = function() {
					tweet();
				}

				//game.popScene();
			});

			return scene;
		};

		game.replaceScene(createTitleScene());

		// end main process
		/**************************************************/

	};
	game.start();
};