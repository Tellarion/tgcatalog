<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Request;
use Session;
use DB;
use Route;
use Log;
use Illuminate\Support\Facades\Redis;
use Predis;

class Api extends BaseController
{
    public $db;
    public $redis = null;

    public $act, $webdata;

    public function __construct() {
        $this->middleware(function ($request, $next) {
            $this->db = DB::connection('tgcatalog');
            return $next($request);
        });
    }

    public function getCountries() {
        $getList = $this->db->table('country')->get();
        return json_encode($getList);
    }

    public function getCategories() {
        $countryId = $_POST['countryId']??1;
        $getList = $this->db->table('category')->where('country', $countryId)->orderBy('rating', 'DESC')->get();
        return json_encode($getList);
    }

    public function addRatingCategory() {
        $categoryId = $_POST['categoryId']??null;
        if($categoryId != null) {
            $this->db->table('category')->where('id', $categoryId)->update(['rating' => $this->db->raw('rating + 1')]);
        }
        return json_encode(array('api' => true, 'success' => true));
    }

    public function addBase() {
        $ident = $_POST['ident']??null;
        return json_encode(array('api' => true, 'success' => true));
    }

}