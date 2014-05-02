#pragma strict

var player01 : Transform;
var cam : Camera;
var cameraSpeed: float;

private var gm:_GM;
private var startRect: Rect;

function Start () {
	gm = GameObject.Find("_GM").GetComponent(_GM);
	startRect = new Rect (Screen.width - 250, Screen.height - 75, 200, 50);
}

function OnGUI () {
	if(!_stat.gameRunning){
		GUI.Box(Rect (0, Screen.height - 100, Screen.width, 100), "");
		if (GUI.Button (startRect, "Start")) {
			_stat.gameRunning = true;
			gm.startLevel();
		}
	}
}

function Update () {
	if(_stat.gameRunning){
		transform.position.x = player01.position.x;
		transform.position.y = player01.position.y;
	} else if(!_stat.gameRunning){
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