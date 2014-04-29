#pragma strict

var player01 : Transform;
var mat : Material;
var cam : Camera;
var aim01 : Transform;
var cameraSpeed: float;

private var a1 : Vector3;
private var a2 : Vector3;
private var b1 : Vector3;
private var b2 : Vector3;
private var c1 : Vector3;
private var c2 : Vector3;
private var time : float;
private var cleanShots : boolean;
private var gm:_GM;
private var startRect: Rect;

function Start () {
	gm = GameObject.Find("_GM").GetComponent(_GM);
	startRect = new Rect (Screen.width - 250, Screen.height - 75, 200, 50);
	a1 = a2 = b1 = b2 = c1 = c2 = new Vector3(0f,0f,0f);
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

function OnPostRender(){
		GL.PushMatrix();
		mat.SetPass(0);
		GL.LoadOrtho();
		GL.Begin(GL.LINES);
		if (_GM.weapon == 'Pistol'){
			GL.Color(Color.gray);
			GL.Vertex(a1);
			GL.Vertex(a2);
		}
		GL.End();
		GL.PopMatrix();
}

function Update () {
	if(_stat.gameRunning){
		transform.position.x = player01.position.x;
		transform.position.y = player01.position.y;
	
		if(Input.GetButtonDown("Fire1")){
			var start = cam.WorldToViewportPoint(lineStart());
			var end = cam.WorldToViewportPoint(lineEnd());
			a1 = new Vector3(start.x, start.y, 0f);
			a2 = new Vector3(end.x, end.y, 0f);
			time = Time.time;
			cleanShots = true;
		}
	
		if(cleanShots && Time.time - time > 0.05){
			a1 = a2 = b1 = b2 = c1 = c2 = new Vector3(0f,0f,0f);
			cleanShots = false;
		}
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

function lineStart(){
	var dist = _GM.aimDist * Random.Range(0f,1f); 
	return point(player01.position, aim01.position, dist);
}

function point(p1 : Vector3, p2 : Vector3, dist : float){ //calculate point on line through p1 & p2 on distance dist
	var const = dist/Mathf.Sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y));
	var x = p1.x + const*(p2.x-p1.x);
	var y = p1.y + const*(p2.y-p1.y); 
	return new Vector2(x, y);
}

function lineEnd(){
	var dist = _GM.shotDist + _GM.aimDist * Random.Range(0f,1f); 
	return point(player01.position, aim01.position, dist);
}