#pragma strict

var velocity : int;

private var p01 : GameObject;
private var vx : float;
private var vy : float;
private	var direction : Vector2;
private var lineRenderer : LineRenderer;
private var time : float;

function Start () {
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
	
	lineRenderer = GetComponent(LineRenderer);		
	var rndDist = _GM.shotAppearDist + _GM.aimDist * Random.Range(0f,0.8f);
	lineRenderer.SetPosition(0, p01.transform.position + direction*rndDist);
	lineRenderer.SetPosition(1, p01.transform.position + direction*_GM.shotDist);
	time = Time.time;
}

function Update(){
	if(Time.time - time > 0.002){
		Destroy(lineRenderer);
	}
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

function OnTriggerEnter2D (hitInfo : Collider2D) {
	if (hitInfo.name == "_Box" || hitInfo.name == "enemy01(Clone)") {
		Destroy(gameObject);
	}
}
