const Residence = function() {

    function modal(){

        $( '.btn-edit-residence' ).click( function(){

            $( '#formEditResidence' ).modal( 'show' );
        });
        $( '.modal-footer button' ).click( function(){

            $( '#formEditResidence' ).modal( 'hide' );
        });
    }

    function agregar(){

        $( "#form-user" ).submit( function( event ){

            event.preventDefault();
            
            _clearInputs();
            
            $( ".btn-add-user" ).html( 'AGREGANDO <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>' ).attr( "disabled", true );

            let msgText = "";
            let error = false;
            const url = document.querySelector( "#form-user" ).action;
            
            $( "#alerta-texto-crear" ).innerHTML='';

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

                            $( ".alerta-mensaje-update" ).classList.remove('alert-danger');
                            $( ".alerta-mensaje-update" ).classList.add('alert-success');
                            $( "#alerta-texto-crear" ).innerHTML= datos.message;
                            $( ".alerta-mensaje-update" ).style.display = "block";
                            window.location.href = baseUrl + '/admin/user/list';
                        }
                        else{

                            $( ".alerta-mensaje-update" ).classList.remove('alert-success');
                            $( ".alerta-mensaje-update" ).classList.add('alert-danger');
                            $( "#alerta-texto-crear" ).innerHTML= datos.message;

                            $( ".alerta-mensaje-update" ).style.display = "block";

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

                $( ".alerta-mensaje-update" ).classList.remove('alert-success');
                $( ".alerta-mensaje-update" ).classList.add('alert-danger');
                $( "#alerta-texto-crear" ).innerHTML = msgText;
                $( ".alerta-mensaje-update" ).style.display = "block";
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

    function search(){

        let meta = document.getElementsByTagName( 'meta' );

        $( "#floor" ).change( function(){

            let id = $( this ).val();
            $.ajax({
                url: baseUrl + '/admin/availability/residence-detail',
                type: 'POST',
                dataType: 'json',
                data: {id: id},
                headers: {
                    'X-CSRF-TOKEN': meta['csrf-token'].getAttribute( 'content' )
                }
            })
            .done(function( result ){
                
                if( result.result == 1 ){

                    var data = result.data;

                    $( ".title-floor" ).html( data.name );
                    $( "#name" ).val( data.name );
                    $( "#disponible" ).val( data.disponible );
                    $( "#apartado" ).val( data.apartado );
                    $( "#vendido" ).val( data.vendido );
                    $( "#floor_id" ).val( data.id );
                    $( "#orden" ).val( data.orden );
                    $( ".img-floor" ).attr( "src", data.media );
                    $( ".floor-disponible" ).html( data.disponible );
                    $( ".floor-apartado" ).html( data.apartado );
                    $( ".floor-vendido" ).html( data.vendido );
                }
            })
            .fail(function( error ){
                console.warn( "error => ", error );
            });
            
        });
    }
    
    function update(){

        $( "#form-resindece" ).submit( function( event ){

            event.preventDefault();
            
            $( ".btn-update-residence" ).html( 'MODIFICANDO <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>' ).attr( "disabled", true );

            let msgText = "";
            let error = false;

            let name = $( "#name" );
            let disponible = $( "#disponible" );
            let apartado = $( "#apartado" );
            let vendido = $( "#vendido" );
            let orden = $( "#orden" );
            
            $( "#alerta-texto-crear" ).html( '' );

            if( name.val() == '' ){
                
                name.addClass('error');
                msgText += "El nombre es obligatorio";
                error = true;
            }
            if( disponible.val() == '' ){
                
                disponible.addClass('error');
                msgText += "<br> El disponible es obligatorio";
                error = true;
            }
            if( apartado.val() == '' ){
                
                msgText += "<br> El apartado es obligatorio";
                apartado.addClass('error');
                error = true;
            }
            if( vendido.val() == '' ){
                
                msgText += "<br> El vendido es obligatorio";
                vendido.addClass('error');
                error = true;
            }
            if( orden.val() == '' ){
                
                msgText += "<br> El orden es obligatorio";
                orden.addClass('error');
                error = true;
            }

            if( !error ){

                document.getElementById( "form-resindece" ).submit();
            }
            else{

                $( ".btn-update-residence" ).html( 'ACTUALIZAR' ).attr( "disabled", false );

                $( ".alerta-mensaje-update" ).removeClass('alert-success').addClass('alert-danger').removeClass('d-none');

                $( "#alerta-texto-crear" ).html( msgText );
            }
        });
    }

    return {
        detail: function() {

            modal();
            search();
            update();
        },
        init: function() {
            agregar();
        }
    }
}();