function KMeansData(wantedClusters)
{
	this.k = wantedClusters;
	this.centers = [];
	this.clusters = [];
	this.colors = [];
}

KMeansData.prototype.copy = function(d)
{
	if (d === null) return;

	tmp = JSON.parse(JSON.stringify(d)); //deep copy

	this.k = tmp.k;
	this.centers = tmp.centers;
	this.clusters = tmp.clusters;
	this.colors = tmp.colors;
}

function KMeans(wantedClusters, distanceFunction)
{
	this.clustersData = new KMeansData(wantedClusters);
	this.distance = distanceFunction;
	this.DEBUG = false;
}

KMeans.prototype.addToCluster = function(point)
{
	var minDistance = Infinity;
	var clusterIndex = 0;

	for (var i = 0; i < this.clustersData.centers.length; i++) {
		var d = this.distance(point, this.clustersData.centers[i]);
		if (d < minDistance) {
			minDistance = d;
			clusterIndex = i;
		}
	}
	return clusterIndex;
}

KMeans.prototype.assignColors = function()
{
	for (var i = 0; i < this.clustersData.k; i++)
		this.clustersData.colors.push([
			Math.floor(Math.random() * 255),
			Math.floor(Math.random() * 255),
			Math.floor(Math.random() * 255)
		])
}

KMeans.prototype.generateRandomCenters = function(points)
{
	var centers = points.slice(0); // copy

	centers.sort(function() {
		return (Math.round(Math.random()) - 0.5);
	});

	return centers.slice(0, this.clustersData.k);
}

KMeans.prototype.clear = function()
{
	this.clustersData = new KMeansData(0);
}

KMeans.prototype.cluster = function(points, delay, callback) {

	this.clustersData.centers = this.generateRandomCenters(points);
	this.assignColors();

	var assignment = new Array(points.length);
	var clusters = new Array(this.clustersData.k);

	var runs = 1;
	var isChanging = true;

	//Send initial random centers
	if (callback)
	{
		(function(d){
			setTimeout(function(){ callback(d)}, delay * 1000 * runs);
		})(JSON.parse(JSON.stringify(this.clustersData)));
	}

	console.log("KMeans: Clustering data");

	while (isChanging)
	{
		//Assign each point to the nearest cluster center
		for (var i = 0; i < points.length; i++)
		{
			assignment[i] = this.addToCluster(points[i]);
			if (this.DEBUG)
				console.log("KMeans: (%d, %d) added to cluster %d", points[i][0], points[i][1], assignment[i]);
		}

		isChanging = false;

		//Calculate and set the new locations for each cluster center
		for (var j = 0; j < this.clustersData.k; j++)
		{
			var assigned = [];
			for (var i = 0; i < assignment.length; i++)
				if (assignment[i] == j)
					assigned.push(points[i]);

			//If no assigned points for this cluster skip center calculations
			if (!assigned.length)
				continue;

			var currentCenter = this.clustersData.centers[j];
			var newCenter = new Array(currentCenter.length);
			
			//Project each attribute and calculate the mean
			for (var p = 0; p < currentCenter.length; p++)
			{
				var sum = 0;
				for (var i = 0; i < assigned.length; i++)
					sum += assigned[i][p];

				newCenter[p] = sum / assigned.length;

				if (newCenter[p] != currentCenter[p])
				{
					isChanging = true;
					if (this.DEBUG)
						console.log("New center %d: (%o) old: (%o)", j, newCenter, currentCenter);
				}
			}

			this.clustersData.centers[j] = newCenter;
			clusters[j] = assigned;
			this.clustersData.clusters = clusters;
		}

		runs++;

		if (callback)
		{
			(function(d){
				setTimeout(function(){ callback(d)}, delay * 1000 * runs);
			})(JSON.parse(JSON.stringify(this.clustersData)));
		}
	}

	return clusters;
}
