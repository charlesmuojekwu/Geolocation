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

    public function store(Request $request)
    {
        try{
            Resturant::create($request->all());
            return response(['status' => 'created'],201);
        }catch(\Exception $e ){
            return response()->json(['message' => $e->getMessage()],500);
        }
        
    }
}
