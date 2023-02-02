// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Produtos_filho {

//--------------------------------------------------------------------
// Variáveis

    struct Product {
        uint256 id;
        address payable vendedor;
        string nome;
        string descricao;
        uint256 precoETH;
        address payable comprador;
        uint256 status;
    } 
    
    Product produto_filho;

//--------------------------------------------------------------------
// Construtor

    constructor(uint256 id, string memory nome, string memory descricao, uint256 precoETH, address vendedor) {
        produto_filho = Product(
            id,
            payable(vendedor),
            nome,
            descricao,
            precoETH,
            payable(address(0)),
            1
        );
    }

//--------------------------------------------------------------------
// Funções

    function changePrice_filho(uint256 _newPrice) public {
        produto_filho.precoETH = _newPrice;
    }

    function purchase_filho(address comprador) public {

        produto_filho.comprador = payable(comprador);
        produto_filho.status = 2;
    }

    function remove_filho() public{
        produto_filho.status = 0;
    }

    function getProduct() public view returns (Product memory) {
        return produto_filho;
    }

    function getPrice() public view returns (uint256) {
        return produto_filho.precoETH;
    }
    function getId() public view returns (uint256) {
        return produto_filho.id;
    }
    function getVendedor() public view returns (address) {
        return produto_filho.vendedor;
    }
    function getnome() public view returns (string memory) {
        return produto_filho.nome;
    }
    function getdescricao() public view returns (string memory) {
        return produto_filho.descricao;
    }
    function getComprador() public view returns (address) {
        return produto_filho.comprador;
    }
    function getStatus() public view returns (uint256) {
        return produto_filho.status;
    }
}

contract MarketPlace {

//--------------------------------------------------------------------
// Variáveis

    Produtos_filho[] produtos;
    Product[] public products;

    struct Product {
        uint256 id;
        address payable vendedor;
        string nome;
        string descricao;
        uint256 precoETH;
        address payable comprador;
        uint256 status;
    }

    // Status 0 - Removido
    // Status 1 - A venda
    // Status 2 - Comprado

//--------------------------------------------------------------------
// Eventos

    event produtoadicionado(uint256 id, address vendedor, uint256 timestamp);
    event produtocomprado(uint256 id, address comprador, uint256 timestamp);
    event produtoremovido(uint256 id, address vendedor, uint256 timestamp);
    event produtoalterado(uint256 id, address vendedor, uint256 timestamp);


//--------------------------------------------------------------------
// Modifiers

    modifier onlycomprador(uint256 _id) {
        require(msg.sender == produtos[_id].getComprador(), "Apenas Comprador");
        _;
    }

    modifier onlyvendedor(uint256 _id) {
        require(msg.sender == produtos[_id].getVendedor(), "Apenas Vendedor");
        _;
    }

    modifier notvendedor(uint256 _id) {
        require(msg.sender != produtos[_id].getVendedor(),"Vendedor nao pode comprar seu proprio produto");
        _;
    }

    modifier inStatus(uint256 _id, uint256 _status) {
        require(produtos[_id].getStatus() == _status, "Produto com status diferente");
        _;
    }

//--------------------------------------------------------------------
// Funções

    function addProduct(string memory _nome, string memory _descricao, uint256 _price) public {
        require(bytes(_nome).length > 0, "Entre com um nome valido");
        require(_price > 0, "Entre com um preco valido");

        Produtos_filho market = new Produtos_filho(produtos.length, _nome, _descricao, _price, msg.sender);
        produtos.push(market);
        
        emit produtoadicionado(produtos.length, msg.sender, block.timestamp);
    }

    function purchase(uint256 _id) public payable notvendedor(_id) inStatus(_id, 1){
        
        require(msg.value >= produtos[_id].getPrice(), "insuffisant amount");
        produtos[_id].purchase_filho(msg.sender);
        payable(produtos[_id].getVendedor()).transfer(produtos[_id].getPrice());

        emit produtocomprado(_id, msg.sender, block.timestamp);
    }

    function remove(uint256 _id) public onlyvendedor(_id) inStatus(_id, 1){
        produtos[_id].remove_filho();
        emit produtoremovido(_id, msg.sender, block.timestamp);
    }

    function changePrice(uint256 _id, uint256 _newPrice) public onlyvendedor(_id) inStatus(_id, 1){
        produtos[_id].changePrice_filho(_newPrice);
        emit produtoalterado(_id, msg.sender, block.timestamp);
    }

    function getProducts_aux(uint256 _id) public view returns (Product memory) {
        return Product(
                produtos[_id].getId(),
                payable(produtos[_id].getVendedor()),
                produtos[_id].getnome(),
                produtos[_id].getdescricao(),
                produtos[_id].getPrice(),
                payable(produtos[_id].getComprador()),
                produtos[_id].getStatus()
        );
    }

    function getAllProducts() public view returns (Produtos_filho[] memory) {
        return produtos;
    }
}

