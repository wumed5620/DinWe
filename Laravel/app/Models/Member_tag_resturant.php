<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member_tag_resturant extends Model
{
    use HasFactory;

    protected $table = 'member_tag_resturants';
    protected $primaryKey = null;
    // public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'tag_id',
        'resturant_id',
    ];

}
