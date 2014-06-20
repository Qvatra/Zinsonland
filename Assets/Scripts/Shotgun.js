#pragma strict
public class Shotgun extends Weapon {

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
			nextFire = Time.time + reloadSpeed;
			// how?
			
			yield WaitForSeconds(0.5);
			//anim.SetInteger("action", 42);
			//anim.speed = 2.8f;
			audio.PlayOneShot(reloadSound, 0.2);
			yield WaitForSeconds(1);
			audio.PlayOneShot(reloadSound, 0.1);
			yield WaitForSeconds(1);
			anim.speed = 0.7f;
			yield WaitForSeconds(0.3);
			audio.PlayOneShot(reloadSound, 0.4);
}

function fire(direction : Vector2, position : Vector3, anim : Animator) : IEnumerator {
			
			
			if((Time.time > nextFire) && Input.GetButtonDown("Fire1")) {
				Debug.Log("fire!!!!!!!!!!!!!!!!!!!!!!!!!");
				nextFire = Time.time + fireSpeed;
				for(var i = 0; i < 8; i++){
					createShot(direction, position);
				}
	    		audio.PlayOneShot(shotSound, 0.1);
	    		ammoLeft--;
	    		_stat.ammoLeft = ammoLeft;
	    	}
	    	yield WaitForSeconds(0.2);
				audio.PlayOneShot(reloadSound, 0.2);
				yield WaitForSeconds(0.1);
				//anim.speed = 0.7f;
				//anim.SetInteger("action", 42);
	    	if (ammoLeft<1) {
	    		reload(anim);
	    	}
}

function createShot(direction : Vector2, position : Vector3){
	Debug.Log("shoting");
	var shotClone: GameObject = Instantiate(shotPrefab);
	var shotCloneScript = shotClone.GetComponent(shot);
	var delta: float  = Random.Range(-0.05, 0.05);
	shotCloneScript.shotDirection = direction;
	shotCloneScript.startPosition = Vector2(position.x, position.y) + direction * delta;
}
}