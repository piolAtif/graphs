exports.DirectedGraph = function(){
	this.graph = {};
	this.addVertex = function(vertex){
		this.graph[vertex] = [];
	};
	this.addEdge = function(from, to){
		this.graph[from].push(to);
	}
	this.hasEdgeBetween = function(from, to){
		return (this.graph[from].indexOf(to) != -1);
	};
	this.order = function(){
		return Object.keys(this.graph).length;
	};
	this.size = function(){
		var length = 0;
		for(var i in this.graph){
			length +=this.graph[i].length;
		}
		return length;
	};
};
