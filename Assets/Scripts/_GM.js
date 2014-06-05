#pragma strict

static var p01vel : float = 1.4f;
static var fieldW : float = 10f;
static var fieldH : float = 10f;
static var aimDist : float = 0.5f;
static var shotDist : int = 2.5f;
static var shotAppearDist : float = 0.21f;
static var weapon : String = 'Pistol'; //'Shotgun';//'Assault_rifle';
private var time : String;
private var enemies : String;
private var shots : String; //gui string
private var lives : String; //gui string
private var statusBar: GameObject;
private var i : int;

var enemyNum : int;
//var boxNum : int;
var prefabEnemy01 : GameObject;
var prefabBonus01 : GameObject;
var prefabBonus02 : GameObject;
var prefabBonus11 : GameObject;

function Start () {
	_stat.reset();
	_stat.ammoLeft = 5;
	statusBar = GameObject.Find("_StatText");
	
	

//	for(i = 0; i < boxNum; i++){
//		Instantiate(prefabBonus11, Vector3(Random.Range(-fieldW/2,fieldW/2), Random.Range(-fieldH/2,fieldH/2),0), Quaternion(0,0,Random.Range(0,360), Random.Range(0,360)));
//	}
	
	for(i = 0; i < _stat.bonusArray.length; i++){
		if(_stat.bonusArray[i] == 1){
			Instantiate(prefabBonus01, Vector3.zero, Quaternion(0,0,Random.Range(0,360), Random.Range(0,360)));
		}
		if(_stat.bonusArray[i] == 2){
			Instantiate(prefabBonus02, Vector3.zero, Quaternion(0,0,Random.Range(0,360), Random.Range(0,360)));
		}
		if(_stat.bonusArray[i] == 11){
			Instantiate(prefabBonus11, Vector3.zero, Quaternion(0,0,Random.Range(0,360), Random.Range(0,360)));
		}
	}
}

function startLevel(){
	_stat.gameRunning = true;

	 for(obj in GameObject.FindGameObjectsWithTag("bonus")) {
	 	obj.rigidbody2D.isKinematic = false;
	 }

	yield WaitForSeconds (1);

	for(i = 0; i < enemyNum; i++){
		Instantiate(prefabEnemy01, Vector3(-fieldW/2, Random.Range(-fieldH/2,fieldH/2),0), transform.rotation);
		yield WaitForSeconds (0.1);
	}
}

function Update () {
	if (_stat.livesLeft > 0) time = "Time played: " + Mathf.Floor(Time.time) + " \n";
	enemies = "Enemies killed: " + _stat.enemiesKilled + " \n";
	shots = "Shots fired: " + _stat.shotsFired + " \n";
	lives = "Lives left: " + Mathf.Floor(_stat.livesLeft * 10) / 10 + " \n";
	statusBar.GetComponent(GUIText).text = lives + enemies + shots + time;
	
	if(enemyNum == _stat.enemiesKilled || _stat.livesLeft <= 0) {
		//_stat.gameRunning = false;
		//Application.LoadLevel("Scores");
	}
}