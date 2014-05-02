#pragma strict

private var p01 : GameObject;
private var vx : float;
private var vy : float;
private	var direction : Vector2;
var velocity : int;
//private var camScript: _MainCam;

function Start () {
	//camScript = GameObject.Find("_MainCam").GetComponent('_MainCam');

	_stat.shotsFired++;
	Physics2D.IgnoreLayerCollision(8, 9, true);
	p01  = GameObject.Find("player01");
	var dx = player01.aimPos.x - p01.transform.position.x;
	var dy = player01.aimPos.y - p01.transform.position.y;

	if (_GM.weapon == 'Shotgun') {
		direction = Vector2(dx + Random.Range(-0.15,0.15), dy + Random.Range(-0.15,0.15)).normalized;
	} else if (_GM.weapon == 'Assault_rifle') {
		direction = Vector2(dx + Random.Range(-0.05,0.05), dy + Random.Range(-0.05,0.05)).normalized;
	} else { //Pistol
		direction = Vector2(dx, dy).normalized;
	}
	
	rigidbody2D.velocity = direction*velocity;
}

function Update(){
	if(rigidbody2D.velocity == Vector2.zero) Destroy(gameObject);
}

function angle(){
	var ang;
	if(direction.y >= 0){
		ang = 180 + Vector2.Angle(direction, Vector2.right);
	} else {
		ang = 180 - Vector2.Angle(direction, Vector2.right);
	}
	return ang;
}

function OnCollisionEnter2D (hitInfo : Collision2D) {
	if (hitInfo.collider.name == "_Box" || hitInfo.collider.name == "enemy01(Clone)") {
		Destroy(gameObject);
	}
}
