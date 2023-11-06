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
        Schema::create('members', function (Blueprint $table) {
            $table->id('member_id');
            $table->string('member_account', 20);
            $table->string('member_password', 100);
            $table->string('member_email', 100)->nullable();
            $table->string('member_name', 50)->nullable();
            $table->date('member_birthday')->nullable();
            $table->string('member_cellphone', 10)->nullable();
            $table->binary('member_image')->nullable();
            $table->integer('member_state')->length(2)->default(1);
            $table->string('member_token', 100)->nullable();
            $table->integer('member_giveup')->length(2)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
