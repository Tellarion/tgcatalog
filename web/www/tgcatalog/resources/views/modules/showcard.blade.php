@extends('index')
@include('elements.sidebar')

@section('content')
<div class="row">
                            <div class="col-lg-12 col-sm-12 p-4">
                                <h3><img src="{{ __('config.url') }}/s1/{!! $channel->photo !!}" style="border-radius: 50%;" width="160px" height="160px" alt="{!! $channel->titleT !!}" /><span class="m-4">{!! $channel->title !!} {{ $channel->megagroup == 0 ? '[Канал]' : '[Чат]' }}</span></h3>
                                <small>{!! $channel->titleT !!}</small>
                                <p class="mb-4"><pre>{!! $channel->about !!}</pre></p>
                                <p>Участников: {{ $channel->participants }} шт.</p>
                                <p>Добавлен к каталог: {{ $channel->createdAt }}</p>
                                <p>Обновлен: {{ $channel->updatedAt }}</p>
                                <p><a class="btn btn-outline-success" href="https://t.me/{!! $channel->username !!}">{!! $channel->title !!}</a></p>
                            </div>
                        </div>
                        <script src="js/socket.io.min.js"></script>
@stop