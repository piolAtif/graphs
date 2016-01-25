var graphs = {};

var totalLength = function(path){
	var length = 0;
	path.forEach(function(edge){
		length += edge.length;
	});
	return length;
};

var minWeightedPath = function(prevPath, path){
	if(!prevPath) return true;
	return totalLength(prevPath) > totalLength(path);
}

graphs.WeightedGraph = function(){
	this.graph = {};
	this.addVertex = function(vertex){
		this.graph[vertex] = [];
	};

	this.addEdge = function(edge){
		this.graph[edge.from].push(edge);
	};

	this.shortestPath = function(from, to, visiting){
		var visiting = visiting || [];
		if(from == to)
			return visiting;
		for(var index in this.graph[from]){
			var vertex = this.graph[from][index].to;
			var path = this.shortestPath(vertex, to, visiting.concat(this.graph[from][index]));
			if(path[path.length-1].to == to && minWeightedPath(shortestPath, path))
				var shortestPath = path;
		}
		return shortestPath;
	};
};

graphs.Edge = function(edge, from, to, lengthBetweenNode){
	this.edge = edge;
	this.from = from;
	this.to = to;
	this.length = lengthBetweenNode;
};

module.exports = graphs;