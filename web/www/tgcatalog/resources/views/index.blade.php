@include('elements.header')
@include('elements.navigation')
@include('elements.footer')
@include('elements.javascript')

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        @yield('head')
    </head>
    <body>
        <main>
            <header class="p-3">
                <div class="container">
                    @yield('navigation')
                </div>
            </header>
            <section>
                <div class="container">
                    <div class="min-vh-100">
                        @yield('content')
                    </div>
                </div>
            </section>
            <footer class="p-3 text-dark">
                <div class="container">
                    @yield('footer')
                </div>
            </footer>
            @yield('javascript')
        </main>
    </body>
</html>