function adicionarProduto() {
  // Recupera os valores dos inputs
  var tutor = document.getElementById("inputCliente").value;
  var quantidade = document.getElementById("inputQuantidade").value;
  var produto = document.getElementById("inputProduto").value;
  var valorUnitario = document.getElementById("inputValorUnitario").value;

  // Validação: Garante que QTD e UNT sejam números
  if (isNaN(quantidade) || isNaN(valorUnitario)) {
    alert("QTD e UNT devem ser números válidos.");
    return;
  }

  // Calcula o total multiplicando a quantidade pelo valor unitário
  var total = quantidade * valorUnitario;

  // Cria uma nova linha na tabela
  var tabela = document
    .getElementById("tabelaProdutos")
    .getElementsByTagName("tbody")[0];
  var novaLinha = tabela.insertRow(tabela.rows.length);

  // Adiciona células à nova linha
  var celulaQuantidade = novaLinha.insertCell(0);
  var celulaProduto = novaLinha.insertCell(1);
  var celulaValorUnitario = novaLinha.insertCell(2);
  var celulaTotal = novaLinha.insertCell(3);

  // Preenche as células com os valores dos inputs e o total calculado
  celulaQuantidade.innerHTML = quantidade;
  celulaProduto.innerHTML = produto;
  celulaValorUnitario.innerHTML = "R$ " + valorUnitario;
  celulaTotal.innerHTML = "R$ " + total.toFixed(2);

  // Limpa os inputs após adicionar o produto
  document.getElementById("inputQuantidade").value = "";
  document.getElementById("inputProduto").value = "";
  document.getElementById("inputValorUnitario").value = "";

  // Atualiza a prévia
  atualizarPrevia();
}

function gerarRecibo() {
  // Recupera o nome do tutor
  var tutor = document.getElementById("inputCliente").value;

  // Validação: Garante que o nome do tutor foi inserido
  if (!tutor.trim()) {
    alert("Digite o nome do tutor.");
    return;
  }

  // Atualiza o nome do tutor no cupom
  document.getElementById("dadosCliente").innerHTML =
    "<p>TUTOR</p><p>" + tutor + "</p>";
  document.getElementById("dadosCliente").classList.remove("oculto");

  // Adiciona a data e hora formatadas à div com a classe "data"
  var dataHora = new Date();
  var dataHoraFormatada =
    dataHora.toLocaleDateString("pt-BR") +
    " - " +
    dataHora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  document.querySelector(".data").innerHTML = dataHoraFormatada;

  // Soma todos os totais dos itens da tabela
  var totalItens = 0;
  var tabela = document
    .getElementById("tabelaProdutos")
    .getElementsByTagName("tbody")[0];
  var linhas = tabela.getElementsByTagName("tr");
  for (var i = 0; i < linhas.length; i++) {
    var totalCelula = linhas[i].getElementsByTagName("td")[3].innerHTML;
    totalItens += parseFloat(totalCelula.replace("R$ ", ""));
  }

  // Recupera o valor do desconto
  var desconto =
    parseFloat(document.getElementById("inputDesconto").value) || 0;

  // Calcula o total final
  var totalFinal = totalItens - desconto;

  // Atualiza o valor do desconto no cupom
  document.getElementById("totalDesconto").innerHTML =
    "Desconto: R$ " + desconto.toFixed(2);
  document.getElementById("totalDesconto").classList.remove("oculto");

  // Atualiza o total final no cupom
  document.getElementById("totalFinal").innerHTML =
    "Total: R$ " + totalFinal.toFixed(2);
  document.getElementById("totalFinal").classList.remove("oculto");

  // Limpa os inputs após gerar o recibo
  document.getElementById("inputCliente").value = "";
  document.getElementById("inputQuantidade").value = "";
  document.getElementById("inputProduto").value = "";
  document.getElementById("inputValorUnitario").value = "";
  document.getElementById("inputDesconto").value = "";

  // Atualiza a prévia
  atualizarPrevia();

  // Oculta a div do formulário
  document.getElementById("divFormulario").style.display = "none";

  // Exibe a div do cupom
  document.getElementById("cupom").style.display = "block";

  // Exibe a janela de impressão
  window.print();

  // Restaura a visibilidade da div do formulário após a impressão
  document.getElementById("divFormulario").style.display = "block";

  // Oculta a div do cupom novamente
  document.getElementById("cupom").style.display = "none";
  location.reload();
}

function atualizarPrevia() {
  var tabela = document
    .getElementById("tabelaProdutos")
    .getElementsByTagName("tbody")[0];
  var linhas = tabela.getElementsByTagName("tr");
  var previa = document.querySelector(".previa");

  // Constrói o HTML das linhas da tabela
  var htmlLinhas = "";
  for (var i = 0; i < linhas.length; i++) {
    var celulas = linhas[i].getElementsByTagName("td");
    htmlLinhas += "<p>";
    for (var j = 0; j < celulas.length; j++) {
      htmlLinhas += celulas[j].innerHTML + " | ";
    }
    htmlLinhas += "</p>";
  }

  // Atualiza a prévia com as linhas da tabela
  previa.innerHTML = htmlLinhas;
}
