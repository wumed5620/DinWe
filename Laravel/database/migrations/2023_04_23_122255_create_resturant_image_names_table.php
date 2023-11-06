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
        Schema::create('resturant_image_names', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('resturant_id');
            $table->string('image1', 50)->nullable();
            $table->string('image2', 50)->nullable();
            $table->string('image3', 50)->nullable();
            $table->string('image4', 50)->nullable();
            $table->string('image5', 50)->nullable();
            $table->string('menu1', 50)->nullable();
            $table->string('menu2', 50)->nullable();
            $table->string('menu3', 50)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resturant_image_names');
    }
};
