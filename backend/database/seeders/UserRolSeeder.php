<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserRolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userRol = [
            [
                'userId' => 1,
                'rolId' => 1
            ],
            [
                'userId' => 1,
                'rolId' => 2
            ],
            [
                'userId' => 1,
                'rolId' => 3
            ],
            [
                'userId' => 2,
                'rolId' => 2
            ],
            [
                'userId' => 3,
                'rolId' => 2
            ],
            [
                'userId' => 4,
                'rolId' => 2
            ],
            [
                'userId' => 5,
                'rolId' => 2
            ],
            [
                'userId' => 6,
                'rolId' => 2
            ],
            [
                'userId' => 7,
                'rolId' => 2
            ],
            [
                'userId' => 8,
                'rolId' => 2
            ],
            [
                'userId' => 9,
                'rolId' => 2
            ],
            [
                'userId' => 10,
                'rolId' => 2
            ]
        ];

        DB::table('userRol')->insert($userRol);
    }
}
