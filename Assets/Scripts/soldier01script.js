#pragma strict

	var anim : Animator;
	var feetAnim : Animator;
	var shotPrefab : GameObject;
	var health : float;
	var livesLeft : float;
	var moveTo : Vector2;
	var shootTo : Vector2;
	var speed : float = 1f;
	var destinationX : float;
	var destinationY : float;
	var velosity : float = 0.4f;
	var accuracy : float = 0.1f;
	var currentEnemy : GameObject;
	var audioDeath: AudioClip;
	private var nextFire : float = 0.1f;
    private var nextScan : float = 0.1f;
    private var nextAiming : float = 0.1f;
	var defendRadius : float = 0.3f; 
    var dangerRadius : float = 1.0f; 
    private var alive: boolean = true;
function Start () {
	livesLeft = health;
	destinationX = -2;
	destinationY = 0.3;
}

function Update () {
if (health > 0){
        if (Time.time > nextScan) {
             scanTerritory();
             nextScan = Time.time + 1;
        }
        if (Time.time > nextAiming) {
			getMoveDirection();
			getShootDirection();
			nextAiming = Time.time + 0.2;
        }
	

		moving();
		firing();
} else {
		if(alive)soldDeath();
	}
}

function soldDeath(){
	//audio.PlayOneShot(audioDeath, 0.4);
	Debug.Log("die");
	alive = false;
	anim.speed = 1f;
	anim.SetInteger("action", 0);
	feetAnim.SetBool("walk", false);
	yield WaitForSeconds(1);
	Destroy(GetComponent(Collider2D));
}
function getMoveDirection() {
var vektor :Vector2;
var enemyDistance = Vector2(0,0);
var flagDistance = Vector2(destinationX-transform.position.x, destinationY-transform.position.y);
if (currentEnemy != null) {
enemyDistance = Vector2(currentEnemy.transform.position.x-transform.position.x, currentEnemy.transform.position.y-transform.position.y);
}

if ((currentEnemy == null) || (enemyDistance.magnitude>dangerRadius*5)) {
	if (flagDistance.magnitude > 0.1f) {
 		vektor = flagDistance.normalized;
 		speed = 1f;
 	} else {
 		vektor = Vector2(0,0);
 		speed = 1f;
 	}
} else {
if (flagDistance.magnitude < defendRadius) {
  if (enemyDistance.magnitude > (dangerRadius*2)) {
        vektor = enemyDistance.normalized;
      	speed = 0.2;
  } else { 
      if (enemyDistance.magnitude < dangerRadius) {
        vektor = -enemyDistance.normalized;
        speed = 1f;
      } else {
        vektor = enemyDistance.normalized;
        speed = 2*enemyDistance.magnitude/dangerRadius - 3;
      }
  }
} else {
    if (enemyDistance.magnitude > (dangerRadius*2)) {
      vektor = flagDistance.normalized;
      speed = 1f;
  } else { 
      if (enemyDistance.magnitude < dangerRadius) {
        vektor = (-3*enemyDistance.normalized+flagDistance.normalized).normalized;
        speed = 1f;
      } else {
        vektor = (-enemyDistance.normalized+3*flagDistance.normalized).normalized;
        speed = 1f;
      }
}
}    
}
if (vektor.magnitude > 1) {
		Debug.Log("incorrect soldier AI, "+vektor);
	 } else {
                if (vektor.magnitude < 0.01) {
		  vektor=Vector2.zero;
	        }
           }
moveTo = vektor;
}

function angle(dir: Vector2){
	var ang = Vector2.Angle(dir, Vector2.right);
	if(dir.y < 0)ang = -ang;
	return ang;
}

function getShootDirection() {
	var enemy = currentEnemy;
	if (enemy!=null) {
		var vek = Vector2(enemy.transform.position.x - transform.position.x + Random.Range(-accuracy, accuracy), enemy.transform.position.y - transform.position.y + Random.Range(-accuracy, accuracy));
		shootTo = vek.normalized;
	} else {
		shootTo = Vector2.zero;
	}
}

function setDestination(mouse : Vector3) {
	destinationX = mouse.x;
	destinationY = mouse.y;
        scanTerritory();
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

function createShot(weapon){
	var shotClone: GameObject = Instantiate(shotPrefab);
	var shotCloneScript = shotClone.GetComponent(shot);
	shotCloneScript.shotDirection = shootTo;
	shotCloneScript.startPosition = transform.position;
	shotCloneScript.weapon = weapon;
}

function firing() {
	if(Time.time > nextFire && shootTo != Vector2.zero) {
			nextFire = Time.time + 0.7;
			createShot('Pistol');
	}
}
function scanTerritory() {
           currentEnemy = findClosestEnemy();
}
function moving() {
	if (speed > 1) {
		speed = 1;
	}
	if (Vector2(moveTo.x - transform.position.x,moveTo.y - transform.position.y).magnitude> (velosity * Time.deltaTime * 10)) {
    transform.position.x += moveTo.x * velosity * speed * Time.deltaTime;
	transform.position.y += moveTo.y * velosity * speed * Time.deltaTime;
	}
	
	if (currentEnemy != null) {
			transform.rotation = Quaternion.Euler(0, 0, angle(shootTo));
		} else {
			transform.rotation = Quaternion.Euler(0, 0, angle(moveTo));
		}
		
		
        if  (moveTo != Vector2.zero ) {
			anim.speed = 1f;
			anim.SetInteger("action", 11);
			feetAnim.SetBool("walk", true);
		} else {
			anim.speed = 0.4f;
			anim.SetInteger("action", 11);
			feetAnim.SetBool("walk", false);
		}
         
}

function damage(dmg : float) {
	health -= dmg;
}

function isAlive() {
	return alive;
}