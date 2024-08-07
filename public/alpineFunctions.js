document.addEventListener('alpine:init', () => {
    Alpine.data('functions', () => {
        return {
            port: 3365,
            carsData: [],
            regNumber: '',
            carMake: '',
            carModel: '',
            carColor: '',
            selectedCar : {},
            showPaarlData: false,
            showBellvilleData: false,
            showStellenboschData: false,
            showMalmesburyData: false,
            showKuilsriverData: false,
            showCapetownData: false,
            loadData: true,
            showOtherPlacesData: false,
            search:false,
            remove: false,
            update: false,


            async getCarsAPI() {
                try {
                    const response = await axios.get(`http://localhost:${this.port}/cars/carsData`);
                    return response.data;
                } catch (error) {
                    console.error('Error fetching cars data:', error);
                    return [];
                }
            },

            async loadCarsData() {
                this.carsData = await this.getCarsAPI();
                console.log('CARS', this.carsData);
                
            },






            async postCarsAPI() {
                try {
                   
                    const carData = {
                        color: this.carColor,
                        make: this.carMake,
                        model: this.carModel,
                        reg_number: this.regNumber
                    };
            
                   
                    const response = await axios.post(`http://localhost:${this.port}/cars/carsData`, carData);
                    return response.data; 
                    this.carsData
                } catch (error) {
                    console.error('Error posting car data:', error);
                    return null;
                }
            },



            async addCar() {
                const result = await this.postCarsAPI();
                if (result) {
                    console.log('Car added successfully:', result);

                    console.log('Added car', this.carsData);
                    await this.loadCarsData();
                } else {
                    console.error('Failed to add car.');
                }
            },
            









            async filterCarsAPI() {
                try {
                    const response = await axios.get(`http://localhost:${this.port}/cars/carsData/reg_number`, {
                        params: { reg_number: this.regNumber }
                    });
                    return response.data; // Return the found car data
                } catch (error) {
                    console.error('Error filtering cars:', error);
                    return null; // Return null or handle the error as needed
                }
            },


            async selectCar() {
                const car = await this.filterCarsAPI();
                if (car) {
                    console.log('Selected car:', car);
                    this.selectedCar = car;
                } else {
                    console.error('Car not found.');
                }
            },

            resetValues(){
                this.regNumber = '',
                this.carMake = '',
                this.carModel = '',
                this.carColor = '',
                this.selectedCar = {}
            },

            




            async deleteCarsAPI() {
                const url = `http://localhost:${this.port}/cars/carsData/reg_number?reg_number=${encodeURIComponent(this.regNumber)}`;

                try {
                    const response = await fetch(url, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        const result = await response.text();
                        console.log(result);
                        this.loadCarsData();
                    } else if (response.status === 404) {
                        const error = await response.json();
                        console.error(error.message);
                    } else {
                        console.error('An unexpected error occurred');
                    }
                } catch (error) {
                    console.error('Failed to delete car:', error);
                }
            },

            async removeCar() {
                const confirmation = confirm(`Are you sure you want to delete the car with reg number ${this.regNumber}?`);
                if (confirmation) {
                    await this.deleteCarsAPI();
                } else {
                    console.log('Car deletion canceled.');
                }
            },



            



            async updateCarsAPI() {
                axios.put(`http://localhost:${this.port}/cars/carsData/reg_number`, {
                    make: this.carMake,
                    model: this.carModel,
                    color:  this.carColor,


                    
                    
                  
                }, {
                    params: { reg_number: this.regNumber }
                })
                    .then(response => {
                        console.log('Car updated:', response.data);

                        // Find and update the specific car in carsData
                        const updatedCarIndex = this.carsData.findIndex(car => car.reg_number === this.regNumber);
                        if (updatedCarIndex !== -1) {
                            this.carsData[updatedCarIndex] = {
                                reg_number: this.regNumber,
                                make: this.make,
                                model: this.Model,
                                color: this.Color
                            };
                        }
                    })
                    .catch(error => {
                        console.error('There was an error updating the car:', error);
                    });
            },

            async updateCar() {
                const result = await this.updateCarsAPI();
                if (result) {
                    console.log('Car updated successfully:', result);
                 this.postCarsAPI();
                } else {
                    console.error('Failed to update car.');
                }
            },
            







            async init() {
                this. getCarsAPI();
                await this.loadCarsData();


            },

        }
    })
})