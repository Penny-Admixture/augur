
export const INTERNAL_CONTRACTS = [
    'Universe',
    'Augur',
    'AugurTrading',
    'CancelOrder',
    'ShareToken',
    'InitialReporter',
    'DisputeCrowdsourcer',
    'DisputeWindow',
    'Market',
    'ReputationToken',
    'CreateOrder',
    'FillOrder',
    'Orders',
    'Trade',
    'SimulateTrade',
    'ProfitLoss',
    'Time',
    'ZeroXTrade',
    'WarpSync',
    'OICash',
    'Affiliates',
    'AffiliateValidator',
    'AugurWallet',
    'AugurWalletFactory',
    'AugurWalletRegistry',
    'AugurWalletRegistryV2',
    'RepOracle',
    // utility
    'BuyParticipationTokens',
    'Formulas',
    'HotLoading',
    'RedeemStake',
    'RepSymbol',
    'AuditFunds',
    // factories
    'DisputeCrowdsourcerFactory',
    'DisputeWindowFactory',
    'InitialReporterFactory',
    'MarketFactory',
    'OICashFactory',
    'ReputationTokenFactory',
    'UniverseFactory',
];

export const TRADING_CONTRACTS = [
    'CreateOrder',
    'FillOrder',
    'CancelOrder',
    'Trade',
    'Orders',
    'ZeroXTrade',
    'ProfitLoss',
    'SimulateTrade',
    'ZeroXExchange', // uses registration name, not addresses.json name
    'AugurWalletFactory',
    'AugurWalletRegistry',
    'AugurWalletRegistryV2',
    'RelayHubV2',
    'WETH9'
];

export const TEST_CONTRACTS = [
    'TimeControlled',
    'TestNetReputationTokenFactory',
    'TestNetReputationToken',
];

export const EXTERNAL_CONTRACTS = [
    'OldLegacyReputationToken',
    'LegacyReputationToken',
    // 0x contracts
    'ERC20Proxy',
    'ERC721Proxy',
    'ERC1155Proxy',
    'MultiAssetProxy',
    'Exchange',
    'Coordinator',
    'CoordinatorRegistry',
    'ChaiBridge',
    'DevUtils',
    'WETH9',
    'ZRXToken',
    // Maker
    'Cash',
    // USDx
    'USDC',
    'USDT',
    // Uniswap
    'UniswapV2Factory',
    'UniswapV2Pair',
    'UniswapV2Router01',
    // GSN
    'RelayHub',
    'RelayHubV2',
    'Penalizer',
    'StakeManager'
];

export const REGISTERED_EXTERNAL_CONTRACTS = [
    'LegacyReputationToken',
    // 0x contracts
    'Exchange',
    'WETH9',
    // Maker
    'Cash',
    // USDx
    'USDC',
    'USDT',
    // Uniswap
    "UniswapV2Factory",
    // GSN
    "RelayHubV2"
];

export const REGISTERED_INTERNAL_CONTRACTS = [
    'CancelOrder',
    'ShareToken',
    'InitialReporter',
    'DisputeCrowdsourcer',
    'DisputeWindow',
    'Market',
    'CreateOrder',
    'FillOrder',
    'Orders',
    'Trade',
    'SimulateTrade',
    'ProfitLoss',
    'Time',
    'ZeroXTrade',
    'WarpSync',
    'OICash',
    'Affiliates',
    'AffiliateValidator',
    'AugurWalletFactory',
    'AugurWalletRegistry',
    'AugurWalletRegistryV2',
    // utility
    'BuyParticipationTokens',
    'Formulas',
    'HotLoading',
    'RedeemStake',
    'RepSymbol',
    // factories
    'DisputeCrowdsourcerFactory',
    'DisputeWindowFactory',
    'InitialReporterFactory',
    'MarketFactory',
    'OICashFactory',
    'ReputationTokenFactory',
    'UniverseFactory',
    'RepOracle'
];

export const INITIALIZED_CONTRACTS = [
    'ShareToken',
    'CreateOrder',
    'FillOrder',
    'CancelOrder',
    'Trade',
    'Orders',
    'ProfitLoss',
    'SimulateTrade',
    'ZeroXTrade',
    'WarpSync',
    'AugurWalletFactory',
    'AugurWalletRegistry',
    'AugurWalletRegistryV2',
    'RepOracle'
];

