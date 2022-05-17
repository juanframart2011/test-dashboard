@extends( "layout.public" )

@section( "cssExtra" )
@endsection

@section( "content" )
    
    <div class="row">
        <h3 class="text-center">INICIA SESIÓN</h3>
    </div>
    <div class="row">
        <form action="{{ route( 'login' ) }}" id="form-login" method="POST">
            <div class="mb-3">
                <input type="email" placeholder="EMAIL" class="form-control" id="email" name="email" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <input type="password" placeholder="CONTRASEÑA" class="form-control" id="password" name="password">
            </div>
            <div class="row">
                <div class="col-md-4 offset-md-4">
                    <button type="submit" class="btn btn-primary">ENTRAR</button>
                </div>
            </div>
        </form>
    </div>

    <div class="row mt-2">
        <p class="text-center">¿Aún no tienes una cuenta? <a href="" style="font-weight: bold;text-decoration: none;color: white;">Regístrate</a></p>
    </div>
@endsection

@section( "scriptExtra" )
    <script src="{{ asset( 'js/login.js' ) }}"></script>
@endsection