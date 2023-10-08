@extends('index')
@include('elements.sidebar')

@section('content')
<div class="row">
                            <div class="col-lg-12 col-sm-12 p-4">
                                <h3>Добавить в базу</h3>
                                <p>С помощью данной формы, вы сможете подать заявление на участие канала, чата, бота в нашем каталоге.</p>
                                <form id="addFormBase">
                                    <div class="form-group mb-2">
                                        <label for="ident">Идентификатор</label>
                                        <input type="text" class="form-control" id="ident" placeholder="username (например: topor)" required="">
                                    </div>
                                    <div class="form-group mb-2">
                                        <label>Язык</label>
                                        <select class="form-control" id="language">
                                            <option value="1">Русский</option>
                                        </select>
                                    </div>
                                    <div class="form-group mb-4">
                                        <label>Категория</label>
                                        <select class="form-control" id="categoryList">
                                            
                                        </select>
                                    </div>
                                    <button type="submit" id="addBase" class="btn btn-outline-primary">Проверить</button>
                                </form>
                                <!-- Modal -->
                                <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="modaladdProcess" tabindex="-1" aria-hidden="true">
                                  <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h5 class="modal-title"></h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div class="modal-body">
                                        
                                      </div>
                                      <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                        <script src="{{ __('config.url') }}/js/socket.io.min.js"></script>
@stop