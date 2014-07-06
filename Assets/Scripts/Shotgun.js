#pragma strict
public class Shotgun extends Weapon {

var reload2 : AudioClip;
var reload3 : AudioClip;

function Start () {
	ammoLeft = ammoValue;
	_stat.ammoLeft = ammoLeft;
	Debug.Log("into the start function");
}

function Update () {

}

function reload(anim : Animator) : IEnumerator {
			Debug.Log("reload begins");
			ammoLeft = ammoValue;
			_stat.ammoLeft = ammoLeft;
			
			yield WaitForSeconds(0.5);
			anim.speed = 2.8f;
			anim.SetInteger("action", 42);
			audio.PlayOneShot(reload2, 0.2);
			yield WaitForSeconds(1);
			audio.PlayOneShot(reload2, 0.1);
			yield WaitForSeconds(1);
			anim.speed = 0.7f;
			yield WaitForSeconds(0.3);
			audio.PlayOneShot(reload3, 0.4);
}

function fire(direction : Vector2, position : Vector3, anim : Animator) : IEnumerator {
			
			
				Debug.Log("fire!!!!!!!!!!!!!!!!!!!!!!!!!");
				for(var i = 0; i < 8; i++){
					createShot(direction, position);
				}
	    		audio.PlayOneShot(shotSound, 0.1);
	    		ammoLeft--;
	    		_stat.ammoLeft = ammoLeft;
	    	
	    	yield WaitForSeconds(0.2);
				audio.PlayOneShot(reloadSound, 0.2);
				yield WaitForSeconds(0.1);
				anim.speed = 0.7f;
				anim.SetInteger("action", 42);
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