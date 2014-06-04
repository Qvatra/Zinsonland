#pragma strict

var anim : Animator;
var feetAnim : Animator;
var shotPrefab : GameObject;
var aim01 : Transform;
static var aimPos : Vector3;
var health : int;
var cam : Camera;
var audioPistol: AudioClip;
var audioAssault_rifle: AudioClip;
var audioShotgun: AudioClip;
var audioDeath: AudioClip;
var audioReloadAssault_rifle: AudioClip;
var audioReloadShotgun: AudioClip;
var audioReloadShotgun2: AudioClip;
var audioReloadShotgun3: AudioClip;
var audioReloadPistol: AudioClip;

private var nextFire : float = 1f; //1 to prevent shot at button
private var localScaleX : float;
private var direction : Vector2; //normalized vector of shoting direction
private var alive: boolean = true;
var state: String = 'stand'; //state of animation clip
private var moving: boolean = false;
private var soldier01: GameObject;
private var mouse : Vector2;

function Start () {
	localScaleX = transform.localScale.x;
	_stat.livesLeft = health;
	soldier01 = GameObject.Find("soldier01");
}

function Update () {
	if (_stat.livesLeft > 0){
		mouse = cam.ScreenToWorldPoint(Input.mousePosition);
		direction.x = mouse.x - transform.position.x;
		direction.y = mouse.y - transform.position.y;
		direction = direction.normalized;
		
		transform.rotation = Quaternion.Euler(0, 0, angle());
		
		if(Input.GetButtonDown("Fire2")) {
			soldier01.SendMessage("setDestination",cam.ScreenToWorldPoint(Input.mousePosition));
		}
		
		if(_GM.weaponLoad > 0){
			if(Time.time > nextFire) firing();
		} else if(state != 'reload' && state != 'reload_shot') {
			reloadWeapon();
		}
		
		aimPos = aim01.position;
		transform.position.x += Input.GetAxis("Horizontal")* _GM.p01vel * Time.deltaTime;
		transform.position.y += Input.GetAxis("Vertical")* _GM.p01vel * Time.deltaTime;
	
		if (Input.GetAxis("Horizontal")!=0 || Input.GetAxis("Vertical")!=0){
			if(!moving && alive){
				moving = true;
				feetAnim.SetBool("walk", moving);
			}	
		} else {
			if(moving){
				moving = false;
				feetAnim.SetBool("walk", moving);
			}	
		}
		
		if(moving && state != 'walk' && state != 'reload' && state != 'reload_shot'){
			state = 'walk';
			if(_GM.weapon == 'Pistol'){
				anim.speed = 1f;
				anim.SetInteger("action", 11);
			} else if(_GM.weapon == 'Assault_rifle'){
				anim.speed = 1f;
				anim.SetInteger("action", 21);
			} else if(_GM.weapon == 'Shotgun'){
				anim.speed = 1f;
				anim.SetInteger("action", 31);
			}

		} else if (!moving && state != 'stand' && state != 'reload' && state != 'reload_shot') {
			state = 'stand';
			if(_GM.weapon == 'Pistol'){
				anim.speed = 0.4f;
				anim.SetInteger("action", 11);
			} else if(_GM.weapon == 'Assault_rifle'){
				anim.speed = 0.4f;
				anim.SetInteger("action", 21);
			} else if(_GM.weapon == 'Shotgun'){
				anim.speed = 0.4f;
				anim.SetInteger("action", 31);
			}
		}
		
	} else {
		if(alive)death();
	}
}

function death(){
	audio.PlayOneShot(audioDeath, 0.4);
	alive = false;
	anim.speed = 1f;
	anim.SetInteger("action", 0);
	feetAnim.SetBool("walk", false);
	yield WaitForSeconds(1);
	Destroy(GetComponent(Collider2D));
}

function angle(){
	var ang = Vector2.Angle(direction, Vector2.right);
	if(direction.y < 0)ang = -ang;
	return ang;
}

function shotDirection(){
	return direction;
}

function createShot(weapon){
	var shotClone: GameObject = Instantiate(shotPrefab);
	var shotCloneScript = shotClone.GetComponent(shot);
	var delta: float  = Random.Range(-0.05, 0.05);
	shotCloneScript.shotDirection = direction;
	shotCloneScript.startPosition = transform.position + direction * delta;
	shotCloneScript.weapon = weapon;
}

function firing() {
		state = 'fire';

		if(Input.GetButtonDown("Fire1") && _GM.weapon == 'Pistol'){
			nextFire = Time.time + 0.7;
			createShot(_GM.weapon);
	    	audio.PlayOneShot(audioPistol, 0.1);
	    	_GM.weaponLoad--;
		} else if(Input.GetButton("Fire1") && _GM.weapon == 'Assault_rifle'){
			nextFire = Time.time + 0.17;
			createShot(_GM.weapon);
			audio.PlayOneShot(audioAssault_rifle, 0.4);
			_GM.weaponLoad--;
		} else if(Input.GetButtonDown("Fire1") &&_GM.weapon == 'Shotgun'){
			nextFire = Time.time + 1.5;
			for(var i = 0; i < 8; i++){
				createShot(_GM.weapon);
			}
			audio.PlayOneShot(audioShotgun, 0.4);
			_GM.weaponLoad--;
			
			if(_GM.weaponLoad > 0) {
				yield WaitForSeconds(0.2);
				audio.PlayOneShot(audioReloadShotgun3, 0.2);
				yield WaitForSeconds(0.1);
				state = 'reload_shot';
				anim.speed = 0.7f;
				anim.SetInteger("action", 32);
			}
		}
}

function reloadWeapon() {
		state = 'reload';
		if(_GM.weapon == 'Pistol'){
			nextFire = Time.time + 1.5;
			_GM.weaponLoad = 5;
			anim.SetInteger("action", 12);
			anim.speed = 0.6f;
			yield WaitForSeconds(0.3);
			audio.PlayOneShot(audioReloadPistol, 0.5);

		} else if(_GM.weapon == 'Assault_rifle'){
			nextFire = Time.time + 3;
			_GM.weaponLoad = 30;
			audio.PlayOneShot(audioReloadAssault_rifle, 0.2);
			yield WaitForSeconds(0.5);
			anim.SetInteger("action", 22);
			anim.speed = 0.6f;
		} else if(_GM.weapon == 'Shotgun'){
			nextFire = Time.time + 3.6;
			_GM.weaponLoad = 8;
			yield WaitForSeconds(0.5);
			anim.SetInteger("action", 32);
			anim.speed = 2.8f;
			audio.PlayOneShot(audioReloadShotgun, 0.2);
			yield WaitForSeconds(1);
			audio.PlayOneShot(audioReloadShotgun, 0.1);
			yield WaitForSeconds(1);
			anim.speed = 0.7f;
			yield WaitForSeconds(0.3);
			audio.PlayOneShot(audioReloadShotgun2, 0.4);
		}
}