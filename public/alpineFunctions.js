document.addEventListener('alpine:init', () => {
    Alpine.data('functions', () => {
        return {
            port: 3365,
            carsData: [],
            regNumber: '',
            carMake: '',
            carModel: '',
            carColor: '',
            selectedCar: {},
            showPaarlData: true,
            showBellvilleData: true,
            showStellenboschData: true,
            showMalmesburyData: true,
            showCapetownData: true,
            showKuilsriverData: true,
            showOtherPlacesData: true,
            loadData: true,
            showOtherPlacesData: false,
            search: false,
            remove: false,
            update: false,
            add: false,
            found: false,
            sidebarVisible: false,
            filterVisible: false,

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
                } catch (error) {
                    console.error('Error posting car data:', error);
                    return null;
                }
            },

            async addCar() {
                const result = await this.postCarsAPI();
                if (result) {
                    console.log('Car added successfully:', result);
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
                    return response.data; 
                } catch (error) {
                    console.error('Error filtering cars:', error);
                    return null; 
                }
            },

            async selectCar() {
                const car = await this.filterCarsAPI();
                if (car) {
                    console.log('Selected car:', car);
                    this.selectedCar = car;
                    this.found = true;
                } else {
                    console.error('Car not found.');
                    alert('CAR DOES NOT EXIST!');
                    this.found = false;
                }
            },
            

            resetValues() {
                this.regNumber = '';
                this.carMake = '';
                this.carModel = '';
                this.carColor = '';
                this.selectedCar = {};
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
                        await this.loadCarsData(); 
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
                try {
                    const response = await axios.put(`http://localhost:${this.port}/cars/carsData/reg_number`, {
                        make: this.carMake,
                        model: this.carModel,
                        color: this.carColor,
                    }, {
                        params: { reg_number: this.regNumber }
                    });

                    console.log('Car updated:', response.data);

                    // Update the specific car in carsData
                    const updatedCarIndex = this.carsData.findIndex(car => car.reg_number === this.regNumber);
                    if (updatedCarIndex !== -1) {
                        this.carsData[updatedCarIndex] = {
                            reg_number: this.regNumber,
                            make: this.carMake, 
                            model: this.carModel, 
                            color: this.carColor   
                        };
                    }

                    this.update = false;
                } catch (error) {
                    console.error('There was an error updating the car:', error);
                }
            },

            async updateCar() {
                await this.updateCarsAPI(); 
            },

            showPopup() {
                this.update = true; 
            },
            
            clearData() {
                this.resetValues(); 
                this.update = false;
            },

            async init() {
                await this.loadCarsData(); 
            },
        };
    });
});
