<?php

namespace Database\Seeders;

use App\Models\Resturant;
use Illuminate\Database\Seeder;

class ResturantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Resturant::factory(5)->create();    
    }
}
