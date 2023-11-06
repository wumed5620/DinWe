<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resturant_facility extends Model
{
    use HasFactory;

    protected $table = 'resturant_facilities';
    protected $primaryKey = 'id';
    protected $keytype = 'int';
    public $timestamps = false;

    protected $fillable = [
        'resturant_id',
        'cash',
        'visa',
        'creditcard',
        'streetpay',
        'easycard',
        'linepay',
        'applepay',
        'googlepay',
        'taiwanpay',
        'alcohol',
        'wifi',
        'socket',
        'smoking',
        'childseat',
        'childware',
        'nursingroom',
        'diaper',
        'stroller',
        'touristcard',
        'shuttle',
        'car',
        'scotter',
        'parkdiscount',
        'venuerental',
        'barrierfree',
        'toy',
        'slide',
        'ballpit',
        'sandpit',
        'farm',
        'lawn',
        'animal',
        'fishpond',
        'ecopond',
        'paddingpool',
        'home',
        'videogame',
        'childrenbook',
        'course',
        'fullmoon',
        'saliva',
        'oneyear',
        'sexparty',
        'birthday',
        'vegetarian',
        'vegan',
        'muslin',
        'glutenfree',
        'editdate',
        'edittime',
    ];
}
