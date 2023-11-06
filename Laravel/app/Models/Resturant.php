<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Resturant extends Model
{
    use HasFactory, HasApiTokens;

    protected $table = 'resturants';
    protected $primaryKey = 'resturant_id';
    protected $keytype = 'int';
    public $timestamps = false;

    protected $fillable = [
        'resturant_id',
        'resturant_name',
        'resturant_address',
        'resturant_uninum',
        'resturant_phone',
        'resturant_email',
        'resturant_image1',
        'resturant_image2',
        'resturant_image3',
        'resturant_image4',
        'resturant_image5',
        'resturant_menu1',
        'resturant_menu2',
        'resturant_menu3',
        'resturant_intro',
        'resturant_state',
        'resturant_averageconsum',
        'resturant_ifram',
        'resturant_max',
        'resturant_account',
        'resturant_password',
        'editdate',
        'edittime',
    ];


}
