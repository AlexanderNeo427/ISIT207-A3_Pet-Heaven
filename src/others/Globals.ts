export const ROUTE_URL = {
    HOME: "/",
    GALLERY: "/adoption_gallery",
    PET_DETAIL: "/pet_detail/:pet_type/:pet_id",
    ABOUT: "/about",
    CONTACT_US: "/contact_us",
    AUTH: "/auth",
    OUR_HISTORY: "/our_history"
}

export enum PET_API_TYPE { DOG, CAT }

export class BreedData { 
    breed: string
    lifespan: string
    weight: string
    temperaments: string[]

    constructor(breedsObj: any) {
        this.breed = breedsObj.name
        this.lifespan = breedsObj.life_span
        this.weight = breedsObj.weight.metric
        this.temperaments = breedsObj.temperament.split(",").map((t: string) => t.trim())
    }
}

export class DogBreedData extends BreedData {
    bredFor: string[]
    height: string

    constructor(breedsObj: any) {
        super(breedsObj)
        this.bredFor = breedsObj.bred_for
        this.height = breedsObj.height.metric
    }
}

export class CatBreedData extends BreedData {
    description: string

    constructor(breedsObj: any) {
        super(breedsObj)
        this.description = breedsObj.description
    }
}

export class PetApiData {
    id: number
    imgURL: string
    breedData: BreedData | null
    height: number
    width: number
    apiType: PET_API_TYPE

    constructor(id: number, imgURL: string, breedData: any, height: number, width: number, apiType: PET_API_TYPE) {
        this.id = id
        this.imgURL = imgURL
        this.breedData = null
        this.height = height
        this.width = width
        this.apiType = apiType

        if (apiType === PET_API_TYPE.CAT) {
            // console.log("PetApiData ctor() - Creating catBreedData from breedData: ", breedData)
            this.breedData = new CatBreedData(breedData)
            // console.log("PetApiData ctor() - Newly created catBreedData: ", this.breedData)
        }
        else if (apiType === PET_API_TYPE.DOG) {
            // console.log("PetApiData ctor() - Creating dogBreedData from breedData: ", breedData)
            this.breedData = new DogBreedData(breedData)
            // console.log("PetApiData ctor() - Newly created dogBreedData: ", this.breedData)
        }
    }
}

export const Utils = {
    randInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    },
    lerp(a: number, b: number, t: number): number {
        return a * (1 - t) + b * t
    },
    generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    },
    getRandomDate(startDate: Date, endDate: Date): Date {
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();
        const randomTimestamp = startTime + Math.random() * (endTime - startTime);
        return new Date(randomTimestamp);
    },
    convertToPetApiData(obj: any, apiType: PET_API_TYPE): PetApiData {
        return new PetApiData(
            obj.id, obj.url, obj.breeds[0],
            obj.height, obj.width, apiType
        )
    },
    durstenfeldShuffle(arr: any[]): void {
        for (var i = arr.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
}
