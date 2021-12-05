/*

REFERÊNCIAS:

    https://www.visualdicas.com.br/programacao/js/7-como-adicionar-conteudo-html-com-javascript

    https://www.ti-enxame.com/pt/javascript/remover-elemento-do-objeto-json/1072661906/
    
    https://www.alura.com.br/artigos/formatando-numeros-no-javascript?gclid=Cj0KCQiA47GNBhDrARIsAKfZ2rC5OqN8ae4-EWpejng7wJpBHaNGbmE2tiTNZ1DwPWP9HCOUt6rzZ-8aAiGFEALw_wcB

    https://www.youtube.com/watch?v=0mYq5LrQN1s&t=1161s

    https://www.youtube.com/watch?v=g0hkeyMb45U

*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Classe para ser herdada por um produto.
var Produto = /** @class */ (function () {
    function Produto() {
        this.id = 0;
        this.quantidadeProduto = 1;
        this.maxDesconto = 20;
    }
    Object.defineProperty(Produto.prototype, "setPreco", {
        set: function (preco) {
            if (typeof preco != "number") {
                console.log(preco + " Não é um numero");
                return;
            }
            this._preco = preco;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Produto.prototype, "preco", {
        get: function () {
            // Retorna o preço de uma unidade ou um kg do produto.
            return this._preco;
        },
        enumerable: false,
        configurable: true
    });
    Produto.prototype.duplica = function () {
        this.quantidadeProduto = this.quantidadeProduto + 1;
    };
    Produto.prototype.total = function () {
        // Calcula o valor total baseado na quantidade - this._quantidadeProduto.
        return this.quantidadeProduto * this._preco;
    };
    Produto.prototype.desconto = function (desconto) {
        // Altera o preço de acordo com o desconto.
        if (desconto > this.maxDesconto) {
            desconto = this.maxDesconto;
        }
        var _d = desconto / 100;
        this.setPreco = this._preco * (1 - _d);
    };
    return Produto;
}());
var Banana = /** @class */ (function (_super) {
    __extends(Banana, _super);
    // Criar um produto Banana.
    function Banana() {
        var _this = _super.call(this) || this;
        _this.contagem = 'kg'; // Contagem pode ser por Kg ou por unidade por exemplo.
        _this._preco = 6.0;
        _this.name = 'banana';
        _this.id = 1000;
        return _this;
    }
    return Banana;
}(Produto));
var Leite = /** @class */ (function (_super) {
    __extends(Leite, _super);
    function Leite() {
        var _this = _super.call(this) || this;
        _this.contagem = "und";
        _this._preco = 5.5;
        _this.name = 'leite';
        _this.id = 2000;
        return _this;
    }
    return Leite;
}(Produto));
var Arroz = /** @class */ (function (_super) {
    __extends(Arroz, _super);
    function Arroz() {
        var _this = _super.call(this) || this;
        _this.contagem = "und";
        _this._preco = 30;
        _this.name = 'arroz';
        _this.id = 2001;
        return _this;
    }
    return Arroz;
}(Produto));
var OleoCozinha = /** @class */ (function (_super) {
    __extends(OleoCozinha, _super);
    function OleoCozinha() {
        var _this = _super.call(this) || this;
        _this.contagem = "und";
        _this._preco = 8;
        _this.name = 'oleo_cozinha';
        _this.id = 2002;
        return _this;
    }
    return OleoCozinha;
}(Produto));
var SabaoBarra = /** @class */ (function (_super) {
    __extends(SabaoBarra, _super);
    function SabaoBarra() {
        var _this = _super.call(this) || this;
        _this.contagem = "und";
        _this._preco = 7;
        _this.name = 'sabao-em-barra';
        _this.id = 2003;
        return _this;
    }
    return SabaoBarra;
}(Produto));
var Carrinho = /** @class */ (function () {
    function Carrinho() {
        this.jsonProdutos = {};
    }
    Carrinho.prototype.existsId = function (id) {
        //Verifica se o produto com id já existe em this.jsonProdutos.
        for (var i in this.jsonProdutos) {
            if (this.jsonProdutos[i].id == id) {
                // Produto já existe no Json.
                return true;
                break;
            }
        }
        return false;
    };
    Carrinho.prototype.existsName = function (name) {
        //Verifica se o produto com id já existe em this.jsonProdutos.
        for (var i in this.jsonProdutos) {
            if (this.jsonProdutos[i].name == name) {
                // Produto já existe no Json.
                return true;
                break;
            }
        }
        return false;
    };
    Carrinho.prototype.removeProductId = function (id) {
        // Remove item do Json pelo id do produto.
        if (!this.existsId(id)) {
            console.log("O id ... " + id + " não existe no carrinho.");
            return;
        }
        for (var key in this.jsonProdutos) {
            if (key == id.toString()) {
                console.log("Removendo ... " + this.jsonProdutos[id].nome + " do carrinho.");
                delete this.jsonProdutos[id];
            }
        }
    };
    Carrinho.prototype.removeProductName = function (name) {
        // Remove item do Json pelo nome do produto.
        if (!this.existsName(name)) {
            console.log("O nome ... " + name + " não existe na lista.");
            return;
        }
        for (var key in this.jsonProdutos) {
            var p = this.jsonProdutos[key];
            if (this.jsonProdutos[key].name == name) {
                console.log("Removendo ... " + this.jsonProdutos[key].name + " do carrinho.");
                delete this.jsonProdutos[key];
            }
        }
    };
    Carrinho.prototype.getNames = function () {
        // Retorna uma lista com os nomes em string
        var nomes = [];
        for (var key in this.jsonProdutos) {
            nomes.push(this.jsonProdutos[key].nome);
        }
        return nomes;
    };
    Carrinho.prototype.adcProduto = function (produto) {
        // produto é uma instância da classe Produto.
        if (this.existsId(produto.id)) {
            console.log("Aumentando 1 und/kg do produto " + produto.name);
            this.jsonProdutos[produto.id].duplica();
            return;
        }
        // Inserir chave + valor em jsonProdutos
        this.jsonProdutos[produto.id] = produto;
    };
    Carrinho.prototype.totalCarrinho = function () {
        // Retorna o valor total de todos os produtos do carrinh
        var total = 0;
        for (var key in this.jsonProdutos) {
            total += this.jsonProdutos[key].total();
        }
        return total;
    };
    return Carrinho;
}());
var TabelaCarrinho = /** @class */ (function () {
    function TabelaCarrinho(car) {
        this.tabela = document.getElementById('tabelaId');
        this.t_head = this.tabela.getElementsByTagName('thead')[0];
        this.t_body = this.tabela.getElementsByTagName('tbody')[0];
        this.carrinho = car;
    }
    TabelaCarrinho.prototype.getLinesTable = function () {
        // Retorna todos objetos do corpo da tabela com a tag tr
        return this.t_body.getElementsByTagName('tr');
    };
    TabelaCarrinho.prototype.getLineFromId = function (id) {
        /*
        Retorna um objeto/linha indicado pela coluna ID no texto html da tabela.
        EX:
           ID   NOME   PREÇO
           2000 banana 6
           1000 leite  5.5

        this.getLineFromId(1000) -> Retorna o objeto/html da linha 2.

        */
        var html_lines_body = this.getLinesTable();
        for (var i = 0; i < html_lines_body.length; i++) {
            var line_table = html_lines_body[i];
            // Compara a celula 1 com o id.
            if (line_table.innerText.split('\t')[0] == id.toString()) {
                return line_table;
                break;
            }
        }
        return null;
    };
    TabelaCarrinho.prototype.getLineFromNum = function (num) {
        /*
        Retorna um objeto/linha indicado pelo numero da tabela
        EX: this.getLineFromNum(2) -> Retorna o objeto/html da linha 2 se a linha existir
        */
        var html_lines = this.getLinesTable();
        if (num > html_lines.length) {
            console.log("ERRO a tabela tem apenas " + html_lines.length + " linhas");
            return null;
        }
        return html_lines[num];
    };
    TabelaCarrinho.prototype.getLineFromName = function (nome) {
        /*
        Retorna o OBJETO (linha) que contém o nome do produto, ou null.
        EX: this.getLineFromName('banana')

        */
        var html_lines = this.getLinesTable();
        for (var N = 0; N < html_lines.length; N++) {
            var obj_linha_atual = html_lines[N];
            // Verificar se o atributo nome e igual produto.nome
            if (nome == (obj_linha_atual.innerText).split('\t')[1]) {
                return obj_linha_atual;
                break;
            }
        }
        console.log(nome + " NAO existe na tabela");
        return null;
    };
    TabelaCarrinho.prototype.getNamesInTable = function () {
        // Retorna uma lista com os nomes em string
        var nomes = [];
        var _lines = this.getLinesTable();
        for (var i = 0; i < _lines.length; i++) {
            var line = _lines[i];
            nomes.push(line.innerText.split('\t')[1]);
        }
        return nomes;
    };
    TabelaCarrinho.prototype.existsIdTable = function (id) {
        // verifica se um id existe na tabela
        var html_lines = this.getLinesTable();
        for (var i = 0; i < html_lines.length; i++) {
            var line = html_lines[i];
            if (line.innerText.split('\t')[0] == id.toString()) {
                return true;
                break;
            }
        }
        return false;
    };
    TabelaCarrinho.prototype.getIds = function () {
        // Retorna todos os id da tabela.
        var _lines = this.getLinesTable();
        var _ids = [];
        for (var i = 0; i < _lines.length; i++) {
            var line = _lines[i];
            _ids.push(line.innerText.split('\t')[0]);
        }
        return _ids;
    };
    TabelaCarrinho.prototype.removeLineNum = function (num) {
        // Remove uma linha da tabela pelo numero de linha
        var obj_linhas = this.getLinesTable();
        if (num > obj_linhas.length) {
            return;
        }
        var linha = obj_linhas[num];
        console.log("Removendo ... " + linha.innerText);
        this.t_body.removeChild(linha);
    };
    TabelaCarrinho.prototype.removeLineName = function (name) {
        // Remove uma linha da tabela pelo nome da coluna "NOME" de linha
        var html_lines = this.getLinesTable();
        // obter o objeto/linha que contém o nome
        var line = this.getLineFromName(name);
        if (line == null) {
            return;
        }
        console.log("Removendo ... " + line.innerText);
        this.t_body.removeChild(line);
    };
    TabelaCarrinho.prototype.adcLinha = function (produto) {
        // Adiciona uma linha na tabela apartir do objeto produto
        if (this.existsIdTable(produto.id)) {
            console.log(produto.name + " já existe na tabela");
            return;
        }
        // Criar elementos da linha
        var linha = document.createElement('tr');
        var celulaId = document.createElement('td');
        var celulaNome = document.createElement('td');
        var celulaPreco = document.createElement('td');
        var celulaQuantidade = document.createElement('td');
        var celulaValor = document.createElement('td');
        // atribuir valores
        celulaId.innerHTML = produto.id.toString();
        celulaNome.innerHTML = produto.name;
        celulaPreco.innerHTML = produto.preco.toString();
        celulaQuantidade.innerHTML = produto.quantidadeProduto.toString();
        celulaValor.innerHTML = produto.preco.toString();
        // Inserir no objeto linha
        linha.appendChild(celulaId);
        linha.appendChild(celulaNome);
        linha.appendChild(celulaPreco);
        linha.appendChild(celulaQuantidade);
        linha.appendChild(celulaValor);
        // Inserir linha na tag tbody
        this.t_body.appendChild(linha);
    };
    TabelaCarrinho.prototype.update = function () {
        // Adicionar os produtos que estão no carrinho, em a tabela html
        for (var key in this.carrinho.jsonProdutos) {
            var p = this.carrinho.jsonProdutos[key];
            if (!this.existsIdTable(p.id)) {
                this.adcLinha(p);
            }
            else {
                var line = this.getLineFromId(p.id);
                var celulaQuantidade = line.getElementsByTagName('td')[3];
                var celulaValor = line.getElementsByTagName('td')[4];
                celulaQuantidade.innerText = p.quantidadeProduto.toString();
                celulaValor.innerText = p.total().toString();
            }
        }
        // Remover da tabela os produtos que estão na tabela é não estão mais no carrinho.
        var names_table = this.getNamesInTable();
        for (var num in names_table) {
            var _name = names_table[num];
            if (!this.carrinho.existsName(_name)) {
                // Remover linha pelo nome.
                var line = this.getLineFromName(_name);
                console.log("Removendo ... " + line.innerText);
                this.t_body.removeChild(line);
            }
        }
        var labelTotal = document.getElementById('labelTotal');
        labelTotal.innerText = (carrinho.totalCarrinho()).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };
    return TabelaCarrinho;
}());
function getProduto(nomeProduto) {
    // Recebe o nome de um produto é retorna o  Objeto correspondente ao nome.
    if (nomeProduto == 'banana') {
        var produto = new Banana();
        return produto;
    }
    else if (nomeProduto == 'leite') {
        var produto = new Leite();
        return produto;
    }
    else if (nomeProduto == 'arroz') {
        var produto = new Arroz();
        return produto;
    }
    else if (nomeProduto == 'oleo_cozinha') {
        var produto = new OleoCozinha();
        return produto;
    }
    else if (nomeProduto == 'sabao-em-barra') {
        var produto = new SabaoBarra();
        return produto;
    }
    else {
        console.log("O produto informado não existe " + nomeProduto);
        var produto = new Produto();
        return produto;
    }
}
function adicionar() {
    // Adiciona um produto selecionado, ao carrinho.
    var optsProdutos = document.getElementById('selectId');
    var selecionado = optsProdutos.options[optsProdutos.selectedIndex];
    // let selecionado = optsProdutos.options[optsProdutos.selectedIndex].text
    var _produto = getProduto((selecionado.value).toString());
    if (_produto.id == 0) {
        return;
    }
    carrinho.adcProduto(_produto);
    console.log(carrinho.jsonProdutos);
    //minhaTabela.adcLinha(_produto)
    minhaTabela.update();
}
function remover() {
    var optsProdutos = document.getElementById('selectId');
    var selecionado = optsProdutos.options[optsProdutos.selectedIndex];
    var _produto = getProduto((selecionado.value).toString());
    carrinho.removeProductId(_produto.id);
    minhaTabela.update();
}
var carrinho = new Carrinho();
var minhaTabela = new TabelaCarrinho(carrinho);
