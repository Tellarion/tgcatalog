@section('javascript')
<script src="{{ __('config.url') }}/js/bootstrap.min.js"></script>
            <script src="{{ __('config.url') }}/js/jquery-3.6.0.min.js"></script>
@if($act == "main")
<script src="{{ __('config.url') }}/js/jquery.dataTables.min.js"></script>
            <script src="{{ __('config.url') }}/js/catalog.js"></script>
@elseif($act == "addbase")
<script src="{{ __('config.url') }}/js/addbase.js"></script>
@endif
@endsection