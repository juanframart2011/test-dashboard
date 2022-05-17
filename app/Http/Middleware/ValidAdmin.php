<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class ValidAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        if( Crypt::decryptString( session( env( "APP_CLAVE" ) . 'r01' ) ) != 1 ){

            return redirect( '/' );
        }
        
        return $next($request);
    }
}