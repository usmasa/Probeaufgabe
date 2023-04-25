interface Price {
    value: number,
    currency: string
}

interface Product {
    name: string,
    id: number,
    imageURL: string,
    available: boolean,
    releaseDate: number,
    description: string,
    longDescription: string,
    rating: number,
    price: Price
}

export default Product;