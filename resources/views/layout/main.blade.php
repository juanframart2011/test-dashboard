<!DOCTYPE html>
<html lang="en">

    @include( "layout.helper.head" )
    <body>

        @include( "layout.helper.header" )
        
        <main class="container-fluid mt-5">
            
            <div class="row">

                <section class="col-md-10 offset-md-1 content-data">@yield( "content" )</section>
            </div>
        </main>

        @include( "layout.helper.script" )
    </body>
</html>