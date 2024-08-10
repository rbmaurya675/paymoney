import connection from "../config/connectDB";
import winGoController from "./winGoController";
import k5Controller from "./k5Controller";
import k3Controller from "./k3Controller";
import cron from 'node-cron';
const axios = require('axios');

const cronJobGame1p = (io) => {
     cron.schedule('*/1 * * * *', async() => {
         await winGoController.addWinGo(1);
         await winGoController.handlingWinGo1P(1);
         const [winGo1] = await connection.execute('SELECT * FROM `wingo` WHERE `game` = "wingo" ORDER BY `id` DESC LIMIT 2 ', []);
         const data = winGo1; // New bridge has no results
         io.emit('data-server', { data: data });

         await k5Controller.add5D(1);
         await k5Controller.handling5D(1);
         const [k5D] = await connection.execute('SELECT * FROM 5d WHERE `game` = 1 ORDER BY `id` DESC LIMIT 2 ', []);
         const data2 = k5D; // New bridge has no results
         io.emit('data-server-5d', { data: data2, 'game': '1' });

         await k3Controller.addK3(1);
         await k3Controller.handlingK3(1);
         const [k3] = await connection.execute('SELECT * FROM k3 WHERE `game` = 1 ORDER BY `id` DESC LIMIT 2 ', []);
         const data3 = k3; // New bridge has no results
         io.emit('data-server-k3', { data: data3, 'game': '1' });
     });
     cron.schedule('*/3 * * * *', async() => {
         await winGoController.addWinGo(3);
         await winGoController.handlingWinGo1P(3);
         const [winGo1] = await connection.execute('SELECT * FROM `wingo` WHERE `game` = "wingo3" ORDER BY `id` DESC LIMIT 2 ', []);
         const data = winGo1; // New bridge has no results
         io.emit('data-server', { data: data });

         await k5Controller.add5D(3);
         await k5Controller.handling5D(3);
         const [k5D] = await connection.execute('SELECT * FROM 5d WHERE `game` = 3 ORDER BY `id` DESC LIMIT 2 ', []);
         const data2 = k5D; // New bridge has no results
         io.emit('data-server-5d', { data: data2, 'game': '3' });

         await k3Controller.addK3(3);
         await k3Controller.handlingK3(3);
         const [k3] = await connection.execute('SELECT * FROM k3 WHERE `game` = 3 ORDER BY `id` DESC LIMIT 2 ', []);
         const data3 = k3; // New bridge has no results
         io.emit('data-server-k3', { data: data3, 'game': '3' });
     });
     cron.schedule('*/5 * * * *', async() => {
         await winGoController.addWinGo(5);
         await winGoController.handlingWinGo1P(5);
         const [winGo1] = await connection.execute('SELECT * FROM `wingo` WHERE `game` = "wingo5" ORDER BY `id` DESC LIMIT 2 ', []);
         const data = winGo1; // New bridge has no results
         io.emit('data-server', { data: data });

         await k5Controller.add5D(5);
         await k5Controller.handling5D(5);
         const [k5D] = await connection.execute('SELECT * FROM 5d WHERE `game` = 5 ORDER BY `id` DESC LIMIT 2 ', []);
         const data2 = k5D; // New bridge has no results
         io.emit('data-server-5d', { data: data2, 'game': '5' });

         await k3Controller.addK3(5);
         await k3Controller.handlingK3(5);
         const [k3] = await connection.execute('SELECT * FROM k3 WHERE `game` = 5 ORDER BY `id` DESC LIMIT 2 ', []);
         const data3 = k3; // New bridge has no results
         io.emit('data-server-k3', { data: data3, 'game': '5' });
     });
     cron.schedule('*/10 * * * *', async() => {
         await winGoController.addWinGo(10);
         await winGoController.handlingWinGo1P(10);
         const [winGo1] = await connection.execute('SELECT * FROM `wingo` WHERE `game` = "wingo10" ORDER BY `id` DESC LIMIT 2 ', []);
         const data = winGo1; // New bridge has no results
         io.emit('data-server', { data: data });

        
         await k5Controller.add5D(10);
         await k5Controller.handling5D(10);
         const [k5D] = await connection.execute('SELECT * FROM 5d WHERE `game` = 10 ORDER BY `id` DESC LIMIT 2 ', []);
         const data2 = k5D; // New bridge has no results
         io.emit('data-server-5d', { data: data2, 'game': '10' });

         await k3Controller.addK3(10);
         await k3Controller.handlingK3(10);
         const [k3] = await connection.execute('SELECT * FROM k3 WHERE `game` = 10 ORDER BY `id` DESC LIMIT 2 ', []);
         const data3 = k3; // New bridge has no results
         io.emit('data-server-k3', { data: data3, 'game': '10' });
     });

    // trx wingo
    const fetchLatestBlock = async (type, value) => {
        // console.log("Entering fetchLatestBlock function...");
        // console.log("value is....", value)
        try {
            const fetchDataQuery = `SELECT block+${value} as block FROM trx WHERE type=${type} ORDER BY block DESC LIMIT 1`;
            // Execute query using await
            const [rows, fields] = await connection.execute(fetchDataQuery);
            if (rows.length > 0) {
                const latestBlock = rows[0].block;
                // console.log("Latest block fetched:", latestBlock);
                return latestBlock;
            } else {
                // console.log("No blocks found in trx table.");
                return null;
            }
        } catch (error) {
            console.error('Error fetching latest block:', error);
            throw error;
        }
    };
    fetchLatestBlock()
        .then(latestBlock => {
            // console.log("Latest block:", latestBlock);
        })
        .catch(error => {
            console.error("Error:", error);
        });

// Function to generate a unique ID with 17 characters
function generateUniqueID() {
    // Get the current time in Asia/Kolkata time zone
    const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const date = new Date(now);
    // console.log("date is ...",date)

    // Get the full year
    const year = date.getFullYear().toString();

    // Get the month (zero padded)
    const month = ('0' + (date.getMonth() + 1)).slice(-2);

    // Get the date (zero padded)
    const day = ('0' + date.getDate()).slice(-2);

    // Get the hours, minutes, and seconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Calculate the total minutes since midnight
    const totalMinutes = (hours * 60) + minutes+1;
    console.log("total minute is ....",totalMinutes)

    // Convert total minutes and seconds to a zero-padded string
    const timePeriod = ('00000' + totalMinutes).slice(-5);

    // Concatenate parts to form the unique ID
    const uniqueID = `${year}${month}${day}${timePeriod}`;

    return uniqueID;
}
const id = generateUniqueID();
console.log("Generated ID:", id);

    cron.schedule('*/1 * * * *', async () => {
        try {
            // await winGoController.trxhandlingWinGo1P(1);
            // const [trxgetperiod] = await connection.execute('SELECT * FROM trx WHERE type = 1 ORDER BY id DESC LIMIT 1', []);
            // // console.log("trxgetperiod...",trxgetperiod[0].period);
            // const trxPeriodData=trxgetperiod[0].period +1;
            // // console.log("trx period data with + 1 value ....",trxPeriodData)
            // io.emit('data-server-trx-get-period', { data: trxPeriodData });
            // await sleep(56000);
            const latestBlock = await fetchLatestBlock(1, 20);
          
 const response = await axios.get(`https://apilist.tronscanapi.com/api/block?sort=-balance&start=0&limit=20&producer=&number=&start_timestamp=&end_timestamp=`, {
});
// const data = response.data.data[1];
// const data = response.data.data[0];
// const block = data.number;
// const hash = data.hash;
const data = response.data.data;
const currentBlockNumber = data[0].number;
console.log("curent blocknumber....1.",currentBlockNumber)
        const targetBlockIndex = 1; // 3 seconds back (assuming each block represents ~1 second)

        const targetBlockData = data[targetBlockIndex];
        const block = targetBlockData.number;
        const hash = targetBlockData.hash;
function findLastIntegerDigit(hash) {
    for (let i = hash.length - 1; i >= 0; i--) {
        if (!isNaN(hash[i]) && hash[i] !== ' ') {
            return hash[i];
        }
    }
    return null;
}
const  result= findLastIntegerDigit(hash);
 const currentTime = new Date();
 const adjustedTime = new Date(currentTime.getTime() - 3000);
const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Kolkata'
};
const time = new Intl.DateTimeFormat('en-GB', options).format(adjustedTime).replace(',', '');
const formattedTime = time.replace(/(\d{2})\/(\d{2})\/(\d{4}),\s(\d{2}):(\d{2}):(\d{2})/, '$3-$2-$1 $4:$5:$6');
            const bigsmall = result <= 4 ? 'small' : 'big';
            const status = 0;
            const singleType = 1;
            const uniqueID = generateUniqueID();
            const query = 'INSERT INTO trx (period, block, hash, result, bigsmall, time, status,type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [uniqueID, block, hash, result, bigsmall, formattedTime, status, singleType]; // Assuming period can be null or auto-increment
            connection.query(query, values, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return;
                }
                console.log('Data inserted:', results.insertId);
            });
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    });
    cron.schedule('*/1 * * * * *', async () => {
        const [singletrxgetperiod] = await connection.execute('SELECT * FROM trx WHERE type = 1 ORDER BY id DESC LIMIT 1', []);
            // console.log("trxgetperiod...",trxgetperiod[0].period);
            const singletrxPeriodData=singletrxgetperiod[0].period +1;
            // console.log("trx period data with + 1 value ....",trxPeriodData)
            io.emit('data-server-trx-get-period', { data: singletrxPeriodData });
        const [singletrxgetData] = await connection.execute('SELECT * FROM trx WHERE type = 1 ORDER BY id DESC LIMIT 10', []);
        const singletrxdata = singletrxgetData.map(items => {
            // Update hash to show only the last 6 characters
            items.hash = items.hash.slice(-4);
          
            // Update time to show only the time part (HH:mm:ss)
            items.time = items.time.split(' ')[1];
          
            // Format period field as per your requirement
            const formattedPeriod = `202**${items.period.toString().slice(-4)}`;
            items.period = formattedPeriod;
          
            // Return the modified item
            return items;
          });
        // console.log("trxdata...", trxdata)
        io.emit('data-server-trx', { data: singletrxdata });
        // >>>>>>>>>>>>>>>>>>>> in every 3 secound display as 3 minute data >>>>>>>
    })
    // close
     cron.schedule('* * 0 * * *', async() => {
         await connection.execute('UPDATE users SET roses_today = ?', [0]);
         await connection.execute('UPDATE point_list SET money = ?', [0]);
     });
}

module.exports = {
     cronJobGame1p
};