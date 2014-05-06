#pragma strict

var anim : Animator;
var shot : GameObject;
var aim01 : Transform;
static var aimPos : Vector3;
var health : int;
var cam : Camera;

private var nextFire : float = 0.0;
private var action : int = 0;
private var localScaleX : float;
private var mouse : Vector2;
private var direction : Vector2;
private var rot: int;
private var alive: boolean = true;

function Start () {
	localScaleX = transform.localScale.x;
	_stat.livesLeft = health;
}

function Update () {
	if (_stat.livesLeft > 0){
		mouse = cam.ScreenToWorldPoint(Input.mousePosition);
		direction = (transform.position - mouse).normalized;
		transform.RotateAround (Vector3.zero, Vector3(0,0,1), 0);
		rot = angle();
		transform.rotation = Quaternion.Euler(0, 0, rot);
		
		Firing();
		
		aimPos = aim01.position;
		transform.position.x += Input.GetAxis("Horizontal")* _GM.p01vel * Time.deltaTime;
		transform.position.y += Input.GetAxis("Vertical")* _GM.p01vel * Time.deltaTime;
	
		//transform.localScale.x = Mathf.Sign(Input.GetAxis("Horizontal"))*localScaleX; //unity bug with OnTriggerExit2D
	
		if(Input.GetAxis("Horizontal")!=0 || Input.GetAxis("Vertical")!=0){
			anim.SetInteger("action", 1);
		} else {
			anim.SetInteger("action", 0);
		}
	} else {
		if(alive)death();
	}
}

function death(){
	alive = false;
	anim.SetInteger("action", 2);
	yield WaitForSeconds(2);
	Destroy(GetComponent(Collider2D));
}

function angle(){
	var ang;
	if(direction.y >= 0){
		ang = 360 - Vector2.Angle(direction, Vector2(-1, 0));
	} else {
		ang = Vector2.Angle(direction, Vector2(-1, 0));
	}
	return ang;
}

function Firing() {
	if(_GM.weapon == 'Pistol' && Input.GetButtonDown("Fire1") && Time.time > nextFire){
		nextFire = Time.time + 1;
		Instantiate (shot, transform.position, transform.rotation);
	} else if(_GM.weapon == 'Assault_rifle' && Input.GetButton("Fire1") && Time.time > nextFire){
		nextFire = Time.time + 0.2;
		Instantiate (shot, transform.position, transform.rotation);
	} else if(_GM.weapon == 'Shotgun' && Input.GetButtonDown("Fire1") && Time.time > nextFire){
		nextFire = Time.time + 1.5;
		Instantiate (shot, transform.position, transform.rotation);
		Instantiate (shot, transform.position, transform.rotation);
		Instantiate (shot, transform.position, transform.rotation);
		Instantiate (shot, transform.position, transform.rotation);
		Instantiate (shot, transform.position, transform.rotation);
	}
}