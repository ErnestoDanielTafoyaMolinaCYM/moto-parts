class Part {
    constructor( id, name, description, price ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }
    //getters
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getPrice() {
        return this.price;
    }
    //setters
    setId(id) {
        this.id = id;
    }
    setName(name) {
        this.name = name;
    }
    setDescription(description) {    
        this.description = description;
    }    
    setPrice(price) {    
        this.price = price;
    }
}

export default Part;