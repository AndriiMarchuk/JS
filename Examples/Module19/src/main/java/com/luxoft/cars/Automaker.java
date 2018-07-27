package com.luxoft.cars;

import java.util.ArrayList;
import java.util.List;

public class Automaker {

	private List<CarModel> models = new ArrayList<CarModel>();
	private String name;
	public Automaker(String name){
		this.name = name;
	}

	public List<CarModel> getModels() {
		return models;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setModels(List<CarModel> models) {
		this.models = models;
	}
}
