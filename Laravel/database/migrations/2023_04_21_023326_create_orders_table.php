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
        Schema::create('orders', function (Blueprint $table) {
            $table->id('order_id');
            $table->unsignedBigInteger('member_id');
            $table->unsignedBigInteger('resturant_id');
            $table->string('order_who', 20);
            $table->string('order_phone', 10);
            $table->date('order_date');
            $table->time('order_time');
            $table->integer('order_adult');
            $table->integer('order_child')->nullable();
            $table->integer('order_chair')->nullable();
            $table->integer('order_tableware')->nullable();
            $table->integer('order_stars')->nullable();
            $table->text('order_notes')->nullable();
            $table->tinyInteger('order_state')->default(1);
            $table->text('order_comment')->nullable();

            $table->foreign('member_id')->references('member_id')->on('members');
            $table->foreign('resturant_id')->references('resturant_id')->on('resturants');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
