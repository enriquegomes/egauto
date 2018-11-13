$(document).ready(function () {

    function carregarClientes(){
        var selectClientes = $("#select-clientes");
        //selectClientes.html("");

        /*$.ajax("http://localhost:8080/egautopecas-api/clientes", {
            method: "GET",
            success: function (retorno) {
                var listaClientes = JSON.parse(retorno);

                $(listaClientes).each(function (indice, elemento) {
                    selectClientes.append("<option value='" + elemento.id + "'>" + elemento.nome + "</option>");
                });
            }
        });*/

        //Como eu tava sem seu backend, eu fiz uma simulação do ajax

        new Promise(function(resolve, reject){
          setTimeout(function(){
            resolve('[{"id":32, "nome":"Enrique Gomes", "email": "enriquegomes@hotmail.com"}, {"id": 432, "nome":"Andrew", "email":"andtankian@live.com"}]');
          }, 500);
        }).then(function(retorno){
          var listaClientes = JSON.parse(retorno);
          console.log(listaClientes);
          $(listaClientes).each(function(indice, elemento){
            selectClientes.append("<option value='" + elemento.id + "'>" + elemento.nome + "</option>");
          });
          selectClientes.formSelect();
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

            }
        });
    }
    carregarProdutos();

    var modal_pedido = $("#modal-pedido").iziModal({
      title: "Novo pedido",
      subtitle: "Entre com os dados do novo pedido",
      headerColor: "rgb(51, 95, 126)",
      onOpening: function(){
        carregarClientes();
      }
    });


    $("#btn-pedido").click(function(e){
      e.preventDefault();
      modal_pedido.iziModal("open");
    });


});
