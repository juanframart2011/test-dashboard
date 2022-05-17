{{--<header class="header" data-aos="zoom-out-down" data-aos-duration="1000">

	@include( "layout.helper.header-top" )
    
    <div class="header-main">
        <a href="/"><img src="{{ asset( 'img/logo.svg' ) }}" alt="Logo Yama" class="logo"></a>

        @if( !empty( session( env( "APP_CLAVE" ) . '3m41l' ) ) )
	        <nav>
	            <ul class="menu">
	                <li class="menu-item"><a href="{{ route( 'logout' ) }}" class="menu-link">LOG OUT</a></li>
	            </ul>
	        </nav>
		@endif
    </div>
</header>--}}

<nav class="navbar bg-dark">
	<div class="container-fluid">
		<a class="navbar-brand" href="#"><img src="{{ asset( 'img/logo.svg' ) }}" alt="" width="30" height="24"></a>
	</div>
</nav>