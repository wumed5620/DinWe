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
        Schema::create('member_likes', function (Blueprint $table) {
            $table->unsignedBigInteger('member_id');
            $table->unsignedBigInteger('resturant_id');

            $table->primary(['member_id', 'resturant_id']);
            $table->foreign('member_id')->references('member_id')->on('members')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('resturant_id')->references('resturant_id')->on('resturants')->onDelete('cascade')->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('member_likes');
    }
};
