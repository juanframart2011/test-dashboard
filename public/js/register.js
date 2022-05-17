const email_validate  =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
let validateSamePassword = true;
const name = document.querySelector( '#name' ),
    email = document.querySelector( '#email' ),
    password = document.querySelector( '#password' ),
    rePassword = document.querySelector( '#re-password' ),
    alerta = document.querySelector( '.alerta-mensaje-crear' ),
    alerta_texto = document.querySelector( '#alerta-texto-crear' ),
    formUser = document.querySelector( '#form-register' ),
    btnAddUser = document.querySelector( '.btn-add-user' );

$( document ).ready( function(){

    function _clearInputs(){

        name.classList.remove('error');
        email.classList.remove('error');
        password.classList.remove('error');
        rePassword.classList.remove('error');
    }

    function _functionValidatePassowrds(){

        const helperPassword = document.querySelector( ".helper-password" ),
            helperRePassword = document.querySelector( ".helper-repassword" );

        validateSamePassword = true;
        let helperPasswordtext = "",
            helperRePasswordtext = "";
        password.classList.remove('error');
        rePassword.classList.remove('error');

        if( password.value != rePassword.value ){

            validateSamePassword = false;
            helperPasswordtext = "Las Contraseñas no son iguales";
            helperRePasswordtext = "Las Contraseñas no son iguales";
        }
        if( ( password.value.length < 5 || password.value.length > 11 ) || 
            ( rePassword.value.length < 5 || rePassword.value.length > 11 ) 
        ){

            validateSamePassword = false;
            helperPasswordtext += "\nLas Contraseñas debe ser mayor a 5, menos a 11 caracteres";
            helperRePasswordtext += "\nLas Contraseñas debe ser mayor a 5, menos a 11 caracteres";
        }

        helperPassword.innerHTML = helperPasswordtext;
        if( !validateSamePassword ){

            password.classList.add('error');
            rePassword.classList.add('error');
        }
    }

    function _validatePasswords(){

        password.addEventListener( 'keyup', () =>{

            _functionValidatePassowrds();
        });

        rePassword.addEventListener( 'keyup', () =>{

            _functionValidatePassowrds();
        });
    }

    _validatePasswords();

    $( "#form-register" ).submit( function( event ){

        event.preventDefault();
        
        _clearInputs();
        
        $( ".btn-add-user" ).html( 'AGREGANDO <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>' ).attr( "disabled", true );

        let msgText = "";
        let error = false;
        const url = document.querySelector( "#form-register" ).action;
        
        alerta_texto.innerHTML='';

        if( !validateSamePassword ){
            
            msgText += "<br> Las contraseñas no concuerdan";
            error = true;
        }

        if( name.value == '' ){
            
            name.classList.add('error');
            msgText += "<br> El nombre es obligatorio";
            error = true;
        }
        if( password.value == '' ){
            
            password.classList.add('error');
            msgText += "<br> La contraseña es obligatorio";
            error = true;
        }
        if( rePassword.value == '' ){
            
            msgText += "<br> La confirmación de contraseña es obligatorio";
            rePassword.classList.add('error');
            error = true;
        }
        if( email.value == '' ){
            
            msgText += "<br> El email es obligatorio";
            email.classList.add('error');
            error = true;
        }
        if( !email_validate.test( email.value ) ){

            msgText += "<br> El email no esta en un formato permitido";
            email.classList.add('error');   
            error = true;
        }

        if( !error ){

            let meta = document.getElementsByTagName('meta'), 
                datos = $( '#form-register' ).serialize();   
            
            $.ajax({
                type: "POST",
                url: url,
                data: datos,
                headers: {
                    'X-CSRF-TOKEN': meta['csrf-token'].getAttribute('content')
                },
                success: function(datos) {

                    if( datos.result == 1 ){
                        
                        formUser.reset();

                        alerta.classList.remove('alert-danger');
                        alerta.classList.add('alert-success');
                        alerta_texto.innerHTML= datos.message;
                        alerta.style.display = "block";

                        setTimeout(()=>{

                            window.location.reload();
                        }, 1500);
                    }
                    else{

                        alerta.classList.remove('alert-success');
                        alerta.classList.add('alert-danger');
                        alerta_texto.innerHTML= datos.message;

                        alerta.style.display = "block";

                        $( ".btn-add-user" ).html( 'REGISTRARSE' ).attr( "disabled", false );
                    }
                },
                error: function( error ){

                    console.warn( error );
                    
                    $( ".btn-add-user" ).html( 'REGISTRARSE' ).attr( "disabled", false );
                }
            });
        }
        else{

            $( ".btn-add-user" ).html( 'REGISTRARSE' ).attr( "disabled", false );

            alerta.classList.remove('alert-success');
            alerta.classList.add('alert-danger');
            alerta_texto.innerHTML = msgText;
            alerta.style.display = "block";
        }
    });
});