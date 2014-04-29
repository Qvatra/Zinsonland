#pragma strict

var texToDraw : Texture2D;
var x: int;
var y: int;
private var pix1:Color32[];
private var pix2:Color32[];
private var pix3:Color32[];
var angle: int;

function Start (){
		var background : Texture2D = Instantiate(renderer.material.mainTexture);
        pix1 = background.GetPixels32();
        pix2 = texToDraw.GetPixels32();
		var W = texToDraw.width;
		var H = texToDraw.height;
		

		
		pix3 = rotateSquare(pix2, Mathf.Deg2Rad*angle);
		
	    for (var j = 0; j < H; j++){
        	for (var i = 0; i < W; i++) {
				//pix1[background.width/2 - texToDraw.width/2 + x + i + background.width*(background.height/2-texToDraw.height/2+j+y)] = pix2[i + j*texToDraw.width];
				pix1[background.width/2 - W/2 + x + i + background.width*(background.height/2-H/2+j+y)] = pix3[i + j*W];
				
        	}
        }
        
        background.SetPixels32(pix1);
        background.Apply();
        renderer.material.mainTexture = background;
}

function rotateSquare(arr:Color32[], phi:float){
	var x:int;
	var y:int;
	var i:int;
	var j:int;
    var sn:float = Mathf.Sin(phi);
    var cs:float = Mathf.Cos(phi);
    var texture: Texture2D = Instantiate(texToDraw);
    var arr2:Color32[] = texture.GetPixels32();
    var W:int = texture.width;
    var H:int = texture.height;
    var xc: int = W/2;
    var yc: int = H/2;
    
    for (j=0; j<H; j++){
    	for (i=0; i<W; i++){
          arr2[j*W+i] = new Color32(0,255,0,100); //На всякий случай заполняем картинку цветом фона
          
          x = cs*(i-xc)+sn*(j-yc)+xc;
          y = -sn*(i-xc)+cs*(j-yc)+yc;
          
          if ((x>-1) && (x<W) &&(y>-1) && (y<H)){ //Проверяем, не выходит ли точка за пределы области
          	arr2[j*W+i]=arr[y*W+x];
          }
        }
    }
    return arr2;
}