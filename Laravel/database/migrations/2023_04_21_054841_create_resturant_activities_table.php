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
        Schema::create('resturant_activities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('resturant_id');
            $table->binary('img')->nullable();
            $table->string('img_name', 50)->nullable();
            $table->string('title', 50)->nullable();
            $table->text('content')->nullable();
            $table->date('editdate')->nullable();
            $table->date('releasedate')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->integer('prostate')->length(1)->default(1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resturant_activities');
    }
};
