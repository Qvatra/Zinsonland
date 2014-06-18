#pragma strict

public class Turret extends Tower {}

function Awake(){
	gameObject.AddComponent(Tower);
		
	gunAnim.speed = 0.5f;
	gunAnim.SetBool("build", true);
	//yield WaitForSeconds(1);
	tripodAnim.speed = 0.5f;
	tripodAnim.SetBool("build", true);
}

function Start () {
	
}

function Update () {
	followTarget();
	scan();
	fire();
	if(health < 0)death();
}
