package com.siva.AirlineReservationSystem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "UserPreferences")
public class UserPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userID;

    private String mealPreference;
    private String specialAssistance;
    private String frequentFlyerNumber;
	public int getUserID() {
		return userID;
	}
	public void setUserID(int userID) {
		this.userID = userID;
	}
	public String getMealPreference() {
		return mealPreference;
	}
	public void setMealPreference(String mealPreference) {
		this.mealPreference = mealPreference;
	}
	public String getSpecialAssistance() {
		return specialAssistance;
	}
	public void setSpecialAssistance(String specialAssistance) {
		this.specialAssistance = specialAssistance;
	}
	public String getFrequentFlyerNumber() {
		return frequentFlyerNumber;
	}
	public void setFrequentFlyerNumber(String frequentFlyerNumber) {
		this.frequentFlyerNumber = frequentFlyerNumber;
	}

   
}
