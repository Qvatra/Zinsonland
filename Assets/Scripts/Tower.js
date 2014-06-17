#pragma strict

public class Tower extends MonoBehaviour {
var range: float = 2f;
var rate: float;
var damage: float;
var shotVelocity: float;
var rotationVelocity: int = 100; //grad per sec
var scanTime: float = 1f;

private var currentAng: float;
private var threshold: int = 3; //threshold in grad to avoid vibration
private var time: float = 0f;
private var target: GameObject;

public function Tower(){}
    
public function rotate(gun: GameObject, angle: float){  //rotate upto angle deg with rotationVelocity
 	currentAng = gun.transform.eulerAngles.z % 360;		//currentAbg[0, 360)
 	angle = angle % 360;								//angle[0, 360)

	if(Mathf.Abs(angle - currentAng) > threshold){
		if(currentAng > angle && currentAng - angle > 180 || currentAng < angle && angle - currentAng < 180) {
			gun.transform.eulerAngles.z = currentAng + Time.deltaTime*rotationVelocity;
		} else {
			gun.transform.eulerAngles.z = currentAng - Time.deltaTime*rotationVelocity;
		}
	} else {
		gun.transform.eulerAngles.z = angle;
	}
}

public function scan(){ //scans the area every scanTime seconds to find a target within the range distance
	if(time > scanTime){
		Debug.Log('scan');
		target = findClosestEnemy();
		time = 0f;
	} else {
		time += Time.deltaTime;
	}
}    

function findClosestEnemy(){
     var distance = Mathf.Infinity;
     var closestEnemy : GameObject = null;
     var obj : GameObject;

	 for(obj in GameObject.FindGameObjectsWithTag("Enemy")) {
	 var enemy = obj.GetComponent(enemy01);
	 	if (enemy.isAlive()) {
			var diff = obj.transform.position - transform.position;
     		var curDistance = diff.sqrMagnitude;
      		if (curDistance < distance && curDistance < range) {
        		closestEnemy = obj;
        		distance = curDistance;
      		}
      	}
	 }
     return closestEnemy;
}    
        
public function fire(shotPrefab: GameObject){
	Debug.Log('firing');
}

                 
}