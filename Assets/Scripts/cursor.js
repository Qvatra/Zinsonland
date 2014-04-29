#pragma strict

var cam : Camera;

function Start () {
	Screen.showCursor = false;
}

function Update () {
	transform.position.x = cam.ScreenToWorldPoint(Input.mousePosition).x;
	transform.position.y = cam.ScreenToWorldPoint(Input.mousePosition).y;
	
}