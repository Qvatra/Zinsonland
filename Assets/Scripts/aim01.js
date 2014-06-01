#pragma strict

var player01 : Transform;
var cam : Camera;
private var mouse : Vector2;
private var direction : Vector2; //normalized vector of shoting direction

function Update () {
	var mouse = cam.ScreenToWorldPoint(Input.mousePosition);
	direction.x = mouse.x - player01.position.x;
	direction.y = mouse.y - player01.position.y;
	direction = direction.normalized;
	transform.position.x = player01.position.x + _GM.aimDist * direction.x;
	transform.position.y = player01.position.y + _GM.aimDist * direction.y;
	transform.position.z = 0.5;
}