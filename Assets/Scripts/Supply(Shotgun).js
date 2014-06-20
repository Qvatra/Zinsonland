#pragma strict
var shotgun : GameObject;
var audioPick: AudioClip;
private var toDel: boolean = false;

function Update () {
	transform.RotateAround (transform.position, Vector3(0,0,1), 0.8);
	if(toDel) transform.localScale -= Vector3(Time.deltaTime*0.2,Time.deltaTime*0.2,0);
}

function OnTriggerEnter2D (hitInfo : Collider2D) {
	if (hitInfo.name == "player01" && !toDel) {
		if(hitInfo.gameObject.GetComponent(player01).state == 'reload') return;
		toDel = true;
		//_GM.weapon = 'Shotgun';
		//_stat.ammoLeft = 8;
		
		GameObject.Find("player01").GetComponent(player01).currWeapon = Instantiate(shotgun).GetComponent("Weapon");
		
		audio.PlayOneShot(audioPick, 0.5);

		yield WaitForSeconds(0.5);
		Destroy(gameObject);
	}
}