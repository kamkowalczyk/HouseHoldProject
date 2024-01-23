export interface IPlaces {
    type: string;
    count: number;
  }

 export interface IHouse {
    _id: string;
    name: string;
    address: string;
    cheapestPrice: number;
    city: string;
    desc: string;
    distance: string;
    featured: boolean;
    photos: string[];
    rooms: string[];
    title: string;
    type: string;
    rating?: number;
  }

  export interface IItem  {
    startDate: Date;
    endDate: Date;
    key: string;
  }

 export interface IRoom {
  _id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  price: number;
  maxPeople: number;
  desc: string;
  roomNumbers: IRoomNumber[];
}

 export interface IRoomNumber {
  number: number;
  unavailableDates: Date[];
  _id: string;
}

export interface IOptions {
  price?: number;
  room: number;
  minimum?: number;
  maximum?: number;
}
