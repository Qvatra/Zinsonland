#pragma strict

public class Turret extends Tower {}

function Awake(){
	gameObject.AddComponent(Tower);
}

function Start () {
	audio.pitch = 0.9;
	audio.PlayOneShot(audioInstall, 0.3);
	yield WaitForSeconds(3.5);
	install();
	yield WaitForSeconds(10);
	destroy();
}

function Update () {
	if(!installed) return;
	
	scan();
	followTarget();
	if(fire()){
		audio.pitch = 0.7;
		audio.PlayOneShot(audioShot, 0.1);
	}
	
	if(health < 0)destroy();
}

function install(): IEnumerator{
	audio.pitch = 0.7;
	audio.PlayOneShot(audioRotate, 0.3);
	tripodAnim.speed = 0.4f;
	tripodAnim.SetInteger("action", 1);
	
	yield WaitForSeconds(0.95);
	audio.pitch = 0.8;
	audio.PlayOneShot(audioRotate, 0.2);
	gunAnim.speed = 0.8f;
	gunAnim.SetInteger("action", 1);
	
	yield WaitForSeconds(0.35);
	audio.pitch = 0.9;
	audio.PlayOneShot(audioRotate, 0.2);
	gunAnim.speed = 0.5f;
	yield WaitForSeconds(0.6);
	
	super();
}