exports.cryptoCoin = class {
	constructor(id, name, priceInUsd){
		this.id = id;
		this.name = name;
		this.priceInUsd = priceInUsd;
	}
	convertTo(otherCoin){
		return this.priceInUsd / otherCoin.priceInUsd;
	}
};