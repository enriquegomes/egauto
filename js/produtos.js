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

//Deletar Produtos    

    $(".deletar-prod").on("click", function (event) {
        $.confirm({
            title: 'Excluir',
            content: 'Deseja realmente excluir este item?',
            icon: "fa fa-trash",
            buttons: {
                confirm: {
                    text: 'Sim',
                    btnClass: 'btn waves-effect',
                    action: function () {
                        $.alert({
                            title: "Produto excluido",
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
    
    $(".edit-prod").on("click", function (event) {
        $.confirm({
            title: "Editar Item",
            icon: "fa fa-edit",
            content: "" +
                "<form id='edit-prod-form'>" +
                "<div class='input-field col'>" +
                "<i class='material-icons prefix'>dvr</i>" +
                "<input id='prod' type='text' class='validate' required>" +
                "<label for='prod'>Produto</label>" +
                "</div>" +
                "<div class='input-field col s7'>" +
                "<i class='material-icons prefix'>content_paste</i>" +
                "<input id='qtd' type='text' class='validate' required>" +
                "<label for='qtd'>Quantidade</label>" +
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
                    isHidden: true, 
                }
            }



        });
    });
    
//Filtro Formulario Cadastrar Produtos

    $("#cadastrar-prod-form").on("submit", function (event) {
        event.preventDefault();
        console.log("submit")
    });

   /* function cadastrarprodutos(){
        
        var cad = $(".cad-prod");
        
        $.ajax("http://localhost:8080/egautopecas-api/produtos/cadastrar",{
            method:"POST",
            success: function(retorno){
                
            }
        });
        
    }
    */
    
// Listar produtos na tabela
    function listarprodutos(){
        var listagem = $("#listagem-prod");
        
        $.ajax("http://localhost:8080/egautopecas-api/produtos",{
            method: "GET",
            success: function(retorno){
                var listaProdutos = JSON.parse(retorno);
                
                $(listaProdutos).each(function(indice, elemento){
                    listagem.append("<tr><td>" + elemento.nome + "</td><td>"+ elemento.quantidade +"</td><td><i class='material-icons deletar-prod seletor'>delete</i></td></tr>");
                });
                
            }
        });
        
        console.log(listagem);
    }
    
    listarprodutos();
});
