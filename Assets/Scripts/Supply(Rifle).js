#pragma strict

var audioPick: AudioClip;

function Start () {

}

function Update () {

}

function OnTriggerEnter2D (hitInfo : Collider2D) {
	if (hitInfo.name == "player01") {
		_GM.weapon = 'Assault_rifle';
		_GM.weaponLoad = 30;
		audio.PlayOneShot(audioPick, 0.5);
		Destroy(renderer);
		yield WaitForSeconds(1);
		Destroy(gameObject);
	}
}