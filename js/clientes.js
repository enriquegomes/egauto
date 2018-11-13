$(document).ready(function () {

    //inicializando izimodal
    var izimodal = $("#cadastrar-user").iziModal({
        title: "Adicionar novo cliente",
        subtitle: "Entre com o nome, CPF e e-mail do cliente.",
        headerColor: "linear-gradient(90deg, rgba(80,0,0,1) 0%, rgba(147,0,0,1) 54%, rgba(48,0,0,1) 100%)"
    });

    //Evento Click IziModal

    $(".trigger").on('click', function (event) {
        event.preventDefault();
        izimodal.iziModal('open');
    });

    //Filtro Formulario Cadastrar Produtos

    $("#cadastrar-user-form").on("submit", function (event) {
        event.preventDefault();
        var form = $("#cadastrar-user-form");
        var formSerializado = form.serialize();
        $.ajax("http://localhost:8080/egautopecas-api/clientes/cadastrar", {
            method: 'POST',
            data: formSerializado,
            success: function (retorno) {
                $.alert({
                    title: "Cliente cadastrado com sucesso!",
                    content: "",
                    icon: "fa fa-check-circle green-text",
                    theme: "modern"
                });

                $('#cadastrar-user').iziModal('close');
                var tempForm = $('#cadastrar-user').find('form');
                tempForm[0].reset();
                listarclientes();
            }

        });
    });



    //Listar Clientes na Tabela

    function listarclientes() {

        var listagem = $("#listagem-clientes");

        listagem.html("");

        $.ajax("http://localhost:8080/egautopecas-api/clientes", {

            method: "GET",

            success: function (retorno) {

                var listaClientes = JSON.parse(retorno);
                $(listaClientes).each(function (indice, elemento) {
                    listagem.append("<tr><td>" + elemento.nome + "</td><td>" + elemento.cpf + "</td><td>" + elemento.email + "</td><td><i class='material-icons deletar-user seletor' data-idprod='" + elemento.id + "'>delete</i><i class='material-icons edit-user seletor' data-idprod='" + elemento.id + "'>edit</i></td></tr>");
                });



                //Editar Produtos  

                $(".edit-user").on("click", function (event) {

                    var editclick = $(this);

                    var idclient = editclick[0].dataset.idprod;

                    $.ajax("http://localhost:8080/egautopecas-api/clientes/editar/" + idclient, {

                        success: function (retorno) {

                            //Converte JSON em objeto JS
                            var client = JSON.parse(retorno);
                            var jc = $.confirm({
                                title: "Editar cliente",
                                icon: "fa fa-edit",
                                content: "" +
                                    "<form id='edit-user-form'>" +

                                    "<div class='input-field col'>" +
                                    "<i class='material-icons prefix'>person</i>" +
                                    "<input id='nome-cli' type='text' name='nome' value='" + client.nome + "' class='validate' required>" +
                                    "<label for='nome-cli'>Nome</label>" +
                                    "</div>" +

                                    "<div class='input-field col'>" +
                                    "<i class='material-icons prefix'>featured_play_list</i>" +
                                    "<input id='cpf' type='text' name='cpf' value='" + client.cpf + "' class='validate' required>" +
                                    "<label for='cpf'>CPF</label>" +
                                    "</div>" +

                                    "<div class='input-field col'>" +
                                    "<i class='material-icons prefix'>email</i>" +
                                    "<input id='mail' type='text' name='email' value='" + client.email + "' class='validate' required>" +
                                    "<label for='mail'>E-mail</label>" +
                                    "</div>" +

                                    "<div class='col'>" +
                                    "<div class='row'>" +
                                    "<div class='col-12 center-align space-top-modal'>" +
                                    "<button type='submit' class='btn waves-effect'>Editar</button>" +
                                    "</div>" +
                                    "</div>" +
                                    "</div>" +
                                    "</form>",
                                backgroundDismiss: true,
                                closeIcon: true,
                                buttons: {
                                    dom: {
                                        text: "dom",
                                        isHidden: true
                                    }
                                },

                                onOpen: function () {
                                    var labels = $("form#edit-user-form").find("label");

                                    labels.addClass("active");

                                    $("#edit-user-form").on("submit", function (event) {
                                        event.preventDefault();
                                        var form = $("#edit-user-form");
                                        var formSerializado = form.serialize();
                                        $.ajax("http://localhost:8080/egautopecas-api/clientes/editar/" + idclient, {
                                            method: 'PUT',
                                            data: formSerializado,
                                            success: function (retorno) {
                                                $.alert({
                                                    title: "Cliente editado com sucesso!",
                                                    content: "",
                                                    icon: "fa fa-check-circle green-text",
                                                    theme: "modern",
                                                });
                                                jc.close(jc);
                                                listarclientes();
                                            }

                                        });
                                    });
                                }

                            });
                        }
                    });
                });

                //Deletar Produtos    

                $(".deletar-user").on("click", function (event) {

                    var elementoSendoClicado = $(this);

                    var idCliente = elementoSendoClicado[0].dataset.idprod;

                    $.confirm({
                        title: 'Excluir',
                        content: 'Deseja realmente excluir este item?',
                        icon: "fa fa-trash",
                        buttons: {
                            confirm: {
                                text: 'Sim',
                                btnClass: 'btn waves-effect',
                                action: function () {

                                    $.ajax("http://localhost:8080/egautopecas-api/clientes/deletar/" + idCliente, {
                                        type: "DELETE",
                                        success: function () {
                                            $.alert({
                                                title: "Produto excluido",
                                                content: null,
                                                icon: "fa fa-trash black-text",
                                                theme: "modern"
                                            });
                                            listarclientes();
                                        }
                                    });



                                }
                            },
                            cancelar: function () {

                            }
                        },
                        theme: 'modern'

                    });
                });

            }
        });
    }
    listarclientes();
});

// $("#cpf").mask("999.999.999-99");
