<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member_tag extends Model
{
    use HasFactory;

    protected $table = 'member_tags';
    protected $primaryKey = 'tag_id';
    protected $keytype = 'int';
    public $timestamps = false;

    protected $fillable = [
        'tag_id',
        'member_id',
        'tag_name',
        'enable',
    ];
}
