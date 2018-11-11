$(document).ready(function () {

    //inicializando izimodal
    var izimodal = $("#cadastrar-prod").iziModal({
        title: "Adicionar novo produto",
        subtitle: "Entre com o nome e a quantidade disponível no estoque.",
        headerColor: "linear-gradient(90deg, rgba(80,0,0,1) 0%, rgba(147,0,0,1) 54%, rgba(48,0,0,1) 100%)"
    });

    //Evento Click IziModal

    $(".trigger").on('click', function (event) {
        event.preventDefault();
        izimodal.iziModal('open');
    });

    //Filtro Formulario Cadastrar Produtos

    $("#cadastrar-prod-form").on("submit", function (event) {
        event.preventDefault();
        var form = $("#cadastrar-prod-form");
        var formSerializado = form.serialize();
        $.ajax("http://localhost:8080/egautopecas-api/produtos/cadastrar", {
            method: 'POST',
            data: formSerializado,
            success: function (retorno) {
                $.alert({
                    title: "Produto cadastrado com sucesso!",
                    content: "",
                    icon: "fa fa-check-circle green-text",
                    theme: "modern"

                });
                $('#cadastrar-prod').iziModal('close');
                var tempForm = $('#cadastrar-prod').find("form");
                tempForm[0].reset();
                listarprodutos();


            }
        });


    });


    // Listar produtos na tabela
    function listarprodutos() {
        var listagem = $("#listagem-prod");
        listagem.html("");
        $.ajax("http://localhost:8080/egautopecas-api/produtos", {
            method: "GET",
            success: function (retorno) {
                var listaProdutos = JSON.parse(retorno);
                $(listaProdutos).each(function (indice, elemento) {
                    listagem.append("<tr><td>" + elemento.nome + "</td><td>" + elemento.quantidade + "</td><td><i class='material-icons deletar-prod seletor' data-idprod='" + elemento.id + "'>delete</i><i class='material-icons edit-prod seletor' data-idprod='" + elemento.id + "'>edit</i></td></tr>");
                });

               

                //Editar Produtos    

                $(".edit-prod").on("click", function (event) {

                    var editclick = $(this);

                    var idprod = editclick[0].dataset.idprod;

                    $.ajax("http://localhost:8080/egautopecas-api/produtos/editar/" + idprod, {
                        success: function (retorno) {
                            //Converte JSON em objeto JS
                            var prod = JSON.parse(retorno);
                            $.confirm({
                                title: "Editar Item",
                                icon: "fa fa-edit",
                                content: "" +
                                    "<form id='edit-prod-form'>" +
                                    "<div class='input-field col'>" +
                                    "<i class='material-icons prefix'>dvr</i>" +
                                    "<input id='prod' type='text' class='validate' value='" + prod.nome + "' name='editname' required>" +
                                    "<label for='prod'>Produto</label>" +
                                    "</div>" +
                                    "<div class='input-field col s7'>" +
                                    "<i class='material-icons prefix'>content_paste</i>" +
                                    "<input id='qtd' type='text' class='validate' value='" + prod.quantidade + "' name='editqtd' required>" +
                                    "<label for='qtd'>Quantidade</label>" +
                                    "</div>" +
                                    "<div class='col'>" +
                                    "<div class='row'>" +
                                    "<div class='col-12 center-align space-top-modal'>" +
                                    "<button type='submit' id='submit-edit' class='btn waves-effect'>Editar</button>" +
                                    "</div>" +
                                    "</div>" +
                                    "</div>" +
                                    "</form>",


                                backgroundDismiss: true,
                                closeIcon: true,
                                buttons: {
                                    dom: {
                                        text: "dom",
                                        isHidden: true,
                                    }
                                },
                                onOpen: function () {
                                    var labels = $("form#edit-prod-form").find("label");

                                    labels.addClass("active");
                                }



                            });



                        }
                    });


                });
                
                 //Deletar Produtos    

                $(".deletar-prod").on("click", function (event) {

                    var elementoSendoClicado = $(this);

                    var idProduto = elementoSendoClicado[0].dataset.idprod;

                    $.confirm({
                        title: 'Excluir',
                        content: 'Deseja realmente excluir este item?',
                        icon: "fa fa-trash",
                        buttons: {
                            confirm: {
                                text: 'Sim',
                                btnClass: 'btn waves-effect',
                                action: function () {

                                    $.ajax("http://localhost:8080/egautopecas-api/produtos/deletar/" + idProduto, {
                                        type: "DELETE",
                                        success: function () {
                                            $.alert({
                                                title: "Produto excluido",
                                                content: null,
                                                icon: "fa fa-trash black-text",
                                                theme: "modern"
                                            });
                                            listarprodutos();
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

    listarprodutos();
});
