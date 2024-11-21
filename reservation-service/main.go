package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"main.go/database"
	"main.go/model"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func loadDatabase() {
	database.Connect()
	database.Database.AutoMigrate(&model.Reservation{})

}

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")

	}
}

func createReservation(context *gin.Context) {
	fmt.Println("Received reservation creation request")
	var input model.ReservationInput

	if err := context.ShouldBindJSON(&input); err != nil {
			fmt.Printf("Error binding JSON: %v\n", err)
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
	}

	reservation := model.Reservation{
		UserId:     input.UserId,
		ActivityId: input.ActivityId,
	}

	createdReservation, err := reservation.Save()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"Reservation created": createdReservation})
}

func deleteReservation(context *gin.Context) {
	var input model.ReservationDeleteInput

	if err := context.ShouldBindUri(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	convertedInput, err := strconv.ParseUint(input.Id, 10, 64)
	if err != nil {
		fmt.Println(err)
	}
	id := uint(convertedInput)
	fmt.Println(id)

	reservation := model.Reservation{
		Id: id,
	}

	message, err := reservation.DeleteReservation()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, message)
}

func healthCheck(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{"status": "OK"})
}

func main() {
	loadEnv()
	loadDatabase()
	engine := gin.New()
	engine.Use(gin.Logger())
	engine.Use(gin.Recovery())
	fmt.Println("Setting up routes...")
	engine.GET("/health", healthCheck)
	engine.POST("/reservations", createReservation)
	engine.DELETE("/reservations/:id", deleteReservation)
	fmt.Println("Server starting on port 3003...")
	engine.Run(":3003")
}
