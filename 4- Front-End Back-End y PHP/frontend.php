

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="descripcion" content="una pagina web">
        <meta name="keywords" content="css, php, html">
        <link rel="stylesheet" type="text/css" href="php.css">
        <title>Front-End</title>
    </head>
    <body>
        <div class="contenedor" id="main">
            <div>
                <form method="post" action ="backend.php">
                <?php
                    echo "Estos son los parametros de la funcion GAUSS \n";?>
                <div class="campos"><span>Sigma: </span><input type="input" value="0.5" name="sigma"></div>
                <div class="campos"><span>Constante: </span><input type="input"value="0"name="c"></div>
                <input type="submit">
                </form>
            </div>
            <?php
                if(isset($_GET['r'])) //revisa si existe la variable
                {
                    $img = $_GET['r'].".svg";
                    echo "<div class='chart'>";
                    if ( file_exists($img) ) 
                    {
                        //desplegamos el svg
                        echo file_get_contents($img); 
                    }
                    else 
                    {
                        echo "La imagen $img no existe";
                    }
                    
                    echo "</div>";
                }
            ?>
        </div>
    </body>

</html>