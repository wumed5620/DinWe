<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member_like extends Model
{
    use HasFactory;

    protected $table = 'member_likes';
    // protected $primaryKey = null;
    // public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'member_id',
        'resturant_id'
    ];

}
