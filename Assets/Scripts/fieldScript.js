#pragma strict

var texSizeX: int;
var texSizeY: int;

var bloodToDraw : Texture2D;
private var pix1:Color32[];
private var pix2:Color32[];
private var pix3:Color32[];
private var background : Texture2D;

function Start(){
	background = Instantiate(renderer.material.mainTexture);
}

function drawBlood(x:int, y:int, angle: int, color: Color32){
        pix1 = background.GetPixels32();
        pix2 = bloodToDraw.GetPixels32();
		var W = bloodToDraw.width;
		var H = bloodToDraw.height;
		
		pix3 = rotateSquare(pix2, Mathf.Deg2Rad*angle);
		
	    for (var j = 0; j < H; j++){
        	for (var i = 0; i < W; i++) {
        		if(x-W/2+i<500 && x-W/2+i>-500 && y-H/2+j<500 && y-H/2+j>-500){ //to prevent drawing outside background texture
					if(pix3[i + j*W].a != 0)pix1[background.width/2 - W/2 + x + i + background.width*(background.height/2-H/2+j+y)] = color;//pix3[i + j*W];
				}
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
    var texture: Texture2D = Instantiate(bloodToDraw);
    var arr2:Color32[] = texture.GetPixels32();
    var W:int = texture.width;
    var H:int = texture.height;
    var xc: int = W/2;
    var yc: int = H/2;
    
    for (j=0; j<H; j++){
    	for (i=0; i<W; i++){
          //arr2[j*W+i] = new Color32(0,0,0,0); //На всякий случай заполняем картинку alfa = 0
          
          x = cs*(i-xc)+sn*(j-yc)+xc;
          y = -sn*(i-xc)+cs*(j-yc)+yc;
          
          if ((x>-1) && (x<W) &&(y>-1) && (y<H)){ //Проверяем, не выходит ли точка за пределы области
          	arr2[j*W+i]=arr[y*W+x];
          }
        }
    }
    return arr2;
}

function drawLine(x1:int, y1:int, x2:int, y2:int, color:Color) {
	x1 = texSizeX/2 - x1;
	x2 = texSizeX/2 - x2;
	y1 = texSizeY/2 - y1;
	y2 = texSizeY/2 - y2;
	var texture : Texture2D = Instantiate(renderer.material.mainTexture);

	Line(texture, x1, y1, x2, y2, color);

	texture.Apply();
	renderer.material.mainTexture = texture;
}

static function Line (tex : Texture2D, x0 : int, y0 : int, x1 : int, y1 : int, col : Color) {
	var dy = y1-y0;
	var dx = x1-x0;
 
	if (dy < 0) {dy = -dy; var stepy = -1;}
	else {stepy = 1;}
	if (dx < 0) {dx = -dx; var stepx = -1;}
	else {stepx = 1;}
	dy <<= 1;
	dx <<= 1;
 
	tex.SetPixel(x0, y0, col);
	if (dx > dy) {
		var fraction = dy - (dx >> 1);
		while (x0 != x1) {
			if (fraction >= 0) {
				y0 += stepy;
				fraction -= dx;
			}
			x0 += stepx;
			fraction += dy;
			tex.SetPixel(x0, y0, col);
		}
	}
	else {
		fraction = dx - (dy >> 1);
		while (y0 != y1) {
			if (fraction >= 0) {
				x0 += stepx;
				fraction -= dy;
			}
			y0 += stepy;
			fraction += dx;
			tex.SetPixel(x0, y0, col);
		}
	}
}

function point(p1 : Vector3, p2 : Vector3, dist : float){ //calculate point on line through p1 & p2 on distance dist
	var x;
	var y;
	if(p1.x < p2.x && p1.y < p2.y) {
		x = p2.x + dist*(p1.x-p2.x)/(p1.y-p2.y)/Mathf.Sqrt(1+((p1.x-p2.x)/(p1.y-p2.y))*((p1.x-p2.x)/(p1.y-p2.y)));
		y = p2.y + dist*(p1.y-p2.y)/(p1.x-p2.x)/Mathf.Sqrt(1+((p1.y-p2.y)/(p1.x-p2.x))*((p1.y-p2.y)/(p1.x-p2.x)));
	} else 	if(p1.x > p2.x && p1.y > p2.y) {
		x = p2.x - dist*(p1.x-p2.x)/(p1.y-p2.y)/Mathf.Sqrt(1+((p1.x-p2.x)/(p1.y-p2.y))*((p1.x-p2.x)/(p1.y-p2.y)));
		y = p2.y - dist*(p1.y-p2.y)/(p1.x-p2.x)/Mathf.Sqrt(1+((p1.y-p2.y)/(p1.x-p2.x))*((p1.y-p2.y)/(p1.x-p2.x)));
	} else 	if(p1.x > p2.x && p1.y < p2.y) {
		x = p2.x + dist*(p1.x-p2.x)/(p1.y-p2.y)/Mathf.Sqrt(1+((p1.x-p2.x)/(p1.y-p2.y))*((p1.x-p2.x)/(p1.y-p2.y)));
		y = p2.y - dist*(p1.y-p2.y)/(p1.x-p2.x)/Mathf.Sqrt(1+((p1.y-p2.y)/(p1.x-p2.x))*((p1.y-p2.y)/(p1.x-p2.x)));
	} else if(p1.x < p2.x && p1.y > p2.y) {
		x = p2.x - dist*(p1.x-p2.x)/(p1.y-p2.y)/Mathf.Sqrt(1+((p1.x-p2.x)/(p1.y-p2.y))*((p1.x-p2.x)/(p1.y-p2.y)));
		y = p2.y + dist*(p1.y-p2.y)/(p1.x-p2.x)/Mathf.Sqrt(1+((p1.y-p2.y)/(p1.x-p2.x))*((p1.y-p2.y)/(p1.x-p2.x)));
	}
	return new Vector2(x, y);
}