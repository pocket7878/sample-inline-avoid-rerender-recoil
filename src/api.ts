import axios from "axios";

type Profile = {
	name: string,
	email: string
};

export async function getProfile() {
	return await axios.get<Profile>("http://localhost:3001/users/1").then(res => res.data);
}

export async function updateEmail(email: string) {
	await axios.patch("http://localhost:3001/users/1", {
		email: email
	});
}

export async function updateName(name: string) {
	await axios.patch("http://localhost:3001/users/1", {
		name: name
	});
}