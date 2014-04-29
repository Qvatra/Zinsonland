#pragma strict

var player01 : Transform;
var cam : Camera;
private var mouse:Vector2;

function Start () {

}

function Update () {
	mouse = cam.ScreenToWorldPoint(Input.mousePosition);
	transform.position.y = player01.position.y + _GM.aimDist * (mouse.y - player01.position.y)/Mathf.Sqrt((mouse.y-player01.position.y)*(mouse.y-player01.position.y)+(mouse.x-player01.position.x)*(mouse.x-player01.position.x));
	transform.position.x = player01.position.x + _GM.aimDist * (mouse.x - player01.position.x)/Mathf.Sqrt((mouse.y-player01.position.y)*(mouse.y-player01.position.y)+(mouse.x-player01.position.x)*(mouse.x-player01.position.x));
}