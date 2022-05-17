<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Home extends Controller
{

    public function home(){

        $data["metaTitle"] = "Home";
        $data["page"] = "Dashboard";

        return view( "home", $data );
    }
}