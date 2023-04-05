"use strict";
// server.ts
exports.__esModule = true;
// import express from "express"
var http = require("http");
var socket_io_1 = require("socket.io");
var express = require("express");
var app = express();
var server = http.createServer(app);
var io = new socket_io_1.Server(server, { cors: { origin: "*" } });
var jsonStore = {
    "What's the core idea of SICP in 150 words?": "SICP, or Structure and Interpretation of Computer Programs, is a book that teaches the fundamental principles of programming and computer science. At its core, SICP emphasizes the importance of abstraction in programming and problem-solving. The book introduces the concept of procedures as a means of abstraction, allowing programmers to break down complex tasks into smaller, more manageable parts. It then explores how these procedures can be combined to create larger programs, emphasizing the importance of modularity and the use of higher-order functions. SICP also covers a wide range of topics, including data abstraction, object-oriented programming, and programming language design. Throughout the book, the authors encourage readers to think deeply about the nature of computation and to develop a more profound understanding of programming concepts. Overall, SICP is a challenging but rewarding read that provides a solid foundation in computer science and programming principles.",
    "Why did Terry Davis go mad?": 'Terry Davis was an American computer programmer who created an operating system called "TempleOS," which he claimed was a divine inspiration. While the exact reasons for his mental health struggles are not entirely clear, it is known that Davis had a history of mental illness, including bipolar disorder. Davis\'s behavior became increasingly erratic and delusional over time, and he developed a reputation for making offensive and inflammatory remarks online. He also became fixated on the idea that the CIA was after him and believed that he was under constant surveillance. Despite his struggles with mental health, Davis continued to work on TempleOS and gained a following within the programming community. Tragically, he passed away in 2018 after being hit by a train. It is essential to approach this topic with sensitivity and understanding of the challenges that individuals with mental health issues face. It is not uncommon for people with severe mental health struggles to experience delusions, hallucinations, and other symptoms that can be challenging to manage.',
    "What did John Carmack achieve at ID Software?": "John Carmack is a legendary figure in the video game industry and is best known for his work at id Software, where he co-founded the company and developed groundbreaking technology that revolutionized the gaming industry. At id Software, Carmack was the lead programmer and played a crucial role in the development of some of the most iconic games of all time, including Doom, Quake, and Wolfenstein 3D. He developed the game engines that powered these games, which were known for their advanced 3D graphics, fast-paced gameplay, and network multiplayer capabilities. Carmack's contributions to the gaming industry extend beyond just game engines, however. He was also one of the pioneers of virtual reality and helped develop the Oculus Rift VR headset before leaving id Software in 2013 to join Oculus VR full time. Overall, John Carmack's achievements at id Software are many and varied, but perhaps his most significant contribution was his relentless pursuit of technical excellence and his ability to push the boundaries of what was possible in video game development. His work has had a profound impact on the gaming industry and continues to influence game development to this day.",
    "What were the last words of Captain Ahab in Moby Dick?": "Captain Ahab's last words in Moby Dick, by Herman Melville, are a powerful and memorable reflection on his obsessive pursuit of the great white whale, Moby Dick. As he lies dying on the deck of his ship, the Pequod, after his final confrontation with the whale, he exclaims: \" Towards thee I roll, thou all-destroying but unconquering whale; to the last I grapple with thee; from hell's heart I stab at thee; for hate's sake I spit my last breath at thee. \" These words encapsulate the theme of the novel, which is the destructive power of obsession and the dangers of single-minded pursuit of a goal at any cost. Despite his own death and the loss of his ship and crew, Ahab refuses to let go of his obsession with the whale, which ultimately leads to his own demise.",
    "Do you think K's inability to find The Castle is a mirroring of man's inability to find answers to the most important questions in his life?": "Yes, that is certainly one interpretation of the novel. K.'s quest to reach the Castle can be seen as a metaphor for the human search for meaning and purpose in life, and his repeated failures and frustrations reflect the challenges and uncertainties that individuals face in this quest. \n Kafka's novel is often seen as a commentary on the human condition, particularly the experience of alienation and powerlessness in the face of seemingly insurmountable obstacles. The Castle, in this sense, can be seen as a symbol of an unattainable goal, representing the ultimate inaccessibility and inscrutability of the universe. \n By leaving the question of whether or not K. finds The Castle unanswered, Kafka invites readers to grapple with these themes and come to their own conclusions about the nature of the human condition and the challenges of finding meaning in an uncertain world."
};
io.on("connection", function (socket) {
    console.log("a user connected");
    socket.on("question", function (question) {
        var _a;
        console.log("received question:", question);
        // Fetch answer from dictionary/json store
        var answer = (_a = jsonStore[question]) !== null && _a !== void 0 ? _a : "Sorry, I don't know the answer to that question.";
        console.log("sending answer:", answer);
        // Send answer word by word
        var words = answer.split(" ");
        words.forEach(function (word, i) {
            setTimeout(function () {
                socket.emit("word", word);
            }, i * 100);
        });
    });
    socket.on("disconnect", function () {
        console.log("user disconnected");
    });
});
var port = process.env.PORT || 3001;
server.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
