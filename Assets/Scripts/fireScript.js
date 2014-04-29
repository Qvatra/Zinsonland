#pragma strict

var shot : GameObject;

function Start () {

}

function Update () {
	if(Input.GetButtonDown("Fire1")){
		Instantiate (shot, transform.position, transform.rotation);
	}
}

