import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { JustaName } from '@justaname.id/sdk';
import { useAccount, useSignMessage } from 'wagmi';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

function _array_like_to_array$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$1(arr) {
    if (Array.isArray(arr)) return arr;
}
function asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator$3(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property$1(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array_limit$1(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread$1(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property$1(target, key, source[key]);
        });
    }
    return target;
}
function _sliced_to_array$1(arr, i) {
    return _array_with_holes$1(arr) || _iterable_to_array_limit$1(arr, i) || _unsupported_iterable_to_array$1(arr, i) || _non_iterable_rest$1();
}
function _unsupported_iterable_to_array$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$1(o, minLen);
}
function _ts_generator$3(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var defaultRoutes = {
    claimSubnameRoute: "/api/subnames/claim",
    checkSubnameAvailabilityRoute: "/api/subnames/available",
    requestChallengeRoute: "/api/request-challenge"
};
var JustaNameContext = /*#__PURE__*/ React.createContext({
    justaname: null,
    routes: defaultRoutes,
    chainId: 1
});
var JustaNameProvider = function(param) {
    var children = param.children, routes = param.routes, _param_chainId = param.chainId, chainId = _param_chainId === void 0 ? 1 : _param_chainId, _param_backendUrl = param.backendUrl, backendUrl = _param_backendUrl === void 0 ? "" : _param_backendUrl;
    var _React_useState = _sliced_to_array$1(React.useState(null), 2), justaname = _React_useState[0], setJustaName = _React_useState[1];
    React.useEffect(function() {
        var main = function() {
            var _ref = _async_to_generator$3(function() {
                var justaname;
                return _ts_generator$3(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            return [
                                4,
                                JustaName.init({})
                            ];
                        case 1:
                            justaname = _state.sent();
                            setJustaName(justaname);
                            return [
                                2
                            ];
                    }
                });
            });
            return function main() {
                return _ref.apply(this, arguments);
            };
        }();
        main();
    }, []);
    return /*#__PURE__*/ jsx(JustaNameContext.Provider, {
        value: {
            backendUrl: backendUrl,
            chainId: chainId,
            justaname: justaname,
            routes: _object_spread$1({}, defaultRoutes, routes)
        },
        children: children
    });
};
var useJustaName = function() {
    var context = React.useContext(JustaNameContext);
    if (!context) {
        throw new Error("useJustaName must be used within a JustaNameProvider");
    }
    return context;
};

function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var useMounted = function() {
    var _React_useState = _sliced_to_array(React.useState(false), 2), mounted = _React_useState[0], setMounted = _React_useState[1];
    React.useEffect(function() {
        setMounted(true);
    }, []);
    return mounted;
};

function asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator$2(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator$2(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var buildAccountSubnamesKey = function(address) {
    return [
        "WALLET_SUBNAMES_BY_ADDRESS",
        address
    ];
};
var useAccountSubnames = function() {
    var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var mounted = useMounted();
    var queryClient = useQueryClient();
    var address = useAccount().address;
    var _useJustaName = useJustaName(), justaname = _useJustaName.justaname, chainId = _useJustaName.chainId;
    var query = useQuery({
        queryKey: buildAccountSubnamesKey(address),
        queryFn: /*#__PURE__*/ _async_to_generator$2(function() {
            var subnames;
            return _ts_generator$2(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            justaname === null || justaname === void 0 ? void 0 : justaname.subnames.getAllByAddress({
                                address: address,
                                isClaimed: true,
                                coinType: 60,
                                chainId: chainId
                            })
                        ];
                    case 1:
                        subnames = _state.sent();
                        subnames === null || subnames === void 0 ? void 0 : subnames.forEach(function(subname) {
                            queryClient.setQueryData(buildAccountSubnamesKey(subname.subname), subname);
                        });
                        if (props.ensDomain) {
                            return [
                                2,
                                subnames === null || subnames === void 0 ? void 0 : subnames.filter(function(subname) {
                                    return subname.subname.endsWith(".".concat(props.ensDomain));
                                })
                            ];
                        }
                        return [
                            2,
                            subnames
                        ];
                }
            });
        }),
        enabled: Boolean(mounted) && Boolean(address) && Boolean(justaname)
    });
    var _query_data;
    return {
        subnames: (_query_data = query.data) !== null && _query_data !== void 0 ? _query_data : [],
        isLoading: query.isLoading,
        refetchSubnames: query.refetch
    };
};

