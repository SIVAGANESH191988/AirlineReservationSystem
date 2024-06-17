package com.example.airline.repository;

import com.example.airline.entity.Localization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocalizationRepository extends JpaRepository<Localization, Integer> {
}
