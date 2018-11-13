$(document).ready(function () {

    function carregarClientes() {
        var selectClientes = $("#select-clientes");
        //selectClientes.html("");

        $.ajax("http://localhost:8080/egautopecas-api/clientes", {
            method: "GET",
            success: function (retorno) {
                var listaClientes = JSON.parse(retorno);

                $(listaClientes).each(function (indice, elemento) {
                    selectClientes.append("<option value='" + elemento.id + "'>" + elemento.nome + "</option>");
                });
                selectClientes.formSelect();
            }
        });
    }

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

                select_produtos.formSelect();

            }
        });
    }



    var modal_pedido = $("#modal-pedido").iziModal({
        title: "Novo pedido",
        subtitle: "Entre com os dados do novo pedido",
        headerColor: "linear-gradient(90deg, rgba(80,0,0,1) 0%, rgba(147,0,0,1) 54%, rgba(48,0,0,1) 100%)",
        onOpening: function () {
            carregarClientes();
            carregarProdutos();
        }
    });


    $("#btn-pedido").click(function (e) {
        e.preventDefault();
        modal_pedido.iziModal("open");
    });


});
