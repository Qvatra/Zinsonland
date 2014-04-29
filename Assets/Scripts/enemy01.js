#pragma strict

var health : int;
var speed : float;
var coeff : float;
var scanTimeLowBound : float;
var scanTimeFluctuation: float;
var sightDist : float;

private var fieldCanvasScript : fieldScript;
private var time: float;
private var closestEnemy : GameObject;
private var eating: boolean;
private var p01 : GameObject;


function Start () {
	speed = speed/1000;
	p01 = GameObject.Find("player01");
	fieldCanvasScript = GameObject.Find("FieldCanvas").GetComponent("fieldScript");
	time = 0f;
}

function addVectors(v1:Vector3, v2:Vector3){
	var v3: Vector3;
	v3.x = v1.x+v2.x;
	v3.y = v1.y+v2.y;
	v3.z = v1.z+v2.z;
	return v3;
};

function Update () {
	var direct : Vector3 = (p01.transform.position - transform.position).normalized*coeff;
	var normal : Vector3 = normV(closestEnemy).normalized;
	transform.Translate(addVectors(direct, normal).normalized*speed);

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

function OnCollisionEnter2D (hitInfo : Collision2D) {
	if (hitInfo.collider.name == "shot(Clone)" || hitInfo.collider.name == "BigShot(Clone)") {
		health--;
		if (health <= 0) death();
	}
}

function death(){
	var endpoint = fieldCanvasScript.point(p01.transform.position, transform.position, 0.2f);
	fieldCanvasScript.drawLine(transform.position.x*100,transform.position.y*100,endpoint.x*100,endpoint.y*100,Color.red);
	
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
	if (hitInfo.name == "player01") {
		eating = true;
	}
}

function OnTriggerExit2D (hitInfo : Collider2D) {
	if (hitInfo.name == "player01") {
		eating = false;
	}
}
