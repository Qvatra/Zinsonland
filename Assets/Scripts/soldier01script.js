#pragma strict
	var shot : GameObject;
	var health : int;
	var livesLeft : float;
	var moveTo : Vector2;
	var shootTo : Vector2;
	var destinationX : float;
	var destinationY : float;
	var velosity : float = 0.4f;
	var accuracy : float = 0.1f;
	private var nextFire : float = 0.1f;
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
	firing();
}

function getMoveDirection() {
	var vektor = Vector2(destinationX-transform.position.x, destinationY-transform.position.y);
	if (vektor.magnitude>0.0001) {
		return vektor.normalized;
	} else {
		return Vector2(0,0);
	}
}

function getShootDirection() {
	var enemy = findClosestEnemy();
	if (enemy!=null) {
		var vek = Vector2(enemy.transform.position.x + Random.Range(-accuracy, accuracy), enemy.transform.position.y + Random.Range(-accuracy, accuracy));
		return vek.normalized;
	} else {
		return Vector2(0,0);
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

function firing() {
	if(Time.time > nextFire) {
			Debug.Log("soldier firing");
			nextFire = Time.time + 0.7;
			var position: Vector3 = transform.position + _GM.shotAppearDist*shootTo;
			Instantiate (shot, position, transform.rotation);
	}
}