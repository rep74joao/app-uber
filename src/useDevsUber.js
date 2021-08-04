export default () => ({
    signin:(email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let json = {
                    error:"",
                    token:'123',
                    name:'João'
                };
                resolve(json);
            }, 1000)
        })
    },

    signup:(name, email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let json = {
                    error:"",
                    token:'123',
                    name:'João'
                };
                resolve(json);
            }, 1000)
        })
    },

    getRequestPrice:(distance) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let json = {
                    error:"",
                    price:0
                };
                json.price = distance * 7;
                resolve(json);
            }, 1000)
        })
    },

    findDriver: (opstions) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let json = {
                    error:"",
                };

                json.driver = {
                    name: 'Gabriel',
                    avatar:'https://i.pinimg.com/originals/7e/3e/11/7e3e118ccdaa648b5ce3e4dc9325fb75.jpg',
                    stars:5,
                    carName:'Honda Civic',
                    carColor:'Preto',
                    carPlate:'AAA-0000'
                };

                resolve(json);
            }, 1000)
        })
    },

    setRating: (rating) => {
        return true;
    }
})