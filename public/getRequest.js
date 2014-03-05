//getting the minining info when button gets clicked

$("#btnMiningInfo").click(function(){
	miningModel.fetch();
});

$("#btnWalletInfo").click(function(){
	walletInfoModel.fetch();
});	

$("#listOfTransactions").click(function() {
	transactionListModel.fetch();
});

