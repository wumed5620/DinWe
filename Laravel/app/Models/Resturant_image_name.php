<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resturant_image_name extends Model
{
    use HasFactory;

    protected $table = 'resturant_image_names';
    protected $primaryKey = 'resturant_id';
    protected $keytype = 'int';
    public $timestamps = false;

    protected $fillable = [
        'resturant_id',
        'image1',
        'image2',
        'image3',
        'image4',
        'image5',
        'menu1',
        'menu2',
        'menu3',
    ];
}
