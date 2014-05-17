#pragma strict

var player01 : Transform;
var cam : Camera;
private var mouse:Vector2;
private var direction : Vector2; //normalized vector of shoting direction

function Update () {
	var mouse = cam.ScreenToViewportPoint(Input.mousePosition);
	direction = (mouse - Vector2(0.5, 0.5)).normalized;
	transform.position = player01.position + _GM.aimDist * direction;
	transform.position.z = 0.5;
}