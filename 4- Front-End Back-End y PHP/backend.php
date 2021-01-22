<?php
     function Gauss($x,$sigma,$c)
     {
         return exp( -( (($x-$c)**2) / (2*($sigma**2)) ));
     }
    /** Agarrar El POST*/
     $sig=$_POST['sigma'];
     $c=$_POST['c'];

     /**Ciclo para crear los puntos */
     $datos = [];
     $inicio = -1;
     $puntos = 100;
     $fin = (1*$puntos)/2;
     for($i=0;$i<=$puntos;$i++)
     {
         $x = $inicio + ($i/$fin);
         $y = Gauss($x,$sig,$c);
         $datos[]= [$x,$y];
     }
     
     
     //echo "X:".$datos[0][0]."\n Y:".$datos[0][1];

     /**crear la imagen */
     $svg = "<svg viewBox='0 0 500 100'>".
            "<polyline fill='none' stroke='#0074d9' stroke-width='1' points='";
        foreach($datos as $key=>$valores)
        {
            //echo $valores[0].'->'.$valores[1].'<br>';
            $valorEscalado = $valores[1] * 100;
            $svg.=$key.','.$valorEscalado.' ';
        }
    $svg.= "'/>".
           "</svg>";
    $nombre = "gauss";

    /**guardamos en un archivo */
    file_put_contents($nombre.".svg",  $svg);
     
    /**Redireccionamos al front-end */
    header("Location: frontend.php?r=$nombre");
?>
