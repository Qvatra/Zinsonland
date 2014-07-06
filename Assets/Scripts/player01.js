#pragma strict

var anim : Animator;
var feetAnim : Animator;
var aim01 : Transform;
static var aimPos : Vector3;
var health : float;
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
var pistol : GameObject;
private var localScaleX : float;
private var direction : Vector2; //normalized vector of shoting direction
private var alive: boolean = true;
var state: String = 'stand'; //state of animation clip
private var moving: boolean = false;
private var soldier01: GameObject;
private var mouse : Vector2;
var currWeapon : Weapon;
function Start () {
	localScaleX = transform.localScale.x;
	soldier01 = GameObject.Find("soldier01");
	currWeapon = Instantiate(pistol).GetComponent("Weapon");
}

function Update () {
	if (health > 0){
		mouse = cam.ScreenToWorldPoint(Input.mousePosition);
		direction.x = mouse.x - transform.position.x;
		direction.y = mouse.y - transform.position.y;
		
		transform.rotation = Quaternion.Euler(0, 0, angle());
		
		if(Input.GetButtonDown("Fire2")) {
			soldier01.SendMessage("setDestination",cam.ScreenToWorldPoint(Input.mousePosition));
		}
		
		
			if((Time.time > currWeapon.nextFire) && ((currWeapon.autofire && Input.GetButton("Fire1"))||(!currWeapon.autofire && Input.GetButtonDown("Fire1")))) {
				if (currWeapon.ammoLeft>0) {
					state = 'fire';
					currWeapon.nextFire = Time.time + currWeapon.fireSpeed;
					currWeapon.fire(direction, transform.position, anim);
				} else if(state != 'reload' && state != 'reload_shot') {
					state = 'reload';
					currWeapon.nextFire = Time.time + currWeapon.reloadSpeed;
					currWeapon.reload(anim);
				}
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
				anim.speed = 1f;
				anim.SetInteger("action", currWeapon.walkAnim);
		} else if (!moving && state != 'stand' && state != 'reload' && state != 'reload_shot') {
			state = 'stand';
				anim.speed = 0.4f;
				anim.SetInteger("action", currWeapon.walkAnim);
		}
		
	} else {
		if(alive)death();
	}
}

function death(){
Debug.Log("death");
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


function damage(dmg : float) {
	health -= dmg;
}

function isAlive() {
	return alive;
}
