/**
* Вызывается при начальной активации элемента select.
*/
function automakerSelected() {
	if (!window.automakerLoaded) {
		populateAutomakersSelectElement();
	}
}

/**
* Вызывается при начальной активации элемента select, а также при восстановлении поискового критерия из cookie.
*/
function populateAutomakersSelectElement() {
	DwrService.getAutomakers(getAllAutomakersCallback);
	return false;          
} 

/**
* Callback функция, срабарывает асинхронно при получении списка объектов Automaker с сервера.<b>
* Заполняет элемент select автопроизводителей, а также модели автопроизводителя. В случае, если объект window.selectedCriteria,
* содержащий сохраненные параметры предыдущего запроса определен, использует его для восстановления критерия.
*/
function getAllAutomakersCallback(automakers){	
	var automaker = document.carfilter.automaker;	
	
	for(var i=0;i< automakers.length;i++) {
		var automakerName = automakers[i].name;		
		var opt = new Option(automakerName, automakerName, false, false);
		automaker.options[automaker.options.length] = opt;
	}	
	
	var currentAutomaker = 0;
	
	if (window.selectedCriteria) {
		currentAutomaker = window.selectedCriteria.selectedAutomaker;
	}
	
	automaker.selectedIndex = currentAutomaker + 1;
	
	populateAllModels(automakers[currentAutomaker]);
	automakerLoaded = true;
	delete window.selectedCriteria;
}

/**
* По данному automaker, выбирает все его модели automaker.models, заполняет select элемент "модели авто",
* вызывает функцию populateModel для заполнение опций первой модели списка, либо сохраненной в cookie модели.
*/
function populateAllModels(automaker) {
	var modelSelectCtrl = document.carfilter.model;
	var models = automaker.models;
	modelSelectCtrl.length = 0;
	for(var i=0;i< models.length;i++) {	
		var modelName = models[i].name;			
		var opt = new Option(modelName, modelName, false, false);
		modelSelectCtrl.options[modelSelectCtrl.options.length] = opt;
	}
	
	var currentModel = 0;
	
	if (window.selectedCriteria) {
		currentModel = window.selectedCriteria.selectedModel;
	}
	modelSelectCtrl.selectedIndex = currentModel;
		
	populateModel(models[currentModel]);
	
	document.carfilter.submitBtn.disabled = false;
}

/**
* Заполняет select элемент years и опции коробки передач, восстанавливает параметры из window.selectedCriteria, если 
* объект определен.
*/
function populateModel(model) {
	//populate years:
	var yearsCtrl = document.carfilter.years;
	var yearFrom = model.yearFrom;
	var yearTo = model.yearTo;
	yearsCtrl.length = 0;
	var counter = 0;
	for (var i = yearFrom; i<= yearTo; i++) {
		var opt = new Option(yearFrom + counter, yearFrom + counter, false, false);
		counter++;
		yearsCtrl.options[yearsCtrl.options.length] = opt;
	}
	
	var currentYear = 0;
	
	if (window.selectedCriteria) {
		currentYear = window.selectedCriteria.selectedYear;
	}
	yearsCtrl.selectedIndex = currentYear;
	
	//disable all gear box selector:
	var gearboxCtrl = document.carfilter.gearbox;
	for (var i = 0; i< gearboxCtrl.length; i++) {
		gearboxCtrl[i].disabled = true;		
		gearboxCtrl[i].checked = false;	
	}
	
	if (model.gearBox == 'BOTH') {
		for (var i = 0; i< gearboxCtrl.length; i++) {
			gearboxCtrl[i].disabled = false;		
		}
	} else if (model.gearBox == 'AUTOMATIC') {
		gearboxCtrl[1].disabled = false;	
	} else if (model.gearBox == 'MANUAL') {
		gearboxCtrl[0].disabled = false;	
	}
	
	if (window.selectedCriteria) {
		gearboxCtrl[0].checked = window.selectedCriteria.selectedManual; 
		gearboxCtrl[1].checked = window.selectedCriteria.selectedAutomatic;
	}
}

