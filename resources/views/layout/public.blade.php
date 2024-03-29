<!DOCTYPE html>
<html lang="en">

    @include( "layout.helper.head" )
    <body>
        
        <main class="container">
            
            <div class="row">

                <section class="col-md-4 offset-md-4 mt-5">
                    <div class="row mb-5">
                        <div class="col-md-4 offset-md-4">
                            <img class="img-fluid" src="{{ asset( 'img/logo.svg' ) }}" alt="">
                        </div>
                    </div>
                    
                    @yield( "content" )
                </section>
            </div>
        </main>

        @include( "layout.helper.script" )
    </body>
</html>