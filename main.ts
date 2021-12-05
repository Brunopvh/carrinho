/*

REFERÊNCIAS:

	https://www.visualdicas.com.br/programacao/js/7-como-adicionar-conteudo-html-com-javascript

    https://www.ti-enxame.com/pt/javascript/remover-elemento-do-objeto-json/1072661906/
	
    https://www.alura.com.br/artigos/formatando-numeros-no-javascript?gclid=Cj0KCQiA47GNBhDrARIsAKfZ2rC5OqN8ae4-EWpejng7wJpBHaNGbmE2tiTNZ1DwPWP9HCOUt6rzZ-8aAiGFEALw_wcB

    https://www.youtube.com/watch?v=0mYq5LrQN1s&t=1161s

    https://www.youtube.com/watch?v=g0hkeyMb45U

*/

// Classe para ser herdada por um produto.
class Produto {
	
    // Contagem é uma string pode ser 'kg' ou 'und'.
    contagem: string
    name: string
    img: string
    _preco: number

    // quantidadeProduto é o total do MESMO produto adicionado ao carrinho.
    // EX: banana + banana + banana = uma banana * 3 -> _quantidadeProduto = 3
    quantidadeProduto: number

    // Maximo de desconto permitido é 20%.
    maxDesconto: number

    // id do produto (é definido na classe produto) padrão é 0.
    id: number

	constructor(){
        this.id = 0
		this.quantidadeProduto = 1
		this.maxDesconto = 20
	}

	set setPreco(preco) {
		if(typeof preco != "number"){
			console.log(preco + " Não é um numero")
			return

		}

		this._preco = preco
	}

	get preco(): number {
		// Retorna o preço de uma unidade ou um kg do produto.
		return this._preco
	}

    duplica(){
        this.quantidadeProduto = this.quantidadeProduto + 1
    }

	total(): number {
		// Calcula o valor total baseado na quantidade - this._quantidadeProduto.
		return this.quantidadeProduto * this._preco
	}

	desconto(desconto: number): void{
		// Altera o preço de acordo com o desconto.

		if(desconto > this.maxDesconto){
			desconto = this.maxDesconto
		}

		var _d = desconto / 100

		this.setPreco = this._preco * (1 - _d)
	}

}



class Banana extends Produto {
	// Criar um produto Banana.

	constructor(){
		super()
		this.contagem = 'kg' // Contagem pode ser por Kg ou por unidade por exemplo.
		this._preco = 6.0
		this.name = 'banana'
		this.id = 1000
	}

}



class Leite extends Produto {

	constructor(){
		super()
		this.contagem = "und"
		this._preco = 5.5 
		this.name = 'leite'
		this.id = 2000
	}

}


class Arroz extends Produto {

	constructor(){
		super()
		this.contagem = "und"
		this._preco = 30
		this.name = 'arroz'
		this.id = 2001
	}

}


class OleoCozinha extends Produto {

	constructor(){
		super()
		this.contagem = "und"
		this._preco = 8
		this.name = 'oleo_cozinha'
		this.id = 2002
	}

}

class SabaoBarra extends Produto {

	constructor(){
		super()
		this.contagem = "und"
		this._preco = 7
		this.name = 'sabao-em-barra'
		this.id = 2003
	}

}



class Carrinho {

    // Objeto com os produtos que são adicionados ao carrinho.
    jsonProdutos: Object

	constructor(){
		
		this.jsonProdutos = {}

	}

	existsId(id: number): boolean {
		//Verifica se o produto com id já existe em this.jsonProdutos.
		for(let i in this.jsonProdutos){
			if(this.jsonProdutos[i].id == id){
				// Produto já existe no Json.
				return true
				break
			}
		}

		return false
	}

    existsName(name: string): boolean {
		//Verifica se o produto com id já existe em this.jsonProdutos.
		for(let i in this.jsonProdutos){
			if(this.jsonProdutos[i].name == name){
				// Produto já existe no Json.
				return true
				break
			}
		}

		return false
	}

	removeProductId(id: number): void{
		// Remove item do Json pelo id do produto.
		if(!this.existsId(id)){
			console.log("O id ... " + id + " não existe no carrinho.")
			return
		}

		for (let key in this.jsonProdutos) {
			if (key == id.toString()) {
				console.log("Removendo ... " + this.jsonProdutos[id].nome + " do carrinho.")
				delete this.jsonProdutos[id]
			}
		}

	}

