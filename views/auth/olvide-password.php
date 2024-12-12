<h1 class="nombre-pagina">Olvidé mi password</h1>
<p class="descripcion-pagina">Reestablecer tu password escribiendo tu email a continuación: </p>

<?php include_once __DIR__ . "/../templates/alertas.php"; ?>

<form action="/olvide" method="POST" class="formulario">
<div class="campo">
        <label for="email">Email</label>
        <input
            type="email"
            id="email"
            placeholder="Tu Email"
            name="email"
        />
    </div>
    <div class="campo">
        <input type="submit" class="boton" value="Envia Instrucciones" />
    </div>
</form>

<div class="acciones">
    <a href="/">Ya tienes una cuenta? Iniciar Sesión</a>
    <a href="/crear-cuenta">Aún no tienes cuenta?</a>
</div>