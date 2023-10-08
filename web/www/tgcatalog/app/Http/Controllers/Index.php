<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Request;
use Session;
use DB;
use Route;
use Log;

class Index extends BaseController
{
    public $web;
    public $db;

    public $act, $webdata;

    public function __construct() {
        $this->middleware(function ($request, $next) {
            $this->db = DB::connection('tgcatalog');
            return $next($request);
        });
    }

    public function Catalog(Request $request, $name = null) {
        $title = null;
        $desc = null;
        if($name) {
            $getSelectChannel = $this->db->table('category')->select('name')->where('nameT', $name)->get();
            $getChannels = $this->db->table('category')->select('catalog.title', 'catalog.photo', 'catalog.titleT', 'catalog.username', 'catalog.participants', 'catalog.megagroup', 'catalog.gigagroup', 'category.name as categoryName', 'category.nameT as categoryTName')->where('nameT', $name)->rightJoin('catalog', 'category.id', '=', 'catalog.categoryId')->orderBy('catalog.participants', 'DESC')->get();
            $title = $getSelectChannel[0]->name;
        } else {
            $getChannels = $this->db->table('category')->select('catalog.title', 'catalog.photo', 'catalog.titleT', 'catalog.username', 'catalog.participants', 'catalog.megagroup', 'catalog.gigagroup', 'category.name as categoryName', 'category.nameT as categoryTName')->rightJoin('catalog', 'category.id', '=', 'catalog.categoryId')->orderBy('catalog.participants', 'DESC')->get();
        }
        return view('modules.main', ['act' => 'main', 'titleT' => $title, 'descT' => $desc, 'catalog' => json_encode($getChannels)]);
    }

    public function Rules() {
        $title = "Правила добавления в каталог";
        $desc = null;
        return view('modules.rules', ['act' => 'rules', 'titleT' => $title, 'descT' => $desc]);
    }

    public function AddBase() {
        $title = "Добавить в базу";
        $desc = null;
        $act = "addbase";
        return view('modules.addbase', ['act' => $act, 'titleT' => $title, 'descT' => $desc]);
    }

    public function showCard($name) {
        $title = null;
        $desc = null;
        $act = "showCard";
        if($name) {
            $channel = $this->db->table('catalog')->orderBy('participants', 'DESC')->where('username', $name)->get();
            $channel = $channel[0];
            $channel->about = strip_tags(base64_decode($channel->about));
            $title = $channel->title;
            $desc = $channel->about;
            return view('modules.showcard', ['act' => $act, 'channel' => $channel, 'titleT' => $title, 'descT' => $desc]);
        } else {
            return redirect()->route('/');
        }
    }

}