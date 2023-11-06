<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Email extends Model
{
    use HasFactory, HasApiTokens;
    protected $table = 'emails';
    protected $primaryKey = 'id';
    protected $keytype = 'int';
    public $timestamps = false;

    protected $fillable = [
        'token_id'
    ];
}
