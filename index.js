const Books = [
    { id: "12as", name: 'Lãnh đạo-ngôn tình', author: "vvv", price: 5000, gene: ["Quản trị - Lãnh đạo", 'Ngôn tình'], originalPrice: 5000, promotionTime: null, publisher: "123", tag: 'Hot', number: 5, numberPage: 100, size: "12x13", supplier: "ppp", publishing_year: "2001", des: "...", receiptDate: '2023-02-15T19:46' },
    { id: "12as1", name: 'conan2 Ngôn tình', author: "vvv12", price: 2200, gene: ["Ngôn tình"], originalPrice: 2200, promotionTime: null, publisher: "123", tag: 'New', number: 2, numberPage: 100, size: "12x13", supplier: "popo", publishing_year: "1988", des: "...", receiptDate: '2023-01-15T19:46' },
    { id: "12as13a", name: 'Doraemon kinh tế', author: "zzz", price: 1000, gene: ["Phân tích kinh tế"], originalPrice: 1000, promotionTime: null, publisher: "123", tag: 'Hot', number: 5, numberPage: 100, size: "12x13", supplier: "ppp", publishing_year: "2001", des: "...", receiptDate: '2023-03-15T19:46' },
    { id: "12asdd23", name: 'Toán Ngôn tình', author: "vvv,qq", price: 4000, gene: ["Ngôn tình"], originalPrice: 4000, promotionTime: null, publisher: "123", tag: 'Sale', number: 5, numberPage: 100, size: "12x13", supplier: "ppp", publishing_year: "2001", des: "...", receiptDate: '2023-03-15T19:46' },
    { id: "12asdd1", name: 'Hóa Kinh tế', author: "vvvoo", price: 4500, gene: ["Phân tích kinh tế"], originalPrice: 4500, promotionTime: null, publisher: "123", tag: 'Hot', number: 0, numberPage: 100, size: "12x13", supplier: "ppp", publishing_year: "2001", des: "...", receiptDate: '2023-01-15T19:46' },
    { id: "12asddg", name: 'Địa Lý', author: "vvv999", price: 4300, gene: ["Quản trị - Lãnh đạo", "Phân tích kinh tế"], originalPrice: 4300, promotionTime: null, publisher: "123", tag: 'New', number: 0, numberPage: 100, size: "12x13", supplier: "ppp", publishing_year: "2001", des: "...", receiptDate: '2023-03-15T19:46' },
]

let parent = 'Phân tích kinh tế'
let categorytemp = ['Quản trị - Lãnh đạo', 'Ngôn tình']


function categoryFilter(categorytemp, Books) {
    let listProduct = []
    if (Array.isArray(categorytemp)) {
        if (categorytemp !== null) {
            for (i = 0; i < Books.length; i++) {
                console.log(Books[i].gene);
                for (j = 0; j < categorytemp.length; j++) {
                    if (Books[i].gene.filter(genre => genre === (categorytemp[j])).length !== 0) {
                        if (!listProduct.includes(Books[i]))
                            listProduct.push(Books[i])
                    }
                }
            }
            console.log(categorytemp)
        }
    }
    else {
        if (categorytemp !== null) {
            for (i = 0; i < Books.length; i++) {
                console.log(Books[i].gene);
                if (Books[i].gene.filter(genre => genre === (categorytemp)).length !== 0) {
                    listProduct.push(Books[i])
                }
                console.log(Books[i].id + ' ' + Books[i].gene.filter(genre => genre === (categorytemp)));
            }
        }
    }
    return listProduct;
}

console.log(listProduct);