package com.luxoft.cars;

import java.util.ArrayList;
import java.util.List;

public class CarDatabase {
	List<Automaker> automakers = new ArrayList<Automaker>();
	public CarDatabase() {
		populateCarDataBase();
	}
	private void populateCarDataBase() {
		Automaker toyota = new Automaker("Toyota");
		CarModel corolla = new CarModel("Corolla");
		corolla.setYearFrom(1985);
		corolla.setYearTo(2007);
		corolla.setGearBox(GearBox.BOTH);
		toyota.getModels().add(corolla);
		
		CarModel camry = new CarModel("Camry");
		camry.setYearFrom(2000);
		camry.setYearTo(2009);
		camry.setGearBox(GearBox.AUTOMATIC);
		toyota.getModels().add(camry);
		
		Automaker vaz = new Automaker("BA3");
		CarModel vaz2110 = new CarModel("2110");
		vaz2110.setYearFrom(1990);
		vaz2110.setYearTo(2009);
		vaz2110.setGearBox(GearBox.MANUAL);
		vaz.getModels().add(vaz2110);		
		
		this.automakers.add(toyota);
		this.automakers.add(vaz);
	}
	public List<Automaker> getAutomakers() {
		return automakers;		
	}
	
	public Automaker getAutomaker(String automakerName) {
		for (Automaker automaker : automakers) {
			if (automaker.getName().equals(automakerName)) {
				return automaker;
			}
				
		}
		return null;		
	}
	
	public CarModel getModel(String automakerName, String modelName) {
		for (Automaker automaker : automakers) {
			if (automaker.getName().equals(automakerName)) {
				return getModelByAutomaker(modelName, automaker);
			}
				
		}
		return null;		
	}
	private CarModel getModelByAutomaker(String modelName, Automaker automaker) {
		for (CarModel carModel : automaker.getModels()) {
			if (carModel.getName().equals(modelName)) {
				return carModel;
			}
		}
		return null;
	}
	
	public List<String> getAutomakers1() {
		List<String> s = new ArrayList<String>();
		s.add("sss");
		s.add("jjj");
		return s;		
	}
}
