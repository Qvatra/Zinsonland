#pragma strict

var anim : Animator;
var health : int;
var speed : float;
var coeff : float;
var scanTimeLowBound : float;
var scanTimeFluctuation: float;
var sightDist : float;
var blood01 : GameObject;

//private var fieldCanvasScript : fieldScript;
private var time: float;
private var closestEnemy : GameObject;
private var eating: boolean;
private var p01 : GameObject;
private var direct: Vector2; //direction to target
private var normal: Vector2; //normal to target
private var alive: boolean = true;
private var weight: float;

function Start () {
	weight = Random.Range(0.8, 1.2);
	transform.localScale = Vector3(weight, weight, 1);
	speed = speed/100;
	p01 = GameObject.Find("player01");
	//fieldCanvasScript = GameObject.Find("FieldCanvas").GetComponent("fieldScript");
	time = 0f;
	anim.speed = 1f;
	anim.SetInteger("action", 0);
}

function Update () {
	if(alive){ 
	if(rigidbody2D.velocity != Vector2.zero) {
		rigidbody2D.velocity = Vector2.zero;
	}
	if (eating && anim.GetInteger("action") == 0){
		anim.speed = 1.5f;
		anim.SetInteger("action", 1);
	}
	if (!eating && anim.GetInteger("action") == 1){
		anim.speed = 1f;
		anim.SetInteger("action", 0);
	}
	

	direct = (p01.transform.position - transform.position).normalized;
	normal = normV(closestEnemy).normalized;
	//transform.Translate((direct + normal).normalized*speed);
	var direction: Vector2 = (direct + normal*coeff).normalized;
	
	transform.position.x += direction.x * speed * Time.deltaTime;
	transform.position.y += direction.y * speed * Time.deltaTime;
	transform.rotation = Quaternion.Euler(0, 0, angle(direct + normal*coeff));

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
}

function angle(dir: Vector2){
	var ang = Vector2.Angle(dir, Vector2.right);
	if(dir.y < 0)ang = -ang;
	return ang;
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
	transform.rotation = Quaternion.Euler(0, 0, angle(direct));
	//var endpoint = fieldCanvasScript.point(p01.transform.position, transform.position, 0.2f);
	//fieldCanvasScript.drawLine(transform.position.x*100,transform.position.y*100,endpoint.x*100,endpoint.y*100,Color.red);
	if(alive){ //enter this block only once
		Instantiate (blood01, transform.position, Quaternion.FromToRotation(Vector3.right,dir));
	}
	alive = false;
    //var redValue = Random.Range(160, 240);
	//fieldCanvasScript.drawBlood(-transform.position.x*100,-transform.position.y*100,ang, Color32(redValue,0,0,180));
	
	_stat.enemiesKilled++;
	_stat.cash++;
	
	var dist: float = (p01.transform.position - transform.position).magnitude;
	if(dist < 0.55){
		anim.speed = 2.2f;
		anim.SetInteger("action", 3);
	} else {
		anim.speed = 2f;
		anim.SetInteger("action", 2);	
	}

	rigidbody2D.velocity = - 7 * direct / weight / weight / weight / weight / dist / dist / dist;
	yield WaitForSeconds(0.2);
	rigidbody2D.velocity = Vector2.zero;
	Destroy(GetComponent(Collider2D));
	transform.position.z = 0.5;
	//Destroy(gameObject);
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
