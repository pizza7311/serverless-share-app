const mongoose = require('mongoose')

exports.initDB =async () => {
    try {
        await retryConnect()
        console.log('db connected')
    } catch (err) {
        console.log('connect error:', err.name)
    }
}

async function connect() {
    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    } catch (err) {
        throw err
    }
}

function retryConnect()  {
    return new Promise((resolve, reject) => {
        let tryCount = 0

        const retry =async () => {
            try {
                await connect()
                resolve()
            } catch (err) {
                tryCount++
                console.log(`${tryCount} times trying`)
                if (tryCount >= 5)
                    reject(err)
                else
                    setTimeout(retry,10)
            }
        }
        retry()
    })
}


