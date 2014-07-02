#pragma strict

var healthX:int = 20;
var healthY:int = 15;
var ammoX:int = 19;
var ammoY:int = 35;

var iconStyle : GUIStyle;
var distX: int = 5;
var borderX: int = -5;
var gap: int = 30;
var size: int = 50;

var assault: Texture;
var assaultY: int = 5;
var marine: Texture;
var marineY: int = 50;
var medic: Texture;
var medicY: int = 95;
var engineer: Texture;
var engineerY: int = 140;

var ak47: Texture;
var uzi: Texture;
var svd: Texture;
var minigun: Texture;

var rpg: Texture;
var grenade: Texture;
var mine: Texture;
var shotgun: Texture;

var turret: Texture;
var laser: Texture;
var mortar: Texture;
var trap: Texture;

var weapon: Texture;
var stun: Texture;
var heal: Texture;
var shield: Texture;
var accurate: Texture;

var damage10: Texture;
var damage20: Texture;
var damage30: Texture;
var damage40: Texture;

var health10: Texture;
var health20: Texture;
var health30: Texture;
var health40: Texture;
var health50: Texture;

var rate10: Texture;
var rate20: Texture;
var rate30: Texture;
var rate40: Texture;
var rate50: Texture;

var range10: Texture;
var range20: Texture;
var range30: Texture;
var range40: Texture;
var range50: Texture;

var speed10: Texture;
var speed20: Texture;
var speed30: Texture;
var speed40: Texture;
var speed50: Texture;

var accuracy10: Texture;
var accuracy20: Texture;
var accuracy30: Texture;
var accuracy40: Texture;
var accuracy50: Texture;

var ammo: Texture;
var bulletBar: Texture;
var heart: Texture;
var progressBar: Texture;
var aTexture: Texture;
var gameManager: _GM;
var player01 : Transform;
var cam : Camera;
var cameraSpeed: float;

private var startRect: Rect;
private var playerHealth: int;
private var upgradeAssault: Array = [];
private var upgradeMarine: Array = [];
private var upgradeMedic: Array = [];
private var upgradeEngineer: Array = [];

function Start () {
	startRect = new Rect (Screen.width - 250, Screen.height - 75, 200, 50);
	upgradeAssault = [assault];
	upgradeMarine = [marine];
	upgradeMedic = [medic];
	upgradeEngineer = [engineer];
}

function OnGUI () {
	if(_stat.gameRunning){
		playerHealthBar(healthX, healthY, 6, 12, 2);
		ammoBar(ammoX, ammoY, 6, 15, 1);
		drawIcons();
	} else {
		GUI.Box(Rect (0, Screen.height - 100, Screen.width, 100), "");
		if (GUI.Button (startRect, "Start")) gameManager.startLevel();
	}
}

function drawIcons() {
	for(var i: int = 0; i < upgradeAssault.length; i++) {
		//var rect1: Rect = Rect(distX + i*(borderX+size),borderY,size,size);
		var rect1: Rect = Rect(distX + i*(borderX+size),assaultY,size,size);
		var texture1: Texture = upgradeAssault[i];
		if (GUI.Button (rect1, texture1, iconStyle)) clickAssault(i);
	}
	
	for(var j: int = 0; j < upgradeMarine.length; j++) {
		//var rect2: Rect = Rect(distX + gap + (j+upgradeAssault.length)*(borderX+size),borderY,size,size);
		var rect2: Rect = Rect(distX + j*(borderX+size),marineY,size,size);
		var texture2: Texture = upgradeMarine[j];
		if (GUI.Button (rect2, texture2, iconStyle)) clickMarine(j);
	}
	
	for(var k: int = 0; k < upgradeMedic.length; k++) {
		//var rect3: Rect = Rect(distX + 2*gap + (k+upgradeAssault.length+upgradeMarine.length)*(borderX+size),borderY,size,size);
		var rect3: Rect = Rect(distX + k*(borderX+size),medicY,size,size);
		var texture3: Texture = upgradeMedic[k];
		if (GUI.Button (rect3, texture3, iconStyle)) clickMedic(k);
	}
	
	for(var v: int = 0; v < upgradeEngineer.length; v++) {
		//var rect4: Rect = Rect(distX + 3*gap + (v+upgradeAssault.length+upgradeMarine.length+upgradeMedic.length)*(borderX+size),borderY,size,size);
		var rect4: Rect = Rect(distX + v*(borderX+size),engineerY,size,size);
		var texture4: Texture = upgradeEngineer[v];
		if (GUI.Button (rect4, texture4, iconStyle)) clickEngineer(v);
	}
}

