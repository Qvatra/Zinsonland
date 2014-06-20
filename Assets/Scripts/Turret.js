#pragma strict

public class Turret extends Tower {}

function Awake(){
	gameObject.AddComponent(Tower);
}

function Start () {
	yield WaitForSeconds(5);
	install();
	yield WaitForSeconds(10);
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

function destroy(): IEnumerator{
	super();
	gunAnim.speed = 0.8f;
	gunAnim.SetInteger("action", 2);
	yield WaitForSeconds(0.4);
	tripodAnim.speed = 0.8f;
	tripodAnim.SetInteger("action", 2);
}
