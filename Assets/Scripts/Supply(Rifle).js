#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter2D (hitInfo : Collider2D) {
	if (hitInfo.name == "player01") {
		_GM.weapon = 'Assault_rifle';
		Destroy(gameObject);
	}
}