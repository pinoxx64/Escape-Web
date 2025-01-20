<?php

namespace Database\Seeders;

use App\Models\Prueba;
use App\Models\Rol;
use App\Models\User;
use App\Models\UserRol;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        foreach (Rol::factory()->definition() as $role) {
            Rol::create($role);
        }
        $this->call([
            UserRolSeeder::class
        ]);
        Prueba::factory()->create();
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
