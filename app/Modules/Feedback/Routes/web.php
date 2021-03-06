<?php
Route::localizedGroup(function () {

    Route::group(['prefix' => config('cms.uri')], function() {
        Route::resource('feedback', 'Admin\IndexController');
    });

    Route::post('feedback/modal', 'IndexController@modal')->name('feedback.modal');
    Route::post('feedback', 'IndexController@store')->name('feedback.store');

});