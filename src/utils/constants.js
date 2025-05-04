
export let categoryList = [
    "Choose a Genre",
    "Mystery / Thriller",
    "Romance",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Non Fiction",
    "Historical Fiction",
    "Literary Fiction",
    "Biography",
    "Memoir",
    "Self-Help",
    "Business",
    "Health & Wellness",
    "Travel",
    "True Crime",
    "History",
    "Science & Technology",
    "Drama",
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


export let topSellerData = [
	{
		"_id": 1,
		"title": "How to Grow Your Online Store",
		"description": "Learn the best strategies to grow your online store in today's competitive market.",
		"category": "business",
		"trending": true,
		"coverImage": "book-1.png",
		"oldPrice": 29.99,
		"newPrice": 19.99
	},
	{
		"_id": 2,
		"title": "Top 10 Fiction Books This Year",
		"description": "A curated list of the best fiction books that are trending this year.",
		"category": "books",
		"trending": true,
		"coverImage": "book-2.png",
		"oldPrice": 24.99,
		"newPrice": 14.99
	},
	{
		"_id": 3,
		"title": "Mastering SEO in 2024",
		"description": "Tips and tricks to boost your SEO and rank higher on search engines.",
		"category": "marketing",
		"trending": true,
		"coverImage": "book-3.png",
		"oldPrice": 39.99,
		"newPrice": 29.99
	},
	{
		"_id": 4,
		"title": "Best eCommerce Platforms",
		"description": "A comprehensive guide on choosing the best eCommerce platforms for 2024.",
		"category": "business",
		"trending": false,
		"coverImage": "book-4.png",
		"oldPrice": 49.99,
		"newPrice": 39.99
	},
	{
		"_id": 5,
		"title": "Non-Fiction Reads You Must Try",
		"description": "Our top picks for non-fiction books to add to your reading list.",
		"category": "books",
		"trending": true,
		"coverImage": "book-5.png",
		"oldPrice": 19.99,
		"newPrice": 9.99
	},
	{
		"_id": 6,
		"title": "Ultimate Guide to Digital Marketing",
		"description": "A complete guide to digital marketing strategies for 2024.",
		"category": "marketing",
		"trending": false,
		"coverImage": "book-6.png",
		"oldPrice": 44.99,
		"newPrice": 34.99
	},
	{
		"_id": 7,
		"title": "The First Days",
		"description": "Katie is driving to work one beautiful day when a dead man jumps into her car and tries to eat her.  That same morning, Jenni opens a bedroom door to find her husband devouring their toddler son. ",
		"category": "horror",
		"trending": true,
		"coverImage": "book-7.png",
		"oldPrice": 59.99,
		"newPrice": 49.99
	},
	{
		"_id": 8,
		"title": "The Hunger Games",
		"description": "Could you survive on your own in the wild, with every one out to make sure you don't live to see the morning?",
		"category": "fiction",
		"trending": true,
		"coverImage": "book-8.png",
		"oldPrice": 21.99,
		"newPrice": 16.99
	},
	{
		"_id": 9,
		"title": "Harry Potter and the Order of the Phoenix",
		"description": "Harry Potter is about to start his fifth year at Hogwarts School of Witchcraft and Wizardry. Unlike most schoolboys, Harry never enjoys his summer holidays",
		"category": "adventure",
		"trending": false,
		"coverImage": "book-9.png",
		"oldPrice": 27.99,
		"newPrice": 18.99
	},
	{
		"_id": 10,
		"title": "Pride and Prejudice",
		"description": "The romantic clash between the opinionated Elizabeth and her proud beau, Mr. Darcy, is a splendid performance of civilized sparring.",
		"category": "fiction",
		"trending": true,
		"coverImage": "book-10.png",
		"oldPrice": 14.99,
		"newPrice": 10.99
	},
	{
		"_id": 11,
		"title": "To Kill a Mockingbird",
		"description": "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. 'To Kill A Mockingbird' became both an instant bestseller",
		"category": "fiction",
		"trending": true,
		"coverImage": "book-11.png",
		"oldPrice": 32.99,
		"newPrice": 25.99
	},
	{
		"_id": 12,
		"title": "The Fault in Our Stars",
		"description": "Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. ",
		"category": "business",
		"trending": true,
		"coverImage": "book-12.png",
		"oldPrice": 19.99,
		"newPrice": 9.99
	},
	{
		"_id": 13,
		"title": "The Picture of Dorian Gray",
		"description": "Oscar Wilde’s only novel is the dreamlike story of a young man who sells his soul for eternal youth and beauty.",
		"category": "horror",
		"trending": true,
		"coverImage": "book-13.png",
		"oldPrice": 26.99,
		"newPrice": 21.99
	},
	{
		"_id": 14,
		"title": "The Giving Tree",
		"description": "'Once there was a tree...and she loved a little boy.'So begins a story of unforgettable perception, beautifully written and illustrated by the gifted and versatile Shel Silverstein.",
		"category": "fiction",
		"trending": false,
		"coverImage": "book-14.png",
		"oldPrice": 34.99,
		"newPrice": 24.99
	},
	{
		"_id": 15,
		"title": "Gone with the Wind",
		"description": "Scarlett O'Hara, the beautiful, spoiled daughter of a well-to-do Georgia plantation owner, must use every means at her disposal to claw her way out of the poverty she finds herself in after Sherman's March to the Sea.",
		"category": "fiction",
		"trending": false,
		"coverImage": "book-15.png",
		"oldPrice": 22.99,
		"newPrice": 12.99
	},
	{
		"_id": 16,
		"title": "The Lightning Thief",
		"description": "Percy Jackson is a good kid, but he can't seem to focus on his schoolwork or control his temper. And lately, being away at boarding school is only getting worse - Percy could have sworn his pre-algebra teacher turned into a monster and tried to kill him",
		"category": "fiction",
		"trending": false,
		"coverImage": "book-16.png",
		"oldPrice": 24.99,
		"newPrice": 19.99
	},
	{
		"_id": 17,
		"title": "Alice’s Adventures in Wonderland",
		"description": "When Alice sees a white rabbit take a watch out of its waistcoat pocket she decides to follow it, and a sequence of most unusual events is set in motion. This mini book contains the entire topsy-turvy stories of Alice's Adventures in Wonderland",
		"category": "adventure",
		"trending": true,
		"coverImage": "book-17.png",
		"oldPrice": 49.99,
		"newPrice": 39.99
	},
	{
		"_id": 18,
		"title": "Divergent",
		"description": "On an appointed day of every year, all sixteen-year-olds must select the faction to which they will devote the rest of their lives. For Beatrice, the decision is between staying with her family and being who she really is",
		"category": "business",
		"trending": true,
		"coverImage": "book-18.png",
		"oldPrice": 18.99,
		"newPrice": 12.99
	},
	{
		"_id": 19,
		"title": "The Alchemist",
		"description": "Paulo Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.",
		"category": "adventure",
		"trending": true,
		"coverImage": "book-19.png",
		"oldPrice": 35.99,
		"newPrice": 27.99
	},
	{
		"_id": 20,
		"title": "Four Thousand Weeks",
		"description": "Nobody needs to be told there isn’t enough time. We’re obsessed with our lengthening to-do lists, overfilled inboxes, work-life balance, and ceaseless battle against distraction; we’re deluged with advice on becoming more productive and efficient",
		"category": "business",
		"trending": false,
		"coverImage": "book-20.png",
		"oldPrice": 24.99,
		"newPrice": 14.99
	}
];

export let res =[
	{
		id : '67e3cb894982f3f73cc87613',
		title: 'Ikigai',
		author: 'Thomas Adams',
		description: "The International bestseller we all have an ikigai.It's the Japanese word for ‘a reason to live’ or ‘a reason to jump out of bed in the morning’. It’s the place where your needs, desires, ambitions, and satisfaction meet",
		category: 'Self-Help',
		publisher: 'Penguin Books',
		language: 'English, Japaneese',
		quantity: 9,
		isAvailable: true,
		pages: 112,
		newPrice: 15,
		oldPrice: 20,
		coverPic: 'https://res.cloudinary.com/dp0v0zb7z/image/upload/v1742982024/kbt53v5bmkend7bzsctv.jpg',
	},
	{
		id : '67e3d0984982f3f73cc87619',
		title: 'Half Girlfriend',
		author: 'Chetan Bhagat',
		description: 'Half Girlfriend is an Indian English coming of age, young adult romance novel by Indian author Chetan Bhagat. The novel, set in rural Bihar, New Delhi, Patna.',
		category: 'Romance',
		publisher: 'Oswald',
		language: 'English',
		quantity: 13,
		isAvailable: true,
		pages: 230,
		newPrice: 12,
		oldPrice: 20,
		coverPic: 'https://res.cloudinary.com/dp0v0zb7z/image/upload/v1742983319/isvjavq4kbivlnooillb.jpg',
	},
	{
		id : '67e3d2da4982f3f73cc87624',
		title: 'Annihilation of Caste',
		author: 'BR Ambedkar',
		description: '"Annihilation of Caste," a seminal work by B.R. Ambedkar, originally a speech intended for an anti-caste convention, is a powerful critique of the caste system in India, arguing for its complete abolition and advocating for a society based on equality and justice',
		category: 'Non Fiction',
		publisher: 'Buddham Publishers',
		language: 'English, Hindi',
		quantity: 5,
		isAvailable: true,
		pages: 140,
		newPrice: 20,
		oldPrice: 21,
		coverPic: 'https://res.cloudinary.com/dp0v0zb7z/image/upload/v1742983896/hbxv4cmu5izkvcmw9gev.jpg',
	}, 
	{
		id :'67e3eb0852f11df592bd4cc3',
		title: 'Atomic Habits',
		author: 'James Clear',
		description: 'The "Atomic Habits" concept, popularized by James Clear, emphasizes that even small, consistent improvements can lead to significant results over time, much like the accumulation of tiny "atoms" building something substantial. It focuses on building good habits and breaking bad ones through a systematic approach',
		category: 'Self-Help',
		publisher: 'Penguine',
		language: 'English',
		quantity: 10,
		isAvailable: true,
		pages: 210,
		newPrice: 15,
		oldPrice: 20,
		coverPic: 'https://res.cloudinary.com/dp0v0zb7z/image/upload/v1742990087/jch62ifhata4yavzxkh0.jpg',
	}, 
	{
		id: '67ebb8eb7b082bb9e1d86b38',
		title: 'The Alchemist',
		author: 'Paulo Coelho',
		description: 'The Alchemist is a novel by Brazilian author Paulo Coelho which was first published in 1988. Originally written in Portuguese, it became a widely translated international bestseller',
		category: 'Marketing',
		publisher: 'Wildstone',
		language: 'English, Spanish',
		quantity: 15,
		isAvailable: true,
		pages: 120,
		newPrice: 25,
		oldPrice: 28,
		coverPic: 'https://res.cloudinary.com/dp0v0zb7z/image/upload/v1743501547/qzhhkyhq5fdmvfawmd0y.jpg',
	}
];
