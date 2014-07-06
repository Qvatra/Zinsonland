#pragma strict

var trace: boolean = true;
var damage : float;
var velocity : int;
var shotDirection: Vector2;
var startPosition: Vector3;

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

	direction = Vector2(shotDirection.x, shotDirection.y).normalized;

	rigidbody2D.velocity = direction*velocity;
	
	if(trace){
		lineRenderer = GetComponent(LineRenderer);		
		var rndDist = _GM.shotAppearDist + _GM.aimDist * Random.Range(0f,0.8f);
		lineRenderer.SetPosition(0, startPosition + direction*rndDist);
		lineRenderer.SetPosition(1, startPosition + direction*_GM.shotDist);
	}
	time = Time.time;
}

function Update(){
	if(toDelTime!=0f && Time.time - toDelTime > 0.05){
		//Debug.Log('destroyed');
		onDestroy(transform.position);
	}

	if(toDelTime==0f && rigidbody2D.velocity.normalized != direction) {
		//Debug.Log('direction changed');
		toDelTime = Time.time;
	}
	
	if(Mathf.Abs(transform.position.x)>5 || Mathf.Abs(transform.position.y)>5){
		onDestroy(transform.position);
	}
	
	//deletes shot trace after x seconds
	if(Time.time - time > 0.02 && trace){
		Destroy(lineRenderer);
	}
}

//used in enemy to draw blood splatter
function bulletDirection(){
	return Vector3(direction.x,direction.y);
}

function bulletDamage(){
	if(!damage)damage = 1f;
	return damage;
}

function onDestroy(posit) {
	Destroy(gameObject);
}