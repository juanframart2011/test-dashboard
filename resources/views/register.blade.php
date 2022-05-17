@extends( "layout.public" )

@section( "cssExtra" )
    <style>
        .register-box{
            background: white;
            color: black;
            padding: 1em;
        }
    </style>
@endsection

@section( "content" )
    <div class="register-box">
        
        <div class="row">
            <h3 class="text-center">REGISTRATE</h3>
        </div>
        <div class="alert alert-arrow-left alert-icon-left mb-4 d-none alerta-mensaje-crear" role="alert">
            <div id="alerta-texto-crear"></div>
        </div>

        <div class="row">
            <div class="alert form-alert-login hidden text-center"></div>
            <form action="{{ route( 'user-save' ) }}" id="form-register" method="POST">
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
                    <input type="text" placeholder="Nombres" class="form-control" id="name" name="name">
                </div>
                <div class="mb-3">
                    <input type="email" placeholder="Email" class="form-control" id="email" name="email">
                </div>
                <div class="mb-3">
                    <input type="password" placeholder="Contraseña" class="form-control" id="password" name="password">
                    <span class="helper-password text-danger"></span>
                </div>
                <div class="mb-3">
                    <input type="password" placeholder="Repetir Contraseña" class="form-control" id="re-password" name="re-password">
                    <span class="helper-repassword text-danger"></span>
                </div>
                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <div class="d-grid gap-2 d-md-block">
                            <button type="submit" class="btn btn-primary btn-add-user">REGISTRARSE</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <div class="row mt-2">
            <p class="text-center">¿Tienes cuenta? <a href="/" style="font-weight: bold;text-decoration: none;color: black;">Login</a></p>
        </div>
    </div>
@endsection

@section( "scriptExtra" )
    <script src="{{ asset( 'js/register.js' ) }}"></script>
@endsection