function clickAssault(ind: int){
	if(upgradeAssault[ind] == assault){
		upgradeAssault.splice(ind,1,ak47,health10,rate10);
	} else if(upgradeAssault[ind] == ak47){
		upgradeAssault.splice(ind,1,damage10);
	} else if(upgradeAssault[ind] == damage10){
		upgradeAssault.splice(ind,1,damage20);
	} else if(upgradeAssault[ind] == damage20){
		upgradeAssault.splice(ind,1,damage30);
	} else if(upgradeAssault[ind] == damage30){
		upgradeAssault.splice(ind,1,damage40);
	} else if(upgradeAssault[ind] == damage40){
		upgradeAssault.splice(ind,1,weapon);
	} else if(upgradeAssault[ind] == weapon){
		upgradeAssault.splice(ind,1,uzi,svd,minigun,rpg,grenade,mine,shotgun);
	} else if(upgradeAssault[ind] == uzi){
		upgradeAssault.splice(ind,1);
	} else if(upgradeAssault[ind] == svd){
		upgradeAssault.splice(ind,1);
	} else if(upgradeAssault[ind] == minigun){
		upgradeAssault.splice(ind,1);
	} else if(upgradeAssault[ind] == rpg){
		upgradeAssault.splice(ind,1);
	} else if(upgradeAssault[ind] == grenade){
		upgradeAssault.splice(ind,1);
	} else if(upgradeAssault[ind] == mine){
		upgradeAssault.splice(ind,1);
	} else if(upgradeAssault[ind] == shotgun){
		upgradeAssault.splice(ind,1);
	} else if(upgradeAssault[ind] == health10){
		upgradeAssault.splice(ind,1,health20);
	} else if(upgradeAssault[ind] == health20){
		upgradeAssault.splice(ind,1,health30);
	} else if(upgradeAssault[ind] == health30){
		upgradeAssault.splice(ind,1,health40);
	} else if(upgradeAssault[ind] == health40){
		upgradeAssault.splice(ind,1,health50);
	} else if(upgradeAssault[ind] == health50){
		upgradeAssault.splice(ind,1,turret);
	} else if(upgradeAssault[ind] == turret){
		upgradeAssault.splice(ind,1);
	} else if(upgradeAssault[ind] == rate10){
		upgradeAssault.splice(ind,1,rate20);
	} else if(upgradeAssault[ind] == rate20){
		upgradeAssault.splice(ind,1,rate30);
	} else if(upgradeAssault[ind] == rate30){
		upgradeAssault.splice(ind,1,rate40);
	} else if(upgradeAssault[ind] == rate40){
		upgradeAssault.splice(ind,1,rate50);
	} else if(upgradeAssault[ind] == rate50){
		upgradeAssault.splice(ind,1,stun);
	} else if(upgradeAssault[ind] == stun){
		upgradeAssault.splice(ind,1);
	}
}

function clickMarine(ind: int){
	if(upgradeMarine[ind] == marine){
		upgradeMarine.splice(ind,1,uzi,speed10,health10);
	} else if(upgradeMarine[ind] == uzi){
		upgradeMarine.splice(ind,1,rate10);
	} else if(upgradeMarine[ind] == rate10){
		upgradeMarine.splice(ind,1,rate20);
	} else if(upgradeMarine[ind] == rate20){
		upgradeMarine.splice(ind,1,rate30);
	} else if(upgradeMarine[ind] == rate30){
		upgradeMarine.splice(ind,1,rate40);
	} else if(upgradeMarine[ind] == rate40){
		upgradeMarine.splice(ind,1,weapon);
	} else if(upgradeMarine[ind] == weapon){
		upgradeMarine.splice(ind,1,ak47,svd,minigun,rpg,grenade,mine,shotgun);
	} else if(upgradeMarine[ind] == ak47){
		upgradeMarine.splice(ind,1);
	} else if(upgradeMarine[ind] == svd){
		upgradeMarine.splice(ind,1);
	} else if(upgradeMarine[ind] == minigun){
		upgradeMarine.splice(ind,1);
	} else if(upgradeMarine[ind] == rpg){
		upgradeMarine.splice(ind,1);
	} else if(upgradeMarine[ind] == grenade){
		upgradeMarine.splice(ind,1);
	} else if(upgradeMarine[ind] == mine){
		upgradeMarine.splice(ind,1);
	} else if(upgradeMarine[ind] == shotgun){
		upgradeMarine.splice(ind,1);
	} else if(upgradeMarine[ind] == health10){
		upgradeMarine.splice(ind,1,health20);
	} else if(upgradeMarine[ind] == health20){
		upgradeMarine.splice(ind,1,health30);
	} else if(upgradeMarine[ind] == health30){
		upgradeMarine.splice(ind,1,health40);
	} else if(upgradeMarine[ind] == health40){
		upgradeMarine.splice(ind,1,health50);
	} else if(upgradeMarine[ind] == health50){
		upgradeMarine.splice(ind,1,shield);
	} else if(upgradeMarine[ind] == shield){
		upgradeMarine.splice(ind,1);
	} else if(upgradeMarine[ind] == speed10){
		upgradeMarine.splice(ind,1,speed20);
	} else if(upgradeMarine[ind] == speed20){
		upgradeMarine.splice(ind,1,speed30);
	} else if(upgradeMarine[ind] == speed30){
		upgradeMarine.splice(ind,1,speed40);
	} else if(upgradeMarine[ind] == speed40){
		upgradeMarine.splice(ind,1,speed50);
	} else if(upgradeMarine[ind] == speed50){
		upgradeMarine.splice(ind,1,trap);
	} else if(upgradeMarine[ind] == trap){
		upgradeMarine.splice(ind,1);
	} 
}

