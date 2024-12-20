<h1 class="nombre-pagina">Crear cuenta</h1>
<p class="descripcion-pagina">Llenar el siguiente formulario para crear cuenta</p>

<?php include_once __DIR__ . "/../templates/alertas.php"; ?>

<form action="/crear-cuenta" method="POST" class="formulario">
    <div class="campo">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" placeholder="Tu Nombre" 
            value="<?php echo s($usuario->nombre); ?>">
    </div>
    <div class="campo">
        <label for="apellido">Apellido</label>
        <input type="text" id="apellido" name="apellido" placeholder="Tu Apellido" 
            value="<?php echo s($usuario->apellido); ?>">
    </div>
    <div class="campo">
        <label for="telefono">Teléfono</label>
        <input type="tel" id="telefono" name="telefono" placeholder="Tu teléfono" 
            value="<?php echo s($usuario->telefono); ?>">
    </div>
    <div class="campo">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Tu Email" 
            value="<?php echo s($usuario->email); ?>">
    </div>
    <div class="campo">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Tu password" value="">
    </div>

    <div class="campo">
        <input type="submit" class="boton" value="Crear Cuenta" />
    </div>
</form>

<div class="acciones">
    <a href="/">Ya tienes cuenta? Inicia Sesión</a>
    <a href="/olvide">Olvidaste tu password?</a>
</div>