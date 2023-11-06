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
        Schema::create('resturants_operating_time', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('resturant_id');
            $table->integer('weekday');
            $table->integer('isOpen')->nullable();
            $table->time('opentime')->nullable();
            $table->time('closetime')->nullable();
            $table->time('break_optime')->nullable();
            $table->time('break_edtime')->nullable();

            $table->foreign('resturant_id')
                ->references('resturant_id')
                ->on('resturants')
                ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resturant_operating_times');
    }
};
