#pragma strict

var anim : Animator;
var health : float;
var speed : float;
var coeff : float;
var scanTimeLowBound : float;
var scanTimeFluctuation: float;
var sightDist : float;
var blood01 : GameObject;
var attackDistance : float = 2;
var attackSpeed : float = 2;
var audioHit: AudioClip;
var audioAttack: AudioClip;
private var playAttack: boolean = true;
var audioDeath: AudioClip;
private var nextScan : float = 0.1f;
//private var fieldCanvasScript : fieldScript;
private var time: float;
private var closestEnemy : GameObject;
private var eating: boolean;
private var p01 : GameObject;
private var direct: Vector2; //direction to target
private var normal: Vector2; //normal to target
var alive: boolean = true;
private var weight: float;

function Start () {
	weight = Random.Range(0.8, 1.2);
	audio.pitch = 1.4 - (weight - 0.8) * 1.25;
	speed = speed /100 / weight / weight;
	transform.localScale = Vector3(weight, weight, 1);
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
		anim.speed = 1.8f;
		anim.SetInteger("action", 1);
	}
	if (!eating && anim.GetInteger("action") == 1){
		anim.speed = 1f;
		anim.SetInteger("action", 0);
	}

	direct = (p01.transform.position - transform.position).normalized;
	normal = normV(closestEnemy).normalized;
	var distance = (p01.transform.position - transform.position).magnitude;
	var direction: Vector2 = (direct + normal*coeff).normalized;
	
	if(!eating){
		if (distance>attackDistance) {
			transform.position.x += direction.x * speed * Time.deltaTime;
			transform.position.y += direction.y * speed * Time.deltaTime;
			transform.rotation = Quaternion.Euler(0, 0, angle(direct + normal*coeff));
		} else {
			transform.position.x += direct.x * speed * attackSpeed * Time.deltaTime;
			transform.position.y += direct.y * speed * attackSpeed * Time.deltaTime;
			transform.rotation = Quaternion.Euler(0, 0, angle(direct));
			anim.speed = 1f*attackSpeed;
		}
	} else {
		transform.rotation = Quaternion.Euler(0, 0, angle(direct));
	}
	

	time = time + Time.deltaTime;
	if (scanTimeLowBound + Random.Range(0f,scanTimeFluctuation) < time) {
		if(!eating) {
			p01 = findClosestPlayer();
		}
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
	
	if(eating){
		p01.SendMessage("damage",Time.deltaTime);
							
		
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
	 var enemy = obj.GetComponent(enemy01);
	 if (enemy.isAlive() == true) {
		var diff = obj.transform.position - transform.position;
     	var curDistance = diff.sqrMagnitude;
      	if (curDistance < distance && curDistance != 0) {
        	closestEnemy = obj;
        	distance = curDistance;
      	}
	 }
	 }
     return closestEnemy;
}

function death(dir){
	audio.PlayOneShot(audioDeath, 0.7);
	transform.rotation = Quaternion.Euler(0, 0, angle(direct));
	//var endpoint = fieldCanvasScript.point(p01.transform.position, transform.position, 0.2f);
	//fieldCanvasScript.drawLine(transform.position.x*100,transform.position.y*100,endpoint.x*100,endpoint.y*100,Color.red);
	Instantiate (blood01, transform.position, Quaternion.FromToRotation(Vector3.right,dir));
    //var redValue = Random.Range(160, 240);
	//fieldCanvasScript.drawBlood(-transform.position.x*100,-transform.position.y*100,ang, Color32(redValue,0,0,180));
	
	_stat.enemiesKilled++;
	_stat.cash++;
	
	var playerPos : Vector2 = p01.transform.position;
	var enemyPos : Vector2 = transform.position;
	
	var dist: float = (enemyPos - playerPos).magnitude;
	if(dist < 0.6){
		anim.speed = 2f;
		anim.SetInteger("action", 3);
	} else {
		anim.speed = 2f;
		anim.SetInteger("action", 2);
	}
	rigidbody2D.velocity = - direct / weight / weight / weight / dist / dist;
	yield WaitForSeconds(0.2);
	rigidbody2D.velocity = Vector2.zero;
	Destroy(GetComponent(Collider2D));
	transform.position.z = 0.5;
	anim.StopPlayback();
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

function OnCollisionEnter2D(hitInfo : Collision2D){
	if (hitInfo.gameObject.tag == "shot" && alive){
		var obj = hitInfo.gameObject;
		var script = obj.GetComponent(shot);
		var dir = script.bulletDirection();
		audio.PlayOneShot(audioHit, 0.7);
		Instantiate (blood01, transform.position, Quaternion.FromToRotation(Vector3.right,dir));
		script.onDestroy(transform.position);
		Destroy(hitInfo.gameObject);
		health = health - script.bulletDamage();
		if (health <= 0) {
			death(dir);
			alive = false;
		}
	} 
}

function OnTriggerEnter2D (hitInfo : Collider2D) {
	if (hitInfo.tag == "player01") {
		eating = true;
	}
}

function OnTriggerStay2D (hitInfo : Collider2D) {
	if (hitInfo.tag == "player01") {
		if(alive && eating && playAttack){
			playAttack = false;
			audio.PlayOneShot(audioAttack, 0.5);
			yield WaitForSeconds(1.3);
			playAttack = true;
		}
	}
}

function OnTriggerExit2D (hitInfo : Collider2D) {
	if (hitInfo.tag == "player01") {
		eating = false;
	}
}
function isAlive() {
	return alive;
}

function findClosestPlayer() {
	var distance = Mathf.Infinity;
     var closestPlayer : GameObject = null;
     var obj : GameObject;
		var alive = false; 
	 for(obj in GameObject.FindGameObjectsWithTag("player01")) {
	 
	 if (obj.GetComponent(player01) == null) {
	 	var pl = obj.GetComponent(soldier01script);
	 	alive = pl.isAlive();
	 } else {
	 	var sl = obj.GetComponent(player01);
	 	alive = sl.isAlive();
	 }
	 if (alive) {
		var diff = obj.transform.position - transform.position;
     	var curDistance = diff.sqrMagnitude;
      	if (curDistance < distance && curDistance != 0) {
        	closestPlayer = obj;
        	distance = curDistance;
      	}
	 }
	 }
     return closestPlayer;
}