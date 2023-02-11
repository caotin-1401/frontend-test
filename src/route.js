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
var list_id = [];
var isClean = false;
let initRoutes = (app) => {
    router.get('/', (req, res) => {
        if (isClean === true) {
            list_id = [];
            isClean = false;
        }
        let list_data_cookie, dataDisplay, current_data, current_data_number;
        let isFinish = false;

        let ramdom = Math.floor(Math.random() * 4) + 1;

        if (req.cookies.test) {
            list_data_cookie = req.cookies.test;
            [...current_data] = list_data_cookie.split('.');
            current_data_number = current_data.map((item) => +item);
            list_id = current_data_number;
        }

        if (list_id && list_id.length > 0) {
            if (list_id.length !== 4) {
                while (list_id.some((x) => x === ramdom)) {
                    ramdom = Math.floor(Math.random() * 4) + 1;
                }
                list_id.push(ramdom);
            } else isFinish = true;
        } else list_id.push(ramdom);

        let new_data = data.filter((item, index) => item.id === ramdom);
        isFinish === false ? (dataDisplay = new_data) : (dataDisplay = dataFinish);
        let text = list_id.join('.');
        res.cookie('test', text);
        res.render('index', {
            dataDisplay,
        });
    });
    router.post('/clean', (req, res) => {
        let ramdom = Math.floor(Math.random() * 4) + 1;
        let dataDisplay = data.filter((item, index) => item.id === ramdom);
        isClean = true;
        res.clearCookie('test');
        res.render('index', {
            dataDisplay,
        });

        res.redirect('/');
    });
    return app.use('/', router);
};

export default initRoutes;
