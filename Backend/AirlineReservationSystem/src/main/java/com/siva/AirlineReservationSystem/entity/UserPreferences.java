package com.siva.AirlineReservationSystem.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "UserPreferences")
public class UserPreferences {

    @Id
    @Column(name = "UserID")
    private Long userID;

    @Column(name = "MealPreference")
    private String mealPreference;

    @Column(name = "SpecialAssistance")
    private String specialAssistance;

    @Column(name = "FrequentFlyerNumber")
    private String frequentFlyerNumber;

    @OneToOne
    @JoinColumn(name = "UserID")
    private User user; // Corrected mappedBy property

    // Constructors, getters, setters
    // Omitted for brevity

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
