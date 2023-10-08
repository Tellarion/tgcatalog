@section('head')
@php
if($titleT) {
$titleCEO = $titleT. __('config.title2');
}
if($descT) {
$descCEO = $descT;
}
@endphp
<meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{ $titleT == null ? __('config.title') : $titleCEO }}</title>
        <meta name="description" content="{{ $descT == null ? __('config.description') : $descCEO }}">
        <meta name="keywords" content="{{ __('config.keywords') }}">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ __('config.url') }}/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="{{ __('config.url') }}/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="{{ __('config.url') }}/favicon-16x16.png">
        <link rel="manifest" href="{{ __('config.url') }}/site.webmanifest">
        <link rel="stylesheet" href="{{ __('config.url') }}/css/bootstrap.min.css" />
        <link rel="stylesheet" href="{{ __('config.url') }}/css/jquery.dataTables.min.css" />
        <link rel="stylesheet" href="{{ __('config.url') }}/css/tgcatalog.css?1" />
@endsection