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
        Schema::create('resturants', function (Blueprint $table) {
            $table->id('resturant_id');
            $table->string('resturant_name', 50);
            $table->string('resturant_address', 50);
            $table->string('resturant_uninum', 8)->nullable();
            $table->string('resturant_phone', 10)->nullable();
            $table->string('resturant_email', 50)->nullable();
            $table->binary('resturant_image1')->nullable();
            $table->binary('resturant_image2')->nullable();
            $table->binary('resturant_image3')->nullable();
            $table->binary('resturant_image4')->nullable();
            $table->binary('resturant_image5')->nullable();
            $table->binary('resturant_menu1')->nullable();
            $table->binary('resturant_menu2')->nullable();
            $table->binary('resturant_menu3')->nullable();
            $table->longText('resturant_intro')->nullable();
            $table->integer('resturant_state')->length(1)->default(1);
            $table->integer('resturant_averageconsum')->nullable();
            $table->string('resturant_ifram', 600)->nullable();
            $table->integer('resturant_max')->nullable();
            $table->string('resturant_account', 20)->nullable();
            $table->string('resturant_password', 100)->nullable();
            $table->date('editdate')->nullable();
            $table->time('edittime')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resturants');
    }
};
