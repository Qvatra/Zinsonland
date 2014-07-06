#pragma strict
public class MachineGun extends Weapon {

function Start () {
	ammoLeft = 1;
	_stat.ammoLeft = 0;
	Debug.Log("into the start function");
}

function Update () {

}


function fire(direction : Vector2, position : Vector3, anim : Animator) : IEnumerator {
			
				Debug.Log("fire!!!!!!!!!!!!!!!!!!!!!!!!!");
				createShot(direction, position);
	    		audio.PlayOneShot(shotSound, 0.1);
}

function createShot(direction : Vector2, position : Vector3){
	Debug.Log("shoting");
	var shotClone: GameObject = Instantiate(shotPrefab);
	var shotCloneScript = shotClone.GetComponent(shot);
	//square accuracy
	shotCloneScript.shotDirection = direction.normalized + Vector2(Random.Range(-accuracy, accuracy),Random.Range(-accuracy, accuracy));
	shotCloneScript.damage = damage;
	shotCloneScript.startPosition = Vector2(position.x, position.y);
}
}