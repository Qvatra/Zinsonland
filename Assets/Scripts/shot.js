#pragma strict

var velocity : int;
var shotDirection: Vector2;
var startPosition: Vector3;
var weapon: String;

private var vx : float;
private var vy : float;
private	var direction : Vector2;
private var lineRenderer : LineRenderer;
private var time : float;
private var toDelTime : float = 0f; //should be 0f;

function Start () {
	transform.position = startPosition + _GM.shotAppearDist*shotDirection;
	_stat.shotsFired++;
	Physics2D.IgnoreLayerCollision(8, 9, true);
	Physics2D.IgnoreLayerCollision(9, 9, true);
	if (weapon == 'Shotgun') {
		direction = Vector2(shotDirection.x + Random.Range(-0.15,0.15), shotDirection.y + Random.Range(-0.15,0.15)).normalized;
	} else if (weapon == 'Assault_rifle') {
		direction = Vector2(shotDirection.x + Random.Range(-0.05,0.05), shotDirection.y + Random.Range(-0.05,0.05)).normalized;
	} else if (weapon == 'Pistol') {
		direction = Vector2(shotDirection.x, shotDirection.y).normalized;
	}
	rigidbody2D.velocity = direction*velocity;
	
	lineRenderer = GetComponent(LineRenderer);		
	var rndDist = _GM.shotAppearDist + _GM.aimDist * Random.Range(0f,0.8f);
	lineRenderer.SetPosition(0, startPosition + direction*rndDist);
	lineRenderer.SetPosition(1, startPosition + direction*_GM.shotDist);
	time = Time.time;
}

function Update(){
/*
	//deletes shot after 0.05 sec if it slows down
	if(toDelTime==0f && rigidbody2D.velocity.magnitude < velocity) {
		toDelTime = Time.time;
	}
	
	if(toDelTime!=0f && Time.time - toDelTime > 0.05){
		Destroy(gameObject);
	}
	//eos
*/	
	if(Mathf.Abs(transform.position.x)>5 || Mathf.Abs(transform.position.y)>5){
		Destroy(gameObject);
	}
	
	//deletes shot trace after x seconds
	if(Time.time - time > 0.02){
		Destroy(lineRenderer);
	}
}

//used in enemy to draw blood splatter
function bulletDirection(){
	var dir: Vector3 = Vector3(direction.x,direction.y);
	return dir;
}
