<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prueba>
 */
class PruebaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            [
                'question' => 

                    "Tres brillantes monedas
                    en cinco agujeros están

                    En un extremo se halla el
                    Seductor de la mujer de Adán

                    Sopla el viento y por
                    el Este a la Mujer le da

                    Y aquel que no tiene forma, el nulo,
                    de lejos los tiene que observar,

                    El Anciano junto a la
                    Serpiente no está.

                    Es a la izquierda de la
                    Mujer donde se pudrirá",
                'answer' => 'Vacio, Anciano, Mujer, Vacio, Serpiente',
                'clue' => 'Al lado derecho de la mujer hay un hueco vacio'
            ],
            [
                'question' => 'Entras en una habitación con una caja fuerte y una nota con la siguiente nota: 11 >> X2 << V4 >> 3 <<',
                'answer' => '11 Derecha, 12 Izquierda, 9 Derecha, 3 Izquierda',
                'clue' => 'Son numeros normales mezclados con numeros romanos'
            ],
            [
                'question' => '
                    "Tres agujas en tres alturas difieren.
                    Una es gruesa, una es alta y otra fina.
                    De lento a rápido a la derecha se mueven.
                    Scott no se posa en el 3, sino que en el 15
                    atina.
                    
                    Mildred en el 10 no está, sino que al 2 fue a parar 
                    siendo Henry quien erró y en uno atras acabó"
                    En la parte lateral del reloj se encuentra la siguiente nota: 
                    "Las cicatrices del pasado deben eliminar el clavo que detiene el Tiempo". 
                    Frente al reloj hay tres flechas en la pared, 
                    al lado de cada una están los nombres de: Henry, Mildred, y Scott, respectivamente.
                ',
                'answer' => '9:10:15',
                'clue' => 'Henry, Mildred y Scott son las agujas del reloj'
            ],
            [
                'question' => '
                    Te encuentras una habitación con un piano y una nota que dice:
                    "En la musica la clave está
                    y mientras en una CAGE te encontraras"
                ',
                'answer' => 'Do, La, Sol, Mi',
                'clue' => '
                    Nomenclatura latina: Do Re Mi Fa Sol La Si Do, 
                    Cifrado americano: C D E F G A B C
                '
            ],
            [
                'question' => '
                    Encuentras una nota que dice:
                    Te lo diré de una foma que puedas recordar, mira a tu alrededor y recuerda:
                    Enfermeras, Médicos y Arboles.
                    Ves 3 cuadros, uno donde aprarecen 2 Médicos, 
                    otro donde aparecen 9 enfermeras 2 de ellos apartadas del resto
                    y finalmente otro de la entrada de un hospital con 4 arboles.
                ',
                'answer' => '724',
                'clue' => 'Las enfemeras apartadas ya no estan en el hospital'
            ]
        ];
    }
}
