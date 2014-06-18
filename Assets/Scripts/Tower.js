#pragma strict

public class Tower extends MonoBehaviour {
var gunObj: GameObject;
var tripodObj: GameObject;
var gunAnim : Animator;
var tripodAnim : Animator;
var shotPrefab : GameObject;

var health: float = 20f;
var trace: boolean = true;
var range: float = 2f;
var rate: float = 1f;
var damage: float;
var accuracy: float = 0.5f;
var shotVelocity: float;
var rotationVelocity: int = 100; //grad per sec
var scanTime: float = 1f;

private var currentAng: float;
private var threshold: int = 3; //threshold in grad to avoid vibration
private var time: float = 0f;
private var nextFire: float = 0f;
private var shotDir: Vector2;
private var target: GameObject;

public function Tower(){}
/*    
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
*/
public function followTarget(){              //follow target with rotationVelocity
	if(target){
 		currentAng = gunObj.transform.eulerAngles.z % 360;		//currentAbg[0, 360)

 		var vec: Vector2 = Vector2(target.transform.position.x - gunObj.transform.position.x, target.transform.position.y - gunObj.transform.position.y).normalized;

 		var angle = Vector2.Angle(Vector2.right, vec);
		if(vec.y < 0)angle = 360 - angle;

		if(Mathf.Abs(angle - currentAng) > threshold){
			if(currentAng > angle && currentAng - angle > 180 || currentAng < angle && angle - currentAng < 180) {
				gunObj.transform.eulerAngles.z = currentAng + Time.deltaTime*rotationVelocity;
			} else {
				gunObj.transform.eulerAngles.z = currentAng - Time.deltaTime*rotationVelocity;
			}
		} else {
			gunObj.transform.eulerAngles.z = angle;
		}

    	shotDir.x = Mathf.Cos(currentAng*Mathf.Deg2Rad) + Random.Range(-accuracy,accuracy);
    	shotDir.y = Mathf.Sin(currentAng*Mathf.Deg2Rad) + Random.Range(-accuracy,accuracy);
	}
}

public function scan(){ //scans the area every scanTime seconds to find a target within the range distance
	if(Time.time > time){
		target = findClosestEnemy();
		time = Time.time + scanTime;
	} 
}    

function findClosestEnemy(){ //serch for closest enemy in the Tower range 
     var distance = Mathf.Infinity;
     var closestEnemy : GameObject = null;
     var obj : GameObject;

	 for(obj in GameObject.FindGameObjectsWithTag("Enemy")) {
	 var enemy = obj.GetComponent(enemy01);
	 	if (enemy.isAlive()) {
			var diff = obj.transform.position - gunObj.transform.position;
     		var curDistance = diff.magnitude;

      		if (curDistance < distance && curDistance < range) {
        		closestEnemy = obj;
        		distance = curDistance;
      		}
      	}
	 }
     return closestEnemy;
}    
        
public function fire() {
	if(Time.time > nextFire && shotDir != Vector2.zero && target) {
		nextFire = Time.time + rate;
		var shotClone: GameObject = Instantiate(shotPrefab);
		var shotCloneScript = shotClone.GetComponent(shot);
		shotCloneScript.shotDirection = shotDir;
		shotCloneScript.startPosition = transform.position;
		shotCloneScript.velocity = shotVelocity;
		shotCloneScript.damage = damage;
		shotCloneScript.trace = trace;
	}
}
 
public function death() {
	//todo
}               
                          
}