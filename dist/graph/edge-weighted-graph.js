"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeWeightGraph = void 0;
const io_1 = require("../io");
class Edge {
    constructor(v, w, weight) {
        this.v = v;
        this.w = w;
        this.weight = weight;
    }
    either() {
        return this.v;
    }
    other() {
        return this.w;
    }
    getWeight() {
        return this.weight;
    }
    compareTo(b) {
        throw new Error("Method not implemented.");
    }
}
class EdgeWeightGraph {
    constructor(V) {
        this.V = V;
        this.adj = new Map();
        this.E = 0;
    }
    addEdge(e) {
        var _a, _b;
        let v = e.either(), w = e.other();
        if (!this.adj.has(v)) {
            this.adj.set(v, [e]);
        }
        else {
            (_a = this.adj.get(v)) === null || _a === void 0 ? void 0 : _a.push(e);
        }
        if (!this.adj.has(w)) {
            this.adj.set(w, [e]);
        }
        else {
            (_b = this.adj.get(w)) === null || _b === void 0 ? void 0 : _b.push(e);
        }
        this.E++;
    }
    getAdj(k) {
        return this.adj.get(k);
    }
}
exports.EdgeWeightGraph = EdgeWeightGraph;
;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield (0, io_1.readline)('data/tinyEWG.txt');
        if (data.length == 0)
            throw new Error('can not read file');
        let V = parseInt(data.shift());
        let E = parseInt(data.shift());
        let weight_graph = new EdgeWeightGraph(V);
        for (let line of data) {
            let [v, w, weight] = line.split(" ").map(e => parseFloat(e));
            weight_graph.addEdge(new Edge(v, w, weight));
        }
        console.log(weight_graph);
    });
});
