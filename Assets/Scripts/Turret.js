#pragma strict

public class Turret extends Tower {}

function Awake(){
	gameObject.AddComponent(Tower);
}

function Start () {
	yield WaitForSeconds(3);
	install();
	yield WaitForSeconds(6);
	destroy();
}

function Update () {
	scan();
	followTarget();
	fire();
	if(health < 0)destroy();
}

function install(): IEnumerator{
	tripodAnim.speed = 0.6f;
	tripodAnim.SetInteger("action", 1);
	yield WaitForSeconds(0.6);
	gunAnim.speed = 0.7f;
	gunAnim.SetInteger("action", 1);
	yield WaitForSeconds(1);
	super();
}