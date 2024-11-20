package model

type ReservationDeleteInput struct {
	Id string `uri:"id" binding:"required"`
}
