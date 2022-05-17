<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Notice as NoticeModel;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Crypt;

use Validator;

class Notice extends Controller
{
    private function _validateUrl( $url ){

        $urlExist = NoticeModel::Where( "url", $url )->count();

        if( $urlExist == 0 ){

            return $url;
        }
        else{

            $number = $urlExist + 1;

            return $url . '-' . $number;
        }
    }

    public function save( Request $request ){
        
        $message =  [
            "name.required"     =>  "El nombre es obligatorio",
            "tag.required"  =>  "El costo es obligatorio",
            "media.required"  =>  "El cover es obligatorio",
            "launch.required"  =>  "El boleto es obligatorio",
            "description.required" =>  "La descripción es obligatoria"
        ];

        $validate = Validator::make($request->all(), [
            'name'     => 'required',
            'media'     => 'required',
            'launch'     => 'required',
            'tag'     => 'required',
            'description'     => 'required'
        ], $message );

        if( $validate->fails() ){

            $errors = $validate->errors()->all();
            return redirect()->route( 'dashboard' )
            ->withInput()
            ->withErrors( $errors );
        }
        else{

            try{

                $name = $request->get( 'name' );
                $launch = $request->get( 'launch' );
                $description = $request->get( 'description' );
                $tag = $request->get( 'tag' );

                $media = $request->file( 'media' );
                $media_ext = '.' . $request->file( 'media' )->getClientOriginalExtension();

                $url = Str::slug( $name );

                $url = $this->_validateUrl( $url );

                if( env( 'APP_ENV' ) == 'local' ){

                    $rutaMedia = public_path( 'img/notice/' );
                }
                else{

                    $rutaMedia = getcwd() . '/img/notice/';
                }

                $coverName = $url . $media_ext;
                $media->move( $rutaMedia, $coverName );
                $urlCover = 'img/notice/' . $coverName;

                DB::beginTransaction();
                    
                $noticeNew = new NoticeModel();
                $noticeNew->name                = $name;
                $noticeNew->launch                = $launch;
                $noticeNew->description                = $description;
                $noticeNew->url                = $url;
                $noticeNew->cover                = $urlCover;
                $noticeNew->user_id                = Crypt::decryptString( session( env( "APP_CLAVE" ) . '1d' ) );
                $noticeNew->creation_date       = date( "Y-m-d H:i:s" );
                $noticeNew->save();
                
                if( $noticeNew->id ){

                    DB::commit();

                    return Redirect::to('admin/dashboard' )->with( 'notice-success', '¡Se creo la noticia con éxito!' );
                }
                else{

                    DB::rollback();

                    Log::warning( "App/RaffleController/save() :: NO se creo el registro" );

                    $validate->errors()->add( 'Ocurrio un error', "Vuelve a intentarlo" );
                    $errors = $validate->errors()->all();

                    $errors = $validate->errors()->all();
                    return redirect()->route( 'dashboard' )
                    ->withInput()
                    ->withErrors( $errors );
                }
            }
            catch( \Exception $e ){

                DB::rollback();

                Log::warning( "App/Notice/save() :: " . $e->getMessage() );

                $validate->errors()->add( 'Ocurrio un error', "Vuelve a intentarlo" );
                $errors = $validate->errors()->all();

                $errors = $validate->errors()->all();
                return redirect()->route( 'dashboard' )
                ->withInput()
                ->withErrors( $errors );
            }
        }
    }
}