/**
 * DOM generic functions
 *
 * http://www.linuxconsulting.ro
 * http://openpanzer.net
 *
 * Copyright (c) 2012 Nicu Pavel
 * Licensed under the GPL license:
 * http://www.gnu.org/licenses/gpl.html
 */

// Get the element with ID id
function $(id)
{
	return document.getElementById(id);
}

//can be called with a id string or a element object directly
//return pointer to the newly created tag
function addTag(parent, tag)
{
	var e;
	var t = document.createElement(tag);

	if (typeof(parent) === 'string') {	e = $(parent); }
	else {e = parent;}

	if (e !== null)
		e.appendChild(t);

	return t;
}

//insert a a tag before a child element if child is null is placed at the end of node list
function insertTag(parent, tag, child)
{
	var e, c;
	var t = document.createElement(tag);

	if (typeof(parent) === 'string') { e = $(parent); }
	else { e = parent; }

	if (typeof(child) === 'string') { c = $(child); }
	else { c = child; }


	if (e !== null)
		e.insertBefore(t, c);

	return t;
}

//remove a DOM tag
function delTag(tag)
{
	if (tag && tag.parentNode)
		tag.parentNode.removeChild(tag);
}

//remove all children of a tag
function clearTag(tag)
{
	var t;
	if (typeof(tag) === 'string') {	t = $(tag); }
	else {t = tag;}

	while (t && t.hasChildNodes())
		t.removeChild(t.lastChild);
}

//Function to disable/enable right click
function toggleRightClick( status )
{
	window.oncontextmenu = function() { return status; }
}