#pragma strict

private var p01 : GameObject;
private var vx : float;
private var vy : float;
var force : float;

function Start () {
	_stat.shotsFired++;
	Physics2D.IgnoreLayerCollision(8, 9, true);
	var vektor : Vector2;
	p01  = GameObject.FindGameObjectWithTag("player01");
	var dx = player01.aimPos.x - p01.transform.position.x;
	var dy = player01.aimPos.y - p01.transform.position.y;
	if (_GM.weapon == 'Shotgun') {
		vektor = Vector2(dx*force, dy*force);
		rigidbody2D.AddForce(Vector2(vektor.x+Random.Range(-0.15,0.15), vektor.y+Random.Range(-0.15,0.15)).normalized);
	} else if (_GM.weapon == 'Assault_rifle') {
		vektor = Vector2(dx*force, dy*force);
		rigidbody2D.AddForce(Vector2(vektor.x+Random.Range(-0.05,0.05), vektor.y+Random.Range(-0.05,0.05)).normalized);
	} else {
		rigidbody2D.AddForce(Vector2(dx*force, dy*force).normalized);
	}
}

function OnCollisionEnter2D (hitInfo : Collision2D) {
	if (hitInfo.collider.name == "_Box" || hitInfo.collider.name == "enemy01(Clone)") {
		Destroy(gameObject);
	}
}
