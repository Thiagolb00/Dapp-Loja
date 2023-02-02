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

async function comprar(id,priceteste) {
    const signer2 = provider.getSigner(accounts[0]);
    const contrato = new ethers.Contract(Votacao_Contract_Address, Votacao_Contract_ABI, signer2);

	await contrato.purchase(Number(id), { value:priceteste.toString() });

}

contrato.on("produtoadicionado", ()=>{
	console.log('Evento Recebido');
	// Produtos();
})

contrato.on("produtocomprado", ()=>{
	console.log('Evento Recebido');
	// Produtos();
})

async function Produtos() {
    const signer2 = provider.getSigner(accounts[0])
    const contrato = new ethers.Contract(Votacao_Contract_Address, Votacao_Contract_ABI, signer2);

	const todosprodutos_aux = await contrato.getAllProducts();
	todosprodutos = todosprodutos_aux.length

	let tbody = document.getElementById('tbody');
	tbody.innerText = '';


	for(let i = 0; i < todosprodutos; i++){
		const produtoscomprar = await contrato.getProducts_aux(i)

		if(produtoscomprar[6] == 1){
			let tr = tbody.insertRow();
			let td_id = tr.insertCell();
			let td_produto = tr.insertCell();
			let td_descricao = tr.insertCell();
			let td_preco = tr.insertCell();
			let td_comprar = tr.insertCell();

			td_id.innerText = produtoscomprar[0];
			td_produto.innerText = produtoscomprar[2];
			td_descricao.innerText = produtoscomprar[3];
			td_preco.innerText = produtoscomprar[4]/(10**18);

			td_comprar.innerHTML = '<input type="button" class="btn-compra" value="Comprar" "/>';
			td_comprar.setAttribute("onclick","comprar("+ produtoscomprar[0] +","+ produtoscomprar[4] +")")
		}

	}
		
};

Produtos();
