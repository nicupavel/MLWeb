var Distance = (function(Distance) { //Module start

Distance.euclidean = function(p1, p2)
{
	var d = 0;
	for (var i = 0; i < p1.length; i++)
		d += Math.pow(p2[i] - p1[i], 2);

	return Math.sqrt(d);
}

Distance.manhattan = function(p1, p2)
{
	var d = 0;
	for (var i = 0; i < p1.length ; i++)
		d += Math.abs(p2[i] - p1[i]);

	return d;
}

Distance.chebyshev = function(p1, p2)
{
	var d = 0;
	for (var i = 0; i < p1.length ; i++)
		d = Math.max(d, Math.abs(p2[i] - p1[i]));

	return d;
}
//------------------------ MODULE END ----------------------
return Distance; }(Distance || {})); //Module end