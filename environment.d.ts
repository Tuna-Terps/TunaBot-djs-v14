declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            botId: string;
            guildId: string;
            parentId: string;
            blockId:string;
            joinId_1:string;
            welcomeId_1:string;
            rulesId_1:string;
            ticketId_1:string;
            modChannelId:string;
            mongoUser:string;
            mongoPw:string;
            mongoClusterName:string;
            mongoId:string;
            mongoDbName:string;
            env: "dev" | "prod" | "debug";
        }
    }
}
export {};