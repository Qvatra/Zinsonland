#pragma strict
public class Uzi extends Weapon {

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
			anim.SetInteger("action", reloadAnim);
			anim.speed = 0.6f;;
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
	//square accuracy
	shotCloneScript.shotDirection = direction.normalized + Vector2(Random.Range(-accuracy, accuracy),Random.Range(-accuracy, accuracy));
	shotCloneScript.damage = damage;
	shotCloneScript.startPosition = Vector2(position.x, position.y);
}
}