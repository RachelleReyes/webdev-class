<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="descripcion" content="una pagina web">
        <meta name="keywords" content="css, php, html">
        <link rel="stylesheet" type="text/css" href="">
        <title>Load images</title>
    </head>
	
	
    <body>
		<div class="contenedor" id="main">
			<?php
				$imagesDirectory = "imgtest/";
				$images = ""; 
				if(is_dir($imagesDirectory)) {
					$opendirectory = opendir($imagesDirectory);
				  
					while (($image = readdir($opendirectory)) !== false){
						if(($image == '.') || ($image == '..')){
							continue;
						}
						
						$imgFileType = pathinfo($image,PATHINFO_EXTENSION);
						
						if(($imgFileType == 'jpg') || ($imgFileType == 'png')){
							echo "<img src='imgtest/".$image."' width='150' height='150'> ";
							//$images .= "<img src='imgtest/".$image."' width='200'> ";
						}
					}
					closedir($opendirectory); 
				}
			?>
		
		<canvas id = "micanvas" width= "850" height = "550" style="border:4px solid";>
			<script type="text/javascript">
				var canvas = document.getElementById('micanvas');
				if(canvas.getContext){
					var contexto = canvas.getContext('2d');
					var x = 40;
					var y = 40;
					var lado = 150;
					var offsetx = 0;
					var aux = 0;
					var offsety = 0;
					
					for(var i = 0; i< document.images.length; i++){
						if(i%5==0){
							offsety =lado*(i/5);
							aux = i;
						}
						offsetx = lado*(i-aux)+lado/9;
						contexto.strokeStyle = 'indigo';
						contexto.lineWidth = 8;
						contexto.strokeRect(x+offsetx, y+offsety,lado-30,lado-30);
						contexto.fillStyle = 'lavender';
						contexto.fillRect(x+offsetx, y+offsety,lado-30,lado-30);
						contexto.drawImage(document.images[i], x+offsetx, y+offsety,lado-30,lado-30);
					}
				}
				
				
				//var images = "<?php echo $images ?>"; // "A string here"
				//document.getElementById("main").innerHTML =images;
				
				//var imgs = document.getElementsByTagName("img");
				/*var imgSrcs = [];

				for (var i = 0; i < imgs.length; i++) {
					imgSrcs.push(imgs[i].src);
				}*/
			</script>
		</canvas>
		
		</div>
	</body>

</html>