import express from 'express';
let router = express.Router();

const data = [
    {
        id: 1,
        content: `A child asked his father, "How were people born?" So his father said, "Adam and Eve made babies, then their babies became adults and made babies, and so on."
        The child then went to his mother, asked her the same question and she told him, "We were monkeys then we evolved to become like we are now."
        The child ran back to his father and said, "You lied to me!" His father replied, "No, your mom was talking about her side of the family."`,
    },
    {
        id: 2,
        content: `Teacher: "Kids,what does the chicken give you?" Student: "Meat!" Teacher: "Very good! Now what does the pig give you?" Student: "Bacon!" Teacher: "Great! And what does the fat cow give you?" Student: "Homework!"`,
    },
    {
        id: 3,
        content: `The teacher asked Jimmy, "Why is your cat at school today Jimmy?" Jimmy replied crying, "Because I heard my daddy tell my mommy, 'I am going to eat that pussy once Jimmy leaves for school today!'"`,
    },
    {
        id: 4,
        content: `A housewife, an accountant and a lawyer were asked "How much is 2+2?" The housewife replies: "Four!". The accountant says: "I think it's either 3 or 4. Let me run those figures through my spreadsheet one more time." The lawyer pulls the drapes, dims the lights and asks in a hushed voice, "How much do you want it to be?"`,
    },
];
const dataFinish = [
    {
        id: 0,
        content: `"That's all the jokes for today! Come back another day!"`,
    },
];
var db = {
    like: [],
    unlike: [],
};

var list_id = [];
var isClean = false;
var dataDisplay = dataFinish;
let initRoutes = (app) => {
    router.get('/', (req, res) => {
        try {
            // if (isClean === true) {
            //     list_id = [];
            //     isClean = false;
            // }
            let current_data;
            let isFinish = false;
            let ramdom = Math.floor(Math.random() * 4) + 1;
            if (req.cookies.test) {
                [...current_data] = req.cookies.test.split('.');
                list_id = current_data.map((item) => +item);
            } else {
                list_id = [];
                db = {
                    like: [],
                    unlike: [],
                };
            }
            if (list_id && list_id.length > 0) {
                if (list_id.length !== 4) {
                    while (list_id.some((x) => x === ramdom)) {
                        ramdom = Math.floor(Math.random() * 4) + 1;
                    }
                } else isFinish = true;
            }
            let new_data = data.filter((item) => item.id === ramdom);
            isFinish === false ? (dataDisplay = new_data) : (dataDisplay = dataFinish);
            return res.render('index', {
                dataDisplay,
            });
        } catch (e) {
            console.log(e);
        }
        return res.render('index');
    });

    // router.post('/clean', (req, res) => {
    //     isClean = true;
    //     res.clearCookie('test');
    //     return res.redirect('/');
    // });

    router.post('/like', (req, res, next) => {
        // if (isClean === true) {
        //     list_id = [];
        //     isClean = false;
        // }
        let current_data;

        if (req.cookies.test) {
            [...current_data] = req.cookies.test.split('.');
            list_id = current_data.map((item) => +item);
        } else {
            list_id = [];
            db = {
                like: [],
                unlike: [],
            };
        }
        if (list_id && list_id.length > 0) {
            if (list_id.length !== 4) {
                list_id.push(dataDisplay[0].id);
                db && db.like.push(dataDisplay[0]);
            }
        } else {
            list_id.push(dataDisplay[0].id);
            db && db.like.push(dataDisplay[0]);
        }
        let text = list_id.join('.');
        console.log(db);
        res.cookie('test', text);
        return res.redirect('/');
    });

    router.post('/unlike', (req, res) => {
        // if (isClean === true) {
        //     list_id = [];
        //     isClean = false;
        // }
        let current_data;

        if (req.cookies.test) {
            [...current_data] = req.cookies.test.split('.');
            list_id = current_data.map((item) => +item);
        } else {
            list_id = [];
            db = {
                like: [],
                unlike: [],
            };
        }
        if (list_id && list_id.length > 0) {
            if (list_id.length !== 4) {
                list_id.push(dataDisplay[0].id);
                db && db.unlike.push(dataDisplay[0]);
            }
        } else {
            list_id.push(dataDisplay[0].id);
            db && db.unlike.push(dataDisplay[0]);
        }
        console.log(db);
        let text = list_id.join('.');
        res.cookie('test', text);
        return res.redirect('/');
    });
    return app.use('/', router);
};

export default initRoutes;
