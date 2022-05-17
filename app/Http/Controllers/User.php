<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;

use App\Models\Rol as RolModel;
use App\Models\User as UserModel;

use Validator;

class User extends Controller
{

    public function edit( Request $request, $userId ){

        $userId = Crypt::decryptString( $userId );

        $userResult = UserModel::Where([
            "id" => $userId,
            "statu_id" => 1
        ])->get();

        if( count( $userResult ) > 0 ){

            $data["metaTitle"] = "Editar Usuario";
            $data["page"] = "user";
            $data["profiles"] = ProfileModel::Where( "statu_id", 1 )->get();
            $data["rols"] = RolModel::Where( "statu_id", 1 )->get();

            $data["user"] = $userResult[0];

            return view( "user.edit", $data );
        }
        else{

            abort( 404 );
        }
    }

    public function list(){

        $data["metaTitle"] = "Lista de Usuarios";
        $data["page"] = "user";
        $data["users"] = UserModel::Where( "statu_id", 1 )->get();

        return view( "user.list", $data );
    }

    public function login( Request $request ){

        $messages = [
            'user.required' => 'El Correo electrónico es obligatorio',
            'user.email' => 'El Correo debe ser un email',
            'password.required' => 'La Contraseña es obligatoria',
        ];
        $validate = Validator::make( $request->all(), [
            'user' => 'required|email',
            'password' => 'required',
        ], $messages );
        
        if( $validate->fails() ){

            $errors = $validate->errors()->all();
            return redirect()->route( 'home' )
            ->withInput()
            ->withErrors( $errors );
        }
        else{

            $userResult = UserModel::Where([
                "email" => $request['user'],
                "password" => md5( $request['password'] ),
                "statu_id" => 1
            ])->get();

            if( count( $userResult ) > 0 ){
                
                $request->session()->put([
                    env( "APP_CLAVE" ) . '3m41l' => $userResult[0]->email,
                    env( "APP_CLAVE" ) . '1d' => Crypt::encryptString( $userResult[0]->id ),
                    env( "APP_CLAVE" ) . 'n4m3' => $userResult[0]->name,
                    env( "APP_CLAVE" ) . 'l437-n4m3' => $userResult[0]->last_name,
                    env( "APP_CLAVE" ) . 'r01' => Crypt::encryptString( $userResult[0]->rol_id )
                ]);

                return redirect()->route( 'dashboard' );
            }
            else{
                $validate->errors()->add( 'login', 'Los datos son incorrectos' );
                $errors = $validate->errors()->all();
                return redirect()->route( 'home' )
                ->withInput()
                ->withErrors($errors);
            }
        }
    }

    public function logout(Request $request){

        $request->session()->flush();

        return redirect()->route( 'home' );
    }

    public function save( Request $request ){

        $messages = [
            'email.required' => 'El Correo electrónico es obligatorio',
            'email.email' => 'El Correo debe ser un email',
            'email.unique' => 'El Correo ya existe en el sistema',
            'password.required' => 'La Contraseña es obligatoria',
            're-password.required' => 'La Confirmación de contraseña es obligatoria',
            'name.required' => 'El nombre es obligatorio',
        ];
        $validate = Validator::make( $request->all(), [
            'email' => 'required|email|unique:user,email',
            'password' => 'required|same:re-password|between:5,11',
            're-password' => 'required|between:5,11',
            'name' => 'required'
        ], $messages );
        
        if( $validate->fails() ){

            $errors = $validate->errors()->all();
            return response()->json([
                'message' => $errors,
                'result' => 2
            ]);
        }
        else{

            $name = $request->get( "name" );
            $last_name = $request->get( "last_name" );
            $email = $request->get( "email" );
            $password = $request->get( "password" );
            $rol_id = 1;

            $password = md5( $password );

            DB::beginTransaction();

            try {
                
                $userNew = new UserModel;
                $userNew->name = $name;
                $userNew->email = $email;
                $userNew->password = $password;
                $userNew->rol_id = $rol_id;
                $userNew->creation_date = date( "Y-m-d H:i:s" );
                $userNew->save();

                if( $userNew->id > 0 ){

                    DB::commit();
                    return response()->json([
                        'message' => 'Registro creado exitosamente',
                        'result' => 1
                    ]);
                }
                else{

                    DB::rollback();
                    return response()->json([
                        'message' => 'No se pudo crear el registro',
                        'result' => 2
                    ]);
                }
            }
            catch (\Exception $e) {
                
                DB::rollback();

                Log::warning( "User/save:: " . $e->getMessage() );

                $errors = $validate->errors()->all();
                return response()->json([
                    'message' => "Ocurrio un error inesperado, vuelva a intentarlo",
                    'result' => 2
                ]);
            }
        }
    }
}