const express = require("express");
const cors = require("cors");
const User = require ("./config");
const Thread = require("./config");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const users = [];
const threadList = [];

const generateID = () => Math.random().toString(36).substring(2, 10);

app.post("/api/login",async (req, res) => {
	const { email, password } = req.body;

	const info = await User.where('email', '==',btoa(email)).get();

	let result = info.docs.map((doc)=>(doc.data()['email'])).toString() === btoa(email) && btoa(password) === info.docs.map((doc)=>(doc.data()['pwd'])).toString();
	
	if (!result) {
		return res.json({
			error_message: "Incorrect credentials",
		});
	}

	res.json({
		message: "Login successfully",
		id: atob(info.docs.map((doc)=>(doc.data()['id']).toString())),
	});
});

app.post("/api/register", async (req, res) => {
	const { email, password, username } = req.body;

	const id = generateID();
	const result = users.filter(
		(user) => user.email === email && user.password === password
	);

	if (result.length === 0) {
		const newUser = { id, email, password, username };
        const UserToDb = JSON.stringify({
            id: btoa(id),
            email: btoa(email),
            pwd: btoa(password),
            username: btoa(username)
        });
          
        const jsonObject = JSON.parse(UserToDb);

		users.push(newUser);

        const data = req.body;

        console.log("Data data : ",data);
		console.log("Data of users :  ",jsonObject);
		User.add(jsonObject);

		return res.json({
			message: "Account created successfully!",
			
		});
		
	}
	res.json({
		error_message: "User already exists",
	});
});

app.post("/api/create/thread", async (req, res) => {
	const { thread, userId } = req.body;
	let threadId = generateID();

    // await Thread.add({
	// 	id: threadId,
	// 	title: thread,
	// 	userId,
	// 	replies: [],
	// 	likes: [],
	// });
    //res.send({ message: "Thread Added :"+ threadId });

	threadList.unshift({
		id: threadId,
		title: thread,
		userId,
		replies: [],
		likes: [],
	});

	res.send({
		message: "Thread created successfully!",
		threads: threadList
	});
});

app.get("/api/all/threads", (req, res) => {
	res.json({
		threads: threadList,
	});
});

app.post("/api/thread/like", (req, res) => {
	const { threadId, userId } = req.body;
	const result = threadList.filter((thread) => thread.id === threadId);
	const threadLikes = result[0].likes;

	const authenticateReaction = threadLikes.filter((user) => user === userId);

	if (authenticateReaction.length === 0) {
		threadLikes.push(userId);
		return res.json({
			message: "You've reacted to the post!",
		});
	}
	res.json({
		error_message: "You can only react once!",
	});
});

app.post("/api/thread/replies", (req, res) => {
	const { id } = req.body;
	const result = threadList.filter((thread) => thread.id === id);
	res.json({
		replies: result[0].replies,
		title: result[0].title,
	});
});

app.post("/api/create/reply", async (req, res) => {
	const { id, userId, reply } = req.body;
	const result = threadList.filter((thread) => thread.id === id);
	const username = users.filter((user) => user.id === userId);
	result[0].replies.unshift({ name: username[0].username, text: reply });

	res.json({
		message: "Response added successfully!",
	});
});

app.post("/create", async(req,res)=>{
    const data = req.body;
    console.log("Data of Users : ", data);
    await User.add(data);
    res.send({ message: "User Added" });
})

app.get("/user", async(req,res)=>{
    
})

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
