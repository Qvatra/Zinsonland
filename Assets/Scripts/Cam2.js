#pragma strict

var mat : Material;
var cam2 : Camera;
var x1: float;
var y1: float;
var x2: float;
var y2: float;

function Start () {

}

function Update () {

}

function OnPostRender(){
		GL.PushMatrix();
		mat.SetPass(0);
		GL.LoadOrtho();
		GL.Begin(GL.LINES);
		if (_GM.weapon == 'Pistol'){
			GL.Color(Color.yellow);
			GL.Vertex(cam2.WorldToViewportPoint(Vector3(x1,y1,-15f)));
			GL.Vertex(cam2.WorldToViewportPoint(Vector3(x2,y2,-15f)));
		}
		GL.End();
		GL.PopMatrix();
}