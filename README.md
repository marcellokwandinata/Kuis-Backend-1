Nama : Marcello Kwandinata
NIM : 535250089

## Development Setup
1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Add New API Endpoints
1. Create a new database schema in `./src/models`. (schema-gacha, schema-prize )

2. Create a new folder in `./src/api/components`. Remember to separate your codes to gacha-repositories, gacha-services, gacha-controllers, and gacha-routes.

3. Add the new route in `./src/api/routes.js`.
add "const gacha = require('./components/gacha/gacha-route');" and "gacha(app);"


  1. addPrize
    addPrize bertujuan untuk menambahkan hadiah yang bisa didapatkan selama periode undian, total semua probability harus 1 agar user mendapatkan kesempatan untuk memenangkan hadiah.
  
  2. getPrizes
    getPrize bertujuan untuk memperlihatkan sisa stock dari hadiah.

  3. doGacha
    doGacha berfungsi untuk user melakukan sebuah gacha hadiah, maksimal gacha 5x dalam sehari.

  4. getGachaHistory
    getGachaHistory berguna untuk memperlihatkan semua percobaan gacha dari semua user dan hadiah yang dimenangkan oleh semua user jika menang.

  5. getWinners
    getWinners berguna untuk menampilkan history pemenang gacha.
  
  
4. Test your new endpoints in the API client app.
 1. POST/GACHA-Run Gacha:
  URL : http://localhost:5000/api/gacha
  Body : 
  {
    "userId":"user123", 
    "username":"Marcello" 
  }
  Response : 
  {
	"success": false,
	"message": "Anda sudah melakukan gacha 5 kali hari ini. Coba lagi besok."
  }

  2. GET/History-Run History:
  URL : http://localhost:5000/api/gacha/history?userId=user123
  Params : Key = userId   Value = user123
  Response : 
  {
	"success": true,
	"userId": "user123",
	"totalGacha": 5,
	"totalWon": 0,
	"data": [
		{
			"id": "69e251f2c0dacb4416aec22b",
			"gacha_date": "2026-04-17",
			"won": false,
			"prize": null,
			"created_at": "2026-04-17T15:29:54.490Z"
		},
		{
			"id": "69e24f3ac0dacb4416aec226",
			"gacha_date": "2026-04-17",
			"won": false,
			"prize": null,
			"created_at": "2026-04-17T15:18:18.152Z"
		},
		{
			"id": "69e226589b34234d38ecc60b",
			"gacha_date": "2026-04-17",
			"won": false,
			"prize": null,
			"created_at": "2026-04-17T12:23:52.695Z"
		},
		{
			"id": "69e226429b34234d38ecc607",
			"gacha_date": "2026-04-17",
			"won": false,
			"prize": null,
			"created_at": "2026-04-17T12:23:31.007Z"
		},
		{
			"id": "69e22056307cfa67d8c282fa",
			"gacha_date": "2026-04-17",
			"won": false,
			"prize": null,
			"created_at": "2026-04-17T11:58:14.634Z"
		}
	]
}

  3. GET/Prize-Run Prize:
  URL : http://localhost:5000/api/gacha/prizes
  Response : 
  {
	"success": true,
	"data": [
		{
			"id": "69e254fc502e662cdafa613b",
			"name": "Emas 10 gram",
			"total_quota": 1,
			"winners_count": 0,
			"remaining_quota": 1
		},
		{
			"id": "69e25586502e662cdafa613e",
			"name": "Smartphone X",
			"total_quota": 5,
			"winners_count": 0,
			"remaining_quota": 5
		},
		{
			"id": "69e255e3502e662cdafa6140",
			"name": "Smartwatch Y",
			"total_quota": 10,
			"winners_count": 0,
			"remaining_quota": 10
		},
		{
			"id": "69e25634502e662cdafa6142",
			"name": "Voucher Rp100.000",
			"total_quota": 100,
			"winners_count": 0,
			"remaining_quota": 100
		},
		{
			"id": "69e25672502e662cdafa6144",
			"name": "Pulsa Rp50.000",
			"total_quota": 500,
			"winners_count": 0,
			"remaining_quota": 500
		}
	]
}

  4. GET/Winners-Run Winners
  URL : http://localhost:5000/api/gacha/winners
  Response : 
  {
	"success": true,
	"data": []
  }

  5. POST/Hadiah-Run Hadiah
    URL : http://localhost:5000/api/gacha/prize
    Body : 
    {
    "prizeName":"Emas 10 gram",
    "quantity":"1",
    "probability":"0.1"
    } 
    Response :
    {
	"name": "Emas 10 gram",
	"quota": 1,
	"winners_count": 0,
	"probability": 0.1,
	"_id": "69e26241f7b102b123d6b5ca",
	"createdAt": "2026-04-17T16:39:29.415Z",
	"updatedAt": "2026-04-17T16:39:29.415Z",
	"__v": 0
}
  