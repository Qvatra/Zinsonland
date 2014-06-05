#pragma strict

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

function Start () {
	startRect = new Rect (Screen.width - 250, Screen.height - 75, 200, 50);
}

function OnGUI () {
	if(_stat.gameRunning){
		playerHealthBar(20, 15, 6, 12, 2);
		ammoBar(19, 35, 6, 15, 1);
		
		GUI.DrawTexture(Rect(distX + border,border,size,size), aTexture, ScaleMode.ScaleToFit, true, 1f);
		GUI.DrawTexture(Rect(distX + 2*border + size,border,size,size), aTexture, ScaleMode.ScaleToFit, true, 1f);
		GUI.DrawTexture(Rect(distX + 3*border + 2*size,border,size,size), aTexture, ScaleMode.ScaleToFit, true, 1f);
		GUI.DrawTexture(Rect(distX + 4*border + 3*size,border,size,size), aTexture, ScaleMode.ScaleToFit, true, 1f);
		GUI.DrawTexture(Rect(distX + 5*border + 4*size,border,size,size), aTexture, ScaleMode.ScaleToFit, true, 1f);
		GUI.DrawTexture(Rect(distX + 6*border + 5*size,border,size,size), aTexture, ScaleMode.ScaleToFit, true, 1f);
		GUI.DrawTexture(Rect(distX + 7*border + 6*size,border,size,size), aTexture, ScaleMode.ScaleToFit, true, 1f);
		GUI.DrawTexture(Rect(distX + 8*border + 7*size,border,size,size), aTexture, ScaleMode.ScaleToFit, true, 1f);
		GUI.DrawTexture(Rect(distX + 9*border + 8*size,border,size,size), aTexture, ScaleMode.ScaleToFit, true, 1f);
		GUI.DrawTexture(Rect(distX + 10*border + 9*size,border,size,size), aTexture, ScaleMode.ScaleToFit, true, 1f);		
	} else {
		GUI.Box(Rect (0, Screen.height - 100, Screen.width, 100), "");
		if (GUI.Button (startRect, "Start")) gameManager.startLevel();
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