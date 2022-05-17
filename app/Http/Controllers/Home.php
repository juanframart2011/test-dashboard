<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Notice as NoticeModel;
use App\Models\User as UserModel;

class Home extends Controller
{

    public function home(){

        $data["metaTitle"] = "Home";
        $data["page"] = "Dashboard";

        $data["users"] = UserModel::Where( "statu_id", 3 )->get();
        $data["notices"] = NoticeModel::Where( "statu_id", 1 )->get();

        return view( "home", $data );
    }
}