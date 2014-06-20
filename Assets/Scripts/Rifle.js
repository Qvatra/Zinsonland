#pragma strict
public class Rifle extends Weapon {

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
			// how edit animation?
			//owner.animation.SetInteger("action", reloadAnim);
			//owner.animation.speed = 0.6f;;
			yield WaitForSeconds(0.3);
			audio.PlayOneShot(reloadSound, 0.5);
}

function fire(direction : Vector2, position : Vector3, anim : Animator) : IEnumerator {
			
			if((Time.time > nextFire) && Input.GetButton("Fire1")) {
				Debug.Log("fire!!!!!!!!!!!!!!!!!!!!!!!!!");
				nextFire = Time.time + fireSpeed;
				createShot(direction, position);
	    		audio.PlayOneShot(shotSound, 0.1);
	    		ammoLeft--;
	    		_stat.ammoLeft = ammoLeft;
	    	}
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