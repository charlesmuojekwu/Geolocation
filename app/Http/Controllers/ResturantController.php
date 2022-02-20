<?php

namespace App\Http\Controllers;

use App\Models\Resturant;
use Illuminate\Http\Request;

class ResturantController extends Controller
{
    public function index()
    {
        return Resturant::all();
    }
}