    removeProductName(name: string): void{
		// Remove item do Json pelo nome do produto.
		if(!this.existsName(name)){
			console.log("O nome ... " + name + " não existe na lista.")
			return
		}

		for (let key in this.jsonProdutos) {
            let p: Produto = this.jsonProdutos[key]
			if (this.jsonProdutos[key].name == name) {
				console.log("Removendo ... " + this.jsonProdutos[key].name + " do carrinho.")
				delete this.jsonProdutos[key] 
			}
		}
    }

	getNames(){
		// Retorna uma lista com os nomes em string
		let nomes = []
		for(let key in this.jsonProdutos){
			nomes.push(this.jsonProdutos[key].nome)
		}	
		
		return nomes
	}

    adcProduto(produto: Produto): void {
		// produto é uma instância da classe Produto.
		if(this.existsId(produto.id)){
			console.log("Aumentando 1 und/kg do produto " + produto.name)
            this.jsonProdutos[produto.id].duplica() 
			return
		}
        // Inserir chave + valor em jsonProdutos
		this.jsonProdutos[produto.id] = produto

	}

    totalCarrinho(): number {
        // Retorna o valor total de todos os produtos do carrinh
        let total: number = 0
        for(let key in this.jsonProdutos){
            total += this.jsonProdutos[key].total()
        }

        return total
    }


}


class TabelaCarrinho {
    carrinho: Carrinho
    tabela: HTMLElement
    t_head: HTMLElement
    t_body: HTMLElement

	constructor(car: Carrinho){
		this.tabela = document.getElementById('tabelaId') 
        this.t_head = this.tabela.getElementsByTagName('thead')[0]
        this.t_body = this.tabela.getElementsByTagName('tbody')[0]
        this.carrinho = car
	}

    getLinesTable() {
        // Retorna todos objetos do corpo da tabela com a tag tr
        return this.t_body.getElementsByTagName('tr')
    }

    getLineFromId(id: number) {
        /* 
        Retorna um objeto/linha indicado pela coluna ID no texto html da tabela.
        EX:
           ID   NOME   PREÇO
           2000 banana 6
           1000 leite  5.5

        this.getLineFromId(1000) -> Retorna o objeto/html da linha 2.

        */

        let html_lines_body = this.getLinesTable()
        for(let i=0; i<html_lines_body.length; i++){
            let line_table = html_lines_body[i] 

            // Compara a celula 1 com o id.
            if(line_table.innerText.split('\t')[0] == id.toString()){
                return line_table
                break
            }
        }

        return null
    }

    getLineFromNum(num: number) {
        /*
        Retorna um objeto/linha indicado pelo numero da tabela
        EX: this.getLineFromNum(2) -> Retorna o objeto/html da linha 2 se a linha existir
        */
        
        let html_lines = this.getLinesTable()

        if(num > html_lines.length){
            console.log("ERRO a tabela tem apenas " + html_lines.length + " linhas")
            return null
        }

        return html_lines[num]
    }

    getLineFromName(nome: string) {
        /*
        Retorna o OBJETO (linha) que contém o nome do produto, ou null.
        EX: this.getLineFromName('banana')

        */

        let html_lines = this.getLinesTable()

        for(let N=0; N<html_lines.length; N++){
            let obj_linha_atual = html_lines[N]
            // Verificar se o atributo nome e igual produto.nome
            if(nome == (obj_linha_atual.innerText).split('\t')[1]){
                return obj_linha_atual
                break
            }
        }
        console.log(nome + " NAO existe na tabela")
        return null 
    }

    getNamesInTable() {
		// Retorna uma lista com os nomes em string
		let nomes = []
		let _lines = this.getLinesTable()
        for(let i=0; i<_lines.length; i++){
            let line = _lines[i]
            nomes.push(line.innerText.split('\t')[1])
        }
        return nomes
	}

    existsIdTable(id: number){
        // verifica se um id existe na tabela
        let html_lines = this.getLinesTable()

        for(let i=0; i<html_lines.length; i++){
            let line = html_lines[i]
            if(line.innerText.split('\t')[0] == id.toString()){
                return true
                break
            }
        }
        return false
    }

    getIds(){
        // Retorna todos os id da tabela.
        let _lines = this.getLinesTable()
        let _ids = []

        for(let i=0; i<_lines.length; i++){
            let line = _lines[i]
            _ids.push(line.innerText.split('\t')[0])
        }
        return _ids
    }

    removeLineNum(num: number){
        // Remove uma linha da tabela pelo numero de linha
        let obj_linhas = this.getLinesTable()

        if(num > obj_linhas.length){
            return 
        }

        let linha = obj_linhas[num]
        console.log("Removendo ... " + linha.innerText)
        this.t_body.removeChild(linha)

    }

