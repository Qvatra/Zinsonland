#pragma strict

private var p01 : GameObject;
private var vx : float;
private var vy : float;
var force : float;

function Start () {
	_stat.shotsFired++;
	Physics2D.IgnoreLayerCollision(8, 9, true);

	p01  = GameObject.FindGameObjectWithTag("player01");
	var dx = player01.aimPos.x - p01.transform.position.x;
	var dy = player01.aimPos.y - p01.transform.position.y;
	rigidbody2D.AddForce(Vector2(dx*force, dy*force));
}

function OnCollisionEnter2D (hitInfo : Collision2D) {
	if (hitInfo.collider.name == "_Box" || hitInfo.collider.name == "enemy01(Clone)") {
		Destroy(gameObject);
	}
}
