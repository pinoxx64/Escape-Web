<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PruebaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pregunta = [
            [
                'question' => 'Tres brillantes monedas en cinco agujeros están En un extremo se halla el Seductor de la mujer de Adán Sopla el viento y por el Este a la Mujer le da Y aquel que no tiene forma,el nulo,de lejos los tiene que observar,El Anciano junto a la Serpiente no está. Es a la izquierda de la Mujer donde se pudrirá',
                'answer' => 'Vacio,Anciano,Mujer,Vacio,Serpiente',
                'clue' => 'Al lado derecho de la mujer hay un hueco vacio',
                'answerSelect' => 'Vacio,Anciano,Mujer,Serpiente',
                'active' => 1

            ],
            [
                'question' => 'Entras en una habitación con una caja fuerte y una nota con la siguiente nota: 11 >> X2 << V4 >> 3 <<',
                'answer' => '11,12,9,3',//Derecha,Izquierda,Derecha,Izquierda
                'clue' => 'Son numeros normales mezclados con numeros romanos',
                'answerSelect' => '1,2,3,4,5,6,7,8,9,10,11,12',
                'active' => 1
            ],
            [
                'question' => '"Tres agujas en tres alturas difieren. Una es gruesa,una es alta y otra fina. De lento a rápido a la derecha se mueven. Scott no se posa en el 3,sino que en el 15 atina. Mildred en el 10 no está,sino que al 2 fue a parar siendo Henry quien erró y en uno atras acabó" En la parte lateral del reloj se encuentra la siguiente nota: "Las cicatrices del pasado deben eliminar el clavo que detiene el Tiempo". Frente al reloj hay tres flechas en la pared,al lado de cada una están los nombres de: Henry,Mildred,y Scott,respectivamente.',
                'answer' => '9:10:15',
                'clue' => 'Henry,Mildred y Scott son las agujas del reloj',
                'answerSelect' => null,
                'active' => 1
            ],
            [
                'question' => 'Te encuentras una habitación con un piano y una nota que dice: "En la musica la clave está y mientras en una CAGE te encontraras"',
                'answer' => 'Do,La,Sol,Mi',
                'clue' => 'Nomenclatura latina: Do Re Mi Fa Sol La Si Do,Cifrado americano: C D E F G A B C',
                'answerSelect' => 'Do,Re,Mi,Fa,Sol,La,Si',
                'active' => 1
            ],
            [
                'question' => 'Encuentras una nota que dice: Te lo diré de una foma que puedas recordar,mira a tu alrededor y recuerda: Enfermeras,Médicos y Arboles. Ves 3 cuadros,uno donde aprarecen 2 Médicos,otro donde aparecen 9 enfermeras 2 de ellos apartadas del resto y finalmente otro de la entrada de un hospital con 4 arboles.',
                'answer' => '724',
                'clue' => 'Las enfemeras apartadas ya no estan en el hospital',
                'answerSelect' => null,
                'active' => 1
            ],
            [
                'question' => 'Mientras más saco,más grande me hago. ¿Qué soy?',
                'answer' => 'Hoyo',
                'clue' => 'Se crea al excavar en la tierra.',
                'answerSelect' => null,
                'active' => 1
            ]
        ];

        
        DB::table('prueba')->insert($pregunta);
    }
}