    removeLineName(name: string){
        // Remove uma linha da tabela pelo nome da coluna "NOME" de linha
        let html_lines = this.getLinesTable()

        // obter o objeto/linha que contém o nome
        let line = this.getLineFromName(name)
        if(line == null){
            return
        }

        console.log("Removendo ... " + line.innerText)
        this.t_body.removeChild(line)

    }


    adcLinha(produto: Produto){
        // Adiciona uma linha na tabela apartir do objeto produto

        if(this.existsIdTable(produto.id)){
            console.log(produto.name +  " já existe na tabela")
            return
        }

        // Criar elementos da linha
        let linha = document.createElement('tr')
        let celulaId = document.createElement('td')
        let celulaNome = document.createElement('td')
        let celulaPreco = document.createElement('td')
        let celulaQuantidade = document.createElement('td')
        let celulaValor = document.createElement('td')

        // atribuir valores
        celulaId.innerHTML = produto.id.toString()
        celulaNome.innerHTML = produto.name
        celulaPreco.innerHTML = produto.preco.toString()
        celulaQuantidade.innerHTML = produto.quantidadeProduto.toString()
        celulaValor.innerHTML = produto.preco.toString()

        // Inserir no objeto linha
        linha.appendChild(celulaId)
        linha.appendChild(celulaNome)
        linha.appendChild(celulaPreco)
        linha.appendChild(celulaQuantidade)
        linha.appendChild(celulaValor)

        // Inserir linha na tag tbody
        this.t_body.appendChild(linha)
    }

    update(){

        // Adicionar os produtos que estão no carrinho, em a tabela html
        for(let key in this.carrinho.jsonProdutos){
            let p: Produto = this.carrinho.jsonProdutos[key]
            if(!this.existsIdTable(p.id)){
                this.adcLinha(p)
            } else {
                let line = this.getLineFromId(p.id)
                let celulaQuantidade = line.getElementsByTagName('td')[3]
                let celulaValor = line.getElementsByTagName('td')[4]

                celulaQuantidade.innerText = p.quantidadeProduto.toString()
                celulaValor.innerText = p.total().toString()

            }
        }

        
        // Remover da tabela os produtos que estão na tabela é não estão mais no carrinho.
        let names_table = this.getNamesInTable()
        for(let num in names_table){
            let _name = names_table[num]

            if(!this.carrinho.existsName(_name)){
                // Remover linha pelo nome.
                let line = this.getLineFromName(_name)
                console.log("Removendo ... " + line.innerText)
                this.t_body.removeChild(line)
            }
        }

        let labelTotal = document.getElementById('labelTotal')
        labelTotal.innerText = (carrinho.totalCarrinho()).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    }
    
}



function getProduto(nomeProduto: string): Produto {
    // Recebe o nome de um produto é retorna o  Objeto correspondente ao nome.
    
    if(nomeProduto == 'banana'){
        let produto: Produto = new Banana()
        return produto
    } else if(nomeProduto == 'leite'){
        let produto: Produto = new Leite()
        return produto
    } else if(nomeProduto == 'arroz'){
        let produto: Produto = new Arroz()   
        return produto
    } else if(nomeProduto == 'oleo_cozinha'){
        let produto: Produto = new OleoCozinha()   
        return produto 
    } else if(nomeProduto == 'sabao-em-barra'){ 
        let produto: Produto = new SabaoBarra()
        return produto
    } else {
        console.log("O produto informado não existe " + nomeProduto)
        let produto: Produto = new Produto()
        return produto
    }

}

function adicionar(){
    // Adiciona um produto selecionado, ao carrinho.
	let optsProdutos = document.getElementById('selectId') as HTMLSelectElement
    let selecionado = optsProdutos.options[optsProdutos.selectedIndex]
    // let selecionado = optsProdutos.options[optsProdutos.selectedIndex].text

    let _produto = getProduto((selecionado.value).toString())
    if(_produto.id == 0){
        return
    }

    carrinho.adcProduto(_produto)
    console.log(carrinho.jsonProdutos)

    //minhaTabela.adcLinha(_produto)
    minhaTabela.update()

}


function remover(){
    let optsProdutos = document.getElementById('selectId') as HTMLSelectElement
    let selecionado = optsProdutos.options[optsProdutos.selectedIndex]
    let _produto = getProduto((selecionado.value).toString())

    carrinho.removeProductId(_produto.id)
    minhaTabela.update()



}

var carrinho = new Carrinho()
var minhaTabela = new TabelaCarrinho(carrinho)

