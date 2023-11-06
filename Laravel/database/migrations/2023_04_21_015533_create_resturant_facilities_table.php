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
        Schema::create('resturant_facilities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('resturant_id');
            $table->tinyInteger('cash')->default(0);
            $table->tinyInteger('visa')->default(0);
            $table->tinyInteger('creditcard')->default(0);
            $table->tinyInteger('streetpay')->default(0);
            $table->tinyInteger('easycard')->default(0);
            $table->tinyInteger('linepay')->default(0);
            $table->tinyInteger('applepay')->default(0);
            $table->tinyInteger('googlepay')->default(0);
            $table->tinyInteger('taiwanpay')->default(0);
            $table->tinyInteger('alcohol')->default(0);
            $table->tinyInteger('wifi')->default(0);
            $table->tinyInteger('socket')->default(0);
            $table->tinyInteger('smoking')->default(0);
            $table->tinyInteger('childseat')->default(0);
            $table->tinyInteger('childware')->default(0);
            $table->tinyInteger('nursingroom')->default(0);
            $table->tinyInteger('diaper')->default(0);
            $table->tinyInteger('stroller')->default(0);
            $table->tinyInteger('touristcard')->default(0);
            $table->tinyInteger('shuttle')->default(0);
            $table->tinyInteger('car')->default(0);
            $table->tinyInteger('scotter')->default(0);
            $table->tinyInteger('parkdiscount')->default(0);
            $table->tinyInteger('venuerental')->default(0);
            $table->tinyInteger('barrierfree')->default(0);
            $table->tinyInteger('toy')->default(0);
            $table->tinyInteger('slide')->default(0);
            $table->tinyInteger('ballpit')->default(0);
            $table->tinyInteger('sandpit')->default(0);
            $table->tinyInteger('farm')->default(0);
            $table->tinyInteger('lawn')->default(0);
            $table->tinyInteger('animal')->default(0);
            $table->tinyInteger('fishpond')->default(0);
            $table->tinyInteger('ecopond')->default(0);
            $table->tinyInteger('paddingpool')->default(0);
            $table->tinyInteger('home')->default(0);
            $table->tinyInteger('videogame')->default(0);
            $table->tinyInteger('childrenbook')->default(0);
            $table->tinyInteger('course')->default(0);
            $table->tinyInteger('fullmoon')->default(0);
            $table->tinyInteger('saliva')->default(0);
            $table->tinyInteger('oneyear')->default(0);
            $table->tinyInteger('sexparty')->default(0);
            $table->tinyInteger('birthday')->default(0);
            $table->tinyInteger('vegetarian')->default(0);
            $table->tinyInteger('vegan')->default(0);
            $table->tinyInteger('muslin')->default(0);
            $table->tinyInteger('glutenfree')->default(0);
            $table->date('editdate')->nullable();
            $table->time('edittime')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resturant_facilities');
    }
};
