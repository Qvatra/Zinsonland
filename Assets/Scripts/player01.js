#pragma strict

var anim : Animator;
var shot : GameObject;
var aim01 : Transform;
static var aimPos : Vector3;
var health : int;
private var nextFire : float = 0.0;
private var action : int = 0;
private var localScaleX : float;

function Start () {
	localScaleX = transform.localScale.x;
	_stat.livesLeft = health;
}

function Update () {
	if (_stat.livesLeft > 0){
		
		Firing();

		transform.position.x += Input.GetAxis("Horizontal")* _GM.p01vel * Time.deltaTime;
		transform.position.y += Input.GetAxis("Vertical")* _GM.p01vel * Time.deltaTime;
	
		//transform.localScale.x = Mathf.Sign(Input.GetAxis("Horizontal"))*localScaleX; //unity bug with OnTriggerExit2D
	
		if(Input.GetAxis("Horizontal")!=0 || Input.GetAxis("Vertical")!=0){
			anim.SetInteger("action", 1);
		} else {
			anim.SetInteger("action", 0);
		}
	} else {
		anim.SetInteger("action", 3);
	}
}
function Firing() {
	if(_GM.weapon == 'Pistol' && Input.GetButtonDown("Fire1") && Time.time > nextFire){
			nextFire = Time.time + 1;
			Instantiate (shot, transform.position, transform.rotation);
			aimPos = aim01.position;
			anim.SetInteger("action", 2);
	} else if(_GM.weapon == 'Assault_rifle' && Input.GetButton("Fire1") && Time.time > nextFire){
		nextFire = Time.time + 0.2;
		Instantiate (shot, transform.position, transform.rotation);
		aimPos = aim01.position;
		anim.SetInteger("action", 2);
	} else if(_GM.weapon == 'Shotgun' && Input.GetButtonDown("Fire1") && Time.time > nextFire){
		nextFire = Time.time + 1.5;
		Instantiate (shot, transform.position, transform.rotation);
		Instantiate (shot, transform.position, transform.rotation);
		Instantiate (shot, transform.position, transform.rotation);
		Instantiate (shot, transform.position, transform.rotation);
		Instantiate (shot, transform.position, transform.rotation);
		aimPos = aim01.position;
		anim.SetInteger("action", 2);
	}
}