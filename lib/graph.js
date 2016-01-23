//==========================================Directed Graph ===========================================//

exports.DirectedGraph = function(){
	this.dirGraph = {};

	this.addVertex = function(vertex){
		this.dirGraph[vertex] = [];
	};

	this.addEdge = function(from, to){
		this.dirGraph[from].push(to);
	};

	this.hasEdgeBetween = function(from, to){
		return (this.dirGraph[from].indexOf(to) != -1);
	};

	this.order = function(){
		return Object.keys(this.dirGraph).length;
	};

	this.size = function(){
		var length = 0;
		for(var i in this.dirGraph){
			length +=this.dirGraph[i].length;
		}
		return length;
	};

	this.pathBetween = function(from, to, visiting){
		var visiting = visiting ||[];
		if(visiting.length == 0)
			visiting = visiting.concat(from);
		if(from == to)
			return visiting;	
		for(var index in this.dirGraph[from]){
			var vertex = this.dirGraph[from][index];
			if(visiting.indexOf(vertex) == -1)
				var path =  this.pathBetween(vertex, to, visiting.concat(vertex));
		}
		if(path)
			return path;		
		return [];
	};

	this.farthestVertex = function(from){
		var vertex;
		for(var index in this.dirGraph[from]){
			vertex = this.dirGraph[from][index];
			return this.farthestVertex(vertex);
		}
		if(!vertex)
			return from;
	};
};

//===========================================Undirected graph==============================================//

exports.UndirectedGraph = function(){
	this.uniGraph = {};

	this.addVertex = function(vertex){
		this.uniGraph[vertex] = [];
	};

	this.addEdge = function(from, to){
			this.uniGraph[from].push(to);
			if(this.uniGraph[to] == undefined)
				this.uniGraph[to] = [];
			this.uniGraph[to].push(from);
	};

	this.hasEdgeBetween = function(from, to){
		return (this.uniGraph[from].indexOf(to) != -1);
	};

	this.order = function(){
		return Object.keys(this.uniGraph).length;
	};

	this.size = function(){
		var length = 0;
		for(var i in this.uniGraph){
			length += this.uniGraph[i].length;
		} 
		return length/2;
	};

	this.pathBetween = function(from, to, visiting){
		var visiting = visiting ||[];
		if(visiting.length == 0)
			visiting.push(from);
		if(visiting.indexOf(to)>=0)
			return visiting;	
		for(var index in this.uniGraph[from]){
			var vertex = this.uniGraph[from][index];
			if(visiting.indexOf(vertex) == -1)
				var path =  this.pathBetween(vertex, to, visiting.concat(vertex));
		}
		if(path)
			return path;
		return [];
	};

	this.farthestVertex = function(from, visiting){
		var visiting = visiting || [];
		if(visiting.length == 0)
			visiting.push(from);
		for(var i in this.uniGraph[from]){
			var vertex = this.uniGraph[from][i];
			if(visiting.indexOf(vertex) == -1)
				return this.farthestVertex(vertex, visiting.concat(vertex));
		}
			return from;
	};
	this.allPaths = function(from ,to, visiting, mulPath){
		var visiting = visiting ||[];
		var mulPath = mulPath || [];
		if(visiting.length == 0)
			visiting.push(from);
		else if(visiting.indexOf(to)>=0){
			mulPath.push(visiting);
			return visiting;	
		}
		for(var index in this.uniGraph[from]){
			var vertex = this.uniGraph[from][index];
			if(visiting.indexOf(vertex) == -1)
				var path =  this.allPaths(vertex, to, visiting.concat(vertex),mulPath);
		}
		return mulPath;
	};
};
