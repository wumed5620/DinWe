<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $primaryKey = 'order_id';
    protected $keytype = 'int';
    public $timestamps = false;

    protected $fillable = [
        'member_id',
        'resturant_id',
        'order_who',
        'order_phone',
        'order_date',
        'order_time',
        'order_adult',
        'order_child',
        'order_chair',
        'order_tableware',
        'order_notes',
        'order_stars',
        'order_comment',
        'order_state',
    ];
}
