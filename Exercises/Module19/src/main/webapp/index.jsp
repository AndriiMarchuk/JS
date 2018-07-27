<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<meta name="description" content="" />
<meta name="keywords" content="" />
<link rel="stylesheet" href="styles/main.css" type="text/css"
	media="screen,projection" />
<title>Ajax Demo:</title>
<script type='text/javascript' src='dwr/interface/DwrService.js'></script>
<script type='text/javascript' src='dwr/engine.js'></script>
<script type='text/javascript' src='dwr/util.js'></script>
<script type='text/javascript' src='scripts/ajaxdemo-script.js'></script>
<script type='text/javascript' src='scripts/cars.js'></script>
<script type='text/javascript' src='scripts/json.js'></script>
<script type='text/javascript' src='scripts/cookie.js'></script>
</head>

<body onload="restoreCriteria()">
<div id="container">
<form action="" name="carfilter">
<span class="carLabel">Reset saved search criteria information: </span> <input id="resetCriteriaBtn" type="button"
	onclick="resetSavedCriteria()" value="Reset" />
<hr>
<div id="searchCriteria">
<div class="criteriaName">Select automaker:</div>
<select name="automaker" onchange="automakerChanged()"	onfocus="automakerSelected()">
	<option disabled="true" selected="selected">Select auto maker</option>
</select>

<div class="criteriaName">Select model:</div>
<select name="model" onchange="modelChanged()">

</select>

<div class="criteriaName">Select year from:</div>
<select name="years">
</select>
<div class="criteriaName">Select gear box:</div>
<input type="checkbox" name="gearbox" value="MANUAL">Manual</input> <input
	type="checkbox" name="gearbox" value="AUTOMATIC">Automatic</input></div>
<input id="submitCriteriaBtn" type="button" disabled="disabled"
	onclick="customSubmit()" value="Submit to sever" name="submitBtn" />
</form>
<div id="searchCriteriaInput"></div>
</div>
</body>
</html>
