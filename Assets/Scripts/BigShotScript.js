#pragma strict

var force : float;

function Start () {
	_stat.towerFired++;
	Physics2D.IgnoreLayerCollision(8, 9, true);
	
	var vect:Vector2 = Vector2(Random.Range(-1f,1f), Random.Range(-1f,1f)).normalized;
	rigidbody2D.AddForce(Vector2(vect.x*force, vect.y*force));
}


function OnCollisionEnter2D (hitInfo : Collision2D) {
	if (hitInfo.collider.name == "_Box" || hitInfo.collider.name == "enemy01(Clone)") {
		Destroy(gameObject);
	}
}
