package model

type ReservationInput struct {
	UserId     string `json:"userId" binding:"required"`
	ActivityId string `json:"activityId" binding:"required"`
}
