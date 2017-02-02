<?php

namespace App\Modules\Characters\Http\Controllers\Admin;

use App\Modules\Admin\Http\Controllers\Admin;
use App\Modules\Characters\Models\Character;
use Illuminate\Support\Facades\Auth;


class IndexController extends Admin
{

    public function getModel(){
        return new Character();
    }

    public function getRules($request, $id = false)
    {
        return  ['title' => 'sometimes|required|max:255'];
    }




}
