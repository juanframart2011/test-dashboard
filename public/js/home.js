const name = document.querySelector( '#name' ),
    tag = document.querySelector( '#tag' ),
    launch = document.querySelector( '#launch' ),
    description = document.querySelector( '#description' ),
    media = document.querySelector( '#media' ),
    alerta = document.querySelector( '.alerta-mensaje-crear' ),
    alerta_texto = document.querySelector( '#alerta-texto-crear' ),
    btnAddNotice = document.querySelector( '.btn-add-notice' );

$( "#form-notice" ).submit( function( event ){

    event.preventDefault();
    
    _clearInputs();
    
    $( ".btn-add-notice" ).html( 'AGREGANDO <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>' ).attr( "disabled", true );
    
    let msgText = "";
    let error = false;
    
    $( "#alerta-texto-crear" ).html( '' );
    $( ".alerta-mensaje-crear" ).addClass( 'd-none' );

    if( name.value == '' ){
        
        name.classList.add('error');
        msgText += "El nombre es obligatorio";
        error = true;
    }
    if( tag.value == '' ){
        
        tag.classList.add('error');
        msgText += "<br> El medio es obligatorio";
        error = true;
    }
    if( launch.value == '' ){
        
        launch.classList.add('error');
        msgText += "<br> La fecha es obligatorio";
        error = true;
    }
    if( description.value == '' ){
        
        msgText += "<br> La descripción es obligatoria";
        description.classList.add('error');
        error = true;
    }
    if( media.value == '' ){
        
        msgText += "<br> La imagen es obligatoria";
        media.classList.add('error');
        error = true;
    }
    
    if( !error ){

        document.getElementById( "form-notice" ).submit();
    }
    else{

        $( ".btn-add-notice" ).html( 'GUARDAR' ).attr( "disabled", false );
        
        $( ".alerta-mensaje-crear" ).removeClass('alert-success');
        $( ".alerta-mensaje-crear" ).addClass('alert-danger');
        $( "#alerta-texto-crear" ).html( msgText );

        $( ".alerta-mensaje-crear" ).removeClass( 'd-none' );
    }
});

function _clearInputs(){

    name.classList.remove('error');
    tag.classList.remove('error');
    launch.classList.remove('error');
    description.classList.remove('error');
    media.classList.remove('error');
}