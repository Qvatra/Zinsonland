#pragma strict

var health : int;
var speed : float;
var coeff : float;
var scanTimeLowBound : float;
var scanTimeFluctuation: float;
var sightDist : float;
var blood01 : GameObject;

//private var cam: Camera;
private var fieldCanvasScript : fieldScript;
private var time: float;
private var closestEnemy : GameObject;
private var eating: boolean;
private var p01 : GameObject;


function Start () {
	speed = speed/1000;
	p01 = GameObject.Find("player01");
	fieldCanvasScript = GameObject.Find("FieldCanvas").GetComponent("fieldScript");
//	cam = GameObject.Find("_MainCam").GetComponent(Camera);
	time = 0f;
}

function Update () {
	var direct : Vector3 = (p01.transform.position - transform.position).normalized*coeff;
	var normal : Vector3 = normV(closestEnemy).normalized;
	transform.Translate((direct + normal).normalized*speed);

	time = time + Time.deltaTime;
	if (scanTimeLowBound + Random.Range(0f,scanTimeFluctuation) < time) {
		var tmp = findClosestEnemy();
		if(tmp != null){
			var diff = transform.position - tmp.transform.position;
			var dist = diff.sqrMagnitude;
			if(dist < sightDist) {
				closestEnemy = tmp;
			} else {
				closestEnemy = null;
			}
		} else{
			closestEnemy = null;
		}
		time = 0f;
	}
	
	if(eating && _stat.livesLeft > 0){
		_stat.livesLeft -= Time.deltaTime;
							
		if(_stat.livesLeft < 0) {
			_stat.livesLeft = 0f;
			eating = false;
		}
	}
}

function findClosestEnemy(){
     var distance = Mathf.Infinity;
     var closestEnemy : GameObject = null;
     var obj : GameObject;

	 for(obj in GameObject.FindGameObjectsWithTag("Enemy")) {
		var diff = obj.transform.position - transform.position;
     	var curDistance = diff.sqrMagnitude;
      	if (curDistance < distance && curDistance != 0) {
        	closestEnemy = obj;
        	distance = curDistance;
      	}
	 }
     return closestEnemy;
}

function death(dir){
	//var endpoint = fieldCanvasScript.point(p01.transform.position, transform.position, 0.2f);
	//fieldCanvasScript.drawLine(transform.position.x*100,transform.position.y*100,endpoint.x*100,endpoint.y*100,Color.red);
	Instantiate (blood01, transform.position, Quaternion.FromToRotation(Vector3.right,dir));
    //var redValue = Random.Range(160, 240);
	//fieldCanvasScript.drawBlood(-transform.position.x*100,-transform.position.y*100,ang, Color32(redValue,0,0,180));
	
	_stat.enemiesKilled++;
	_stat.cash++;
	Destroy(gameObject);
}

function normV(nearEnemy: GameObject) {
	if(nearEnemy == null) return Vector3(0,0,0);
	var V1 = p01.transform.position - transform.position;
	var V2 = transform.position - nearEnemy.transform.position;
	var normal: Vector3;
	if(V1.x*V2.y-V1.y*V2.x > 0){
		normal.x = -V1.y;
		normal.y = V1.x;
	} else {
		normal.x = V1.y;
		normal.y = -V1.x;
	}
	normal.z = 0;
	return normal;
}

function OnTriggerEnter2D (hitInfo : Collider2D) {
	if (hitInfo.name == "shot(Clone)"){
		var obj = hitInfo.gameObject;
		var script = obj.GetComponent(shot);
		var dir = script.bulletDirection();
		Destroy(hitInfo.gameObject);
		health--;
		if (health <= 0) death(dir);
	} else if (hitInfo.name == "player01") {
		eating = true;
	}
}

function OnTriggerExit2D (hitInfo : Collider2D) {
	if (hitInfo.name == "player01") {
		eating = false;
	}
}
