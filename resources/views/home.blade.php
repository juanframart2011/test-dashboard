@extends( "layout.main" )

@section( "cssExtra" )
    <style>
        body{
            background: white;
            color: black;
        }
        .btn-primary{
             background: #CB0CFA;
             border: none;
        }
    </style>
@endsection

@section( "content" )
    
    <div class="row">
        <h3 class="text-center" style="text-decoration: underline;">DASHBOARD</h3>
    </div>
    <div class="row">
        
        @include( "section.users" )

        @include( "section.notices" )
    </div>

    @include( "section.notice-create" )
@endsection

@section( "scriptExtra" )
    <script src="{{ asset( 'js/home.js' ) }}"></script>
@endsection