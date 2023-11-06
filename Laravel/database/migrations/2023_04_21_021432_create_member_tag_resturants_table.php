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
        Schema::create('member_tag_resturants', function (Blueprint $table) {
            $table->unsignedBigInteger('tag_id');
            $table->unsignedBigInteger('resturant_id');

            $table->primary(['tag_id', 'resturant_id']);
            $table->foreign('tag_id')->references('tag_id')->on('member_tags')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('resturant_id')->references('resturant_id')->on('resturants')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('member_tag_resturants');
    }
};
