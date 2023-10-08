$(document).ready(function() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        }
    })

    var table = $('#catalog').DataTable({
        "language": {
            "search": "Поиск:",
            "lengthMenu": "Отображать _MENU_ записей на странице",
            "zeroRecords": "Данных нет",
            "info": "Showing page _PAGE_ of _PAGES_",
            "infoEmpty": "Нет доступных страниц",
            "infoFiltered": "(filtered from _MAX_ total records)",
            "paginate": {
                "first":      "Первая",
                "last":       "Последняя",
                "next":       "Следующая",
                "previous":   "Предыдущая"
            },
        },
        columnDefs: [{
            "className": "dt-center",
            "defaultContent": "-",
            "targets": "_all"
        }],
        drawCallback: function () {
            $( 'a.paginate_button', this.api().table().container() ).attr('href', '#!');
        }
    })

    for(let i = 0; i < channels.length; i++) {
        let typeChannel = (channels[i].megagroup == 1) ? `Чат` : `Канал`
        let categoryURL = `<a href="/${channels[i].categoryTName}">${channels[i].categoryName}</a>`
        table.row.add([`<img src='s1/${channels[i].photo}' height="64px" width="64px" alt="${channels[i].titleT}" style="border-radius: 50%;" />`, `<a href="c/${channels[i].username}">${channels[i].title}</a>`, categoryURL, typeChannel, channels[i].participants, `<a class="btn btn-outline-success" href="https://t.me/${channels[i].username}">Перейти</a>`]).draw(false)
    }

    $.ajax({
        type: 'POST',
        url: '/api/getCountries',
        data: "",
        dataType: 'json',
        success: function(data) {
            let language = $('html').attr('lang')
            let countryId = data.filter((element) => { console.log(element.name); element.name == language } )
            $('.categoryList .country').html((language == "ru") ? data[0].fullName : data[1].fullName)
            $.ajax({
                type: 'POST',
                url: '/api/getCategories',
                data: {countryId: countryId},
                dataType: 'json',
                success: function(data) {
                    let counter = 0
                    let generateCategoriesTpl = ``
                    for(let i = 0; i < data.length; i++) {
                        generateCategoriesTpl += `<li data-id="${data[i].id}"><a href="${data[i].nameT}">${data[i].name}</a></li>`
                        //table.row.add([data[i].id, ]).draw(false)
                    }
                    $('.categoryList ul').html(generateCategoriesTpl)
                    $('.categoryList ul li').on('click', function() {
                        let categoryId = $(this).data('id')
                        $.ajax({
                            type: 'POST',
                            url: '/api/addRatingCategory',
                            data: {categoryId: categoryId},
                            dataType: 'json',
                            success: function(data) {

                            }
                        })
                    })
                }
            })
        }
    });
})