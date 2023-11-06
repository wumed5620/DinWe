<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resturant_operating_time extends Model
{
    use HasFactory;
    protected $table = 'resturants_operating_time';
    protected $primaryKey = 'id';
    protected $keytype = 'int';
    public $timestamps = false;

    protected $fillable = [
        'resturant_id',
        'weekday',
        'isOpen',
        'opentime',
        'closetime',
        'break_optime',
        'break_edtime',
    ];

}
