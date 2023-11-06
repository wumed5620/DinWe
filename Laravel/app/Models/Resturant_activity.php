<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resturant_activity extends Model
{
    use HasFactory;

    protected $table = 'resturant_activities';
    protected $primaryKey = 'id';
    protected $keytype = 'int';
    public $timestamps = false;

    protected $fillable = [
        'resturant_id',
        'img',
        'img_name',
        'title',
        'content',
        'editdate',
        'releasedate',
        'start_date',
        'prostate',
        'end_date',
    ];
}
