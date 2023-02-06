import mongoose from 'mongoose';

export class DB {
    self: any;
    connection: mongoose.Connection;
    ticketModel: any;

    constructor() {
        this.self = mongoose;
        this.connection = mongoose.connection;
        this.ticketModel = mongoose.model('ticket-transcripts', 
            new mongoose.Schema({
                Channel: Object,
                Content: Array,
            })
        );
    }

    async findOne(channelId:any, data?: any) {
        await this.findOne({
            id: channelId,
            content: data
        })
        .then((cb:void) => {
            return cb;
        }).catch((e:any) => console.log(e));
    }
    async deleteOne(channelId:any) {
        await this.deleteOne({id: channelId})
        .then((cb:void) => {
            return cb;
        }).catch((e:any) => console.log(e));
    }
    async updateOne(channelId:any, data?:any) {
        await this.updateOne({
            id: channelId,
            content: data ?? []
        })
        .then((cb: void) => {
            return cb;
        }).catch((e:any)=> console.log(e));
    }

    async connect() {
        //mongodb+srv://tuna-admin:<password>@cluster0.rcrxyti.mongodb.net/?retryWrites=true&w=majority
        await this.self.connect(`mongodb+srv://`+`${process.env.mongoUser}`+`:`+`${process.env.mongoPw}`+`@${process.env.mongoClusterName}.${process.env.mongoId}`+'.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log('Connected to Database Successfully')
            this.connection.on('error', console.error.bind(console, 'DB connection error:'))
            this.connection.once('connected', () => console.log('DB connection is now active !'))
        })
        .catch((e: any) => console.log(e));
    }
    
    async endConnection() {
        return this.connection.close(true)
    }

}