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
	
	private var nextFire : float = 0.1f;
	private var moving: boolean = false;
	
function Start () {
	livesLeft = health;
	destinationX = -2;
	destinationY = 0.3;
}

function Update () {
	moveTo = getMoveDirection();
	shootTo = getShootDirection();
	transform.position.x += moveTo.x * velosity * Time.deltaTime;
	transform.position.y += moveTo.y* velosity * Time.deltaTime;
	transform.rotation = Quaternion.Euler(0, 0, angle(shootTo));
	firing();
}

function getMoveDirection() {
	var vektor = Vector2(destinationX-transform.position.x, destinationY-transform.position.y);
	if (vektor.magnitude > 0.01) {
		if(!moving){
			moving = true;
			anim.speed = 1f;
			anim.SetInteger("action", 11);
			feetAnim.SetBool("walk", moving);
		}
		return vektor.normalized;
	} else {
		if(moving){
			moving = false;
			anim.speed = 0.4f;
			anim.SetInteger("action", 11);
			feetAnim.SetBool("walk", moving);
		}
		return Vector2.zero;
	}
}

function angle(dir: Vector2){
	var ang = Vector2.Angle(dir, Vector2.right);
	if(dir.y < 0)ang = -ang;
	return ang;
}

function getShootDirection() {
	var enemy = findClosestEnemy();
	if (enemy!=null) {
		var vek = Vector2(enemy.transform.position.x + Random.Range(-accuracy, accuracy), enemy.transform.position.y + Random.Range(-accuracy, accuracy));
		return vek.normalized;
	} else {
		return Vector2.zero;
	}
}

function setDestination(mouse : Vector3) {
	destinationX = mouse.x;
	destinationY = mouse.y;
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