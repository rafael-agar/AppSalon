<h1>Crear Servicios</h1>

<?php include_once __DIR__ . '../../templates/barra.php' ?>
<?php include_once __DIR__ . '../../templates/alertas.php' ?>

<form action="/servicios/crear" method="POST" class="formulario">
    <?php include_once __DIR__ . "/formulario.php"; ?>
    <div class="campo">
        <input type="submit" class="boton" value="Guardar Servicio">
    </div>
</form>