export const RELAY_HUB_ADDRESS = '0xD216153c06E857cD7f72665E0aF1d7D82172F494';

export const RELAY_HUB_DEPLOYER_ADDRESS = '0xff20d47eb84b1b85aadcccc43d2dc0124c6211f7';

export const RELAY_HUB_SIGNED_DEPLOY_TX = '0xf93c798085174876e800834016408080b93c2660c0604052600560808190527f312e302e3000000000000000000000000000000000000000000000000000000060a090815262000040916003919062000055565b503480156200004e57600080fd5b50620000fa565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200009857805160ff1916838001178555620000c8565b82800160010185558215620000c8579182015b82811115620000c8578251825591602001919060010190620000ab565b50620000d6929150620000da565b5090565b620000f791905b80821115620000d65760008155600101620000e1565b90565b613b1c806200010a6000396000f3fe6080604052600436106101085760003560e01c806370a0823111610095578063a8cd957211610064578063a8cd957214610ada578063aa67c91914610d1a578063adc9772e14610d40578063c3e712f214610d6c578063f2888dbb14610d9f57610108565b806370a08231146109a557806385f4498b146109d85780638d85146014610a1f578063a863f8f914610aa457610108565b80632d0335ab116100dc5780632d0335ab1461058957806339002432146105ce578063405cec671461070457806354fd4d50146108f15780636a7d84a41461097b57610108565b8062f714ce1461010d5780631166073a146101485780632b601747146102005780632ca70eba14610474575b600080fd5b34801561011957600080fd5b506101466004803603604081101561013057600080fd5b50803590602001356001600160a01b0316610dd2565b005b34801561015457600080fd5b506101466004803603604081101561016b57600080fd5b81359190810190604081016020820135600160201b81111561018c57600080fd5b82018360208201111561019e57600080fd5b803590602001918460018302840111600160201b831117156101bf57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610ec9945050505050565b34801561020c57600080fd5b506103f5600480360361014081101561022457600080fd5b6001600160a01b0382358116926020810135821692604082013590921691810190608081016060820135600160201b81111561025f57600080fd5b82018360208201111561027157600080fd5b803590602001918460018302840111600160201b8311171561029257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929584359560208601359560408101359550606081013594509192509060a081019060800135600160201b8111156102fc57600080fd5b82018360208201111561030e57600080fd5b803590602001918460018302840111600160201b8311171561032f57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b81111561038157600080fd5b82018360208201111561039357600080fd5b803590602001918460018302840111600160201b831117156103b457600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550611178945050505050565b6040518083815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610438578181015183820152602001610420565b50505050905090810190601f1680156104655780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b34801561048057600080fd5b50610565600480360360e081101561049757600080fd5b6001600160a01b038235169190810190604081016020820135600160201b8111156104c157600080fd5b8201836020820111156104d357600080fd5b803590602001918460018302840111600160201b831117156104f457600080fd5b9193909282359260208101359260408201359260608301359260a081019060800135600160201b81111561052757600080fd5b82018360208201111561053957600080fd5b803590602001918460018302840111600160201b8311171561055a57600080fd5b509092509050611684565b6040518082600481111561057557fe5b60ff16815260200191505060405180910390f35b34801561059557600080fd5b506105bc600480360360208110156105ac57600080fd5b50356001600160a01b0316611a97565b60408051918252519081900360200190f35b3480156105da57600080fd5b50610146600480360360408110156105f157600080fd5b810190602081018135600160201b81111561060b57600080fd5b82018360208201111561061d57600080fd5b803590602001918460018302840111600160201b8311171561063e57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b81111561069057600080fd5b8201836020820111156106a257600080fd5b803590602001918460018302840111600160201b831117156106c357600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550611ab6945050505050565b34801561071057600080fd5b50610146600480360361012081101561072857600080fd5b6001600160a01b038235811692602081013590911691810190606081016040820135600160201b81111561075b57600080fd5b82018360208201111561076d57600080fd5b803590602001918460018302840111600160201b8311171561078e57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929584359560208601359560408101359550606081013594509192509060a081019060800135600160201b8111156107f857600080fd5b82018360208201111561080a57600080fd5b803590602001918460018302840111600160201b8311171561082b57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b81111561087d57600080fd5b82018360208201111561088f57600080fd5b803590602001918460018302840111600160201b831117156108b057600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550611c08945050505050565b3480156108fd57600080fd5b506109066122c2565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610940578181015183820152602001610928565b50505050905090810190601f16801561096d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561098757600080fd5b506105bc6004803603602081101561099e57600080fd5b5035612350565b3480156109b157600080fd5b506105bc600480360360208110156109c857600080fd5b50356001600160a01b0316612358565b3480156109e457600080fd5b50610a0b600480360360208110156109fb57600080fd5b50356001600160a01b0316612373565b604080519115158252519081900360200190f35b348015610a2b57600080fd5b50610a5260048036036020811015610a4257600080fd5b50356001600160a01b03166123be565b60405180868152602001858152602001848152602001836001600160a01b03166001600160a01b03168152602001826003811115610a8c57fe5b60ff1681526020019550505050505060405180910390f35b348015610ab057600080fd5b506105bc60048036036060811015610ac757600080fd5b5080359060208101359060400135612402565b348015610ae657600080fd5b5061014660048036036080811015610afd57600080fd5b810190602081018135600160201b811115610b1757600080fd5b820183602082011115610b2957600080fd5b803590602001918460018302840111600160201b83111715610b4a57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b811115610b9c57600080fd5b820183602082011115610bae57600080fd5b803590602001918460018302840111600160201b83111715610bcf57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b811115610c2157600080fd5b820183602082011115610c3357600080fd5b803590602001918460018302840111600160201b83111715610c5457600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b811115610ca657600080fd5b820183602082011115610cb857600080fd5b803590602001918460018302840111600160201b83111715610cd957600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061241f945050505050565b61014660048036036020811015610d3057600080fd5b50356001600160a01b0316612711565b61014660048036036040811015610d5657600080fd5b506001600160a01b0381351690602001356127d9565b348015610d7857600080fd5b5061014660048036036020811015610d8f57600080fd5b50356001600160a01b0316612bcc565b348015610dab57600080fd5b5061014660048036036020811015610dc257600080fd5b50356001600160a01b0316612d51565b33600081815260026020526040902054831115610e2b576040805162461bcd60e51b8152602060048201526012602482015271696e73756666696369656e742066756e647360701b604482015290519081900360640190fd5b6001600160a01b0380821660009081526002602052604080822080548790039055519184169185156108fc0291869190818181858888f19350505050158015610e78573d6000803e3d6000fd5b50816001600160a01b0316816001600160a01b03167fd1c19fbcd4551a5edfb66d43d2e337c04837afda3482b42bdf569a8fccdae5fb856040518082815260200191505060405180910390a3505050565b33328114610f085760405162461bcd60e51b8152600401808060200182810382526023815260200180613ac56023913960400191505060405180910390fd5b60016001600160a01b0382166000908152600160205260409020600390810154600160a01b900460ff1690811115610f3c57fe5b1480610f79575060026001600160a01b0382166000908152600160205260409020600390810154600160a01b900460ff1690811115610f7757fe5b145b610fc2576040805162461bcd60e51b815260206004820152601560248201527477726f6e6720737461746520666f72207374616b6560581b604482015290519081900360640190fd5b67016345785d8a0000816001600160a01b0316311015611029576040805162461bcd60e51b815260206004820152601a60248201527f62616c616e6365206c6f776572207468616e206d696e696d756d000000000000604482015290519081900360640190fd5b60026001600160a01b0382166000908152600160205260409020600390810154600160a01b900460ff169081111561105d57fe5b1461108f576001600160a01b0381166000908152600160205260409020600301805460ff60a01b1916600160a11b1790555b6001600160a01b03808216600081815260016020818152604080842060038101548154919094015482518b81528085018390529283018190526080606084018181528b51918501919091528a5195909816977f85b3ae3aae9d3fcb31142fbd8c3b4722d57825b8edd6e1366e69204afa5a0dfa968c96939592948c94909360a085019290860191908190849084905b8381101561113657818101518382015260200161111e565b50505050905090810190601f1680156111635780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a3505050565b60006060808b8b8b8b8b8b8b3060405160200180806339363c1d60e11b815250600401896001600160a01b03166001600160a01b031660601b8152601401886001600160a01b03166001600160a01b031660601b815260140187805190602001908083835b602083106111fc5780518252601f1990920191602091820191016111dd565b6001836020036101000a038019825116818451168082178552505050505050905001868152602001858152602001848152602001838152602001826001600160a01b03166001600160a01b031660601b81526014019850505050505050505060405160208183030381529060405290506000818e6040516020018083805190602001908083835b602083106112a25780518252601f199092019160209182019101611283565b6001836020036101000a038019825116818451168082178552505050505050905001826001600160a01b03166001600160a01b031660601b8152601401925050506040516020818303038152906040528051906020012090508c6001600160a01b031661131e8761131284612eab565b9063ffffffff612efc16565b6001600160a01b03161461134957600160405180602001604052806000815250935093505050611675565b50506001600160a01b038b166000908152602081905260409020548514611383575050604080516020810190915260008152600290611675565b600061139087898b612402565b905060608b6001600160a01b03166383947ea0905060e01b8e8e8d8d8d8d8d8c8a604051602401808a6001600160a01b03166001600160a01b03168152602001896001600160a01b03166001600160a01b03168152602001806020018881526020018781526020018681526020018581526020018060200184815260200183810383528a818151815260200191508051906020019080838360005b8381101561144357818101518382015260200161142b565b50505050905090810190601f1680156114705780820380516001836020036101000a031916815260200191505b50838103825285518152855160209182019187019080838360005b838110156114a357818101518382015260200161148b565b50505050905090810190601f1680156114d05780820380516001836020036101000a031916815260200191505b509b505050505050505050505050604051602081830303815290604052906001600160e01b0319166020820180516001600160e01b0383818316178352505050509050600060608d6001600160a01b031661c350846040518082805190602001908083835b602083106115545780518252601f199092019160209182019101611535565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303818686fa925050503d80600081146115b5576040519150601f19603f3d011682016040523d82523d6000602084013e6115ba565b606091505b5091509150816115e45760035b604051806020016040528060008152509550955050505050611675565b8080602001905160408110156115f957600080fd5b815160208301805191939283019291600160201b81111561161957600080fd5b8201602081018481111561162c57600080fd5b8151600160201b81118282018710171561164557600080fd5b50949a509850508815925082915061165f90505750600a86115b1561166e575061167592505050565b60046115c7565b9a509a98505050505050505050565b600061168e613998565b5a81523330146116cf5760405162461bcd60e51b8152600401808060200182810382526027815260200180613a196027913960400191505060405180910390fd5b6001600160a01b038b166000908152600260209081526040918290205483820152905160248101918252604481018590526060916380274db760e01b91879187918190606401848480828437600081840152601f19601f8201169050808301925050509350505050604051602081830303815290604052906001600160e01b0319166020820180516001600160e01b0383818316178352505050509050600060608d6001600160a01b0316620186a0846040518082805190602001908083835b602083106117ae5780518252601f19909201916020918201910161178f565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038160008787f1925050503d8060008114611811576040519150601f19603f3d011682016040523d82523d6000602084013e611816565b606091505b50915091508161182a5761182a6002612fea565b80806020019051602081101561183f57600080fd5b5051604080860191909152516001600160a01b038f1693508992508d91508c908083838082843760405192019450600093509091505080830381838787f1925050503d80600081146118ad576040519150601f19603f3d011682016040523d82523d6000602084013e6118b2565b606091505b5050151560608083019190915260006118db6118d45a85518a01036001613026565b8a8c613046565b90508c6001600160a01b031663e06e0e22905060e01b868685606001518487604001516040516024018080602001851515151581526020018481526020018381526020018281038252878782818152602001925080828437600081840152601f19601f8201169050808301925050509650505050505050604051602081830303815290604052906001600160e01b0319166020820180516001600160e01b03838183161783525050505091505060008c6001600160a01b0316620186a0836040518082805190602001908083835b602083106119c85780518252601f1990920191602091820191016119a9565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038160008787f1925050503d8060008114611a2b576040519150601f19603f3d011682016040523d82523d6000602084013e611a30565b606091505b5050905080611a4357611a436003612fea565b50506020808201516001600160a01b038d16600090815260029092526040909120541015611a7557611a756004612fea565b8060600151611a85576001611a88565b60005b9b9a5050505050505050505050565b6001600160a01b0381166000908152602081905260409020545b919050565b611abe6139bf565b611ac783613054565b60608101519091506001600160a01b0316301415611b75576000611aee8260a0015161308e565b90506001600160e01b0319811663405cec6760e01b14801590611b2257506001600160e01b031981166308b3039d60e11b14155b611b73576040805162461bcd60e51b815260206004820152601760248201527f4c6567616c2072656c6179207472616e73616374696f6e000000000000000000604482015290519081900360640190fd5b505b6000611bf783856040516020018082805190602001908083835b60208310611bae5780518252601f199092019160209182019101611b8f565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405160208183030381529060405280519060200120612efc90919063ffffffff16565b9050611c028161309b565b50505050565b60005a90506002336000908152600160205260409020600390810154600160a01b900460ff1690811115611c3857fe5b14611c7a576040805162461bcd60e51b815260206004820152600d60248201526c556e6b6e6f776e2072656c617960981b604482015290519081900360640190fd5b3a861115611cc3576040805162461bcd60e51b8152602060048201526011602482015270496e76616c69642067617320707269636560781b604482015290519081900360640190fd5b611cd7611ccf86612350565b61bc4c61331d565b811015611d22576040805162461bcd60e51b81526020600482015260146024820152734e6f7420656e6f756768206761736c656674282960601b604482015290519081900360640190fd5b6001600160a01b038916600090815260026020526040902054611d4686888a612402565b1115611d99576040805162461bcd60e51b815260206004820152601960248201527f526563697069656e742062616c616e636520746f6f206c6f7700000000000000604482015290519081900360640190fd5b6000611da689600061337a565b905060606000611dbe338e8e8e8e8e8e8e8e8e611178565b925090508015611e42578b6001600160a01b03168d6001600160a01b0316336001600160a01b03167fafb5afd6d1c2e8ffbfb480e674a169f493ece0b22658d4f4484e7334f0241e22868560405180836001600160e01b0319166001600160e01b03191681526020018281526020019250505060405180910390a4505050506122b7565b506001600160a01b038c16600090815260208190526040812080546001019055805a8503905060608c8f6040516020018083805190602001908083835b60208310611e9e5780518252601f199092019160209182019101611e7f565b6001836020036101000a038019825116818451168082178552505050505050905001826001600160a01b03166001600160a01b031660601b81526014019250505060405160208183030381529060405290506060632ca70eba60e01b8f838f8f8f888b60405160240180886001600160a01b03166001600160a01b031681526020018060200187815260200186815260200185815260200184815260200180602001838103835289818151815260200191508051906020019080838360005b83811015611f75578181015183820152602001611f5d565b50505050905090810190601f168015611fa25780820380516001836020036101000a031916815260200191505b50838103825284518152845160209182019186019080838360005b83811015611fd5578181015183820152602001611fbd565b50505050905090810190601f1680156120025780820380516001836020036101000a031916815260200191505b509950505050505050505050604051602081830303815290604052906001600160e01b0319166020820180516001600160e01b03838183161783525050505090506060306001600160a01b0316826040518082805190602001908083835b6020831061207f5780518252601f199092019160209182019101612060565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d80600081146120e1576040519150601f19603f3d011682016040523d82523d6000602084013e6120e6565b606091505b509150508080602001905160208110156120ff57600080fd5b5051945060009350612123925061211c9150505a87036000613026565b8b8d613046565b6001600160a01b038e16600090815260026020526040902054909150811115612189576040805162461bcd60e51b815260206004820152601360248201527253686f756c64206e6f7420676574206865726560681b604482015290519081900360640190fd5b80600260008f6001600160a01b03166001600160a01b0316815260200190815260200160002060008282540392505081905550806002600060016000336001600160a01b03166001600160a01b0316815260200190815260200160002060030160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b03168152602001908152602001600020600082825401925050819055508c6001600160a01b03168e6001600160a01b0316336001600160a01b03167fab74390d395916d9e0006298d47938a5def5d367054dcca78fa6ec84381f3f2287868660405180846001600160e01b0319166001600160e01b031916815260200183600481111561229657fe5b60ff168152602001828152602001935050505060405180910390a450505050505b505050505050505050565b6003805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156123485780601f1061231d57610100808354040283529160200191612348565b820191906000526020600020905b81548152906001019060200180831161232b57829003601f168201915b505050505081565b6206137c0190565b6001600160a01b031660009081526002602052604090205490565b6001600160a01b038116600090815260016020526040812060020154158015906123b857506001600160a01b0382166000908152600160205260409020600201544210155b92915050565b6001600160a01b039081166000908152600160208190526040909120805491810154600282015460039092015492949093919291821691600160a01b900460ff1690565b600061241761241085612350565b8484613046565b949350505050565b6000612457848660405160200180828051906020019080838360208310611bae5780518252601f199092019160209182019101611b8f565b90506000612491838560405160200180828051906020019080838360208310611bae5780518252601f199092019160209182019101611b8f565b9050806001600160a01b0316826001600160a01b0316146124ec576040805162461bcd60e51b815260206004820152601060248201526f2234b33332b932b73a1039b4b3b732b960811b604482015290519081900360640190fd5b6124f46139bf565b6124fd87613054565b90506125076139bf565b61251086613054565b805183519192501461255b576040805162461bcd60e51b815260206004820152600f60248201526e446966666572656e74206e6f6e636560881b604482015290519081900360640190fd5b60608260a001518360400151846060015185608001516040516020018085805190602001908083835b602083106125a35780518252601f199092019160209182019101612584565b6001836020036101000a038019825116818451168082178552505050505050905001848152602001836001600160a01b03166001600160a01b031660601b8152601401828152602001945050505050604051602081830303815290604052905060608260a001518360400151846060015185608001516040516020018085805190602001908083835b6020831061264b5780518252601f19909201916020918201910161262c565b6001836020036101000a038019825116818451168082178552505050505050905001848152602001836001600160a01b03166001600160a01b031660601b815260140182815260200194505050505060405160208183030381529060405290508080519060200120828051906020012014156126fc576040805162461bcd60e51b815260206004820152600b60248201526a1d1e081a5cc8195c5d585b60aa1b604482015290519081900360640190fd5b6127058661309b565b50505050505050505050565b34671bc16d674ec80000811115612761576040805162461bcd60e51b815260206004820152600f60248201526e6465706f73697420746f6f2062696760881b604482015290519081900360640190fd5b6001600160a01b03821660009081526002602052604090205461278490826133d2565b6001600160a01b038316600081815260026020908152604091829020939093558051848152905133937f8752a472e571a816aea92eec8dae9baf628e840f4929fbcc2d155e6233ff68a7928290030190a35050565b60006001600160a01b0383166000908152600160205260409020600390810154600160a01b900460ff169081111561280d57fe5b14156128ae57336001600160a01b0383161415612871576040805162461bcd60e51b815260206004820152601d60248201527f72656c61792063616e6e6f74207374616b6520666f7220697473656c66000000604482015290519081900360640190fd5b6001600160a01b038216600090815260016020526040902060030180546001600160a01b031916331760ff60a01b1916600160a01b1790556129cb565b60016001600160a01b0383166000908152600160205260409020600390810154600160a01b900460ff16908111156128e257fe5b148061291f575060026001600160a01b0383166000908152600160205260409020600390810154600160a01b900460ff169081111561291d57fe5b145b15612986576001600160a01b03828116600090815260016020526040902060030154163314612981576040805162461bcd60e51b81526020600482015260096024820152683737ba1037bbb732b960b91b604482015290519081900360640190fd5b6129cb565b6040805162461bcd60e51b815260206004820152601560248201527477726f6e6720737461746520666f72207374616b6560581b604482015290519081900360640190fd5b6001600160a01b03821660009081526001602052604090208054349081019182905590670de0b6b3a76400001115612a4a576040805162461bcd60e51b815260206004820152601860248201527f7374616b65206c6f776572207468616e206d696e696d756d0000000000000000604482015290519081900360640190fd5b62093a80821015612aa2576040805162461bcd60e51b815260206004820152601860248201527f64656c6179206c6f776572207468616e206d696e696d756d0000000000000000604482015290519081900360640190fd5b626ebe00821115612afa576040805162461bcd60e51b815260206004820152601960248201527f64656c617920686967686572207468616e206d6178696d756d00000000000000604482015290519081900360640190fd5b6001600160a01b03831660009081526001602081905260409091200154821015612b6b576040805162461bcd60e51b815260206004820181905260248201527f756e7374616b6544656c61792063616e6e6f7420626520646563726561736564604482015290519081900360640190fd5b6001600160a01b0383166000818152600160208181526040928390209182018690559054825190815290810185905281517f1449c6dd7851abc30abf37f57715f492010519147cc2652fbc38202c18a6ee90929181900390910190a2505050565b6001600160a01b03818116600090815260016020526040902060030154163314612c29576040805162461bcd60e51b81526020600482015260096024820152683737ba1037bbb732b960b91b604482015290519081900360640190fd5b60016001600160a01b0382166000908152600160205260409020600390810154600160a01b900460ff1690811115612c5d57fe5b1480612c9a575060026001600160a01b0382166000908152600160205260409020600390810154600160a01b900460ff1690811115612c9857fe5b145b612cdd576040805162461bcd60e51b815260206004820152600f60248201526e185b1c9958591e481c995b5bdd9959608a1b604482015290519081900360640190fd5b6001600160a01b038116600081815260016020818152604092839020918201544201600283018190556003909201805460ff60a01b1916600360a01b179055825191825291517f5490afc1d818789c8b3d5d63bce3d2a3327d0bba4efb5a7751f783dc977d7d11929181900390910190a250565b612d5a81612373565b612d9f576040805162461bcd60e51b815260206004820152601160248201527018d85b955b9cdd185ad94819985a5b1959607a1b604482015290519081900360640190fd5b6001600160a01b03818116600090815260016020526040902060030154163314612dfc576040805162461bcd60e51b81526020600482015260096024820152683737ba1037bbb732b960b91b604482015290519081900360640190fd5b6001600160a01b038116600090815260016020819052604080832080548482559281018490556002810184905560030180546001600160a81b0319169055513392839183156108fc0291849190818181858888f19350505050158015612e66573d6000803e3d6000fd5b506040805182815290516001600160a01b038516917f0f5bb82176feb1b5e747e28471aa92156a04d9f3ab9f45f28e2d704232b93f75919081900360200190a2505050565b604080517f19457468657265756d205369676e6564204d6573736167653a0a333200000000602080830191909152603c8083019490945282518083039094018452605c909101909152815191012090565b60008151604114612f0f575060006123b8565b60208201516040830151606084015160001a7f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0821115612f5557600093505050506123b8565b8060ff16601b14158015612f6d57508060ff16601c14155b15612f7e57600093505050506123b8565b6040805160008152602080820180845289905260ff8416828401526060820186905260808201859052915160019260a0808401939192601f1981019281900390910190855afa158015612fd5573d6000803e3d6000fd5b5050604051601f190151979650505050505050565b6060816040516020018082600481111561300057fe5b60ff16815260200191505060405160208183030381529060405290508051602082018181fd5b600081613034576000613039565b62019a285b90920161bc4c0192915050565b606490810191909202020490565b61305c6139bf565b61306582613433565b60a087015260808601526001600160a01b03166060850152604084015260208301528152919050565b60006123b88260006134ed565b60016001600160a01b0382166000908152600160205260409020600390810154600160a01b900460ff16908111156130cf57fe5b148061310c575060026001600160a01b0382166000908152600160205260409020600390810154600160a01b900460ff169081111561310a57fe5b145b80613148575060036001600160a01b0382166000908152600160205260409020600390810154600160a01b900460ff169081111561314657fe5b145b61318a576040805162461bcd60e51b815260206004820152600e60248201526d556e7374616b65642072656c617960901b604482015290519081900360640190fd5b6001600160a01b038116600090815260016020526040812054906131af8260026134f9565b905060006131bd838361331d565b905060026001600160a01b0385166000908152600160205260409020600390810154600160a01b900460ff16908111156131f357fe5b1415613239576040805142815290516001600160a01b038616917f5490afc1d818789c8b3d5d63bce3d2a3327d0bba4efb5a7751f783dc977d7d11919081900360200190a25b6001600160a01b038416600090815260016020819052604080832083815591820183905560028201839055600390910180546001600160a81b03191690555183156108fc0290849083818181858288f1935050505015801561329f573d6000803e3d6000fd5b506040513390819083156108fc029084906000818181858888f193505050501580156132cf573d6000803e3d6000fd5b50604080516001600160a01b038381168252602082018590528251908816927fb0595266ccec357806b2691f348b128209f1060a0bda4f5c95f7090730351ff8928290030190a25050505050565b600082821115613374576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b600081600401835110156133bf5760405162461bcd60e51b8152600401808060200182810382526025815260200180613aa06025913960400191505060405180910390fd5b5001602001516001600160e01b03191690565b60008282018381101561342c576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b600080600080600060608061344f61344a89613563565b6135a8565b905061346e8160008151811061346157fe5b60200260200101516136ad565b61347e8260018151811061346157fe5b61348e8360028151811061346157fe5b6134ab8460038151811061349e57fe5b60200260200101516136db565b6134bb8560048151811061346157fe5b6134d8866005815181106134cb57fe5b602002602001015161372a565b949d939c50919a509850965090945092505050565b600061342c8383613797565b600080821161354f576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b600082848161355a57fe5b04949350505050565b61356b6139fe565b815161358b57506040805180820190915260008082526020820152611ab1565b506040805180820190915281518152602082810190820152919050565b60606135b3826137e5565b6135f4576040805162461bcd60e51b815260206004820152600d60248201526c1a5cd31a5cdd0819985a5b1959609a1b604482015290519081900360640190fd5b60006135ff83613811565b90508060405190808252806020026020018201604052801561363b57816020015b6136286139fe565b8152602001906001900390816136205790505b509150600061364d846020015161385e565b60208501510190506000805b838110156136a45761366a836138c7565b915060405180604001604052808381526020018481525085828151811061368d57fe5b602090810291909101015291810191600101613659565b50505050919050565b6000806136bd836020015161385e565b83516020948501518201519190039093036101000a90920492915050565b60006015826000015111156137215760405162461bcd60e51b815260040180806020018281038252603a815260200180613a40603a913960400191505060405180910390fd5b6123b8826136ad565b6060600061373b836020015161385e565b83516040805191839003808352601f19601f8201168301602001909152919250606090828015613772576020820181803883390190505b509050600081602001905061378e848760200151018285613957565b50949350505050565b600081602001835110156137dc5760405162461bcd60e51b8152600401808060200182810382526026815260200180613a7a6026913960400191505060405180910390fd5b50016020015190565b6020810151805160009190821a9060c082101561380757600092505050611ab1565b5060019392505050565b600080600090506000613827846020015161385e565b602085015185519181019250015b8082101561385557613846826138c7565b60019093019290910190613835565b50909392505050565b8051600090811a6080811015613878576000915050611ab1565b60b8811080613893575060c08110801590613893575060f881105b156138a2576001915050611ab1565b60c08110156138b65760b519019050611ab1565b60f519019050611ab1565b50919050565b8051600090811a60808110156138e1576001915050611ab1565b60b88110156138f557607e19019050611ab1565b60c08110156139225760b78103600184019350806020036101000a845104600182018101935050506138c1565b60f88110156139365760be19019050611ab1565b60019290920151602083900360f7016101000a900490910160f51901919050565b5b60208110613977578251825260209283019290910190601f1901613958565b915181516020939093036101000a6000190180199091169216919091179052565b60408051608081018252600080825260208201819052918101829052606081019190915290565b6040518060c0016040528060008152602001600081526020016000815260200160006001600160a01b0316815260200160008152602001606081525090565b60405180604001604052806000815260200160008152509056fe4f6e6c792052656c61794875622073686f756c642063616c6c20746869732066756e6374696f6e496e76616c696420524c504974656d2e204164647265737365732061726520656e636f64656420696e203230206279746573206f72206c657373475245415445525f4f525f455155414c5f544f5f33325f4c454e4754485f5245515549524544475245415445525f4f525f455155414c5f544f5f345f4c454e4754485f5245515549524544436f6e7472616374732063616e6e6f742072656769737465722061732072656c617973a265627a7a72305820ac2aa0393ce6b8813055ebaead9b1b776f47b7e48a65bcca3c6bd72394ef5d6464736f6c634300050a00321ba01613161316131613161316131613161316131613161316131613161316131613a01613161316131613161316131613161316131613161316131613161316131613';