function clickMedic(ind: int){
	if(upgradeMedic[ind] == medic){
		upgradeMedic.splice(ind,1,svd,accuracy10,speed10);
	} else if(upgradeMedic[ind] == svd){
		upgradeMedic.splice(ind,1,range10);
	} else if(upgradeMedic[ind] == range10){
		upgradeMedic.splice(ind,1,range20);
	} else if(upgradeMedic[ind] == range20){
		upgradeMedic.splice(ind,1,range30);
	} else if(upgradeMedic[ind] == range30){
		upgradeMedic.splice(ind,1,range40);
	} else if(upgradeMedic[ind] == range40){
		upgradeMedic.splice(ind,1,weapon);
	} else if(upgradeMedic[ind] == weapon){
		upgradeMedic.splice(ind,1,ak47,uzi,minigun,rpg,grenade,mine,shotgun);
	} else if(upgradeMedic[ind] == ak47){
		upgradeMedic.splice(ind,1);
	} else if(upgradeMedic[ind] == uzi){
		upgradeMedic.splice(ind,1);
	} else if(upgradeMedic[ind] == minigun){
		upgradeMedic.splice(ind,1);
	} else if(upgradeMedic[ind] == rpg){
		upgradeMedic.splice(ind,1);
	} else if(upgradeMedic[ind] == grenade){
		upgradeMedic.splice(ind,1);
	} else if(upgradeMedic[ind] == mine){
		upgradeMedic.splice(ind,1);
	} else if(upgradeMedic[ind] == shotgun){
		upgradeMedic.splice(ind,1);
	} else if(upgradeMedic[ind] == accuracy10){
		upgradeMedic.splice(ind,1,accuracy20);
	} else if(upgradeMedic[ind] == accuracy20){
		upgradeMedic.splice(ind,1,accuracy30);
	} else if(upgradeMedic[ind] == accuracy30){
		upgradeMedic.splice(ind,1,accuracy40);
	} else if(upgradeMedic[ind] == accuracy40){
		upgradeMedic.splice(ind,1,accuracy50);
	} else if(upgradeMedic[ind] == accuracy50){
		upgradeMedic.splice(ind,1,laser);
	} else if(upgradeMedic[ind] == laser){
		upgradeMedic.splice(ind,1);
	} else if(upgradeMedic[ind] == speed10){
		upgradeMedic.splice(ind,1,speed20);
	} else if(upgradeMedic[ind] == speed20){
		upgradeMedic.splice(ind,1,speed30);
	} else if(upgradeMedic[ind] == speed30){
		upgradeMedic.splice(ind,1,speed40);
	} else if(upgradeMedic[ind] == speed40){
		upgradeMedic.splice(ind,1,speed50);
	} else if(upgradeMedic[ind] == speed50){
		upgradeMedic.splice(ind,1,heal);
	} else if(upgradeMedic[ind] == heal){
		upgradeMedic.splice(ind,1);
	} 
}

