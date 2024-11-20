package model

import (
	"gorm.io/gorm"
	"main.go/database"
)

type Reservation struct {
	gorm.Model
	Id         uint   `json:"id" gorm:"unique;primaryKey;autoIncrement"`
	UserId     string `gorm:"size:255;not null;" json:"userId"`
	ActivityId string `gorm:"size:255;not null;" json:"activityId"`
}

func (reservation *Reservation) Save() (*Reservation, error) {
	err := database.Database.Create(&reservation).Error
	if err != nil {
		return &Reservation{}, err
	}
	return reservation, nil
}

func (reservation *Reservation) DeleteReservation() (string, error) {
	err := database.Database.Delete(&Reservation{}, reservation.Id).Error
	if err != nil {
		var message = "Suppression échouée"
		return message, err
	}
	return "Réservation supprimée", nil
}
