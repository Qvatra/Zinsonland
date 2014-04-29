#pragma strict
var mainCam: Camera;

function Start(){

}

function OnGUI () {
	GUI.Box(Rect (0,0,220,Screen.height), "Main Menu");
	
	if (GUI.Button (Rect (10,40,200,50), "Start")) {
		Application.LoadLevel(1);
	}

	if (GUI.Button (Rect (10,100,200,50), "Options")) {
		//
	}

	if (GUI.Button (Rect (10,160,200,50), "Exit")) {
		Application.Quit();
	}
}