$(document).ready(function() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        }
    })

    $.ajax({
        type: 'POST',
        url: '/api/getCategories',
        data: {countryId: $('#language').val()},
        dataType: 'json',
        success: function(data) {
            let categoryListTPL = ``
            for(let i = 0; i < data.length; i++) {
                categoryListTPL += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            $('#categoryList').html(categoryListTPL)
        }
    })

    var stepValue = 0
    var ending = ""

    function handleProgressBar(text, step) {

        ending += "."

        $('.statusText').text(text+ending)

        stepValue += 10 * step
        $('#progressBar').animate({
            width: stepValue+'%'
        }, 1000, function() {
            /*
            if(stepValue >= 100) {
                $('.modal-body').html(``)
            }
            */
        })

    }

    function showError(message) {
        $('.modal-body').html(`<div class="alert alert-danger" role="alert">${message}</div>`)
        $('.modal-footer').html(`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>`)
    }

    function showSuccess(message) {
        $('.modal-body').html(`<div class="alert alert-success" role="alert">${message}</div>`)
        $('.modal-footer').html(`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>`)
    }

    $('#addFormBase').on('submit', function(event) {
        stepValue = 0
        $('.modal-body').html(``)
        $('.modal-footer').html(`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>`)

        event.preventDefault()
        if($('#username').val() != "") {
            $('.modal-title').text(`Процесс добавления в базу`)
            $('.modal-body').html(`<div class="statusText"></div><div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated" id="progressBar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: ${stepValue}%"></div></div>`)
            $('#modaladdProcess').modal('show')

            handleProgressBar('Проверяем доступность наших серверов', 5)

            const socket = io("https://a.tgcatalog.ru:4000")

            setTimeout(() => {

                handleProgressBar('Подключаемся и отправляем данные', 5)

                socket.on('rw', (tt) => {
                    showError(tt)
                })

                if(socket.connected == true) {
                    socket.emit('addBase', JSON.stringify({name: $('#ident').val()}))

                    socket.on('getInfo', (info) => {
                        let gInfo = JSON.parse(info)
                        $('.modal-footer').append(`<button type="button" id="addCatalog" class="btn btn-success">Добавить в каталог</button>`)
                        let banned = (gInfo.tg.fullChat.blocked) ? 'Да' : 'Нет'
                        let about = gInfo.tg.fullChat.about
                        $('.modal-body').html(`
                        <div class="row ginfo">
                            <div class="col-md-4">
                                <div class="photo"><img src="../t1/${gInfo.custom.avatar}" alt="tg" /></div>
                            </div>
                            <div class="col-md-8">
                                <div class="name"><b>${gInfo.tg.chats[0].title}</b></div>
                                <div class="about">${about}</div>
                                <div class="subs">Участников: ${gInfo.tg.fullChat.participantsCount} шт.</div>
                                <div class="blocked">Заблокирован: ${banned}</div>
                            </div>
                        </div>
                        `)
                        $('#addCatalog').on('click', function() {
                            $('.modal-footer').html(`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>`)
                            socket.emit('addConfirmBase', JSON.stringify({name: $('#ident').val(), categoryId: $('#categoryList').val()}))
                        })
                    })

                    socket.on('addInfo', (info) => {
                        let gInfo = JSON.parse(info)
                        showSuccess(gInfo.message)
                    })
                } else {
                    showError(`Нет соединения с одним из серверов. Обратитесь в техническую поддержку.`)
                }

            }, 3000)
        }
    })
    
})