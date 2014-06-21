#pragma strict

var audioExplosion: AudioClip;

function Start () {
	transform.position.z = 1.5f;
	
	audio.pitch = 1.3;
	audio.PlayOneShot(audioExplosion, 0.3);
}

function Update () {

}