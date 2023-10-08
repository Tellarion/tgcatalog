@section('navigation')
<div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" class="logoLabel d-flex align-items-center mb-2 mb-lg-0 text-decoration-none me-2">tgcatalog.ru</a>
                
                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="{{ __('config.url') }}" class="nav-link px-2 text-secondary">{{ __('navigation.catalog') }}</a></li>
                            <li><a href="{{ __('config.url') }}/s/rules" class="nav-link px-2">{{ __('navigation.rules') }}</a></li>
                            <li><a href="{{ __('config.url') }}/s/addbase" class="nav-link px-2">{{ __('navigation.addbase') }}</a></li>
                            <li><a href="https://t.me/tgcatalog_ru" class="nav-link px-2">{{ __('navigation.tgchannel') }}</a></li>
                        </ul>
                
                        <!--
                        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <input type="search" class="form-control form-control-light" placeholder="Search..." aria-label="Search">
                        </form>
                        -->
                
                        <!--<div class="text-end">
                            <button type="button" class="btn btn-success me-2">???</button>
                        </div>
                        -->
                    </div>
@endsection