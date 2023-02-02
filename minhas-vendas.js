const Votacao_Contract_Address = "0x7F454e114844758A709B858e3a57cb69E99A7CfE";
const Votacao_Contract_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_nome",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_descricao",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "addProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_newPrice",
				"type": "uint256"
			}
		],
		"name": "changePrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "vendedor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "produtoadicionado",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "vendedor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "produtoalterado",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "comprador",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "produtocomprado",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "vendedor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "produtoremovido",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "purchase",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "remove",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllProducts",
		"outputs": [
			{
				"internalType": "contract Produtos_filho[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getProducts_aux",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "vendedor",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "nome",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "descricao",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "precoETH",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "comprador",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "status",
						"type": "uint256"
					}
				],
				"internalType": "struct MarketPlace.Product",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "products",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "vendedor",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "nome",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "descricao",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "precoETH",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "comprador",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "status",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

var signer;

const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");

provider.send("eth_requestAccounts", []).then(() => {
provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
	});
});

accounts = provider.listAccounts();

const signer2 = provider.getSigner(accounts[0]);
const contrato = new ethers.Contract(Votacao_Contract_Address, Votacao_Contract_ABI, signer2);

const minhasvendasbotao = document.querySelector("#consultar-vendas");
const alterarprecobotao = document.querySelector("#alterar-produto");


async function remove(id) {
    const signer2 = provider.getSigner(accounts[0]);
    const contrato = new ethers.Contract(Votacao_Contract_Address, Votacao_Contract_ABI, signer2);

	const produtoremovido = await contrato.getProducts_aux(id)
	address_produto = produtoremovido[1]
    await contrato.remove(Number(id));
}

contrato.on("produtoremovido", (productId , Vendedor_address, block)=>{
	if(Vendedor_address == signer._address){
		console.log('Evento Recebido');
		minhas_vendas();
	}
})

async function minhas_vendas () {
    const signer2 = provider.getSigner(accounts[0])
    const contrato = new ethers.Contract(Votacao_Contract_Address, Votacao_Contract_ABI, signer2);

	const todosprodutos_aux = await contrato.getAllProducts();
	todosprodutos = todosprodutos_aux.length

	let tbody = document.getElementById('tbody');
	tbody.innerText = '';

	for(let i = 0; i < todosprodutos; i++){
		const produtosvenda = await contrato.getProducts_aux(i)
		if(produtosvenda[1] == signer._address){

			let tr = tbody.insertRow();
			let td_id = tr.insertCell();
			let td_produto = tr.insertCell();
			let td_descricao = tr.insertCell();
			let td_preco = tr.insertCell();
			let td_deletar = tr.insertCell();

			td_id.innerText = produtosvenda[0];
			td_produto.innerText = produtosvenda[2];
			td_descricao.innerText = produtosvenda[3];
			td_preco.innerText = produtosvenda[4]/(10**18);

			if(produtosvenda[6] == 1){
				td_deletar.innerHTML = '<input type="button" class="btn" value="Deletar" "/>';
				td_deletar.setAttribute("onclick","remove("+ produtosvenda[0] +")")
			} else if(produtosvenda[6] == 2){
				td_deletar.innerHTML = '<input type="button" class="btn btn-danger" value="Vendido" "/>';
			} else {
				td_deletar.innerHTML = '<input type="button" class="btn btn-danger" value="Removido" "/>';
			}
		}

	}
}



async function alterarpreco() {

	const id_produto_input = document.querySelector("#ID-produto");
	const valor_produto_input = document.querySelector("#novo-valor-produto");
  
	id_produto = id_produto_input.value;
	valor_produto = valor_produto_input.value * (10**18);
  
	await  contrato.changePrice(id_produto, BigInt(valor_produto));

	const produtoremovido = await contrato.getProducts_aux(id_produto)
	address_produto2 = produtoremovido[1]
}

contrato.on("produtoalterado", (productId , Vendedor_address, block)=>{
	if(Vendedor_address == signer._address){
		console.log('Evento Recebido');
		minhas_vendas();
	}
})

minhas_vendas(); 
alterarprecobotao.addEventListener("click", alterarpreco);