function clickEngineer(ind: int){
	if(upgradeEngineer[ind] == engineer){
		upgradeEngineer.splice(ind,1,minigun,range10,accuracy10);
	} else if(upgradeEngineer[ind] == minigun){
		upgradeEngineer.splice(ind,1,damage10);
	} else if(upgradeEngineer[ind] == damage10){
		upgradeEngineer.splice(ind,1,damage20);
	} else if(upgradeEngineer[ind] == damage20){
		upgradeEngineer.splice(ind,1,damage30);
	} else if(upgradeEngineer[ind] == damage30){
		upgradeEngineer.splice(ind,1,damage40);
	} else if(upgradeEngineer[ind] == damage40){
		upgradeEngineer.splice(ind,1,weapon);
	} else if(upgradeEngineer[ind] == weapon){
		upgradeEngineer.splice(ind,1,ak47,uzi,svd,rpg,grenade,mine,shotgun);
	} else if(upgradeEngineer[ind] == ak47){
		upgradeEngineer.splice(ind,1);
	} else if(upgradeEngineer[ind] == uzi){
		upgradeEngineer.splice(ind,1);
	} else if(upgradeEngineer[ind] == svd){
		upgradeEngineer.splice(ind,1);
	} else if(upgradeEngineer[ind] == rpg){
		upgradeEngineer.splice(ind,1);
	} else if(upgradeEngineer[ind] == grenade){
		upgradeEngineer.splice(ind,1);
	} else if(upgradeEngineer[ind] == mine){
		upgradeEngineer.splice(ind,1);
	} else if(upgradeEngineer[ind] == shotgun){
		upgradeEngineer.splice(ind,1);
	} else if(upgradeEngineer[ind] == range10){
		upgradeEngineer.splice(ind,1,range20);
	} else if(upgradeEngineer[ind] == range20){
		upgradeEngineer.splice(ind,1,range30);
	} else if(upgradeEngineer[ind] == range30){
		upgradeEngineer.splice(ind,1,range40);
	} else if(upgradeEngineer[ind] == range40){
		upgradeEngineer.splice(ind,1,range50);
	} else if(upgradeEngineer[ind] == range50){
		upgradeEngineer.splice(ind,1,mortar);
	} else if(upgradeEngineer[ind] == mortar){
		upgradeEngineer.splice(ind,1);
	} else if(upgradeEngineer[ind] == accuracy10){
		upgradeEngineer.splice(ind,1,accuracy20);
	} else if(upgradeEngineer[ind] == accuracy20){
		upgradeEngineer.splice(ind,1,accuracy30);
	} else if(upgradeEngineer[ind] == accuracy30){
		upgradeEngineer.splice(ind,1,accuracy40);
	} else if(upgradeEngineer[ind] == accuracy40){
		upgradeEngineer.splice(ind,1,accuracy50);
	} else if(upgradeEngineer[ind] == accuracy50){
		upgradeEngineer.splice(ind,1,accurate);
	} else if(upgradeEngineer[ind] == accurate){
		upgradeEngineer.splice(ind,1);
	} 
}

function playerHealthBar(x:int, y:int, w:int, h:int, dx:int){ //x,y position coords; w,h size; dx border;
	GUI.DrawTexture(Rect(x - 3, y - h, 3*w, 3*h), heart, ScaleMode.ScaleToFit, true, 1f);
	for(var i:int = 0; i < _stat.livesLeft; i++){
		GUI.DrawTexture(Rect(4*w + x + (dx + w) * i, y, w, h), progressBar, ScaleMode.ScaleToFit, true, 0.5f);
	}
}

function ammoBar(x:int, y:int, w:int, h:int, dx:int){ //x,y position coords; w,h size; dx border;
	GUI.DrawTexture(Rect(x, y - h, 3*w, 3*h), ammo, ScaleMode.ScaleToFit, true, 1f);
	for(var i:int = 0; i < _stat.ammoLeft; i++){
		GUI.DrawTexture(Rect(4*w + x + (dx + w) * i, y, w, h), bulletBar, ScaleMode.ScaleToFit, true, 0.3f);
	}
}

function Update () {
	if(_stat.gameRunning){
		transform.position.x = player01.position.x;
		transform.position.y = player01.position.y;
	} else {
		var ms:Vector2 = cam.ScreenToViewportPoint(Input.mousePosition); //to define mouse boundaries for moving camera
		if(((ms.x < 0.3 || ms.x > 0.7) || (ms.y < 0.2 || ms.y > 0.8))&&(ms.x < 1 && ms.x > 0)&&(ms.y < 1 && ms.y > 0)&&!startRect.Contains(Vector2(Input.mousePosition.x, Screen.height - Input.mousePosition.y))){
			var mouse: Vector2 = cam.ScreenToWorldPoint(Input.mousePosition);
			var vect: Vector2 = Vector2(mouse.x - transform.position.x, mouse.y - transform.position.y).normalized;
			if (mouse.x > transform.position.x && cam.ViewportToWorldPoint(Vector2(1,1)).x < 5) {
				transform.position.x += Mathf.Abs(cameraSpeed*vect.x);
			} else if (mouse.x < transform.position.x && cam.ViewportToWorldPoint(Vector2.zero).x > -5){
				transform.position.x -= Mathf.Abs(cameraSpeed*vect.x);
			}
			if (mouse.y > transform.position.y && cam.ViewportToWorldPoint(Vector2(1,1)).y < 5) {
				transform.position.y += Mathf.Abs(cameraSpeed*vect.y);
			} else if (mouse.y < transform.position.y && cam.ViewportToWorldPoint(Vector2.zero).y > -5) {
				transform.position.y -= Mathf.Abs(cameraSpeed*vect.y);
			}
		}
	}
}