var useIsSubnameAvailable = function(props) {
    var _useJustaName = useJustaName(), justaname = _useJustaName.justaname, chainId = _useJustaName.chainId;
    var username = props.username, ensDomain = props.ensDomain;
    var query = useQuery({
        queryKey: [
            "IS_SUBNAME_AVAILABLE",
            username
        ],
        queryFn: function() {
            return justaname === null || justaname === void 0 ? void 0 : justaname.subnames.checkSubnameAvailable({
                subname: username + "." + ensDomain,
                chainId: chainId
            });
        },
        enabled: Boolean(username) && Boolean(justaname) && Boolean(chainId)
    });
    return {
        isAvailable: query.data,
        isLoading: query.isLoading
    };
};

function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
var useMountedAccount = function() {
    var isMounted = useMounted();
    var account = useAccount();
    return _object_spread_props(_object_spread({}, account), {
        isConnected: isMounted && account.isConnected
    });
};

function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator$1(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator$1(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var useSubnameSignature = function() {
    var address = useMountedAccount().address;
    var signMessageAsync = useSignMessage().signMessageAsync;
    var _useJustaName = useJustaName(), backendUrl = _useJustaName.backendUrl, routes = _useJustaName.routes;
    var mutation = useMutation({
        mutationFn: /*#__PURE__*/ _async_to_generator$1(function() {
            var response, data, signature;
            return _ts_generator$1(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!address) {
                            throw new Error("No address found");
                        }
                        return [
                            4,
                            fetch(backendUrl + routes.requestChallengeRoute + "?address=".concat(address), {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                        ];
                    case 1:
                        response = _state.sent();
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return [
                            4,
                            response.json()
                        ];
                    case 2:
                        data = _state.sent();
                        return [
                            4,
                            signMessageAsync({
                                message: data.challenge,
                                account: address
                            })
                        ];
                    case 3:
                        signature = _state.sent();
                        if (!signature) {
                            throw new Error("Message not signed");
                        }
                        return [
                            2,
                            {
                                signature: signature,
                                message: data.challenge,
                                address: address
                            }
                        ];
                }
            });
        })
    });
    return {
        subnameSignature: mutation.mutateAsync,
        subnameSignaturePending: mutation.isPending
    };
};

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var useClaimSubname = function() {
    var _useJustaName = useJustaName(), backendUrl = _useJustaName.backendUrl, routes = _useJustaName.routes;
    var address = useMountedAccount().address;
    var subnameSignature = useSubnameSignature().subnameSignature;
    var refetchSubnames = useAccountSubnames().refetchSubnames;
    var mutate = useMutation({
        mutationFn: function() {
            var _ref = _async_to_generator(function(params) {
                var signature, response, data;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            if (!address) {
                                throw new Error("No address found");
                            }
                            return [
                                4,
                                subnameSignature()
                            ];
                        case 1:
                            signature = _state.sent();
                            return [
                                4,
                                fetch(backendUrl + routes.claimSubnameRoute, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        username: params.username,
                                        signature: signature.signature,
                                        address: address,
                                        message: signature.message
                                    })
                                })
                            ];
                        case 2:
                            response = _state.sent();
                            if (!response.ok) {
                                throw new Error("Network response was not ok");
                            }
                            return [
                                4,
                                response.json()
                            ];
                        case 3:
                            data = _state.sent();
                            refetchSubnames();
                            return [
                                2,
                                data
                            ];
                    }
                });
            });
            return function(params) {
                return _ref.apply(this, arguments);
            };
        }()
    });
    return {
        claimSubname: mutate.mutateAsync,
        claimSubnamePending: mutate.isPending
    };
};

var buildSubnameBySubnameKey = function(subname) {
    return [
        "SUBNAME_BY_SUBNAME",
        subname
    ];
};
var useSubname = function(props) {
    var _useJustaName = useJustaName(), justaname = _useJustaName.justaname, chainId = _useJustaName.chainId;
    var query = useQuery({
        queryKey: buildSubnameBySubnameKey(props.subname),
        queryFn: function() {
            return justaname === null || justaname === void 0 ? void 0 : justaname.subnames.getBySubname({
                subname: props.subname,
                chainId: chainId
            });
        },
        enabled: Boolean(justaname) && Boolean(props.subname)
    });
    return {
        subname: query.data,
        isLoading: query.isLoading,
        refetchSubname: query.refetch
    };
};

export { JustaNameProvider, buildAccountSubnamesKey, buildSubnameBySubnameKey, defaultRoutes, useAccountSubnames, useClaimSubname, useIsSubnameAvailable, useJustaName, useMounted, useSubname, useSubnameSignature };
