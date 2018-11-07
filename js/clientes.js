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

    //Deletar Produtos    

    $(".deletar-user").on("click", function (event) {
        $.confirm({
            title: 'Excluir',
            content: 'Deseja realmente excluir este cliente?',
            icon: "fa fa-trash",
            buttons: {
                confirm: {
                    text: 'Sim',
                    btnClass: 'btn waves-effect',
                    action: function () {
                        $.alert({
                            title: "Cliente excluido",
                            content: null,
                            icon: "fa fa-trash black-text",
                            theme: "modern"
                        });
                    }
                },
                cancelar: function () {

                }
            },
            theme: 'modern'

        });
    });

    //Editar Produtos    

    $(".edit-user").on("click", function (event) {
        $.confirm({
            title: "Editar cliente",
            icon: "fa fa-edit",
            content: "" +
                "<form id='edit-user-form'>" +

                "<div class='input-field col'>" +
                "<i class='material-icons prefix'>person</i>" +
                "<input id='nome-cli' type='text' class='validate' required>" +
                "<label for='nome-cli'>Nome</label>" +
                "</div>" +

                "<div class='input-field col'>" +
                "<i class='material-icons prefix'>featured_play_list</i>" +
                "<input id='cpf' type='text' class='validate' required>" +
                "<label for='cpf'>CPF</label>" +
                "</div>" +

                "<div class='input-field col'>" +
                "<i class='material-icons prefix'>email</i>" +
                "<input id='mail' type='text' class='validate' required>" +
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
            onOpen: function(){ 
                $("#cpf").mask("999.999.999-99");
            }
            


        });
        
        
    });


    //Filtro Formulario Cadastrar Produtos

    $("#cadastrar-user-form").on("submit", function (event) {
        event.preventDefault();
        console.log("submit")
    });

    $("#CPF").mask("999.999.999-99");
    

    

});
