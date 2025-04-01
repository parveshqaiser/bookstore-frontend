
export let categoryList = [
    "Mystery",
    "Romance",
    "Science Fiction",
    "Fantasy",
    "Thriller",
    "Horror",
    "Non Fiction",
    "Historical Fiction",
    "Literary Fiction",
    "Biography",
    "Memoir",
    "Self-Help",
    "Health & Wellness",
    "Travel",
    "True Crime",
    "History",
    "Science & Technology",
    "Graphic Novels",
    "SiPoetry",
    "Drama",
    "Essays",
    "Anthologies",
];

// previously used in table
let data = [
    {
        title : "Section 375",
        author : "Chetan",
        price : 345,
        cat : "Drama"
    },
    {
        title : "13 B",
        author : "Parvesh ",
        price : 342,
        cat : "Action"
    },
    {
        title : "The boy in pajama",
        author : "Ronit",
        price : 341,
        cat : "Sportss"
    },
    {
        title : "ANdaz",
        author : "Ravi",
        price : 230,
        cat : "Drama"
    },
    {
        title : "Sachin ",
        author : "Ram ",
        price : 342,
        cat : "Action"
    },
    {
        title : "Holy cow",
        author : "deshpande",
        price : 341,
        cat : "Sportss"
    }
];

// pending orders
 const mockOrders = [
        {
            _id: "67e40122b67b38003e2b8816#1",
            name: "Seema Firdous",
            email: "seema@hotmail.com",
            number: 8486712345,
            orderedQuantity: 1,
            totalPrice: 15,
            orderStatus: "Pending",
            address: {
                doorNo: "House No 3, Shiv Bagh, Near Hyper super market",
                city: "Guwahati",
                state: "Assam",
                pinCode: "781024",
            },
            product: [{ productId: "67e3cb894982f3f73cc87613", quantity: 1, price: 15 }, { productId: "67e3cb894982f3f73cc876111", quantity: 2, price: 150 }],
            createdAt: "2025-03-26T13:29:06.949Z",
            bookDetails: [{ title: "Ikigai", author: "Thomas Adams" }, { title: "Love 2020", author: "Vijay Verma" }],
        },
        {
            _id: "67e40122b67b38003e2b0016#2",
            name: "Manisha",
            email: "manisha@hotmail.com",
            number: 9006712345,
            orderedQuantity: 5,
            totalPrice: 100,
            orderStatus: "Pending",
            address: {
                doorNo: "Basheer Hostel,Road No 5, WIne Mart",
                city: "Hyd",
                state: "Telangana",
                pinCode: "500098",
            },
            product: [{ productId: "67e3cb894982f3f73cc87614", quantity: 1, price: 15 }],
            createdAt: "2025-03-26T13:29:06.949Z",
            bookDetails: [{ title: "3 Idiots", author: "Thomas Adams" }],
        },
    ];

    let  orderedData =[
        {
            "_id": "67e40122b67b38003e2b8816",
            "name": "Seema Firdous",
            "email": "seema@hotmail.com",
            "number": 8486712345,
            "orderedQuantity": 1,
            "totalPrice": 15,
            "orderStatus": "Delivered",
            "address": {
                "doorNo": "House No 3, Shiv Bagh",
                "city": "Guwahati",
                "state": "Assam",
                "pinCode": "781024"
            },
            "product": [
                {
                    "productId": "67e3cb894982f3f73cc87613",
                    "quantity": 1,
                    "price": 15,
                    "_id": "67e40122b67b38003e2b8817"
                }
            ],
            "createdAt": "2025-03-26T13:29:06.949Z",
            "updatedAt": "2025-03-27T10:02:32.596Z",
            "__v": 0,
            "bookDetails": [
                {
                    "title": "Ikigai",
                    "author": "Thomas Adams",
                    "category": "Self-Help",
                    "publisher": "Penguin Books",
                    "language": "English, Japaneese",
                    "pages": 112,
                    "coverPic": "https://res.cloudinary.com/dp0v0zb7z/image/upload/v1742982024/kbt53v5bmkend7bzsctv.jpg"
                }
            ]
        }
    ];

