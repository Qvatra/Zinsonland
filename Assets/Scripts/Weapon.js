﻿#pragma strict
public class Weapon extends MonoBehaviour {

var nextFire : float = 1f; //1 to prevent shot at button
var shotPrefab : GameObject;
var shotSound : AudioClip;
var reloadSound : AudioClip;
var walkAnim : int;
var shotAnim : int;
var reloadAnim : int;
var ammoValue : int;
var fireSpeed : float;
var reloadSpeed : float;
var ammoLeft : int;
var accuracy : float;
var damage : float;
var autofire : boolean;

function Start () {

}

function Update () {

}

function fire() {

}

function reload (anim : Animator) : IEnumerator {

}

function fire (direction : Vector2, position : Vector3, anim : Animator) : IEnumerator {

}

}