#pragma strict

	var anim : Animator;
	var feetAnim : Animator;
	var shotPrefab : GameObject;
	var health : int;
	var livesLeft : float;
	var moveTo : Vector2;
	var shootTo : Vector2;
	var destinationX : float;
	var destinationY : float;
	var velosity : float = 0.4f;
	var accuracy : float = 0.1f;
	var currentEnemy : GameObject;
	private var nextFire : float = 0.1f;
        private var nextScan : float = 0.1f;
	var defendRadius : float = 1.0f; 
        var dangerRadius : float = 1.0f; 
function Start () {
	livesLeft = health;
	destinationX = -2;
	destinationY = 0.3;
}

function Update () {

        if (Time.time > nextScan) {
             scanTerritory();
             nextScan = Time.time + 0.1;
        }
        
	moveTo = getMoveDirection();
	shootTo = getShootDirection();


moving();
firing();
}

function getMoveDirection() {
var vektor :Vector2;
var flagDistance = Vector2(destinationX-transform.position.x, destinationY-transform.position.y);
if (currentEnemy != null) {
var enemyDistance = Vector2(currentEnemy.transform.position.x-transform.position.x, currentEnemy.transform.position.y-transform.position.y);
}

if ((currentEnemy == null) || (enemyDistance.magnitude>dangerRadius*5)) {
 vektor = flagDistance.normalized;
} else {
if (flagDistance.magnitude < defendRadius) {
  if (enemyDistance.magnitude > (dangerRadius*2)) {
        vektor = enemyDistance.normalized;
      
  } else { 
      if (enemyDistance.magnitude < dangerRadius) {
        vektor = -enemyDistance.normalized;
      } else {
        vektor = enemyDistance.normalized*(enemyDistance.magnitude-dangerRadius*1.5)*2/dangerRadius;
      }
  }
} else {
    if (enemyDistance.magnitude > (dangerRadius*2)) {
      vektor = flagDistance.normalized;
  } else { 
      if (enemyDistance.magnitude < dangerRadius) {
        vektor = (0.75*enemyDistance.normalized/dangerRadius+0.25*flagDistance.normalized).normalized;
      } else {
        vektor = (0.25*enemyDistance.normalized/dangerRadius+0.75*flagDistance.normalized).normalized;
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
}
return vektor;
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
		return vek.normalized;
	} else {
		return Vector2.zero;
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
		var diff = obj.transform.position - transform.position;
     	var curDistance = diff.sqrMagnitude;
      	if (curDistance < distance && curDistance != 0) {
        	closestEnemy = obj;
        	distance = curDistance;
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
			Debug.Log("soldier firing");
			nextFire = Time.time + 0.7;
			createShot('Pistol');
	}
}
function scanTerritory() {
           currentEnemy = findClosestEnemy();
}
function moving() {
        transform.position.x += moveTo.x * velosity * Time.deltaTime;
	transform.position.y += moveTo.y* velosity * Time.deltaTime;
	transform.rotation = Quaternion.Euler(0, 0, angle(shootTo));
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
