<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prueba extends Model
{
    protected $table="prueba";
    protected $fillable = [
        'question',
        'answer',
        'clue',
        'answerSelect',
        'active'
    ];
}
