<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('member_tags', function (Blueprint $table) {
            $table->id('tag_id');
            $table->unsignedBigInteger('member_id');
            $table->string('tag_name', 10);
            $table->tinyInteger('enable');

            $table->foreign('member_id')->references('member_id')->on('members')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('member_tags');
    }
};
