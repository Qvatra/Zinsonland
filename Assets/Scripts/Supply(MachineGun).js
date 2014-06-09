#pragma strict

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
		_GM.weapon = 'MachineGun';
		_stat.ammoLeft = 300;
		audio.PlayOneShot(audioPick, 0.5);

		yield WaitForSeconds(0.5);
		Destroy(gameObject);
	}
}