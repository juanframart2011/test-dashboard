<div class="row">
    <h4 class="text-center">Crear Noticias</h4>
</div>

@if( Session( 'notice-success' ) )

    <div class="row">
        <div class="col-md-6 offset-md-3 text-center">
            
            <div class="alert alert-success" role="alert">
                <p>
                    {{ Session( 'notice-success' ) }}
                </p>
            </div>
        </div>
    </div>
@endif

@if( !$errors->isEmpty() )

    <div class="row">
        <div class="col-md-6 offset-md-3 text-center">
            
            <div class="alert alert-danger" role="alert">
                @foreach ( $errors->all() as $error )
                    <strong>{{$error}}</strong><br>
                @endforeach
            </div>
        </div>
    </div>
@endif

<div class="row">
    <div class="col-md-12">
        <form enctype="multipart/form-data" id="form-notice" name="form-notice" class="section" action="{{ route( 'notice-save' ) }}" method="POST">
            <div class="row">
                <div class="col-md-11 mx-auto">
                    <div class="row">
                        {{ csrf_field() }}

                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="name">Titulo<span>*</span></label>
                                <input type="text" class="form-control mb-4" id="name" name="name" placeholder="Titulo">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="tag">Medio<span>*</span></label>
                                <input type="text" class="form-control mb-4" id="tag" name="tag" placeholder="Medio">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="launch">Fecha<span>*</span></label>
                                <input type="date" class="form-control mb-4" id="launch" name="launch" placeholder="Fecha">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="media">Imagen</label>
                                <input type="file" accept="image/png,image/jpeg" class="form-control mb-4" id="media" name="media">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="description">Descripción<span>*</span></label>
                                <textarea class="form-control mb-4" id="description" name="description" placeholder="Descripción"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12 text-center">
                    <div class="alert mb-4 alerta-mensaje-crear d-none" role="alert">
                        <div id="alerta-texto-crear"></div>
                    </div>
                    <div class="row">

                        <div class="col-md-8 offset-md-2 text-center">
                            <button class="btn btn-block btn-primary btn-add-notice" type="submit">GUARDAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>