"use strict";
exports.__esModule = true;
var PIXI = require("pixi.js");
var app;
var player;
var keys = {};
var keysDiv;
var speed = 5;
var direction;
(function (direction) {
    direction[direction["N"] = 0] = "N";
    direction[direction["S"] = 1] = "S";
    direction[direction["E"] = 2] = "E";
    direction[direction["W"] = 3] = "W";
})(direction || (direction = {}));
var dir = direction.N;
;
var playerSheet;
window.onload = function () {
    app = new PIXI.Application({
        width: 800,
        height: 600,
        transparent: false
    });
    document.body.appendChild(app.view);
    app.loader.add("knight", "images/knight iso char.png");
    app.loader.load(doneLoading);
    //keyboard
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);
    keysDiv = document.querySelector("#keys");
};
function doneLoading(e) {
    createPlayerSheet();
    createPlayer();
    app.ticker.add(gameLoop);
}
function createPlayerSheet() {
    var ssheet = PIXI.BaseTexture.from(app.loader.resources["knight"].url);
    var w = 84;
    var h = 84;
    playerSheet.standSouth = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0, w, h))
    ];
    playerSheet.standNorth = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    playerSheet.standEast = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    playerSheet.standWest = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 0, w, h))
    ];
    playerSheet.walkSouth = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(7 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 1 * h, w, h)),
    ];
    playerSheet.walkNorth = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 1 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 1 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 1 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 1 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(5 * w, 1 * h, w, h)),
    ];
    playerSheet.walkEast = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(6 * w, 1 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(7 * w, 1 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 2 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 2 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 2 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 2 * h, w, h)),
    ];
    playerSheet.walkWest = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 2 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(5 * w, 2 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(6 * w, 2 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(7 * w, 2 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 3 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 3 * h, w, h)),
    ];
    playerSheet.slashSouth = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 3 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 3 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 3 * h, w, h)),
    ];
    playerSheet.slashNorth = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(5 * w, 3 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(6 * w, 3 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(7 * w, 3 * h, w, h)),
    ];
    playerSheet.slashEast = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 3 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 3 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 3 * h, w, h)),
    ];
    playerSheet.slashWest = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 3 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 3 * h, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(5 * w, 3 * h, w, h)),
    ];
}
function createPlayer() {
    player = new PIXI.AnimatedSprite(playerSheet.standSouth);
    player.anchor.set(0.5);
    player.animationSpeed = .2;
    player.loop = false;
    player.x = app.view.width / 2;
    player.y = app.view.height / 2;
    dir = direction.S;
    app.stage.addChild(player);
    player.play();
}
function keysDown(e) {
    console.log(e.keyCode);
    keys[e.key] = true;
}
function keysUp(e) {
    console.log(e.key);
    keys[e.key] = false;
    console.log(keys);
}
function gameLoop() {
    keysDiv.innerHTML = JSON.stringify(keys);
    //W
    if (keys["w"]) {
        if (!player.playing) {
            player.textures = playerSheet.walkNorth;
            player.play();
        }
        player.y -= speed;
        dir = direction.N;
    }
    //A
    if (keys["a"]) {
        if (!player.playing) {
            player.textures = playerSheet.walkWest;
            player.play();
        }
        player.x -= speed;
        dir = direction.W;
    }
    //S
    if (keys["s"]) {
        if (!player.playing) {
            player.textures = playerSheet.walkSouth;
            player.play();
        }
        player.y += speed;
        dir = direction.S;
    }
    //D
    if (keys["d"]) {
        if (!player.playing) {
            player.textures = playerSheet.walkEast;
            player.play();
        }
        player.x += 5;
        dir = direction.E;
    }
    if (!keys["w"] && !keys["a"] && !keys["s"] && !keys["d"]) {
        player.textures = playerSheet.standNorth;
    }
}
