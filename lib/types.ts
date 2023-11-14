export interface Genre {
	id: string;
	name: string;
	books: Book[] | [];
}

export interface User {
	id: string;
	name: string;
	email: string;
	image: string;
	isAdmin: boolean;
}

export interface Author {
	id: string;
	name: string;
	books: Book[];
	image: string;
}

export interface OrderItems {
	id: string;
	book: {
		id: string;
		title: string;
		author: string;
	};
	quantity: number;
	price: number;
}

export interface Order {
	id: string;
	user: User;
	total: number;
	phone: string;
	address: string;
	orderItems: OrderItems[];
	createdAt: Date;
	paidAt: Date | null;
}

export interface Format {
	id: string;
	name: string;
	price: string;
	discount: string;
	quantityInStock: number;
}

export interface Book {
	id: string;
	title: string;
	authors: Author[];
	description?: string;
	bestseller: boolean;
	newRelease: boolean;
	isFeatured: boolean;
	formats: object[];
	genres: Genre[];
	image: string;
}
