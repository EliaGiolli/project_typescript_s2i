//creation of the interface IUser with its properties and methods
interface IUser{
    name: string;
    id:number;

    bookVehicle(vechicle: IVehicle):void;
}

//creation of the interface IVehicle with its properties and methods
interface IVehicle {
    name:string;
    uniqueId:number;
    status:boolean;

    assignUser(user:IUser): void; 
}

//creation of the interface ICity with its properties and methods
interface ICity{
    cityName:string;
    availableVehicle:IVehicle[];

    addVehicle(vechicle:IVehicle):void;
}

//creation of the 3 classes

//class Vehicle
class Vehicle implements IVehicle {
    name:string;
    uniqueId:number;
    status:boolean;
    user: IUser | null;

    constructor(name:string, uniqueId:number){
        this.name = name;
        this.uniqueId = uniqueId;
        this.status = false; //at the beginning no vehicle is used
        this.user = null; // at the beginning no user is assigned to a vehicle
    }

    //the function assignUser assigns a specific user to a vehicle,if not already used by anyone else
    assignUser(user:IUser): void {
        if(!this.status){
            this.user = user;
            this.status= true;
            console.log(`Vehicle ${this.name} assigned to user ${user.name}.`);
        }else{
            console.log(`Vehicle ${this.name} already assigned to user ${user.name}.`);
        }
    }
}

class User implements IUser {
    name:string;
    id: number;

    constructor(name:string, id:number){
        this.name = name;
        this.id = id;
    }
    //the function bookVehicle allows a user to book an available vehicle
    bookVehicle(vehicle: IVehicle): void {
        if(!vehicle.status){
            vehicle.assignUser(this);
            console.log(`User ${this.name} booked the vehicle ${vehicle.name}.`);
        } else{
            console.log(`Vehicle ${vehicle.name} already booked.`);
        }
    }
}    

class City implements ICity{

    cityName:string;
    availableVehicle:IVehicle[];

    constructor(cityName:string){
        this.cityName = cityName;
        this.availableVehicle = [];
    }
    //the function addVehicle adds a vehicle to a city
    addVehicle(vechicle: IVehicle): void {
        this.availableVehicle.push(vechicle);//it adds a vehicle into the array
        console.log(`Vehicle ${vechicle.name} added to the city ${this.cityName}.`);
    }
}

// Creation of some object for the class Vehicle
let bike = new Vehicle("Bike", 1);
let scooter = new Vehicle("Scooter", 2);
let kickScooter = new Vehicle("Electric Kick scooter", 3);

// Creation of some objects for the class User
let user1 = new User("Piero Armenti", 1);
let user2 = new User("Klaus Schroeder", 2);

// Creation of the object City
let NewYork = new City("New York");

// added the above-created vehicles to the city of New York
NewYork.addVehicle(bike);
NewYork.addVehicle(scooter);
NewYork.addVehicle(kickScooter);

// Testing of the logic behind the vehicle's booking
user1.bookVehicle(bike);
user2.bookVehicle(bike); // it should fail since the vehicle is already booked
user2.bookVehicle(kickScooter);

// New Vehicle and booking
let newBike = new Vehicle("New bike", 4);
NewYork.addVehicle(newBike);
user1.bookVehicle(newBike);