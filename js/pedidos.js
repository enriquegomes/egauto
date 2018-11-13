$(document).ready(function () {

    function carregarClientes(){
        var selectClientes = $("#select-clientes");
        //selectClientes.html("");
        
        $.ajax("http://localhost:8080/egautopecas-api/clientes", {
            method: "GET",
            success: function (retorno) {
                var listaClientes = JSON.parse(retorno);

                $(listaClientes).each(function (indice, elemento) {
                    selectClientes.append("<option value='" + elemento.id + "'>" + elemento.nome + "</option>");
                });
            }
        });
            
    }
    carregarClientes();

    function carregarProdutos() {
        var select_produtos = $("#selectprod");
        //select_produtos.html("");

        $.ajax("http://localhost:8080/egautopecas-api/produtos", {
            method: "GET",
            success: function (retorno) {
                var listaProdutos = JSON.parse(retorno);

                $(listaProdutos).each(function (indice, elemento) {
                    select_produtos.append("<option value='" + elemento.id + "'>" + elemento.nome + "</option>");
                });

            }
        });
    }
    carregarProdutos();

    /*//inicializando izimodal
    var izimodal = $("#pedido").iziModal({
        title: "Novo Pedido",
        subtitle: "Preencha os  campos para completar o pedido.",
        headerColor: "linear-gradient(90deg, rgba(80,0,0,1) 0%, rgba(147,0,0,1) 54%, rgba(48,0,0,1) 100%)",

        onOpening: function () {
            
            
            $("#select-prod").formSelect();

        }


    });

    //Evento Click IziModal

    $(".trigger").on('click', function (event) {

        event.preventDefault();
        izimodal.iziModal('open');

    });*/


});
