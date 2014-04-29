#pragma strict

var tower01: Texture2D;
var tower02: Texture2D;
var wall11: Texture2D;
private	var rect01:Rect;
private	var rect02:Rect;
private	var rect11:Rect;
private var currentItem:int;
var items: int;
var itemSize: int;
private var W:int;
private var H:int;
private var dx:int;
private var dy:int;
private	var i:int;
private	var rect:Rect;

function Start () {
	var msg: GameObject = GameObject.Find('Message');
	var text: GUIText = msg.GetComponent(GUIText);
	
	if(_stat.livesLeft > 0) text.text = "Congratulations!";
	else text.text = "Defeated!";
}

function OnGUI () {
	W = Screen.width;
	H = Screen.height;
	dx = W/(2*items+1);
	dy = 1.2*itemSize;
	
	GUI.Box(Rect (0, 0, W, 2*dy), "Level Bonus");
	//first row
	i=0;
	rect01 = new Rect((2*i+1)*dx + (dx-itemSize)/2, (dy-itemSize)/2, itemSize, itemSize);
	GUI.DrawTexture(rect01, tower01, ScaleMode.ScaleToFit, true, 0);
	if(currentItem == 1) GUI.Box(rect01,"");
	i=1;
	rect02 = new Rect((2*i+1)*dx + (dx-itemSize)/2, (dy-itemSize)/2, itemSize, itemSize);
	GUI.DrawTexture(rect02, tower02, ScaleMode.ScaleToFit, true, 0);
	if(currentItem == 2) GUI.Box(rect02,"");
	//second row
	i=0;
	rect11 = new Rect((2*i+1)*dx + (dx-itemSize)/2, dy +(dy-itemSize)/2, itemSize, itemSize);
	GUI.DrawTexture(rect11, wall11, ScaleMode.ScaleToFit, true, 0);
	if(currentItem == 11) GUI.Box(rect11,"");		
	

	GUI.Box(Rect (0, Screen.height - 100, Screen.width, 100), "");
	if (GUI.Button (Rect (50, Screen.height - 75, 200, 50), "Main Menu")) {
		Application.LoadLevel("MainMenu");
	}
	if (GUI.Button (Rect (Screen.width - 250, Screen.height - 75, 200, 50), "Next Level")) {
		_stat.bonusArray[_stat.bonusArray.length] = currentItem;
		Application.LoadLevel("scene1");
	}
}

function Update(){
	if (rect01.Contains(Vector2(Input.mousePosition.x,Screen.height - Input.mousePosition.y)) && Input.GetMouseButtonDown(0)) {
  		currentItem = 1;
	}
	if (rect02.Contains(Vector2(Input.mousePosition.x,Screen.height - Input.mousePosition.y)) && Input.GetMouseButtonDown(0)) {
    	currentItem = 2;
	}
	if (rect11.Contains(Vector2(Input.mousePosition.x,Screen.height - Input.mousePosition.y)) && Input.GetMouseButtonDown(0)) {
    	currentItem = 11;
	}
}