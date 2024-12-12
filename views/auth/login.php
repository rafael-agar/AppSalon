<h1 class="nombre-pagina">Login</h1>
<div class="descripcion-pagina">Inicia Sesión con tus datos</div>

<?php include_once __DIR__ . "/../templates/alertas.php"; ?>

<form action="/" method="POST" class="formulario">
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
        <label for="password">Password</label>
        <input 
            type="password"
            id="password"
            placeholder="Tu Password"
            name="password"
        />
    </div>
    <div class="campo">
        <input type="submit" class="boton" value="Iniciar Sesión" />
    </div>
    
</form>

<div class="acciones">
    <a href="/crear-cuenta">Aún no tienes cuenta? Crear Cuenta</a>
    <a href="/olvide">Olvidaste tu password?</a>
</div>