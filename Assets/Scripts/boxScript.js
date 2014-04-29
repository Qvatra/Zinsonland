#pragma strict

private var cam: Camera;
var rSpeed: float;

function Start () {
	cam = GameObject.Find("_MainCam").GetComponent(Camera);
}

function OnMouseDrag(){
	if(!_stat.gameRunning){
		var z:int = transform.position.z;
		transform.position = cam.ScreenToWorldPoint(Input.mousePosition);
		transform.position.z = z;
	
		if (Input.GetAxis("Horizontal")){
			rigidbody2D.angularVelocity = -Input.GetAxis("Horizontal") * rSpeed;
		} else {
			rigidbody2D.angularVelocity = 0;
		}
	}
}

function OnMouseUpAsButton(){
	rigidbody2D.angularVelocity = 0;
	rigidbody2D.velocity = Vector2.zero;
}

function OnCollisionEnter2D (hitInfo : Collision2D) {
	if (hitInfo.gameObject.tag == "Enemy"){
		rigidbody2D.angularVelocity = 0;
		rigidbody2D.velocity = Vector2.zero;
	}
}