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
	//...	
	populateAllModels(automakers[currentAutomaker]);
	automakerLoaded = true;
	delete window.selectedCriteria;
}

/**
* По данному automaker, выбирает все его модели automaker.models, заполняет select элемент "модели авто",
* вызывает функцию populateModel для заполнение опций первой модели списка, либо сохраненной в cookie модели.
*/
function populateAllModels(automaker) {
	
	//...	
	populateModel(models[currentModel]);	
	
}

/**
* Заполняет select элемент years и опции коробки передач, восстанавливает параметры из window.selectedCriteria, если 
* объект определен.
*/
function populateModel(model) {
	
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
}

/**
* Срабатывает при выборе модели автомобиля, запрашивает по имени модели и имени автопроизводителя модель с сервера.
*/
function modelChanged() {
	//...	
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
	//...	
	/** Create search criteria holder object. */
	var selectedCriteria = {};
	selectedCriteria.selectedAutomaker = automakerCtrl.selectedIndex - 1;
	selectedCriteria.selectedModel = modelCtrl.selectedIndex;
	selectedCriteria.selectedYear = yearsCtrl.selectedIndex;
	selectedCriteria.selectedManual = gearboxCtrl[0].checked;
	selectedCriteria.selectedAutomatic = gearboxCtrl[1].checked;
	//...	

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
}