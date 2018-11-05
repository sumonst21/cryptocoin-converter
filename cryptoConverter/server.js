const request = require('request');
const http = require('http');
const cryptocoin = require('./cryptoCoin.js');
const url = require('url');


exports.server = class {
	constructor (port){

		this.port = port;
		this.coins = [];

		http.createServer((req, res) => {
			const urlQuery = url.parse(req.url, true).query;
			const coin1Name = urlQuery.from;
			const coin2Name = urlQuery.to;

			let coin1 = undefined;
			let coin2 = undefined;

			this.coins.forEach((coin)=> {
				if(coin.name === coin1Name){
					coin1 = coin;
				}
				else if(coin.name === coin2Name){
					coin2 = coin;
				}
			});

			res.writeHead(200, {'content-Type': 'text/plain'});
			if (coin1 && coin2) {
				const conversionFactor = coin1.convertTo(coin2);
				res.end(coin1.name + ' costs ' + conversionFactor + ' ' + coin2.name + 's');
				//res.end(JSON.stringify(coins));
			}
			else{
				res.end('could not find those coins');
				//res.end('No Data');
			}
		}).listen(this.port);

		request('https://api.coinmarketcap.com/v2/ticker/', (err, request_res, body) => {
			if (err) throw err;

			let coinData = JSON.parse(body);
			Object.keys(coinData.data).map((coinkey) => this.coins.push(new cryptocoin.cryptoCoin(coinData.data[coinkey].id, coinData.data[coinkey].name, coinData.data[coinkey].quotes.USD.price)));

		});
	}
}