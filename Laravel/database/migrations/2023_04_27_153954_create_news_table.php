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
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('resturant_id');
            $table->string('resturant_name', 50);
            $table->binary('image');
            $table->string('title',50);
            $table->string('subtitle',50);
            $table->longText('text');
            $table->timestamps();
            $table->integer('state')->length(2)->default(1);
            
            $table->foreign('resturant_id')->references('resturant_id')->on('resturants');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
