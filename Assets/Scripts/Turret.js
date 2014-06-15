#pragma strict

var gunObj: GameObject;
var tripodObj: GameObject;
var gunAnim : Animator;
var tripodAnim : Animator;
var angle: float = 45f;

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
	rotate(gunObj, 60f);
}