/**
* Запрашивает с сервера объект Automaker при изменении текущего производителя для обновления списка моделей выбранного автопроизводителя.
*/
function automakerChanged() {
	var automaker = document.carfilter.automaker;
	var selectedAutomakerName = automaker.options[automaker.selectedIndex].value;
	DwrService.getAutomaker(selectedAutomakerName, getAutomakerCallback);
}

function getAutomakerCallback(automaker) {
	if (automaker) {
		populateAllModels(automaker);
	}
}

/**
* Срабатывает при выборе модели автомобиля, запрашивает по имени модели и имени автопроизводителя модель с сервера.
*/
function modelChanged() {
	var automaker = document.carfilter.automaker;
	var selectedAutomakerName = automaker.options[automaker.selectedIndex].value;
	
	var modelCtrl = document.carfilter.model;
	var selectedModelName = modelCtrl.options[modelCtrl.selectedIndex].value;
	DwrService.getModel(selectedAutomakerName, selectedModelName, getModelCallback);
}

function getModelCallback(model) {
	populateModel(model);
}

/**
* Сохраняет текущий поисковый критерий в cookie. Сookie хранится 10 дней. 
* Параметры текущего поискового критерия сохраняются в объекте, которой преобразуется в строку используя 
* JSON.stringify() и сохраняется в cookie.<b>
* Параметры введенного поискового критерия выводятся в виде таблицы. Таблица исчезает через 3 секунды.
*/
function customSubmit() {
	/** Get contols. */
	var automakerCtrl = document.carfilter.automaker;
	var modelCtrl = document.carfilter.model;
	var yearsCtrl = document.carfilter.years;
	var gearboxCtrl = document.carfilter.gearbox;
	
	/** Create search criteria holder object. */
	var selectedCriteria = {};
	selectedCriteria.selectedAutomaker = automakerCtrl.selectedIndex - 1;
	selectedCriteria.selectedModel = modelCtrl.selectedIndex;
	selectedCriteria.selectedYear = yearsCtrl.selectedIndex;
	selectedCriteria.selectedManual = gearboxCtrl[0].checked;
	selectedCriteria.selectedAutomatic = gearboxCtrl[1].checked;
	
	/** Set the holder to cookie. */
	setCookie("selectedCriteria", JSON.stringify(selectedCriteria), 10);
	
	var searchCriteriaInputDiv = document.getElementById("searchCriteriaInput");
	
	var gearBoxCriteria = "";
	if (gearboxCtrl[0].checked) {
		gearBoxCriteria = gearboxCtrl[0].value + " ";
	}
	if (gearboxCtrl[1].checked) {
		gearBoxCriteria = gearboxCtrl[1].value + " ";
	}
	var str = "<table border='1'><tr>" + "<td>Automaker</td><td>" + automakerCtrl.value + "</td></tr>" +
	  "<tr>" + "<td>Automaker</td><td>" + automakerCtrl.value + "</td></tr>" + 
	  "<tr>" + "<td>Model</td><td>" + modelCtrl.value + "</td></tr>" + 
	  "<tr>" + "<td>Year from</td><td>" + yearsCtrl.value + "</td></tr>" +
	  "<tr>" + "<td>Gear box</td><td>" + gearBoxCriteria + "</tr>" +
	  "</table>";	  
	searchCriteriaInputDiv.innerHTML = str;
	
	window.setTimeout(function() {
			var searchCriteriaInputDiv = document.getElementById("searchCriteriaInput");
			searchCriteriaInputDiv.innerHTML = "";
		}, 3000);
}

/**
* Восстанавливает поисковый критерий из cookie.
*/
function restoreCriteria() {
	var readCookie = getCookie("selectedCriteria"); 
	if (readCookie) {
		window.selectedCriteria = JSON.parse(readCookie);
		populateAutomakersSelectElement();
	}
}

/**
* Удаляет информацию о сохраненном поисковом критерии из cookie.
*/
function resetSavedCriteria() {
	deleteCookie("selectedCriteria");		
}