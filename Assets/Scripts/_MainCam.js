#pragma strict

var iconStyle : GUIStyle;
var empty: Texture;

var assault: Texture;
var marine: Texture;
var medic: Texture;
var engineer: Texture;

var ak47: Texture;
var uzi: Texture;
var svd: Texture;
var minigun: Texture;

var turret: Texture;

var stun: Texture;

var damage10: Texture;
var damage20: Texture;
var damage30: Texture;
var damage40: Texture;

var weapon: Texture;

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

var speed10: Texture;

var accuracy10: Texture;

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
private var distX: int = 300;
private var border: int = 5;
private var size: int = 50;
private var playerHealth: int;
private var iconsArray: Array = [];

function Start () {
	startRect = new Rect (Screen.width - 250, Screen.height - 75, 200, 50);
	iconsArray = [assault, empty, marine, empty, medic, empty, engineer];
}

function OnGUI () {
	if(_stat.gameRunning){
		playerHealthBar(20, 15, 6, 12, 2);
		ammoBar(19, 35, 6, 15, 1);
		drawIcons();
	} else {
		GUI.Box(Rect (0, Screen.height - 100, Screen.width, 100), "");
		if (GUI.Button (startRect, "Start")) gameManager.startLevel();
	}
}

function drawIcons() {
	for(var i:int=0; i<iconsArray.length; i++){
		if(iconsArray[i] != empty){
			var rect: Rect = Rect(distX + (i+1)*border + i*size,border,size,size);
			var texture: Texture = iconsArray[i];
			if (GUI.Button (rect, texture, iconStyle)) clickEvent(i);
		} else {
			//skips some space here
		}
	}
}

function clickEvent(ind: int){
Debug.Log(int);
	if(iconsArray[ind] == assault){
		iconsArray.splice(ind,1,ak47,health10,rate10);
	} else if(iconsArray[ind] == marine){
		iconsArray.splice(ind,1,uzi,speed10,health10);
	} else if(iconsArray[ind] == medic){
		iconsArray.splice(ind,1,svd,accuracy10,speed10);
	} else if(iconsArray[ind] == engineer){
		iconsArray.splice(ind,1,minigun,range10,accuracy10);
	} else if(iconsArray[ind] == ak47){
		iconsArray.splice(ind,1,damage10);
	} else if(iconsArray[ind] == damage10){
		iconsArray.splice(ind,1,damage20);
	} else if(iconsArray[ind] == damage20){
		iconsArray.splice(ind,1,damage30);
	} else if(iconsArray[ind] == damage30){
		iconsArray.splice(ind,1,damage40);
	} else if(iconsArray[ind] == damage40){
		iconsArray.splice(ind,1,weapon);
	} else if(iconsArray[ind] == health10){
		iconsArray.splice(ind,1,health20);
	} else if(iconsArray[ind] == health20){
		iconsArray.splice(ind,1,health30);
	} else if(iconsArray[ind] == health30){
		iconsArray.splice(ind,1,health40);
	} else if(iconsArray[ind] == health40){
		iconsArray.splice(ind,1,health50);
	} else if(iconsArray[ind] == health50){
		iconsArray.splice(ind,1,turret);
	} else if(iconsArray[ind] == rate10){
		iconsArray.splice(ind,1,rate20);
	} else if(iconsArray[ind] == rate20){
		iconsArray.splice(ind,1,rate30);
	} else if(iconsArray[ind] == rate30){
		iconsArray.splice(ind,1,rate40);
	} else if(iconsArray[ind] == rate40){
		iconsArray.splice(ind,1,rate50);
	} else if(iconsArray[ind] == rate50){
		iconsArray.splice(ind,1,stun);
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