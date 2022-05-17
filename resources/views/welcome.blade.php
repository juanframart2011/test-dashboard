@extends( "layout.public" )

@section( "cssExtra" )
@endsection

@section( "content" )
    
    <div class="row">
        <h3 class="text-center">INICIA SESIÓN</h3>
    </div>
    <div class="row">
        <div class="alert form-alert-login hidden text-center"></div>
        <form action="{{ route( 'login' ) }}" id="form-login" method="POST">
            @if( !$errors->isEmpty() )
                                            
                <div class="row">
                    <div class="col-8 col-md-8 col-lg-8 text-center alert alert-danger mb-4" role="alert">
                        
                        @foreach ( $errors->all() as $error )
                            <strong>{{$error}}</strong><br>
                        @endforeach
                    </div>
                </div>
            @endif

            @csrf
            <div class="mb-3">
                <input type="email" placeholder="EMAIL" class="form-control" id="user" name="user" aria-describedby="userHelp">
            </div>
            <div class="mb-3">
                <input type="password" placeholder="CONTRASEÑA" class="form-control" id="password" name="password">
            </div>
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <div class="d-grid gap-2 d-md-block">
                        <button type="submit" class="btn btn-primary" id="btn-login">ENTRAR</button>
                    </div>
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