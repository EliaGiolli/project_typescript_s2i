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
    
    bookVehicle(vehicle: IVehicle): void {
        if(!vehicle.status){
            vehicle.assignUser(this);
            console.log(`User ${this.name} booked the vehicle ${vehicle.name}.`);
        } else{
            console.log(`Vehicle ${vehicle.name} already booked.`);
        }
    }
}    