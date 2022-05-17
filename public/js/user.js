$( document ).ready( function(){

    $( ".btn-delete" ).click( function( event ){

        event.preventDefault();
        let userId = $( this ).data( "user" );

        var result = confirm( "Deseas eliminar el usuario: " + $( this ).data( "name" ) );
        if( result == true ){
            
            window.location.href = baseUrl + '/admin/user/delete/' + userId;
        }
    });
});

const User = function() {

    const email_validate  =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let validateSamePassword = true;
    
    const name = document.querySelector( '#name' ),
        last_name = document.querySelector( '#last_name' ),
        email = document.querySelector( '#email' ),
        password = document.querySelector( '#password' ),
        rePassword = document.querySelector( '#re-password' ),
        rol = document.querySelector( '#rol' ),
        profile = document.querySelector( '#profile' ),
        alerta = document.querySelector( '.alerta-mensaje-crear' ),
        alerta_texto = document.querySelector( '#alerta-texto-crear' ),
        formUser = document.querySelector( '#form-user' ),
        btnAddUser = document.querySelector( '.btn-add-user' ),
        btnUpdateUser = document.querySelector( '.btn-update-user' ),
        btnUpdatePassword = document.querySelector( '.btn-update-password' );

    function agregar(){

        _validatePasswords();

        $( "#form-user" ).submit( function( event ){

            event.preventDefault();
            
            _clearInputs();
            
            $( ".btn-add-user" ).html( 'AGREGANDO <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>' ).attr( "disabled", true );

            let msgText = "";
            let error = false;
            const url = document.querySelector( "#form-user" ).action;
            
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
            if( last_name.value == '' ){
                
                last_name.classList.add('error');
                msgText += "<br> El apellido es obligatorio";
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
            if( profile.value == '' ){
                
                msgText += "<br> El puesto es obligatorio";
                profile.classList.add('error');
                error = true;
            }
            if( rol.value == '' ){
                
                msgText += "<br> El perfil es obligatorio";
                rol.classList.add('error');
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
                    datos = $( '#form-user' ).serialize();   
                
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
                            window.location.href = baseUrl + '/admin/user/list';
                        }
                        else{

                            alerta.classList.remove('alert-success');
                            alerta.classList.add('alert-danger');
                            alerta_texto.innerHTML= datos.message;

                            alerta.style.display = "block";

                            $( ".btn-add-user" ).html( 'AGREGAR' ).attr( "disabled", false );
                        }
                    },
                    error: function( error ){

                        console.warn( error );
                        
                        $( ".btn-add-user" ).html( 'AGREGAR' ).attr( "disabled", false );
                    }
                });
            }
            else{

                $( ".btn-add-user" ).html( 'AGREGAR' ).attr( "disabled", false );

                alerta.classList.remove('alert-success');
                alerta.classList.add('alert-danger');
                alerta_texto.innerHTML = msgText;
                alerta.style.display = "block";
            }
        });
    }

    function _clearInputs(){

        name.classList.remove('error');
        last_name.remove('error');
        email.classList.remove('error');
        password.classList.remove('error');
        rePassword.classList.remove('error');
        profile.classList.remove('error');
        rol.classList.remove('error');
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
    
    function update(){

        $( "#form-user" ).submit( function( event ){

            event.preventDefault();
            
            $( ".btn-update-user" ).html( 'MODIFICANDO <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>' ).attr( "disabled", true );

            let msgText = "";
            let error = false;
            const url = document.querySelector( "#form-user" ).action;
            
            alerta_texto.innerHTML='';

            if( name.value == '' ){
                
                name.classList.add('error');
                msgText += "<br> El nombre es obligatorio";
                error = true;
            }
            if( last_name.value == '' ){
                
                last_name.classList.add('error');
                msgText += "<br> El apellido es obligatorio";
                error = true;
            }
            if( profile.value == '' ){
                
                msgText += "<br> El puesto es obligatorio";
                profile.classList.add('error');
                error = true;
            }
            if( rol.value == '' ){
                
                msgText += "<br> El perfil es obligatorio";
                rol.classList.add('error');
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
                    datos = $( '#form-user' ).serialize();   
                
                $.ajax({
                    type: "POST",
                    url: url,
                    data: datos,
                    headers: {
                        'X-CSRF-TOKEN': meta['csrf-token'].getAttribute('content')
                    },
                    success: function(datos) {

                        if( datos.result == 1 ){
                            
                            alerta.classList.remove('alert-danger');
                            alerta.classList.add('alert-success');
                            alerta_texto.innerHTML= datos.message;
                            alerta.style.display = "block";
                            window.location.reload();
                        }
                        else{

                            alerta.classList.remove('alert-success');
                            alerta.classList.add('alert-danger');
                            alerta_texto.innerHTML= datos.message;

                            alerta.style.display = "block";

                            $( ".btn-update-user" ).html( 'ACTUALIZAR' ).attr( "disabled", false );
                        }
                    },
                    error: function( error ){

                        console.warn( error );
                        
                        $( ".btn-add-user" ).html( 'ACTUALIZAR' ).attr( "disabled", false );
                    }
                });
            }
            else{

                $( ".btn-update-user" ).html( 'AGREGAR' ).attr( "disabled", false );

                alerta.classList.remove('alert-success');
                alerta.classList.add('alert-danger');
                alerta_texto.innerHTML = msgText;
                alerta.style.display = "block";
            }
        });
    }

    function updatePassword(){

        _validatePasswords();

        $( "#form-password" ).submit( function( event ){

            event.preventDefault();
            
            $( ".btn-update-password" ).html( 'Modificando Contraseña <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>' ).attr( "disabled", true );

            let msgText = "";
            let error = false;
            const url = document.querySelector( "#form-update-password" ).action;
            
            if( !validateSamePassword ){
                
                msgText += "<br> Las contraseñas no concuerdan";
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
            
            if( !error ){

                let meta = document.getElementsByTagName('meta'), 
                    datos = $( '#form-password' ).serialize();   
                
                $.ajax({
                    type: "POST",
                    url: url,
                    data: datos,
                    headers: {
                        'X-CSRF-TOKEN': meta['csrf-token'].getAttribute('content')
                    },
                    success: function(datos) {

                        if( datos.result == 1 ){
                            
                            _messageDeleteSuccess( 'Contraseña Modificada', 'success' );
                            document.getElementById( 'form-update-password' ).reset();
                        }
                        else{

                            _messageDeleteSuccess( datos.message, 'warning' );
                        }

                        $( ".btn-update-password" ).html( 'Modificar Contraseña <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>' ).attr( "disabled", false );
                    },
                    error: function( error ){

                        console.warn( error );
                        $( ".btn-update-password" ).html( 'Modificar Contraseña <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>' ).attr( "disabled", disabled );
                    }
                });
            }
            else{

                _messageDeleteSuccess( msgText, 'warning' );
                $( ".btn-update-password" ).html( 'Modificar Contraseña <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>' ).attr( "disabled", false );
            }
        });
    }    

    return {
        detail: function() {
            update(); 
            updatePassword();          
        },
        init: function() {
            agregar();
        }
    }
}();