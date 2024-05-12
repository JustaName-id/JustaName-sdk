export interface CoinType {
  coin: string;
  symbol: string;
  coinType: string;
  color: string;
}

export interface CoinTypeMap {
  [key: string]: CoinType;
}
export const coinTypeMap : CoinTypeMap = {
  "0": {
    "coin": "Bitcoin",
    "symbol": "BTC",
    "coinType": "0",
    "color": "#f7931a"
  },
  "2": {
    "coin": "Litecoin",
    "symbol": "LTC",
    "coinType": "2",
    "color": "#bfbbbb"
  },
  "3": {
    "coin": "Dogecoin",
    "symbol": "DOGE",
    "coinType": "3",
    "color": "#c3a634"
  },
  "4": {
    "coin": "Reddcoin",
    "symbol": "RDD",
    "coinType": "4",
    "color": "#e30613"
  },
  "5": {
    "coin": "Dash",
    "symbol": "DASH",
    "coinType": "5",
    "color": "#008ce7"
  },
  "6": {
    "coin": "Peercoin",
    "symbol": "PPC",
    "coinType": "6",
    "color": "#3cb054"
  },
  "7": {
    "coin": "Namecoin",
    "symbol": "NMC",
    "coinType": "7",
    "color": "#186c9d"
  },
  "8": {
    "coin": "Feathercoin",
    "symbol": "FTC",
    "coinType": "8",
    "color": "#27323a"
  },
  "9": {
    "coin": "Counterparty",
    "symbol": "XCP",
    "coinType": "9",
    "color": "#ed1650"
  },
  "10": {
    "coin": "Blackcoin",
    "symbol": "BLK",
    "coinType": "10",
    "color": "#181818"
  },
  "13": {
    "coin": "Mazacoin",
    "symbol": "MZC",
    "coinType": "13",
    "color": "#ffaa05"
  },
  "14": {
    "coin": "Viacoin",
    "symbol": "VIA",
    "coinType": "14",
    "color": "#565656"
  },
  "17": {
    "coin": "Groestlcoin",
    "symbol": "GRS",
    "coinType": "17",
    "color": "#377e96"
  },
  "20": {
    "coin": "DigiByte",
    "symbol": "DGB",
    "coinType": "20",
    "color": "#006ad2"
  },
  "22": {
    "coin": "Monacoin",
    "symbol": "MONA",
    "coinType": "22",
    "color": "#dec799"
  },
  "23": {
    "coin": "Clams",
    "symbol": "CLAM",
    "coinType": "23",
    "color": "#20c5d3"
  },
  "24": {
    "coin": "Primecoin",
    "symbol": "XPM",
    "coinType": "24",
    "color": "#ffd81b"
  },
  "25": {
    "coin": "Neoscoin",
    "symbol": "NEOS",
    "coinType": "25",
    "color": "#e5f300"
  },
  "28": {
    "coin": "Vertcoin",
    "symbol": "VTC",
    "coinType": "28",
    "color": "#048657"
  },
  "29": {
    "coin": "NXT",
    "symbol": "NXT",
    "coinType": "29",
    "color": "#008fbb"
  },
  "30": {
    "coin": "Burst",
    "symbol": "BURST",
    "coinType": "30",
    "color": "#2d2d2d"
  },
  "34": {
    "coin": "Canada eCoin",
    "symbol": "CDN",
    "coinType": "34",
    "color": "#f70808"
  },
  "38": {
    "coin": "StartCOIN",
    "symbol": "START",
    "coinType": "38",
    "color": "#01aef0"
  },
  "40": {
    "coin": "Expanse",
    "symbol": "EXP",
    "coinType": "40",
    "color": "#ffaa5c"
  },
  "42": {
    "coin": "Decred",
    "symbol": "DCR",
    "coinType": "42",
    "color": "#2ed6a1"
  },
  "43": {
    "coin": "NEM",
    "symbol": "XEM",
    "coinType": "43",
    "color": "#67b2e8"
  },
  "44": {
    "coin": "Particl",
    "symbol": "PART",
    "coinType": "44",
    "color": "#65cb8d"
  },
  "45": {
    "coin": "Argentum (dead)",
    "symbol": "ARG",
    "coinType": "45",
    "color": "#a71435"
  },
  "52": {
    "coin": "BitcoinDark",
    "symbol": "BTCD",
    "coinType": "52",
    "color": "#ff6600"
  },
  "57": {
    "coin": "Syscoin",
    "symbol": "SYS",
    "coinType": "57",
    "color": "#0082c6"
  },
  "58": {
    "coin": "Solarcoin",
    "symbol": "SLR",
    "coinType": "58",
    "color": "#fda616"
  },
  "60": {
    "coin": "Ether",
    "symbol": "ETH",
    "coinType": "60",
    "color": "#627eea"
  },
  "61": {
    "coin": "Ether Classic",
    "symbol": "ETC",
    "coinType": "61",
    "color": "#328332"
  },
  "65": {
    "coin": "Bitcoinplus",
    "symbol": "XBC",
    "coinType": "65",
    "color": "#f7931a"
  },
  "66": {
    "coin": "Internet of People",
    "symbol": "IOP",
    "coinType": "66",
    "color": "#0cafa5"
  },
  "67": {
    "coin": "Nexus",
    "symbol": "NXS",
    "coinType": "67",
    "color": "#4099cd"
  },
  "69": {
    "coin": "OKCash",
    "symbol": "OK",
    "coinType": "69",
    "color": "#000000"
  },
  "72": {
    "coin": "Crown",
    "symbol": "CRW",
    "coinType": "72",
    "color": "#0f1529"
  },
  "73": {
    "coin": "BelaCoin",
    "symbol": "BELA",
    "coinType": "73",
    "color": "#13a0f6"
  },
  "74": {
    "coin": "ICON",
    "symbol": "ICX",
    "coinType": "74",
    "color": "#1fc5c9"
  },
  "75": {
    "coin": "FujiCoin",
    "symbol": "FJC",
    "coinType": "75",
    "color": "#00afec"
  },
  "77": {
    "coin": "Verge Currency",
    "symbol": "XVG",
    "coinType": "77",
    "color": "#00cbff"
  },
  "81": {
    "coin": "Potcoin",
    "symbol": "POT",
    "coinType": "81",
    "color": "#105b2f"
  },
  "84": {
    "coin": "Gridcoin",
    "symbol": "GRC",
    "coinType": "84",
    "color": "#5411b3"
  },
  "87": {
    "coin": "Gulden",
    "symbol": "NLG",
    "coinType": "87",
    "color": "#2ab0fd"
  },
  "90": {
    "coin": "Myriadcoin",
    "symbol": "XMY",
    "coinType": "90",
    "color": "#ec1076"
  },
  "91": {
    "coin": "BitSend",
    "symbol": "BSD",
    "coinType": "91",
    "color": "#000000"
  },
  "101": {
    "coin": "GameCredits",
    "symbol": "GAME",
    "coinType": "101",
    "color": "#2d475b"
  },
  "105": {
    "coin": "Stratis",
    "symbol": "STRAT",
    "coinType": "105",
    "color": "#1387c9"
  },
  "108": {
    "coin": "Ubiq",
    "symbol": "UBQ",
    "coinType": "108",
    "color": "#00ea90"
  },
  "111": {
    "coin": "ARK",
    "symbol": "ARK",
    "coinType": "111",
    "color": "#f70000"
  },
  "117": {
    "coin": "Pinkcoin",
    "symbol": "PINK",
    "coinType": "117",
    "color": "#ed79aa"
  },
  "118": {
    "coin": "Atom",
    "symbol": "ATOM",
    "coinType": "118",
    "color": "#2e3148"
  },
  "119": {
    "coin": "Pivx",
    "symbol": "PIVX",
    "coinType": "119",
    "color": "#5e4778"
  },
  "121": {
    "coin": "Zencash",
    "symbol": "ZEN",
    "coinType": "121",
    "color": "#00eaab"
  },
  "128": {
    "coin": "Monero",
    "symbol": "XMR",
    "coinType": "128",
    "color": "#ff6600"
  },
  "130": {
    "coin": "NavCoin",
    "symbol": "NAV",
    "coinType": "130",
    "color": "#7d59b5"
  },
  "131": {
    "coin": "Factom Factoids",
    "symbol": "FCT",
    "coinType": "131",
    "color": "#417ba4"
  },
  "133": {
    "coin": "Zcash",
    "symbol": "ZEC",
    "coinType": "133",
    "color": "#ecb244"
  },
  "134": {
    "coin": "Lisk",
    "symbol": "LSK",
    "coinType": "134",
    "color": "#0d4ea0"
  },
  "135": {
    "coin": "Steem",
    "symbol": "STEEM",
    "coinType": "135",
    "color": "#4ba2f2"
  },
  "136": {
    "coin": "ZCoin",
    "symbol": "XZC",
    "coinType": "136",
    "color": "#23b852"
  },
  "140": {
    "coin": "LBRY Credits",
    "symbol": "LBC",
    "coinType": "140",
    "color": "#006149"
  },
  "141": {
    "coin": "Komodo",
    "symbol": "KMD",
    "coinType": "141",
    "color": "#2b6680"
  },
  "143": {
    "coin": "Riecoin",
    "symbol": "RIC",
    "coinType": "143",
    "color": "#60e4dd"
  },
  "144": {
    "coin": "Ripple",
    "symbol": "XRP",
    "coinType": "144",
    "color": "#23292f"
  },
  "145": {
    "coin": "Bitcoin Cash",
    "symbol": "BCH",
    "coinType": "145",
    "color": "#8dc351"
  },
  "146": {
    "coin": "Neblio",
    "symbol": "NEBL",
    "coinType": "146",
    "color": "#50479e"
  },
  "147": {
    "coin": "ZClassic",
    "symbol": "ZCL",
    "coinType": "147",
    "color": "#c87035"
  },
  "148": {
    "coin": "Stellar Lumens",
    "symbol": "XLM",
    "coinType": "148",
    "color": "#000000"
  },
  "153": {
    "coin": "Bytom",
    "symbol": "BTM",
    "coinType": "153",
    "color": "#504c4c"
  },
  "156": {
    "coin": "Bitcoin Gold",
    "symbol": "BTG",
    "coinType": "156",
    "color": "#eba809"
  },
  "160": {
    "coin": "Bitcore",
    "symbol": "BTX",
    "coinType": "160",
    "color": "#fb2ea3"
  },
  "162": {
    "coin": "Bridgecoin",
    "symbol": "BCO",
    "coinType": "162",
    "color": "#2c76b7"
  },
  "163": {
    "coin": "Ellaism",
    "symbol": "ELLA",
    "coinType": "163",
    "color": "#396a28"
  },
  "164": {
    "coin": "Pirl",
    "symbol": "PIRL",
    "coinType": "164",
    "color": "#96b73d"
  },
  "166": {
    "coin": "Vivo",
    "symbol": "VIVO",
    "coinType": "166",
    "color": "#408af1"
  },
  "172": {
    "coin": "HTMLCOIN",
    "symbol": "HTML",
    "coinType": "172",
    "color": "#cfa967"
  },
  "175": {
    "coin": "Ravencoin",
    "symbol": "RVN",
    "coinType": "175",
    "color": "#384182"
  },
  "176": {
    "coin": "GoByte",
    "symbol": "GBX",
    "coinType": "176",
    "color": "#1666af"
  },
  "177": {
    "coin": "BitcoinZ",
    "symbol": "BTCZ",
    "coinType": "177",
    "color": "#f8c24a"
  },
  "178": {
    "coin": "Poa",
    "symbol": "POA",
    "coinType": "178",
    "color": "#444fa1"
  },
  "182": {
    "coin": "Minexcoin",
    "symbol": "MNX",
    "coinType": "182",
    "color": "#00adef"
  },
  "183": {
    "coin": "Bitcoin Private",
    "symbol": "BTCP",
    "coinType": "183",
    "color": "#272d63"
  },
  "184": {
    "coin": "Musicoin",
    "symbol": "MUSIC",
    "coinType": "184",
    "color": "#ffffff"
  },
  "187": {
    "coin": "STRAKS",
    "symbol": "STAK",
    "coinType": "187",
    "color": "#f2941b"
  },
  "188": {
    "coin": "World Bitcoin",
    "symbol": "WBTC",
    "coinType": "188",
    "color": "#201a2d"
  },
  "194": {
    "coin": "EOS",
    "symbol": "EOS",
    "coinType": "194",
    "color": "#000000"
  },
  "195": {
    "coin": "Tron",
    "symbol": "TRX",
    "coinType": "195",
    "color": "#ef0027"
  },
  "197": {
    "coin": "HUSH",
    "symbol": "HUSH",
    "coinType": "197",
    "color": "#292929"
  },
  "200": {
    "coin": "Omni",
    "symbol": "OMNI",
    "coinType": "200",
    "color": "#1c347a"
  },
  "204": {
    "coin": "Bytecoin",
    "symbol": "BCN",
    "coinType": "204",
    "color": "#f04086"
  },
  "212": {
    "coin": "Utrum",
    "symbol": "OOT",
    "coinType": "212",
    "color": "#25aae1"
  },
  "216": {
    "coin": "Flo",
    "symbol": "FLO",
    "coinType": "216",
    "color": "#2080a2"
  },
  "218": {
    "coin": "BitCloud",
    "symbol": "BTDX",
    "coinType": "218",
    "color": "#00aaff"
  },
  "223": {
    "coin": "Internet Computer (DFINITY)",
    "symbol": "ICP",
    "coinType": "223",
    "color": "#292a2e"
  },
  "224": {
    "coin": "Smartcash",
    "symbol": "SMART",
    "coinType": "224",
    "color": "#fec60d"
  },
  "232": {
    "coin": "Trezarcoin",
    "symbol": "TZC",
    "coinType": "232",
    "color": "#374851"
  },
  "236": {
    "coin": "BitcoinSV",
    "symbol": "BSV",
    "coinType": "236",
    "color": "#eab304"
  },
  "238": {
    "coin": "Quantum Resistant Ledger",
    "symbol": "QRL",
    "coinType": "238",
    "color": "#252525"
  },
  "249": {
    "coin": "Electra",
    "symbol": "ECA",
    "coinType": "249",
    "color": "#aa15dd"
  },
  "256": {
    "coin": "Bitcoin Nano",
    "symbol": "NANO",
    "coinType": "256",
    "color": "#4a90e2"
  },
  "259": {
    "coin": "Zest",
    "symbol": "ZEST",
    "coinType": "259",
    "color": "#07bc9c"
  },
  "260": {
    "coin": "ArcBlock",
    "symbol": "ABT",
    "coinType": "260",
    "color": "#3effff"
  },
  "265": {
    "coin": "TokenPay",
    "symbol": "TPAY",
    "coinType": "265",
    "color": "#3058a6"
  },
  "266": {
    "coin": "ChainZilla",
    "symbol": "ZILLA",
    "coinType": "266",
    "color": "#00004d"
  },
  "268": {
    "coin": "BCChain",
    "symbol": "BCC",
    "coinType": "268",
    "color": "#f7931c"
  },
  "269": {
    "coin": "HPB",
    "symbol": "HPB",
    "coinType": "269",
    "color": "#1591ca"
  },
  "270": {
    "coin": "ONE",
    "symbol": "ONE",
    "coinType": "270",
    "color": "#00aee9"
  },
  "283": {
    "coin": "Algorand",
    "symbol": "ALGO",
    "coinType": "283",
    "color": "#000000"
  },
  "287": {
    "coin": "DigitalNote",
    "symbol": "XDN",
    "coinType": "287",
    "color": "#4f7aa2"
  },
  "288": {
    "coin": "FUSION",
    "symbol": "FSN",
    "coinType": "288",
    "color": "#1d9ad7"
  },
  "291": {
    "coin": "IOST",
    "symbol": "IOST",
    "coinType": "291",
    "color": "#1c1c1c"
  },
  "298": {
    "coin": "FairCoin",
    "symbol": "FAIR",
    "coinType": "298",
    "color": "#c99705"
  },
  "302": {
    "coin": "Community",
    "symbol": "CMT",
    "coinType": "302",
    "color": "#c1a05c"
  },
  "304": {
    "coin": "IoTeX",
    "symbol": "IOTX",
    "coinType": "304",
    "color": "#00d4d5"
  },
  "308": {
    "coin": "Bitshares",
    "symbol": "BTS",
    "coinType": "308",
    "color": "#35baeb"
  },
  "313": {
    "coin": "Zilliqa",
    "symbol": "ZIL",
    "coinType": "313",
    "color": "#49c1bf"
  },
  "314": {
    "coin": "MOAC",
    "symbol": "MOAC",
    "coinType": "314",
    "color": "#000000"
  },
  "321": {
    "coin": "Rapture",
    "symbol": "RAP",
    "coinType": "321",
    "color": "#000000"
  },
  "324": {
    "coin": "eBoost",
    "symbol": "EBST",
    "coinType": "324",
    "color": "#1693d4"
  },
  "327": {
    "coin": "Commercium",
    "symbol": "CMM",
    "coinType": "327",
    "color": "#2fd2e5"
  },
  "328": {
    "coin": "Blocknet",
    "symbol": "BLOCK",
    "coinType": "328",
    "color": "#101341"
  },
  "334": {
    "coin": "Credits",
    "symbol": "CS",
    "coinType": "334",
    "color": "#262626"
  },
  "348": {
    "coin": "QLC Chain",
    "symbol": "QLC",
    "coinType": "348",
    "color": "#610089"
  },
  "354": {
    "coin": "Polkadot",
    "symbol": "DOT",
    "coinType": "354",
    "color": "#e6007a"
  },
  "355": {
    "coin": "Aeon",
    "symbol": "AEON",
    "coinType": "355",
    "color": "#134451"
  },
  "369": {
    "coin": "Asch",
    "symbol": "XAS",
    "coinType": "369",
    "color": "#faa00d"
  },
  "371": {
    "coin": "MediBloc",
    "symbol": "MED",
    "coinType": "371",
    "color": "#00b0ff"
  },
  "382": {
    "coin": "Ryo Currency",
    "symbol": "RYO",
    "coinType": "382",
    "color": "#3d58b0"
  },
  "413": {
    "coin": "Masari",
    "symbol": "MSR",
    "coinType": "413",
    "color": "#47b95c"
  },
  "414": {
    "coin": "Sumokoin",
    "symbol": "SUMO",
    "coinType": "414",
    "color": "#2d9cdb"
  },
  "415": {
    "coin": "Electroneum",
    "symbol": "ETN",
    "coinType": "415",
    "color": "#23bee2"
  },
  "425": {
    "coin": "Aion",
    "symbol": "AION",
    "coinType": "425",
    "color": "#00bfec"
  },
  "434": {
    "coin": "Kusama",
    "symbol": "KSM",
    "coinType": "434",
    "color": "#000000"
  },
  "457": {
    "coin": "æternity",
    "symbol": "AE",
    "coinType": "457",
    "color": "#de3f6b"
  },
  "461": {
    "coin": "Filecoin",
    "symbol": "FIL",
    "coinType": "461",
    "color": "#42c1ca"
  },
  "483": {
    "coin": "Bluzelle Native",
    "symbol": "BNT",
    "coinType": "483",
    "color": "#000d2b"
  },
  "494": {
    "coin": "Band",
    "symbol": "BAND",
    "coinType": "494",
    "color": "#516aff"
  },
  "495": {
    "coin": "Dropil",
    "symbol": "DROP",
    "coinType": "495",
    "color": "#242d3d"
  },
  "498": {
    "coin": "Credits",
    "symbol": "CS",
    "coinType": "498",
    "color": "#262626"
  },
  "500": {
    "coin": "Theta",
    "symbol": "THETA",
    "coinType": "500",
    "color": "#2ab8e6"
  },
  "501": {
    "coin": "Solana",
    "symbol": "SOL",
    "coinType": "501",
    "color": "#66f9a1"
  },
  "523": {
    "coin": "Edgeware",
    "symbol": "EDG",
    "coinType": "523",
    "color": "#2b1544"
  },
  "572": {
    "coin": "Saluscoin",
    "symbol": "SLS",
    "coinType": "572",
    "color": "#8e9495"
  },
  "577": {
    "coin": "NKN",
    "symbol": "NKN",
    "coinType": "577",
    "color": "#23336f"
  },
  "592": {
    "coin": "Grin",
    "symbol": "GRIN",
    "coinType": "592",
    "color": "#fff300"
  },
  "594": {
    "coin": "Dock",
    "symbol": "DOCK",
    "coinType": "594",
    "color": "#786dbc"
  },
  "633": {
    "coin": "Callchain",
    "symbol": "CALL",
    "coinType": "633",
    "color": "#fbb413"
  },
  "641": {
    "coin": "KuCoin Shares",
    "symbol": "KCS",
    "coinType": "641",
    "color": "#0093dd"
  },
  "666": {
    "coin": "Achain",
    "symbol": "ACT",
    "coinType": "666",
    "color": "#767dff"
  },
  "714": {
    "coin": "Binance",
    "symbol": "BNB",
    "coinType": "714",
    "color": "#f3ba2f"
  },
  "715": {
    "coin": "Sinovate",
    "symbol": "SIN",
    "coinType": "715",
    "color": "#f5342e"
  },
  "724": {
    "coin": "Vanillacash",
    "symbol": "XVC",
    "coinType": "724",
    "color": "#b50126"
  },
  "789": {
    "coin": "Lamden",
    "symbol": "TAU",
    "coinType": "789",
    "color": "#7b346e"
  },
  "818": {
    "coin": "VeChain Token",
    "symbol": "VET",
    "coinType": "818",
    "color": "#15bdff"
  },
  "888": {
    "coin": "NEO",
    "symbol": "NEO",
    "coinType": "888",
    "color": "#58bf00"
  },
  "889": {
    "coin": "TOMO",
    "symbol": "TOMO",
    "coinType": "889",
    "color": "#1a1f36"
  },
  "901": {
    "coin": "NxtMeta",
    "symbol": "NXT",
    "coinType": "901",
    "color": "#008fbb"
  },
  "966": {
    "coin": "Matic",
    "symbol": "MATIC",
    "coinType": "966",
    "color": "#6f41d8"
  },
  "999": {
    "coin": "Bitcoin Diamond",
    "symbol": "BCD",
    "coinType": "999",
    "color": "#fcc339"
  },
  "1010": {
    "coin": "Huobi ECO Chain",
    "symbol": "HT",
    "coinType": "1010",
    "color": "#2a3069"
  },
  "1023": {
    "coin": "HARMONY-ONE (Legacy)",
    "symbol": "ONE",
    "coinType": "1023",
    "color": "#00aee9"
  },
  "1024": {
    "coin": "Ontology",
    "symbol": "ONT",
    "coinType": "1024",
    "color": "#32a4be"
  },
  "1120": {
    "coin": "RISE",
    "symbol": "RISE",
    "coinType": "1120",
    "color": "#f49352"
  },
  "1122": {
    "coin": "CyberMiles Token",
    "symbol": "CMT",
    "coinType": "1122",
    "color": "#c1a05c"
  },
  "1155": {
    "coin": "Enjin Coin",
    "symbol": "ENJ",
    "coinType": "1155",
    "color": "#624dbf"
  },
  "1533": {
    "coin": "Beam",
    "symbol": "BEAM",
    "coinType": "1533",
    "color": "#0b76ff"
  },
  "1616": {
    "coin": "AELF",
    "symbol": "ELF",
    "coinType": "1616",
    "color": "#2b5ebb"
  },
  "1729": {
    "coin": "Tezos",
    "symbol": "XTZ",
    "coinType": "1729",
    "color": "#a6e000"
  },
  "1815": {
    "coin": "Cardano",
    "symbol": "ADA",
    "coinType": "1815",
    "color": "#0d1e30"
  },
  "1984": {
    "coin": "TurtleCoin",
    "symbol": "TRTL",
    "coinType": "1984",
    "color": "#00843d"
  },
  "1989": {
    "coin": "HOdlcoin",
    "symbol": "HODL",
    "coinType": "1989",
    "color": "#d59143"
  },
  "1991": {
    "coin": "Sia",
    "symbol": "SC",
    "coinType": "1991",
    "color": "#20ee82"
  },
  "1997": {
    "coin": "Polis",
    "symbol": "POLIS",
    "coinType": "1997",
    "color": "#2c3e50"
  },
  "1998": {
    "coin": "Monoeci",
    "symbol": "XMCC",
    "coinType": "1998",
    "color": "#dd0632"
  },
  "1999": {
    "coin": "ColossusXT",
    "symbol": "COLX",
    "coinType": "1999",
    "color": "#77c3b0"
  },
  "2000": {
    "coin": "GinCoin",
    "symbol": "GIN",
    "coinType": "2000",
    "color": "#008dde"
  },
  "2002": {
    "coin": "Miraland",
    "symbol": "MLN",
    "coinType": "2002",
    "color": "#0b1529"
  },
  "2017": {
    "coin": "Kin",
    "symbol": "KIN",
    "coinType": "2017",
    "color": "#005fff"
  },
  "2125": {
    "coin": "BitBay",
    "symbol": "BAY",
    "coinType": "2125",
    "color": "#6356ab"
  },
  "2182": {
    "coin": "Chiliz",
    "symbol": "CHZ",
    "coinType": "2182",
    "color": "#cd0124"
  },
  "2301": {
    "coin": "QTUM",
    "symbol": "QTUM",
    "coinType": "2301",
    "color": "#2e9ad0"
  },
  "2302": {
    "coin": "Metaverse",
    "symbol": "ETP",
    "coinType": "2302",
    "color": "#00a5ff"
  },
  "2305": {
    "coin": "Elastos",
    "symbol": "ELA",
    "coinType": "2305",
    "color": "#3fbadf"
  },
  "2365": {
    "coin": "Mixin",
    "symbol": "XIN",
    "coinType": "2365",
    "color": "#1eb5fa"
  },
  "2718": {
    "coin": "Nebulas",
    "symbol": "NAS",
    "coinType": "2718",
    "color": "#222222"
  },
  "5353": {
    "coin": "Handshake",
    "symbol": "HNS",
    "coinType": "5353",
    "color": "#000000"
  },
  "5757": {
    "coin": "Stacks",
    "symbol": "STX",
    "coinType": "5757",
    "color": "#5546ff"
  },
  "6688": {
    "coin": "SAFE",
    "symbol": "SAFE",
    "coinType": "6688",
    "color": "#00688c"
  },
  "7027": {
    "coin": "Ella the heart",
    "symbol": "ELLA",
    "coinType": "7027",
    "color": "#396a28"
  },
  "8000": {
    "coin": "Skycoin",
    "symbol": "SKY",
    "coinType": "8000",
    "color": "#0072ff"
  },
  "8964": {
    "coin": "NULS",
    "symbol": "NULS",
    "coinType": "8964",
    "color": "#82bd39"
  },
  "9000": {
    "coin": "Avalanche",
    "symbol": "AVAX",
    "coinType": "9000",
    "color": "#e84142"
  },
  "14001": {
    "coin": "Worldwide Asset Exchange",
    "symbol": "WAX",
    "coinType": "14001",
    "color": "#f89022"
  },
  "16754": {
    "coin": "Ardor",
    "symbol": "ARDR",
    "coinType": "16754",
    "color": "#3c87c7"
  },
  "19165": {
    "coin": "Safecoin",
    "symbol": "SAFE",
    "coinType": "19165",
    "color": "#00688c"
  },
  "19167": {
    "coin": "Flux",
    "symbol": "FLUX",
    "coinType": "19167",
    "color": "#2b61d1"
  },
  "34952": {
    "coin": "ByteTrade",
    "symbol": "BTT",
    "coinType": "34952",
    "color": "#000000"
  },
  "88888": {
    "coin": "c0ban",
    "symbol": "RYO",
    "coinType": "88888",
    "color": "#3d58b0"
  },
  "99999": {
    "coin": "Waykichain",
    "symbol": "WICC",
    "coinType": "99999",
    "color": "#5783cb"
  },
  "999999": {
    "coin": "WaltonChain",
    "symbol": "WTC",
    "coinType": "999999",
    "color": "#8200ff"
  },
  "5249353": {
    "coin": "BitcoinOre",
    "symbol": "BCO",
    "coinType": "5249353",
    "color": "#2c76b7"
  },
  "5718350": {
    "coin": "Wanchain",
    "symbol": "WAN",
    "coinType": "5718350",
    "color": "#136aad"
  },
  "5741564": {
    "coin": "Waves",
    "symbol": "WAVES",
    "coinType": "5741564",
    "color": "#0155ff"
  },
  "7567736": {
    "coin": "ION",
    "symbol": "ION",
    "coinType": "7567736",
    "color": "#57beea"
  },
  "7777777": {
    "coin": "FirmaChain",
    "symbol": "FCT",
    "coinType": "7777777",
    "color": "#417ba4"
  },
  "7825266": {
    "coin": "WGR",
    "symbol": "WGR",
    "coinType": "7825266",
    "color": "#b80000"
  }
} as const;

export type CoinTypeKeys = keyof typeof coinTypeMap;

export function  LightenDarkenColor(
  color: string,
  percent: number
) {

  let R = parseInt(color.substring(1,3),16);
  let G = parseInt(color.substring(3,5),16);
  let B = parseInt(color.substring(5,7),16);

  R = parseInt(String(R * (100 + percent) / 100));
  G = parseInt(String(G * (100 + percent) / 100));
  B = parseInt(String(B * (100 + percent) / 100));

  R = (R<255)?R:255;
  G = (G<255)?G:255;
  B = (B<255)?B:255;

  R = Math.round(R)
  G = Math.round(G)
  B = Math.round(B)

  const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}

export const getCoinTypeDetails =  (cointype: CoinTypeKeys):  CoinType  => {
  const coinTypeDetails = coinTypeMap[cointype];
  if (coinTypeDetails) {
    return {
      ...coinTypeDetails,
    }
  }
  return {
    coin: "NON",
    symbol: "NON",
    coinType: "-1",
    color: "#4b4b4b",
  };
}
