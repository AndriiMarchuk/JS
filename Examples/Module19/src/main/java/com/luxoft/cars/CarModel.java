package com.luxoft.cars;

public class CarModel {
	private int yearFrom = 1900;
	private int yearTo = 2099;
	private String name;
	private GearBox gearBox;

	public CarModel(String name) {
		this.name = name;
	}


	public void setYearFrom(int yearFrom) {
		this.yearFrom = yearFrom;
	}

	public void setYearTo(int yearTo) {
		this.yearTo = yearTo;
	}

	public GearBox getGearBox() {
		return gearBox;
	}

	public void setGearBox(GearBox gearBox) {
		this.gearBox = gearBox;
	}

	public int getYearFrom() {
		return yearFrom;
	}

	public int getYearTo() {
		return yearTo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
