@extends('index')
@include('elements.sidebar')

@section('content')
<div class="row categoryList">
                            <div class="col-lg-2 col-sm-12 p-4">
                                <h3>Каталог</h3>
                                @yield('sidebar')
                            </div>
                            <div class="col-lg-8 col-sm-12 p-4">
                                <table id="catalog" class="display" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Название</th>
                                            <th>Категория</th>
                                            <th>Тип</th>
                                            <th>Участников</th>
                                            <th>Ссылка</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <script>
                            var channels = JSON.parse({!! json_encode($catalog) !!});
                        </script>
@stop