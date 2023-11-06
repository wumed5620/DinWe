<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;


class Member extends Model
{
    use HasFactory, HasApiTokens;
    protected $table = 'members';
    protected $primaryKey = 'member_id';
    protected $keytype = 'int';
    public $timestamps = false;

    protected $fillable = [
        'member_id',
        'member_account',
        'member_password',
        'member_email',
        'member_name',
        'member_birthday',
        'member_cellphone',
        'member_image',
        'member_state',
        'member_token',
        'member_giveup',
    ];
}
