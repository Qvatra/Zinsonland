#pragma strict

static var gameRunning: boolean;
static var livesLeft: float;
static var shotsFired: int;
static var towerFired: int;
static var enemiesKilled: int;
static var timePlayed: int;
static var currentLevel: int;
static var bonusArray: Array;
static var bonusCoords: Array;
static var cash: int;

function Awake () {
	cash = 0;
	gameRunning = false;
	bonusArray = [];
	currentLevel = 1;
	DontDestroyOnLoad(this);
}

function Start () {
	reset();
}

static function reset(){
	shotsFired = 0;
	towerFired = 0;
	enemiesKilled = 0;
	timePlayed = 0;
}