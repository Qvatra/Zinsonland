#pragma strict

public class Tower extends MonoBehaviour {
protected var range: float;
protected var rate: float;
protected var damage: float;
protected var shotVelocity: float;
protected var rotationVelocity: int = 45; //grad per sec
protected var scanTime: float = 1f;
private var time: int;
private var currentAng: float;

function Awake(){
	time = Time.time;
}

public function Tower(){}
    
public function rotate(gun: GameObject, angle: float){
	//if(Time.time - time > scanTime){
 		Debug.Log('rotating at scan time');
 		currentAng = gun.transform.eulerAngles.z;

 		if(currentAng < angle) {
 			gun.transform.Rotate(Vector3(0,0,1), rotationVelocity * Time.deltaTime);
 		}
 	//	time = Time.time;
 	//}
}
        
public function fire(shotPrefab: GameObject){
	Debug.Log('firing');
}

                 
}